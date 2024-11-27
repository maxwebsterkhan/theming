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
      port: 8080, // Change if needed
      open: true, // Automatically opens the browser
      hot: true, // Enables hot module replacement
      watchFiles: ["src/**/*.html", "src/**/*.scss", "src/**/*.js"], // Watches for changes in these files
    },
  });
