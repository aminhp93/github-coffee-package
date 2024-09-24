import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import typescriptEngine from "typescript";
import json from "@rollup/plugin-json";

export default defineConfig(
  {
    input: {
      index: "src/index.ts",
      // components
      "components/button": "src/components/button/index.ts",
      "components/color-picker": "src/components/color-picker/index.ts",
      "components/context-menu": "src/components/context-menu/index.ts",
      "components/copy-button": "src/components/copy-button/index.ts",
      "components/date-time-picker": "src/components/date-time-picker/index.ts",
      "components/dialog": "src/components/dialog/index.ts",
      "components/dialog-container": "src/components/dialog-container/index.ts",
      "components/header-layout": "src/components/header-layout/index.ts",
      "components/item-text-container":
        "src/components/item-text-container/index.ts",
      "components/loading": "src/components/loading/index.ts",
      "components/notification": "src/components/notification/index.tsx",
      "components/plot": "src/components/plot/index.ts",
      "components/resizable-panels": "src/components/resizable-panels/index.ts",
      "components/rnd-dialog": "src/components/rnd-dialog/index.ts",
      "components/search": "src/components/search/index.ts",
      "components/stacked-group": "src/components/stacked-group/index.ts",
      "components/system-tree": "src/components/system-tree/index.ts",
      "components/table": "src/components/table/index.ts",
      "components/tooltip": "src/components/tooltip/index.ts",
      "components/tree": "src/components/tree/index.ts",
      // configs
      configs: "src/configs/index.ts",
      // events
      events: "src/events/index.ts",
      // hooks
      hooks: "src/hooks/index.ts",
      // services
      "services/http": "src/services/http/index.ts",
      "services/message": "src/services/message/index.ts",
      // stores
      stores: "src/stores/index.ts",
      // theme
      theme: "src/theme/index.ts",
      // types
      types: "src/types/index.ts",
      // utils
      utils: "src/utils/index.ts",
    },
    output: {
      dir: "dist",
      format: "esm",
      exports: "named",
      sourcemap: false,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: [
      json(),
      postcss({
        plugins: [],
        minimize: true,
      }),
      external({ includeDependencies: true }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        typescript: typescriptEngine,
        declaration: true,
        declarationDir: "dist",
        sourceMap: false,
        exclude: [
          "coverage",
          ".storybook",
          "storybook-static",
          "config",
          "dist",
          "node_modules/**",
          "*.cjs",
          "*.mjs",
          "**/__snapshots__/*",
          "**/__tests__",
          "**/*.test.js+(|x)",
          "**/*.test.ts+(|x)",
          "**/*.mdx",
          "**/*.story.ts+(|x)",
          "**/*.story.js+(|x)",
          "**/*.stories.ts+(|x)",
          "**/*.stories.js+(|x)",
          "setupTests.ts",
          "vitest.config.ts",
        ],
      }),
    ],
  },
  {
    input: "dist/esm/types/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.(sc|sa|c)ss$/],
    plugins: [dts()],
  }
);
