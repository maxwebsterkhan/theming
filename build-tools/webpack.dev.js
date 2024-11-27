// build-tools/webpack.dev.js

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const config = require("./config");
const path = require("path");

module.exports = (env) =>
  merge(common(env), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      static: {
        directory: config.paths.dist,
        publicPath: "/",
      },
      compress: true,
      port: 8080,
      open: true,
      hot: true,
      watchFiles: ["src/**/*.html", "src/**/*.scss", "src/**/*.js"],
    },
    plugins: [
      // Add any development-specific plugins here
    ],
    // You can add development-specific module rules or overrides here
  });
