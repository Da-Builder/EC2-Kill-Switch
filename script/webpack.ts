import { resolve } from "path";
import { Configuration } from "webpack";

const configuration: Configuration = {
	mode: "production",
	entry: "./src/main.ts",
	output: {
		filename: "bundle.js",
		path: resolve("./public/"),
	},
	resolve: {
		extensions: [".js", ".ts"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: resolve("./node_modules/"),
			},
		],
	},
};

export default configuration;
