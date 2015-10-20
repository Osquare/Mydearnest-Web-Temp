var webpack = require('webpack');
var path = require('path');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

var config = {
	entry: './app/app.js',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: "bundle0038.js"
	},

	plugins: [
		new ngAnnotatePlugin({add: true}),
		new LiveReloadPlugin({appendScriptTag: true})
	],

	module: {
		loaders: [
			{test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/},
			{test: /\.html$/, loader: 'raw', exclude: /node_modules/},
			{test: /\.scss$/, loaders: ["style", "css", "sass"]}
		]
	},

	devServer: {
		port: 3002,
		proxy: {
			'/view.php': {
				target: 'http://localhost:3002/index.html',
				secure: false
			}
		},
		historyApiFallback: true
	}
};

if (process.env.NODE_ENV === 'production') {
	config.output.path = __dirname + '/dist';
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;