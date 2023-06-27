const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

<<<<<<< HEAD
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    static: "./dist",
=======
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devServer: {
    static: './dist',
>>>>>>> feature/Day_Zero
  },
  plugins: [
    new HtmlWebpackPlugin({
<<<<<<< HEAD
      template: "./src/index.html",
=======
      template: './src/index.html',

      title: 'JS Capstone Group Project',

>>>>>>> feature/Day_Zero
    }),
  ],
  output: {
<<<<<<< HEAD
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
=======
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
>>>>>>> feature/Day_Zero
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: {
                list: [
                  // Process <img> tags
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src',
                  },
                  // Process <link> tags with the "href" attribute
                  {
                    tag: 'link',
                    attribute: 'href',
                    type: 'src',
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {

        test: /\.(png|svg|jpg|jpeg|gif)$/i,

        type: 'asset/resource',

      },
      {

        test: /\.(woff|woff2|eot|ttf|otf)$/i,

        type: 'asset/resource',

      },
    ],
  },
};
