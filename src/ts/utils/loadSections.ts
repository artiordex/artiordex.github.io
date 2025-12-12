/**
 * loadSections.ts
 * HTML 섹션 파일(.html)을 동적으로 로드하고
 * 내부 script 태그를 실행하도록 복원하는 모듈
 */

document.addEventListener("DOMContentLoaded", () => {
  const sections: string[] = [
    "about",
    "portfolio",
    "consulting",
    "company",
    "links",
    "contact"
  ];

  sections.forEach(async (id) => {
    const container = document.getElementById(id);
    if (!container) return;

    try {
      // Vite dev + build 모두에서 정상 작동하는 경로
      const res = await fetch(`/sections/${id}.html`);

      if (!res.ok) {
        console.error(`[ERROR] Failed to fetch section: ${id}`, res.status);
        return;
      }

      const html = await res.text();
      container.innerHTML = html;

      // 섹션 내부 script 실행
      executeInlineScripts(container);
    } catch (e) {
      console.error(`[ERROR] Failed to load section: ${id}`, e);
    }
  });
});

/**
 * HTML 조각 내부 <script> 태그를 실제 실행되도록 재삽입하는 함수
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

    oldScript.parentNode?.replaceChild(newScript, oldScript);
  });
}
