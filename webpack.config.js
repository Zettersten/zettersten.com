const path = require('path');
const glob = require('glob-all');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
var production = (process.env.NODE_ENV == 'production') ? true : false;

/**
 * Custom PurgeCSS Extractor
 * https://github.com/FullHuman/purgecss
 * https://github.com/FullHuman/purgecss-webpack-plugin
 */
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

/**
 * Webpack config
 */
var config = {
  entry: './assets/assets.js',
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: 'scripts.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new ExtraWatchWebpackPlugin({
      files: ['builder/template.ejs']
    }),    
    new WebpackShellPlugin({
      onBuildExit: ['node builder/build.js']
    })
  ]
}
if (production) {
  config.plugins.push(new UglifyJsPlugin());

  config.plugins.push(new PurgecssPlugin({
    paths: glob.sync([
      path.join(__dirname, "dist/*.html"),
      path.join(__dirname, "assets/*.js"),
      path.join(__dirname, "builder/*.ejs")
    ]),
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: ["html", "js", "ejs"]
      }
    ]
  }));  
}

module.exports = config;