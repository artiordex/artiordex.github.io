/**
 * portfolio.ts
 * 포트폴리오 섹션 전체 SPA 렌더링 (섹션 + 필터 + 그리드 + 모달)
 */

import portfolioJson from "@data/portfolio.json";
import type { PortfolioData, PortfolioProject } from "@ts/data.types";
import { attachRevealObserver } from "@ts/utils/reveal";

const portfolioData = portfolioJson as PortfolioData;

/* 모달 참조 */
let modal: HTMLElement | null = null;
let modalTitleEl: HTMLElement | null = null;
let modalImageEl: HTMLImageElement | null = null;
let modalDescEl: HTMLElement | null = null;
let modalFeaturesEl: HTMLElement | null = null;
let modalTechEl: HTMLElement | null = null;
let modalCloseBtn: HTMLElement | null = null;

export function renderPortfolio(): void {
  const root = document.getElementById("portfolio");
  if (!root) return;

  const { intro, filters = [], projects = [] } = portfolioData;

  /* ===============================
   * 1. SECTION LAYOUT
   * =============================== */
  root.innerHTML = `
    <section class="section section--light">
      <div class="section__inner">

        <header class="section__header">
          <h1 class="section__title animate-fade-in animate-delay-1">
            ${intro?.title || ""}
          </h1>
          <p class="section__subtitle animate-fade-in animate-delay-2">
            ${intro?.subtitle || ""}
          </p>
        </header>

        <div id="portfolio-filter-buttons"
             class="filter-buttons animate-fade-in animate-delay-3"></div>

        <div id="portfolio-grid"></div>

      </div>
    </section>

    ${renderModalTemplate()}
  `;

  renderFilterButtons(filters, projects);
  renderProjects("all", projects);
  initModal();
  attachRevealObserver();
}

/* ===============================
 * FILTER BUTTONS
 * =============================== */
function renderFilterButtons(filters: any[], projects: PortfolioProject[]): void {
  const container = document.getElementById("portfolio-filter-buttons");
  if (!container) return;

  container.innerHTML = "";

  filters.forEach((filter) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-btn";
    btn.textContent = filter.label;
    btn.dataset.filter = filter.id;

    if (filter.id === "all") btn.classList.add("active");

    btn.addEventListener("click", () => {
      container
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
      renderProjects(filter.id, projects);
    });

    container.appendChild(btn);
  });
}

/* ===============================
 * PROJECT GRID
 * =============================== */
function renderProjects(
  filterId: string,
  projects: PortfolioProject[]
): void {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  const tagColors = ["primary", "secondary", "purple", "green"];
  grid.innerHTML = "";

  const filtered =
    filterId === "all"
      ? projects
      : projects.filter((p) => p.category === filterId);

  filtered.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = `portfolio-item animate-scale-in animate-delay-${(index % 6) + 1}`;

    card.innerHTML = `
      <div class="portfolio-item__image"
           style="background-image:url('${project.thumbnail}')"></div>

      <div class="portfolio-item__body">
        <h3 class="portfolio-item__title">${project.title}</h3>
        <p class="portfolio-item__desc">${project.summary}</p>

        <div class="portfolio-item__tags">
          ${(project.tags || [])
            .map(
              (tag, i) =>
                `<span class="portfolio-item__tag portfolio-item__tag--${tagColors[i % tagColors.length]}">${tag}</span>`
            )
            .join("")}
        </div>

        <button type="button" class="portfolio-item__link">
          자세히 보기 →
        </button>
      </div>
    `;

    card
      .querySelector(".portfolio-item__link")
      ?.addEventListener("click", () => openModal(project));

    grid.appendChild(card);
  });

  attachRevealObserver();
}

/* ===============================
 * MODAL TEMPLATE
 * =============================== */
function renderModalTemplate(): string {
  return `
    <div id="modal" class="modal" aria-hidden="true">
      <div class="modal-content" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h2 id="modal-title" class="modal-title"></h2>
          <button id="modal-close"
                  class="modal-close"
                  type="button"
                  aria-label="포트폴리오 상세 닫기">
            <i class="ri-close-line"></i>
          </button>
        </div>

        <div class="modal-body">
          <img id="modal-image" class="modal-image" alt="">
          <p id="modal-description" class="modal-description"></p>

          <h3 class="modal-section-title">주요 기능</h3>
          <ul id="modal-features" class="modal-features"></ul>

          <h3 class="modal-section-title">기술 스택</h3>
          <div id="modal-techstack" class="modal-techstack"></div>
        </div>
      </div>
    </div>
  `;
}

/* ===============================
 * MODAL LOGIC
 * =============================== */
function initModal(): void {
  modal = document.getElementById("modal");
  modalTitleEl = document.getElementById("modal-title");
  modalImageEl = document.getElementById("modal-image") as HTMLImageElement;
  modalDescEl = document.getElementById("modal-description");
  modalFeaturesEl = document.getElementById("modal-features");
  modalTechEl = document.getElementById("modal-techstack");
  modalCloseBtn = document.getElementById("modal-close");

  modalCloseBtn?.addEventListener("click", closeModal);

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("active")) {
      closeModal();
    }
  });
}

function openModal(project: PortfolioProject): void {
  if (!modal) return;

  modalTitleEl!.textContent = project.title;
  modalImageEl!.src = project.modalImage || project.thumbnail;
  modalDescEl!.textContent = project.description || "";

  modalFeaturesEl!.innerHTML = (project.features || [])
    .map((f) => `<li>${f}</li>`)
    .join("");

  modalTechEl!.innerHTML = (project.techStack || [])
    .map((t) => `<span class="modal-tech-tag">${t}</span>`)
    .join("");

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(): void {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
