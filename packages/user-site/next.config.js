const withTM = require("next-transpile-modules")(["@frontbuilder/renderer"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = withTM(nextConfig);
