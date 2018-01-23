module.exports = {
    devServer: {
        // this doesn't appear to work:
        proxy: 'http://localhost:5000/graphql'
    }
}
