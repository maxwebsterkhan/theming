const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = (env) =>
  merge(common(env), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
        publicPath: "/",
      },
      compress: true,
      port: 8080,
      open: true,
      hot: true,
      watchFiles: ["src/**/*.html", "src/**/*.scss", "src/**/*.js"],
    },
  });
