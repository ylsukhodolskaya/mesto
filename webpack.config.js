const path = require('path'); // стандартная утилита Node.js для построения путей
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // __dirname - глобальная константа, указывающая на каталог, гле лежит этот файл
  entry: path.resolve(__dirname, 'src', 'pages', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // contenthash каждый раз новый, чтобы файлы не кэшировались
    clean: true, // удалять каталог dist
  },
  devtool: 'inline-source-map', // показывает ошибки в исходных файлах
  module: {
    rules: [
      // загружаем js-библиотеки
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // загружаем изображения и шрифты
      {
        test: /\.(png|svg|jpg|jpeg|JPG|gif|ico|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      // загружаем css
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    // подключаем плагин, загружаем html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    // подключаем плагин
    new MiniCssExtractPlugin(),
  ],
};