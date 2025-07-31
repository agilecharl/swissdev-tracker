const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    frontend: './src/frontend/index.js',
    admin: './src/admin/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'js/[name].js',
    clean: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
  externals: {
    '@wordpress/element': ['wp', 'element'],
    '@wordpress/api-fetch': ['wp', 'apiFetch'],
    '@wordpress/components': ['wp', 'components'],
    '@wordpress/data': ['wp', 'data'],
    '@wordpress/hooks': ['wp', 'hooks'],
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  devtool: isProduction ? false : 'source-map',
  mode: isProduction ? 'production' : 'development',
};
