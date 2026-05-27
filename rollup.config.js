import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const plugins = [
	alias({
		entries: [
			{ find: "react", replacement: "preact/compat" },
			{
				find: "react-dom/test-utils",
				replacement: "preact/test-utils",
			},
			{ find: "react-dom", replacement: "preact/compat" },
			{
				find: "react/jsx-runtime",
				replacement: "preact/jsx-runtime",
			},
		],
	}),
	replace({
		preventAssignment: true,
		values: {
			"process.env.NODE_ENV": JSON.stringify("production"),
		},
	}),
	nodeResolve({ extensions }),
	commonjs(),
	typescript({
		tsconfig: "./tsconfig.json",
		include: ["src/**/*.ts", "src/**/*.tsx"],
		outDir: "./dist",
		noEmitOnError: false,
	}),
	babel({
		babelHelpers: "bundled",
		extensions,
		include: ["src/**/*"],
		plugins: [
			[
				"@babel/plugin-transform-react-jsx",
				{
					pragma: "h",
					pragmaFrag: "Fragment",
				},
			],
		],
	}),
];

export default [
	{
		input: "src/index.chrome.js",
		output: [
			{
				file: "dist/content.bundle.cjs.js",
				format: "cjs",
				sourcemap: false,
			},
			// {
			// 	file: "dist/content.bundle.esm.js",
			// 	format: "esm",
			// 	sourcemap: true,
			// },
		],
		plugins: plugins,
	},
	{
		input: "src/pages/options/index.jsx",
		output: [
			{
				file: "dist/options.bundle.cjs.js",
				format: "cjs",
				sourcemap: false,
			},
		],
		preserveSymlinks: true,
		plugins: [...plugins],
	},
];
