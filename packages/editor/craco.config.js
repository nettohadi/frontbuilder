const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@tests': path.resolve(__dirname, 'tests'),
    },
  },
};
