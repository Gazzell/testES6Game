var path = require( 'path' );

module.exports = {
	entry: './src/index.es6',
	output: {
		filename: 'pacman.js',
		path: path.resolve( __dirname, 'dist' )
	},
	module: {
		loaders: [ {
			test: /\.jsx$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		} ]
	},
	devtool: "source-map"
};