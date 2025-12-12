import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => {
  const isProd = command === "build";
  return {
    base: isProd ? "/artiordex.github.io/" : "/",
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
      extensions: ['.mjs', '.js', '.ts', '.json', '.jsx']
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/scss/abstracts/variables" as *;`
        },
      },
    },

    json: {
      stringify: false
    },

    build: {
      outDir: "dist",
      emptyOutDir: true,

      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
        output: {
          // scripts 
          entryFileNames: "scripts/[name].js", 
          chunkFileNames: "scripts/[name].js", 
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) {
              return "css/[name][extname]";
            }
            // JS 모듈도 scripts 폴더로
            if (assetInfo.name?.endsWith(".js")) {
              return "scripts/[name][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },
  };
});