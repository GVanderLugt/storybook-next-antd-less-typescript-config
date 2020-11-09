const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  ...withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
  }),
});
