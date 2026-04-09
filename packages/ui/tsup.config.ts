import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: {
    "index.web": "src/index.web.tsx",
    "index.native": "src/index.native.tsx",
  },
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ["cjs", "esm"],
  external: ["react", "@repo/api", "@repo/store", "react-native", "react-native-safe-area-context"],
  dts: false,
  // Splitting allows web and native to be built separately
  splitting: false,
  ...options,
}));
