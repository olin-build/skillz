const webpack = require('webpack');

module.exports = {
  entry: './index.jsx',
  env: {
    API_SERVER_URL: 'http://127.0.0.1:5000/',
  },
  webpack(config) {
    config.plugins.push(new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }));
    return config;
  },
};
