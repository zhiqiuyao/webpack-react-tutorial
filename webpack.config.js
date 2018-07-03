const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  // entry: {
  //   vendor: ['react', 'react-dom', 'mobx', 'mobx-react', 'classnames'],
  //   main: './src/index.js',
  // },
  // output: {
  //   path: path.join(__dirname, './dist'),
  //   filename: '[name].[chunkhash:6].bundle.js',
  //   chunkFilename: '[name].[chunkhash:6].bundle.js',
  //   // publicPath: '/',
  // },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         chunks: 'initial',
  //         name: 'vendor',
  //         test: 'vendor',
  //         enforce: true
  //       },
  //     }
  //   },
  //   runtimeChunk: true
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.useable\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less?$/,
        loaders: [
          'style-loader',
          'css-loader',
          'less-loader?{"sourceMap":false}'
        ],
        exclude: /\.use(able)?\.less$/
      },
      {
        test: /\.use(able)?\.less$/,
        exclude: /node_modules/,
        loader: "style-loader/useable!css-loader!less-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|ttf|woff2|woff|eot|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@befe/utils': path.resolve(__dirname, 'packages/befe-utils'),
      '@befe/erp-comps': path.resolve(__dirname, 'packages/erp-comps-react-mobx'),
      'common': path.resolve(__dirname, 'packages/erp-comps-react-mobx/v2')
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      '__DEVELOPMENT__': true
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      hash: true,
      chunks: ['vendor', 'main']
    })
  ]
};