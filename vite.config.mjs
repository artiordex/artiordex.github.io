import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => {
  const isProd = command === "build";
  return {
    base: "/",
    root: ".",
    publicDir: "assets",

    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@ts": resolve(__dirname, "src/ts"),
        "@scss": resolve(__dirname, "src/scss"),
        "@sections": resolve(__dirname, "src/sections"),
        "@data": resolve(__dirname, "src/data"),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/scss/abstracts/variables" as *;`
        },
      },
    },

    build: {
      outDir: "dist",
      emptyOutDir: true,

      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
        output: {
          entryFileNames: "js/[name].js",
          chunkFileNames: "js/[name].js",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith(".css")) {
              return "css/[name][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },
  };
});
