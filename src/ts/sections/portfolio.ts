// src/ts/sections/portfolio.ts
/**
 * portfolio.ts
 * 포트폴리오 섹션 렌더링 모듈
 */

import portfolioJson from "@data/portfolio.json";
import type { PortfolioData, PortfolioProject } from "@ts/data.types";
import { attachRevealObserver } from "@ts/utils/reveal";

// JSON → 타입 캐스팅
const portfolioData = portfolioJson as PortfolioData;

// 모달 요소들
let modal: HTMLElement | null;
let modalTitleEl: HTMLElement | null;
let modalImageEl: HTMLImageElement | null;
let modalDescEl: HTMLElement | null;
let modalFeaturesEl: HTMLElement | null;
let modalTechEl: HTMLElement | null;
let modalCloseBtn: HTMLElement | null;

/**
 * Portfolio 영역 렌더링
 */
export function renderPortfolio(): void {
  const data = portfolioData;

  // 기본값 설정 (방어코드)
  const intro = data.intro || { title: "", subtitle: "" };
  const filters = data.filters || [];
  const projects = data.projects || [];
  const services = data.services || [];
  const process = data.process || null;

  // Intro 렌더링
  const titleEl = document.getElementById("portfolio-intro-title");
  const subtitleEl = document.getElementById("portfolio-intro-subtitle");

  if (titleEl) titleEl.textContent = intro.title || "";
  if (subtitleEl) subtitleEl.textContent = intro.subtitle || "";

  // Filter 버튼 렌더링
  renderFilterButtons(filters);

  // 초기 프로젝트 렌더링 (전체)
  renderProjects("all", projects);

  // Services 섹션 렌더링
  renderServices(services);

  // Process 섹션 렌더링
  if (process) renderProcess(process);

  // 모달 초기화
  initModal();

  // 애니메이션 Observer 적용
  attachRevealObserver();
}

/**
 * 필터 버튼 렌더링
 */
function renderFilterButtons(filters: any[]): void {
  const filterContainer = document.getElementById("portfolio-filter-buttons");
  if (!filterContainer) return;

  filterContainer.innerHTML = "";

  filters.forEach(filter => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = filter.label;
    btn.dataset.filter = filter.id;
    btn.className = "filter-btn";

    if (filter.id === "all") btn.classList.add("active");

    btn.addEventListener("click", () => {
      document
        .querySelectorAll("#portfolio-filter-buttons .filter-btn")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");
      renderProjects(filter.id, portfolioData.projects || []);
    });

    filterContainer.appendChild(btn);
  });
}

/**
 * 프로젝트 그리드 렌더링
 */
function renderProjects(filterId: string = "all", projects: PortfolioProject[]): void {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  const tagColors = ["primary", "secondary", "purple", "green"];

  grid.innerHTML = "";

  const list = projects.filter(p =>
    filterId === "all" ? true : p.category === filterId
  );

  list.forEach((project: PortfolioProject, index: number) => {
    const card = document.createElement("article");
    card.className = `portfolio-item animate-scale-in animate-delay-${((index % 6) + 1)}`;
    card.dataset.category = project.category;

    card.innerHTML = `
      <div class="portfolio-item__image"
          style="background-image:url('${project.thumbnail}')"></div>

      <div class="portfolio-item__body">
        <h3 class="portfolio-item__title">${project.title}</h3>
        <p class="portfolio-item__desc">${project.summary}</p>

        <div class="portfolio-item__tags">
          ${(project.tags || [])
            .map((tag: string, i: number) =>
              `<span class="portfolio-item__tag portfolio-item__tag--${
                tagColors[i % tagColors.length]
              }">${tag}</span>`
            )
            .join("")}
        </div>

        <button type="button"
                class="portfolio-item__link"
                aria-label="${project.title} 상세 보기">
          자세히 보기 →
        </button>
      </div>
    `;

    const btn = card.querySelector(".portfolio-item__link");
    if (btn) {
      btn.addEventListener("click", () => openModal(project));
    }

    grid.appendChild(card);
  });

  // 애니메이션 재적용
  attachRevealObserver();
}

/**
 * Services 섹션 렌더링
 */
function renderServices(services: any[]): void {
  const servicesEl = document.getElementById("portfolio-services");
  if (!servicesEl || !services || services.length === 0) return;

  servicesEl.innerHTML = services
    .map(
      (service, i) => `
      <div class="service-card service-card--${service.color} animate-scale-in animate-delay-${i + 1}">
        <div class="service-card__icon">
          <i class="${service.icon}"></i>
        </div>
        <h3 class="service-card__title">${service.title}</h3>
        <p class="service-card__desc">${service.description}</p>
        <ul class="service-card__features">
          ${(service.features || [])
            .map((f: string) => `<li><i class="ri-check-line"></i>${f}</li>`)
            .join("")}
        </ul>
      </div>
    `
    )
    .join("");
}

/**
 * Process 섹션 렌더링
 */
function renderProcess(process: any): void {
  const processEl = document.getElementById("portfolio-process");
  if (!processEl || !process) return;

  processEl.innerHTML = `
    <h3 class="process__title">${process.title}</h3>
    <div class="process__steps">
      ${(process.steps || [])
        .map(
          (step: any) => `
          <div class="process-step process-step--${step.color}">
            <div class="process-step__icon">
              <i class="${step.icon}"></i>
            </div>
            <h4 class="process-step__label">${step.label}</h4>
            <p class="process-step__desc">${step.description}</p>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

/**
 * 모달 초기화
 */
function initModal(): void {
  modal = document.getElementById("modal");
  modalTitleEl = document.getElementById("modal-title");
  modalImageEl = document.getElementById("modal-image") as HTMLImageElement;
  modalDescEl = document.getElementById("modal-description");
  modalFeaturesEl = document.getElementById("modal-features");
  modalTechEl = document.getElementById("modal-techstack");
  modalCloseBtn = document.getElementById("modal-close");

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e: Event) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && modal?.classList.contains("active")) {
      closeModal();
    }
  });
}

/**
 * 모달 열기
 */
function openModal(project: PortfolioProject): void {
  if (!project || !modal) return;

  if (modalTitleEl) modalTitleEl.textContent = project.title || "";
  
  if (modalImageEl) {
    modalImageEl.src = project.modalImage || project.thumbnail || "";
    modalImageEl.alt = project.title || "포트폴리오 상세 이미지";
  }

  if (modalDescEl) modalDescEl.textContent = project.description || "";

  if (modalFeaturesEl) {
    modalFeaturesEl.innerHTML = (project.features || [])
      .map((f: string) => `<li>${f}</li>`)
      .join("");
  }

  if (modalTechEl) {
    modalTechEl.innerHTML = (project.techStack || [])
      .map((t: string) => `<span class="modal-tech-tag">${t}</span>`)
      .join("");
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

/**
 * 모달 닫기
 */
function closeModal(): void {
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}