<h1 align="center">Watermark KTP</h1>
<p align="center">Watermark KTP is a free and secure web-based tool that allows you to add a watermark to your scanned KTP (Indonesian ID card). The watermark added is in the form of text that contains the date and purpose of the KTP scan. For example, "E-wallet verification, 10-10-2021". This tool is useful in preventing data misuse and fraud.</p>

<div align="center">
    <img alt="GitHub forks" src="https://img.shields.io/github/forks/sirilius/watermarkktp">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/sirilius/watermarkktp">
   <img alt="License" src="https://img.shields.io/badge/license-MIT%20(Registered%20at%20DJKI)-blue.svg">
</div>

# Usage

Visit https://watermarkktp.com/cara-pakai/ to read the complete documentation.

# Dependencies

- [Node.js](https://nodejs.org/): Backend JavaScript runtime environment
- [npm](https://www.npmjs.com/): Used to manage and install the project's dependencies.
- [Eleventy](https://www.11ty.dev/): Static site generator used to build Watermark KTP.
- [Prettier](https://prettier.io/): Tool to ensure code follows formatting standards and consistent code writing.
- [Tailwind](https://tailwindcss.com/): Styling framework used to manage the page layout.

# Installation

To run Watermark KTP locally, follow these steps:

1. Make sure you have **Node.js** (version 12 or newer) and **npm** (Node Package Manager) installed on your system.
2. Clone this repository to your local system:
   ```sh
   git clone https://github.com/sirilius/watermarkktp.git
   ```
3. Navigate to the project directory:
   ```sh
   cd watermarkktp
   ```
4. Install project dependencies by running the following command:
   ```sh
   npm install
   ```
5. Build the project assets, including Eleventy and Tailwind CSS configurations, by running the following command:
   ```sh
   npm run build
   ```
6. Run the project locally with the command:
   ```sh
   npm run dev
   ```

This will start a local development server using Eleventy. You can access Watermark KTP in your browser at http://localhost:8080/.

# Features

- Easy-to-use interface: Watermark KTP provides a user-friendly interface, allowing users to quickly and easily add a watermark to scanned ID cards.
- Watermark customization: Users can customize the watermark by selecting the font, position, size, color, rotation, and transparency.
- Reset watermark: Users can reset the watermark settings to the default with a single click.
- Draggable watermark: Users can drag and drop the watermark to the desired location within the scanned ID card.
- Presets: Simplifies the process for users with automatic watermark creation in just one click.
- Draggable image: Users can add an ID card scan by dragging and dropping the image file into the tool.
- Download image: Users can save the watermark-applied ID card scan as a PNG image.

# Privacy Policy

We highly value the privacy of users' personal data in Watermark KTP. Here are some important points from our privacy policy:

- Watermark KTP never sells, misuses, or exploits anyone's ID card data.
- Watermark KTP is a simple tool to add text (watermark) to ID card scans as a means of marking and securing personal data. We never send users' uploaded images out of their browser.
- All processing in Watermark KTP is entirely done on the client-side (your side). We never send any files uploaded by users out of their browser.
- We are committed to providing secure and user friendly tools for the community. Watermark KTP is one of our steps towards raising awareness of personal data security in the digital world.

If you have any questions regarding privacy in Watermark KTP, please contact us by sending a message via Twitter: [@SiriliusKevin](https://twitter.com/SiriliusKevin)

# Contributing

If you are interested in contributing to Watermark KTP, please read the [contributing guidelines](./.github/CONTRIBUTING.md) for guidelines and steps to follow.

# Translations

- [Indonesian / Bahasa Indonesia](README-ID.md)

# License

Watermark KTP is licensed under the [MIT License](https://github.com/sirilius/watermarkktp/blob/main/LICENSE). See `LICENSE` for more information.

# Donations

If you find Watermark KTP useful and would like to support further development, you can make a donation as a token of appreciation. Your donation will be greatly appreciated and contribute to the maintenance, updates, and improvements of this tool.

To make a donation, please visit the following donation page:

- https://watermarkktp.com/donate/
