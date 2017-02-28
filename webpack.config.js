var path = require( 'path' );

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'pacman.js',
		path: path.resolve( __dirname, 'dist' )
	},
	module: {
		loaders: [ {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		} ]
	},
	devtool: "source-map"
};
