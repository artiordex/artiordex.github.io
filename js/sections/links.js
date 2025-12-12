/**
 * links.ts
 * 링크 모음(Links) 섹션 렌더링 모듈
 */
import linksJson from "@/data/links.json";
import { attachRevealObserver } from "@/ts/utils/reveal";
/* JSON → 타입 캐스팅 */
const linksData = linksJson;
/**
 * 링크 섹션 렌더링
 */
export function renderLinks() {
    const data = linksData;
    const container = document.getElementById("links-container");
    if (!container)
        return;
    container.innerHTML = ""; // 초기화
    data.categories.forEach((category, catIndex) => {
        const section = document.createElement("section");
        section.className = `links-section animate-fade-in animate-delay-${catIndex + 1}`;
        // 카테고리 템플릿
        section.innerHTML = `
      <h2 class="links-section__title">${category.title}</h2>
      <div class="links-grid links-grid--triple" id="links-cat-${category.id}"></div>
    `;
        container.appendChild(section);
        const grid = document.getElementById(`links-cat-${category.id}`);
        if (!grid)
            return;
        // 링크 카드 생성
        category.links.forEach((item, idx) => {
            const card = document.createElement("a");
            card.href = item.url;
            card.target = "_blank";
            card.rel = "noopener noreferrer";
            card.className = `link-card link-card--large animate-scale-in animate-delay-${(idx % 6) + 1}`;
            card.innerHTML = `
        <div class="link-card__icon" style="background:${item.color}">
          <i class="${item.icon}"></i>
        </div>
        <div>
          <div class="link-card__title">${item.label}</div>
          ${item.description ? `<div class="link-card__desc">${item.description}</div>` : ""}
        </div>
      `;
            grid.appendChild(card);
        });
    });
    attachRevealObserver();
}
