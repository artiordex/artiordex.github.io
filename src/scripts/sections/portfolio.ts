/**
 * portfolio.ts
 * 포트폴리오 섹션 전체 SPA 렌더링 (히어로 + 필터 + 그리드 + 모달 + CTA)
 */

import portfolioJson from "@/data/portfolio.json";
import type { PortfolioData, PortfolioProject, PortfolioBadge } from "@/scripts/data.types";
import { attachRevealObserver } from "@/scripts/utils/reveal";

const portfolioData = portfolioJson as PortfolioData;

/* 모달 참조 */
let modal: HTMLElement | null = null;
let modalTitleEl: HTMLElement | null = null;
let modalImageEl: HTMLImageElement | null = null;
let modalDescEl: HTMLElement | null = null;
let modalFeaturesEl: HTMLElement | null = null;
let modalTechEl: HTMLElement | null = null;
let modalCloseBtn: HTMLElement | null = null;

/* 배지 색상 매핑 */
const badgeColorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  yellow: "bg-yellow-100 text-yellow-700",
  purple: "bg-purple-100 text-purple-700",
  pink: "bg-pink-100 text-pink-700",
  orange: "bg-orange-100 text-orange-700"
};

export function renderPortfolio(): void {
  const root = document.getElementById("portfolio");
  if (!root) return;

  const { hero, filters = [], projects = [], cta } = portfolioData;

  root.innerHTML = `
    <!-- Hero Section -->
    ${renderHeroSection(hero)}

    <!-- Portfolio Grid Section -->
    <div class="section section--white">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">프로젝트</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">
            다양한 산업 분야에서 수행한 프로젝트들을 통해 우리의 역량을 확인해보세요
          </p>
        </header>

        <div id="portfolio-filter-buttons" class="filter-buttons animate-fade-in animate-delay-2"></div>
        <div id="portfolio-grid"></div>
      </div>
    </div>

    <!-- CTA Section -->
    ${cta ? renderCTASection(cta) : ""}

    <!-- Modal -->
    ${renderModalTemplate()}
  `;

  renderFilterButtons(filters, projects);
  renderProjects("all", projects);
  initModal();
  attachRevealObserver();
}

/* HERO SECTION */
function renderHeroSection(hero: PortfolioData["hero"]): string {
  if (!hero) return "";
  
  return `
    <div class="portfolio-hero">
      <div class="portfolio-hero__content">
        ${hero.icon ? `<div class="portfolio-hero__icon animate-fade-in"><i class="${hero.icon}"></i></div>` : ""}
        <h1 class="portfolio-hero__title animate-fade-in">${hero.title}</h1>
        <p class="portfolio-hero__subtitle animate-fade-in animate-delay-1">${hero.subtitle}</p>
        <button class="portfolio-hero__btn animate-fade-in animate-delay-2" 
                onclick="document.getElementById('portfolio-grid').scrollIntoView({ behavior: 'smooth' })">
          프로젝트 둘러보기
        </button>
      </div>
    </div>
  `;
}

/* CTA SECTION */
function renderCTASection(cta: PortfolioData["cta"]): string {
  if (!cta) return "";
  
  return `
    <div class="portfolio-cta">
      <div class="portfolio-cta__inner">
        <h2 class="portfolio-cta__title animate-fade-in">${cta.title}</h2>
        <p class="portfolio-cta__subtitle animate-fade-in animate-delay-1">${cta.subtitle}</p>
        <div class="portfolio-cta__buttons animate-fade-in animate-delay-2">
          <a href="${cta.primaryButton.link}" class="portfolio-cta__btn portfolio-cta__btn--primary">
            ${cta.primaryButton.label}
          </a>
          <a href="${cta.secondaryButton.link}" class="portfolio-cta__btn portfolio-cta__btn--secondary">
            ${cta.secondaryButton.label}
          </a>
        </div>
      </div>
    </div>
  `;
}

/* FILTER BUTTONS */
function renderFilterButtons(filters: { id: string; label: string }[], projects: PortfolioProject[]): void {
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
      container.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(filter.id, projects);
    });

    container.appendChild(btn);
  });
}

/* PROJECT GRID */
function renderProjects(filterId: string, projects: PortfolioProject[]): void {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  const tagColors = ["primary", "secondary", "purple", "green"];
  grid.innerHTML = "";

  const filtered = filterId === "all" 
    ? projects 
    : projects.filter((p) => p.category === filterId);

  filtered.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = `portfolio-item animate-scale-in animate-delay-${(index % 6) + 1}`;

    card.innerHTML = `
      <div class="portfolio-item__image" style="background-image:url('${project.thumbnail}')"></div>

      <div class="portfolio-item__body">
        <div class="portfolio-item__header">
          <span class="portfolio-item__category">${getCategoryLabel(filterId, project.category)}</span>
          ${project.icon ? `<i class="${project.icon} portfolio-item__icon"></i>` : ""}
        </div>

        <h3 class="portfolio-item__title">${project.title}</h3>
        <p class="portfolio-item__desc">${project.summary}</p>

        <div class="portfolio-item__tags">
          ${(project.tags || [])
            .map((tag, i) => `<span class="portfolio-item__tag portfolio-item__tag--${tagColors[i % tagColors.length]}">${tag}</span>`)
            .join("")}
        </div>

        ${project.badges ? renderBadges(project.badges) : ""}

        <button type="button" class="portfolio-item__link">
          자세히 보기 →
        </button>
      </div>
    `;

    card.querySelector(".portfolio-item__link")?.addEventListener("click", () => openModal(project));
    grid.appendChild(card);
  });

  attachRevealObserver();
}

/* 배지 렌더링 */
function renderBadges(badges: PortfolioBadge[]): string {
  return `
    <div class="portfolio-item__badges">
      ${badges.map((badge) => `
        <span class="portfolio-item__badge ${badgeColorMap[badge.color] || "bg-gray-100 text-gray-700"}">
          ${badge.label}
        </span>
      `).join("")}
    </div>
  `;
}

/* 카테고리 라벨 가져오기 */
function getCategoryLabel(filterId: string, category: string): string {
  const labels: Record<string, string> = {
    web: "웹 개발",
    mobile: "모바일 앱",
    ai: "AI/ML",
    iot: "IoT",
    fintech: "핀테크"
  };
  return labels[category] || category;
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
          <button id="modal-close" class="modal-close" type="button" aria-label="닫기">
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
    if (e.key === "Escape" && modal?.classList.contains("active")) closeModal();
  });
}

function openModal(project: PortfolioProject): void {
  if (!modal) return;

  modalTitleEl!.textContent = project.title;
  modalImageEl!.src = project.modalImage || project.thumbnail;
  modalImageEl!.alt = project.title;
  modalDescEl!.textContent = project.description || "";

  modalFeaturesEl!.innerHTML = (project.features || [])
    .map((f) => `<li><i class="ri-check-line"></i> ${f}</li>`)
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