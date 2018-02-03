var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
	output: {
		path: helpers.root('dist'),
		publicPath: '/',
		filename: '[name].js'
	},
	devServer: {
		port: 8089,
		historyApiFallback: true
	}
});