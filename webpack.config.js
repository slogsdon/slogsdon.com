const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      path.resolve(__dirname, 'static'),
    ]),
  ],
};
