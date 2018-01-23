const webpack = require('webpack')

module.exports = {
    devServer: {
        // this doesn't appear to work:
        proxy: 'http://localhost:5000/graphql'
    },
    webpack(config) {
        config.plugins.push(new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }));
        return config;
    }
};
