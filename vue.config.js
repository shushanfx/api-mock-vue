const path = require('path');
const marked = require("marked");
const renderer = new marked.Renderer();

module.exports = {
  devServer: {
    port: "8002",
    proxy: {
      "/test.php": {
        target: "http://127.0.0.1:8001"
      },
      "/mock": {
        target: "http://127.0.0.1:8001"
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src/'),
        '@assets': path.resolve(__dirname, './src/assets/'),
        '@public': path.resolve(__dirname, './public/'),
        '@components': path.resolve(__dirname, './src/components/')
      }
    },
    module: {
      rules: [{
        test: /\.md$/,
        use: [{
          loader: "html-loader"
        }, {
          loader: "markdown-loader",
          options: {
            pedantic: true,
            renderer
          }
        }]
      }]
    }
  }
};
