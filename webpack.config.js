var webpack = require('webpack');
var path = require('path');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var config = {
	entry: './app/app.js',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: "bundle.js"
	},

	plugins: [
		new ngAnnotatePlugin({add: true})
	],

	module: {
		loaders: [
			{test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/},
			{test: /\.html$/, loader: 'raw', exclude: /node_modules/},
			{test: /\.css$/, loader: 'style!css', exclude: /node_modules/}
		]
	},

	devServer: {
		port: 3002
	}
};


if (process.env.NODE_ENV === 'production') {
	config.output.path = __dirname + '/dist';
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;