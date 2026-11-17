import { basename } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
      cssFileName: "styles",
    },
    rolldownOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
    minify: false,
    sourcemap: false,
  },
  css: {
    modules: {
      generateScopedName: (name, filename) =>
        `lv-${basename(filename).replace(/\.module\.css(\?.*)?$/, "")}-${name}`,
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["src/test-setup.ts"],
    css: { include: /.+/ },
  },
});
