"use strict";
/**
 * loadSections.ts
 * HTML 섹션 파일(.html)을 동적으로 로드하고
 * 내부 script 태그를 실행하도록 복원하는 모듈
 */
document.addEventListener("DOMContentLoaded", () => {
    const sections = [
        "about",
        "portfolio",
        "consulting",
        "company",
        "links",
        "contact"
    ];
    sections.forEach(async (id) => {
        const container = document.getElementById(id);
        if (!container)
            return;
        try {
            const res = await fetch(`/src/sections/${id}.html`);
            const html = await res.text();
            container.innerHTML = html;
            // 섹션 내부 script 실행
            executeInlineScripts(container);
        }
        catch (e) {
            console.error(`[ERROR] Failed to load section: ${id}`, e);
        }
    });
});
/**
 * HTML 조각 내부 <script> 태그를 실제 실행되도록 재삽입하는 함수
 */
function executeInlineScripts(element) {
    const scripts = element.querySelectorAll("script");
    scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        // src가 있는 경우 외부 스크립트 로드
        if (oldScript.src) {
            newScript.src = oldScript.src;
        }
        // inline script 내용 복사
        else if (oldScript.textContent) {
            newScript.textContent = oldScript.textContent;
        }
        oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
}
