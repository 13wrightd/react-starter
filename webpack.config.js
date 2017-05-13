var path=require("path");
var DIST_DIR = path.resolve(__dirname, "public");
var SRC_DIR = path.resolve(__dirname, "dev");
var config = {
	entry: path.resolve(SRC_DIR, "index.js"),
	output: {
		path: DIST_DIR,
		filename: "bundle.js"
	},
	module: {
		loaders:[
			{
				test:/\.jsx?/,
	 			exclude:/(node_modules)/,
				include: SRC_DIR,
				loader: "babel-loader",
				query: {
					presets: ["react", "es2015"]
				}
			},
			{
       			test: /\.css/,
        		loaders: ['style-loader', 'css-loader'],
        		include: SRC_DIR
      		}


		],

	}
};
module.exports = config;
