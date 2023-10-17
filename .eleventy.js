const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const { minify } = require("terser");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventyWebcPlugin = require("@11ty/eleventy-plugin-webc");
const eleventyImage = require("@11ty/eleventy-img");
const { eleventyImagePlugin } = eleventyImage;

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

  // Cache buster
  eleventyConfig.addFilter("bust", (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    params.set("v", new Date().getTime());
    return `${urlPart}?${params}`;
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
  eleventyConfig.addPassthroughCopy("src/img");
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
