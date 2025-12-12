/**
 * loadApp.ts
 * Header, Nav, Footer, Modal 같은 공통 레이아웃 +
 * Sections(about, portfolio...)까지 모두 동적 로딩하는 통합 로더
 */

document.addEventListener("DOMContentLoaded", () => {
  /** 레이아웃 파일 매핑 */
  const layouts: Record<string, string> = {
    "layout-header": "header",
    "layout-nav": "nav",
    "layout-footer": "footer",
    "modal-area": "modal"
  };

  /** 섹션 파일 매핑 */
  const sections: Record<string, string> = {
    "about": "about",
    "portfolio": "portfolio",
    "consulting": "consulting",
    "company": "company",
    "links": "links",
    "contact": "contact"
  };

  /** 레이아웃 + 섹션 통합 로딩 */
  loadHTMLBlocks("/layouts", layouts);
  loadHTMLBlocks("/sections", sections);
});

/**
 * 공통 HTML 블록 로딩 함수
 * @param basePath  - "/layouts" 또는 "/sections"
 * @param blocks    - { containerId: fileName }
 */
function loadHTMLBlocks(basePath: string, blocks: Record<string, string>) {
  Object.entries(blocks).forEach(async ([containerId, fileName]) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
      const res = await fetch(`${basePath}/${fileName}.html`);

      if (!res.ok) {
        console.error(`[ERROR] Failed to fetch: ${fileName}`, res.status);
        return;
      }

      const html = await res.text();
      container.innerHTML = html;

      // 내부 script 태그 실행
      executeInlineScripts(container);
    } catch (e) {
      console.error(`[ERROR] Failed to load: ${fileName}`, e);
    }
  });
}

/**
 * 동적 로딩된 HTML 내부의 <script> 실행
 */
function executeInlineScripts(element: HTMLElement): void {
  const scripts = element.querySelectorAll<HTMLScriptElement>("script");

  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");

    if (oldScript.src) {
      newScript.src = oldScript.src;
    } else if (oldScript.textContent) {
      newScript.textContent = oldScript.textContent;
    }

    oldScript.replaceWith(newScript);
  });
}
