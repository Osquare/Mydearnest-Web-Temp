module.exports = {
	extry: './app/main.js',
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
	}
};