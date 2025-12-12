import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    // GitHub Pages: https://username.github.io/artiordex/
    // base: isProd ? "/artiordex/" : "/",
    base : "/",

    root: ".",
    publicDir: "assets",

    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@scripts": resolve(__dirname, "src/scripts"),
        "@data": resolve(__dirname, "src/data"),
        "@components": resolve(__dirname, "src/scripts/components"),
        "@sections": resolve(__dirname, "src/scripts/sections"),
        "@utils": resolve(__dirname, "src/scripts/utils"),
        "@animations": resolve(__dirname, "src/scripts/animations"),
        "@scss": resolve(__dirname, "src/scss"),
      },
      extensions: [".mjs", ".js", ".ts", ".json", ".jsx"],
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/scss/abstracts/variables" as *;`,
        },
      },
    },

    json: {
      stringify: false,
    },

    build: {
      outDir: "dist",
      emptyOutDir: true,

      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
        output: {
          // 캐시 & GitHub Pages 안정성 확보
          entryFileNames: "scripts/[name].[hash].js",
          chunkFileNames: "scripts/[name].[hash].js",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) {
              return "css/[name].[hash][extname]";
            }
            return "assets/[name].[hash][extname]";
          },
        },
      },
    },
  };
});
