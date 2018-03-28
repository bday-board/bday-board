const webpack = require("webpack");
const path = require('path');
//const NODE_ENV = 'production';
const NODE_ENV = 'development';

const analyzeBundles = false;

let config = {
	entry: {
		app: './src/app/app.jsx',
		add: './src/app/add.jsx',
		list: './src/app/list.jsx'
	},

	output: {
		path: path.resolve(__dirname, "js/dist/"),
		filename: '[name].min.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		}),
		new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/ru$/),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
	]
};
if(NODE_ENV == 'production') {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
	config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
}
else {
	config.plugins.push(new webpack.NamedModulesPlugin());
	config.devtool = 'eval-source-map';
	config.watchOptions = {
		ignored: /node_modules/
	};

}

if(analyzeBundles) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
	config.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = config;