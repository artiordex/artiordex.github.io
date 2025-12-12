/**
 * consulting.ts
 * 컨설팅 섹션 렌더링
 */

import consultingJson from "@/data/consulting.json";
import type { ConsultingData } from "@/scripts/data.types";
import { attachRevealObserver } from "@/scripts/utils/reveal";

const consultingData = consultingJson as ConsultingData;

/**
 * 컨설팅 섹션 렌더링
 */
export function renderConsulting(): void {
  const data = consultingData;

  /* INTRO */
  const introTitle = document.getElementById("consulting-intro-title");
  const introSubtitle = document.getElementById("consulting-intro-subtitle");
  if (introTitle) introTitle.textContent = data.intro?.title || "";
  if (introSubtitle) introSubtitle.textContent = data.intro?.subtitle || "";

  /* SERVICE CATEGORIES (기존 HTML 카드) */
  const serviceGrid = document.getElementById("service-grid");
  if (serviceGrid && Array.isArray(data.serviceCategories)) {
    serviceGrid.innerHTML = "";
    data.serviceCategories.forEach((cat, index) => {
      const iconClassMap = {
        primary: "consulting-card__icon consulting-card__icon--primary",
        secondary: "consulting-card__icon consulting-card__icon--secondary",
        purple: "consulting-card__icon consulting-card__icon--purple",
        green: "consulting-card__icon consulting-card__icon--green",
      };
      const iconClass = iconClassMap[cat.color] || iconClassMap.primary;
      const delay = cat.delay || index + 1;
      const card = document.createElement("article");
      card.className = `consulting-card animate-scale-in animate-delay-${delay}`;
      card.innerHTML = `
        <div class="${iconClass}">
          <i class="${cat.icon}"></i>
        </div>
        <h3 class="consulting-card__title">${cat.title}</h3>
        <p class="consulting-card__desc">${cat.description}</p>
        <ul class="consulting-card__list">
          ${(cat.items || [])
            .map((item) => `<li><i class="ri-check-line"></i>${item}</li>`)
            .join("")}
        </ul>
      `;
      serviceGrid.appendChild(card);
    });
  }

  /* PROCESS STEPS */
  const processTitle = document.getElementById("process-title");
  const processGrid = document.getElementById("process-steps");
  if (processTitle) {
    processTitle.textContent = data.process?.title || "";
  }
  if (processGrid && Array.isArray(data.process?.steps)) {
    processGrid.innerHTML = "";
    data.process.steps.forEach((step, index) => {
      const delay = step.delay || index + 1;
      const iconVariant = (index % 5) + 1;
      const stepEl = document.createElement("div");
      stepEl.className = `process-step animate-scale-in animate-delay-${delay}`;
      stepEl.innerHTML = `
        <div class="process-step__icon process-step__icon--${iconVariant}">
          <i class="${step.icon}"></i>
        </div>
        <h4 class="process-step__title">${step.title}</h4>
        <p class="process-step__desc">${step.description}</p>
      `;
      processGrid.appendChild(stepEl);
    });
  }

  /* VISION CARDS (새 UI) */
  const visionEl = document.getElementById("consulting-vision-cards");
  if (visionEl && data.visionCards) {
    visionEl.innerHTML = data.visionCards
      .map(
        (card) => `
      <div class="vision-card vision-card--${card.color} animate-fade-in animate-delay-${card.delay || 1}">
        <div class="vision-card__icon">
          <i class="${card.icon}"></i>
        </div>
        <h3 class="vision-card__title">${card.title}</h3>
        <p class="vision-card__desc">${card.description}</p>
      </div>`
      )
      .join("");
  }

  /* PRINCIPLES (운영 원칙) */
  const principlesEl = document.getElementById("consulting-principles");
  if (principlesEl && data.principles) {
    principlesEl.innerHTML = `
      <h3 class="principles__title">${data.principles.title}</h3>
      <div class="principles__grid">
        ${data.principles.items
          .map(
            (item) => `
          <div class="principle-card principle-card--${item.color}">
            <div class="principle-card__icon">
              <i class="${item.icon}"></i>
            </div>
            <h4 class="principle-card__title">${item.title}</h4>
            <p class="principle-card__desc">${item.description}</p>
          </div>`
          )
          .join("")}
      </div>
    `;
  }

  /* Reveal Animation */
  attachRevealObserver();
}