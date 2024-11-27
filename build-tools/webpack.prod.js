// build-tools/webpack.prod.js

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const config = require("./config");

module.exports = (env) =>
  merge(common(env), {
    mode: "production",
    devtool: "source-map",
    optimization: {
      minimize: true,
      // You can add more production optimizations here
    },
    plugins: [
      // Add any production-specific plugins here
    ],
    // You can add production-specific module rules or overrides here
  });
