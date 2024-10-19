module.exports = {
  mode: 'development',
  entry: './src/dev/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    contentBase: 'public',
    hot: true,
    open: true
  }
};
