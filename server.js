var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var PORT = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  quiet: true,
  historyApiFallback: true
}).listen(PORT, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at http://localhost:' + PORT);
});
