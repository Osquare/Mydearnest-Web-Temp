module.exports = {
	devtool: 'sourcemap',
	output: {
		filename: 'bundle.js'
	},
	watch: true,
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			},
			{
				test: /\.html$/,
				loader: 'raw'
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			}
		]
	},
	devServer: {
		port: 3002,
		historyApiFallback: true
	}
};
