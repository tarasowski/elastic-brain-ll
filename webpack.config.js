module.exports = {
  entry: ['./src/client/index.js'],
  devtool: 'inline-source-map',
  mode: 'none',
  output: {
    filename: 'bundle.js',
  },
  performance: {
    hints: false
  },
  watch: true,
  devServer: {
    contentBase: './src/client/',
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            plugins: [require('babel-plugin-transform-object-rest-spread')],
          },
        },
      },
    ],
  },
};
