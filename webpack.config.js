const { iifeReturnMinify, IIFEReturnPlugin } = require('@agogpixel/pgmmv-webpack-support');
const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const packageJson = require('./package.json');

const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

const pluginName = packageJson.name.includes('/') ? packageJson.name.split('/')[1] : packageJson.name;
const version = isProd ? packageJson.version : `${packageJson.version}-dev`;

const srcPath = resolve(__dirname, 'src');
const distPath = resolve(__dirname, 'dist');

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: false,
  entry: {
    [`${pluginName}-${version}`]: `${srcPath}/pgmmv-entry.js`
  },
  output: {
    iife: true,
    filename: '[name].pgmmv.js',
    path: distPath,
    environment: {
      arrowFunction: false
    }
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        include: srcPath,
        exclude: /node_modules/
      },
      {
        test: /\.md$/i,
        type: 'asset/source'
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: function comments(node, comment) {
              // leave for minifier
              return /IIFEReturnPlugin/.test(comment.value);
            },
            max_line_len: 255
          }
        },
        minify: iifeReturnMinify
      })
    ]
  },
  plugins: [new IIFEReturnPlugin()]
};
