import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
  namedExports: {},
};

export const getConfig = ({
  tsconfig = './tsconfig.json',
  output = [
    {
      file: "dist/umd/mei-ui.development.js",
      format: 'umd',
      name: 'MeiUI',
      globals,
    },
    {
      file: "dist/esm/mei-ui.esm.js",
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins = [
    typescript({
      typescript: require("typescript"),
      useTsconfigDeclarationDir: true
    }),
    commonjs(commonjsOptions),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    terser()
  ],
} = {}) => ({
  input: 'src/index.ts',
  plugins: [
    typescript({
      tsconfig,
      clean: true,
    }),
    ...plugins,
  ],
  external: Object.keys(globals),
  output,
});

export default getConfig();
