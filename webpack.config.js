const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  const isDev = !isProd;

  console.log('isProd: ', isProd)
  console.log('isDev: ', isDev)

  const fileName = ext => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

  return {
    context: path.resolve(__dirname, "src"),
    entry: {
      main: ["core-js/stable", "regenerator-runtime/runtime", "./index.js"],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: fileName('js'),
    },
    resolve: {
      extensions: [".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@core": path.resolve(__dirname, "src", "core"),
      },
    },
    devServer: {
      port: '3001',
      open: true,
      watchFiles: './',     // Этот параметр автоматические перезагружает страницу при изменении HTML
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src", "favicon.ico"),
            to: path.resolve(__dirname, "dist"),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: fileName('css'),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
