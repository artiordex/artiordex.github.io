/**
 * consulting.ts
 * 컨설팅 섹션 전체 SPA 렌더링
 */

import consultingJson from "@/data/consulting.json";
import type { ConsultingData } from "@/ts/data.types";
import { attachRevealObserver } from "@/ts/utils/reveal";

const consultingData = consultingJson as ConsultingData;

export function renderConsulting(): void {
  const root = document.getElementById("consulting");
  if (!root) return;

  const data = consultingData;

  /* ===============================
   * 1. INTRO SECTION
   * =============================== */
  const introSection = document.createElement("section");
  introSection.className = "section section--white";
  introSection.innerHTML = `
    <div class="section__inner">
      <header class="section__header">
        <h1 class="section__title animate-fade-in animate-delay-1">
          ${data.intro.title}
        </h1>
        <p class="section__subtitle animate-fade-in animate-delay-2">
          ${data.intro.subtitle}
        </p>
      </header>
    </div>
  `;

  /* ===============================
   * 2. SERVICE CATEGORIES
   * =============================== */
  const serviceSection = document.createElement("section");
  serviceSection.className = "section section--gradient";
  serviceSection.innerHTML = `
    <div class="section__inner">
      <header class="section__header">
        <h2 class="section__title animate-fade-in animate-delay-1">
          컨설팅 서비스
        </h2>
      </header>
      <div class="consulting-grid" id="service-grid"></div>
    </div>
  `;

  const serviceGrid = serviceSection.querySelector(
    "#service-grid"
  ) as HTMLElement;

  const iconClassMap: Record<string, string> = {
    primary: "consulting-card__icon consulting-card__icon--primary",
    secondary: "consulting-card__icon consulting-card__icon--secondary",
    purple: "consulting-card__icon consulting-card__icon--purple",
    green: "consulting-card__icon consulting-card__icon--green",
  };

  data.serviceCategories.forEach((cat, index) => {
    const delay = cat.delay || index + 1;

    const card = document.createElement("article");
    card.className = `consulting-card animate-scale-in animate-delay-${delay}`;

    card.innerHTML = `
      <div class="${iconClassMap[cat.color]}">
        <i class="${cat.icon}"></i>
      </div>
      <h3 class="consulting-card__title">${cat.title}</h3>
      <p class="consulting-card__desc">${cat.description}</p>
      <ul class="consulting-card__list">
        ${cat.items
          .map(
            (item) => `<li><i class="ri-check-line"></i>${item}</li>`
          )
          .join("")}
      </ul>
    `;

    serviceGrid.appendChild(card);
  });

  /* ===============================
   * 3. PROCESS SECTION
   * =============================== */
  const processSection = document.createElement("section");
  processSection.className = "section section--white";
  processSection.innerHTML = `
    <div class="section__inner">
      <div class="process-card animate-fade-in animate-delay-1">
        <h2 class="process-card__title">
          ${data.process.title}
        </h2>
        <div class="process-grid" id="process-steps"></div>
      </div>
    </div>
  `;

  const processGrid = processSection.querySelector(
    "#process-steps"
  ) as HTMLElement;

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

  /* ===============================
   * DOM MOUNT
   * =============================== */
  root.innerHTML = "";
  root.appendChild(introSection);
  root.appendChild(serviceSection);
  root.appendChild(processSection);

  /* ===============================
   * Reveal Animation
   * =============================== */
  attachRevealObserver();
}
