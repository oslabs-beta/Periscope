const path = require('path');
const entry = ['./index.js'];
const output = {
  path: path.resolve(__dirname, 'build'),
  filename: 'bundle.js',
};

module.exports = {
  mode: process.env.NODE_ENV,
  entry,
  output,
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/transform-async-to-generator',
          ],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};
