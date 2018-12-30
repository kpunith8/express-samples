import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';

  export default {
    entry: './src/new-index.js',
    devtool: 'source-map',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),
    
        // Hash the files using MD5 so that their names change when the content changes.
        new WebpackMd5Hash(),
    
        // Use CommonsChunkPlugin to create a separate bundle
        // of vendor libraries so that they're cached separately.
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor'
        }),
    
        // Create HTML file that includes reference to bundled JS.
        new HtmlWebpackPlugin({
          template: './src/index.html',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          },
          inject: true,
          // Properties you define here are available in index.html
          // using htmlWebpackPlugin.options.varName
          trackJSToken: 'INSERT YOUR TOKEN HERE'
    }),

      // Eliminate duplicate packages when generating bundle
      new webpack.optimize.DedupePlugin(),

      // Minify JS
      new webpack.optimize.UglifyJsPlugin()
    ],

    module: {
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
        {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
      ]
  }
}