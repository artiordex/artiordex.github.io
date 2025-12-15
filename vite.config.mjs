/**
 * vite.config.ts - Vite 설정 파일
 */

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => {
  // 빌드 모드 여부 (개발 / 프로덕션 구분)
  const isProd = command === "build";

  return {
    // 기본 경로 (루트 배포 기준)
    base: "/",

    // 프로젝트 루트
    root: ".",

    // 정적 파일 디렉토리
    publicDir: "assets",

    resolve: {
      // 경로 별칭 설정
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
      // import 시 확장자 생략 허용
      extensions: [".mjs", ".js", ".ts", ".json", ".jsx"],
    },

    css: {
      preprocessorOptions: {
        scss: {
          // 모든 SCSS 파일에 변수 자동 주입
          additionalData: `@use "@/scss/abstracts/variables" as *;`,
        },
      },
    },

    // JSON import 시 그대로 사용
    json: {
      stringify: false,
    },

    build: {
      // 빌드 결과물 디렉토리
      outDir: "dist",

      // 빌드 전 dist 초기화
      emptyOutDir: true,

      rollupOptions: {
        // 엔트리 HTML
        input: {
          main: resolve(__dirname, "index.html"),
        },
        output: {
          // JS 파일 해시 적용 (캐시 방지)
          entryFileNames: "scripts/[name].[hash].js",
          chunkFileNames: "scripts/[name].[hash].js",

          // CSS / 기타 자산 분리 출력
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
