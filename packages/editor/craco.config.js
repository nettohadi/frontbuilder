const path = require(`path`);
const { getLoader, loaderByName } = require('craco');

const packages = [];
packages.push(path.join(__dirname, '../renderer'));

module.exports = {
  devServer: {
    port: 3249,
  },
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@tests': path.resolve(__dirname, 'tests'),
    },
    configure: (webpackConfig, arg) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName('babel-loader')
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = include.concat(packages);
      }

      return webpackConfig;
    },
  },
};
