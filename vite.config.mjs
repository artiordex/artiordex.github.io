import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => {
  // Github Pages 대응 (artiordex.github.io → repo name이 곧 base URL)
  const isProd = command === "build";
  const base = isProd ? "/artiordex.github.io/" : "/";

  return {
    base,

    root: ".", // 프로젝트 루트
    publicDir: "assets", // 정적 리소스 위치

    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@ts": resolve(__dirname, "src/ts"),
        "@scss": resolve(__dirname, "src/scss"),
        "@sections": resolve(__dirname, "src/sections"),
        "@data": resolve(__dirname, "src/data"),
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
            if (assetInfo.name.endsWith(".css")) return "css/[name][extname]";
            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/scss/abstracts/variables" as *;`
        },
      },
    },
  };
});
