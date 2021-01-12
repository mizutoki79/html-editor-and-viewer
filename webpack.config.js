const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    // app: './src/ts/app.ts',
    background: './src/ts/background.ts'
    // 'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
    // 'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
    // 'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
    // 'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
    // 'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
  },
  devtool: false,
  plugins: [
    new MonacoWebpackPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'manifest.json'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    })
  ],
  output: {
    globalObject: 'self',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
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
