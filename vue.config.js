const path = require('path');
const marked = require("marked");
const highlightJS = require('highlight.js');
const renderer = new marked.Renderer();

module.exports = {
  devServer: {
    port: "8002",
    proxy: {
      "/mock": {
        target: "http://127.0.0.1:8001"
      },
      "/socket.io": {
        target: "http://127.0.0.1:8001",
        ws: true
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
            pedantic: false,
            renderer,
            highlight: code => {
              return highlightJS.highlightAuto(code).value;
            },
            gfm: true,
            tables: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
          }
        }]
      }]
    }
  }
};
