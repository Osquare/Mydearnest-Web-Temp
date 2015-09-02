module.exports = {
	entry: './app/main.js',
	output: {
		filename: 'app/bundle.js'
	},
	watch: true,
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			}
		]
	},
	devServer: {
		port: 3002,
		historyApiFallback: true
	}
};
