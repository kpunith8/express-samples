import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

  module.exports = {
    entry: './src/new-index.js',
    devtool: 'inline-source-map',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'src')
    },

    plugins: [
      // Create HTML file that includes reference to bundled JS.
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: true,
      })
    ],
    module: {
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
        {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
      ]
  }
}