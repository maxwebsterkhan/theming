// build-tools/webpack.common.js

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackSVGSpritely = require("webpack-svg-spritely");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./config");

module.exports = (env) => {
  const activeTheme = env.theme || "polypipe";

  const entries = {
    main: ["@js/index.js"],
    [`theme-${activeTheme}`]: `./src/scss/themes/${activeTheme}.scss`,
  };

  return {
    entry: entries,
    output: {
      filename: "js/[name].js",
      path: config.paths.dist,
      publicPath: "/",
      assetModuleFilename: "assets/[name][ext][query]",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@": config.paths.src,
        "@layouts": config.paths.sharedLayouts,
        "@views": config.paths.sharedViews,
        "@shared": config.paths.sharedViews,
        "@components": config.paths.sharedComponents,
        "@blocks": config.paths.sharedBlocks,
        "@react": config.paths.reactJs,
        "@js": config.paths.js,
        "@icons": config.paths.icons,
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          include: config.paths.themes(activeTheme),
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  includePaths: [
                    config.paths.themes(activeTheme),
                    config.paths.baseScss,
                    config.paths.componentsScss,
                    config.paths.utilsScss,
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new RemoveEmptyScriptsPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
      new WebpackSVGSpritely({
        output: "generated-icons",
        filename: "svg-icons-sprite.svg",
        location: "bodyEnd",
        manifest: "generated-icons/svg-icons.json",
        insert: "xhr",
        url: "/generated-icons",
        combine: true,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(config.paths.src, "index.html"),
        filename: "index.html",
        inject: "body",
        chunks: ["main", `theme-${activeTheme}`], // Inject the main script and active theme
      }),
    ],
  };
};
