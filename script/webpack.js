import { resolve } from "path";

export default {
	mode: "production",
	entry: "./src/main.js",
	output: {
		filename: "bundle.js",
		path: resolve("./public/"),
	},
};
