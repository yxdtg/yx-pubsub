import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    typescript(),
    commonjs(),
    terser(),
  ]
};
