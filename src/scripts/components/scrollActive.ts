/**
 * scrollActive.ts
 * 스크롤 위치에 따라 현재 활성화된 navigation 링크를 표시하는 유틸
 */

export function updateActiveNav(): void {
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  let current = "";

  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();

    // 화면 중앙 근처가 섹션 범위 안에 있다면 활성화
    if (rect.top <= 150 && rect.bottom >= 150) {
      current = sec.id;
    }
  });

  document
    .querySelectorAll<HTMLElement>(".side-nav-link, .mobile-nav-link, .header-link")
    .forEach((link) => {
      const target = link.dataset.target || link.dataset.section;
      link.classList.toggle("active", target === current);
    });
}

/**
 * 스크롤 감지 자동 활성화
 * - main.ts에서 자동 적용됨
 */
export function initScrollActive(): void {
  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav);
}

// 자동 초기화 (optional)
document.addEventListener("DOMContentLoaded", initScrollActive);
