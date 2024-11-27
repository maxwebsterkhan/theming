const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackSVGSpritely = require("webpack-svg-spritely");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const activeTheme = env.theme || "polypipe";

  const entries = {
    main: ["./src/js/index.js"],
    [`theme-${activeTheme}`]: `./src/scss/themes/${activeTheme}/${activeTheme}.scss`,
  };

  return {
    entry: entries,
    output: {
      filename: "js/[name].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      assetModuleFilename: "assets/[name][ext][query]",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@layouts": path.resolve(__dirname, "../Views/Shared/Layouts"),
        "@views": path.resolve(__dirname, "../Views"),
        "@shared": path.resolve(__dirname, "../Views/Shared"),
        "@components": path.resolve(__dirname, "../Views/Shared/Components"),
        "@blocks": path.resolve(__dirname, "../Views/Shared/Blocks"),
        "@react": path.resolve(__dirname, "./src/js/react"),
        "@js": path.resolve(__dirname, "./src/js"),
        "@icons": path.resolve(__dirname, "./src/assets/icons"),
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
          include: path.resolve(__dirname, `./src/scss/themes/${activeTheme}`),
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  includePaths: [
                    path.resolve(__dirname, `./src/scss/themes/${activeTheme}`),
                    path.resolve(__dirname, "./src/scss/base"),
                    path.resolve(__dirname, "./src/scss/components"),
                    path.resolve(__dirname, "./src/scss/utils"),
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
        template: "./src/index.html",
        filename: "index.html",
        inject: "body",
        chunks: ["main", `theme-${activeTheme}`], // Inject the main script and active theme
      }),
    ],
  };
};
