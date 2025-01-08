const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const { minify } = require("terser");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventyWebcPlugin = require("@11ty/eleventy-plugin-webc");
const eleventyImage = require("@11ty/eleventy-img");
const { eleventyImagePlugin } = eleventyImage;
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");
require("dotenv").config();
const csrf = require("csrf");
const tokens = new csrf();

const shortcodes = {
  image: async function (filepath, alt, widths, classes, sizes) {
    let options = {
      formats: ["avif", "webp", "png"],
      widths: widths || [null],
      urlPath: "/img/",
      outputDir: "_site/img/",
    };

    let stats = await eleventyImage(filepath, options);

    return eleventyImage.generateHTML(stats, {
      alt,
      loading: "lazy",
      decoding: "async",
      sizes: sizes || "(min-width: 22em) 30vw, 100vw",
      class: classes,
    });
  },
};

// Start Eleventy Configuration
module.exports = function (eleventyConfig) {
  // Add a shortcode to return the current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // HTML minification
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // CSS minification
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // JS minification
  eleventyConfig.addNunjucksAsyncFilter(
    "jsmin",
    async function (code, callback) {
      try {
        const minified = await minify(code);
        callback(null, minified.code);
      } catch (err) {
        console.error("Terser error: ", err);
        // Fail gracefully.
        callback(null, code);
      }
    },
  );

  // Cache buster
  eleventyConfig.addFilter("bust", (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    params.set("v", new Date().getTime());
    return `${urlPart}?${params}`;
  });

  eleventyConfig.addFilter("postDate", (dateObj, format = "dd LLLL yyyy") => {
    if (typeof dateObj === "string") {
      return DateTime.fromISO(dateObj).setLocale("id").toFormat(format);
    } else if (typeof dateObj === "number") {
      dateObj = new Date(dateObj);
    }
    return DateTime.fromJSDate(dateObj).setLocale("id").toFormat(format);
  });

  eleventyConfig.addFilter("numCommas", function (value) {
    return value.toLocaleString();
  });

  // RSS
  eleventyConfig.addPlugin(pluginRss);

  // Navigation
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // WebC
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: [
      // Add as a global WebC component
      "npm:@11ty/eleventy-img/*.webc",
    ],
  });

  // Image plugin
  eleventyConfig.addPlugin(eleventyImagePlugin, {
    // options via https://www.11ty.dev/docs/plugins/image/#usage
    formats: ["avif", "webp", "jpeg"],

    urlPath: "/img/",

    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  // Static files
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/blog/pretty-atom-feed-v3.xsl");
  eleventyConfig.addPassthroughCopy({
    "src/ads.txt": "./ads.txt",
  });
  eleventyConfig.addPassthroughCopy({
    "src/robots.txt": "./robots.txt",
  });
  eleventyConfig.addPassthroughCopy({
    "src/_includes/css/app.css": "./css/app.css",
  });

  eleventyConfig.addShortcode("image", shortcodes.image);

  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("blog", "layouts/blog.njk");
  eleventyConfig.addLayoutAlias("embed", "layouts/embed.njk");

  // Create a custom collection for blog posts
  eleventyConfig.addCollection("blogPosts", function (collection) {
    return collection.getFilteredByGlob("./src/blog/**/*.md");
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_alias: "excerpt",
    excerpt_separator: "<!-- excerpt -->",
  });

  eleventyConfig.addTransform(
    "replaceHeadWithUmamiScript",
    (content, outputPath) => {
      if (outputPath && outputPath.endsWith(".html")) {
        const umamiScript = `<script async src="https://api-watermarkktp.vercel.app/app" data-website-id="f8256656-afe4-4cde-8eb8-431b17454524"></script>`;
        return content.replace("</head>", `${umamiScript}</head>`);
      }
      return content;
    },
  );

  // Add global data for environment variables
  eleventyConfig.addGlobalData("env", process.env);

  console.log(
    "CSRF_SECRET:",
    process.env.CSRF_SECRET ? "defined" : "undefined",
  );

  // Add global data for CSRF token
  eleventyConfig.addGlobalData("csrfToken", () =>
    tokens.create(process.env.CSRF_SECRET),
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
    },
    templateFormats: ["html", "njk", "md", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: false,
  };
};
