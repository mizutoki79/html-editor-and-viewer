const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    serviceWorker: './src/ts/serviceWorker.ts',
    editor: './src/ts/editor.ts',
    viewer: './src/ts/viewer.ts',
    index: './src/ts/index.ts',
    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
    'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
    'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
    'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
    'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
  },
  devtool: false,
  plugins: [
    new MonacoWebpackPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, 'src', 'assets'),
          from: '**/*',
          to: path.resolve(__dirname, 'dist')
        },
        {
          context: path.resolve(__dirname, 'src', 'html'),
          from: '*.html',
          to: path.resolve(__dirname, 'dist')
        },
        {
          context: path.resolve(__dirname, 'src', 'css'),
          from: '*.css',
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'editor.html',
      template: 'src/ejs/inner.ejs',
      inject: false,
      templateParameters: { scriptName: 'editor.bundle.js' }
    }),
    new HtmlWebpackPlugin({
      filename: 'viewer.html',
      template: 'src/ejs/inner.ejs',
      inject: false,
      templateParameters: { scriptName: 'viewer.bundle.js' }
    })
  ],
  output: {
    globalObject: 'self',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  }
}
