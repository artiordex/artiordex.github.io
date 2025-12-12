/**
 * links.ts
 * Links Hub 섹션 렌더링 + 애니메이션 통합 모듈
 */

import linksJson from "@/data/links.json";
import type { LinksData, LinksCategory, LinkItem } from "@/ts/data.types";
import { attachRevealObserver } from "@/ts/utils/reveal";

/* JSON 타입 변환 */
const linksData = linksJson as LinksData;

/**
 * Links 섹션 렌더링 함수
 */
export function renderLinks(): void {
  const container = document.getElementById("links-container");
  if (!container) return;

  container.innerHTML = ""; // 초기화

  linksData.categories.forEach((category: LinksCategory, catIndex: number) => {
    const section = document.createElement("section");
    section.className = `links-section animate-fade-in animate-delay-${catIndex + 1}`;

    section.innerHTML = `
      <h2 class="links-section__title">${category.title}</h2>
      <div class="links-grid links-grid--triple" id="links-cat-${category.id}"></div>
    `;

    container.appendChild(section);

    const grid = section.querySelector(`#links-cat-${category.id}`);
    if (!grid) return;

    category.links.forEach((item: LinkItem, idx: number) => {
      const card = document.createElement("a");
      card.href = item.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.className = `link-card link-card--large animate-scale-in animate-delay-${(idx % 6) + 1}`;

      const bg = item.color || "#4B5563";

      card.innerHTML = `
        <div class="link-card__icon" style="background:${bg}">
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

  // Scroll reveal + fade animations
  attachRevealObserver();
}
