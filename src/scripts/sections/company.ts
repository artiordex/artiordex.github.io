/**
 * company.ts
 * 회사 프로젝트 섹션 렌더링 (전체 HTML 동적 생성)
 */

import companyJson from "@/data/company.json";
import type { CompanyData, CompanyProject } from "@scripts/data.types";
import { attachRevealObserver } from "@scripts/utils/reveal";

// JSON → 타입 적용
const companyData = companyJson as CompanyData;

// 모달 요소들
let modal: HTMLElement | null;
let modalTitleEl: HTMLElement | null;
let modalImageEl: HTMLImageElement | null;
let modalDescEl: HTMLElement | null;
let modalFeaturesEl: HTMLElement | null;
let modalTechEl: HTMLElement | null;
let modalCloseBtn: HTMLElement | null;

/**
 * 회사 프로젝트 렌더링
 */
export function renderCompany(): void {
  const root = document.getElementById("company");
  if (!root) return;

  const data = companyData;
  const intro = data.intro || {};
  const filters = data.filters || [];
  const projects = data.projects || [];

  // 전체 HTML 구조 생성
  root.innerHTML = `
    <div class="section__inner">
      <!-- Header Section -->
      <header class="section__header">
        <div class="animate-fade-in animate-delay-1">
          <h1 id="intro-title" class="section__title">${intro.title || ""}</h1>
          <p id="intro-subtitle" class="section__subtitle">${intro.subtitle || ""}</p>
        </div>
      </header>

      <!-- Filter Buttons -->
      <div class="filter-buttons animate-fade-in animate-delay-2" id="filter-buttons"></div>

      <!-- Portfolio Grid -->
      <div id="portfolio-grid"></div>
    </div>

    <!-- Modal -->
    <div id="modal" class="modal" aria-hidden="true">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="modal-title" class="modal-title">프로젝트 상세</h2>
          <button
            id="modal-close"
            class="modal-close"
            type="button"
            aria-label="프로젝트 상세 닫기"
          >
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

  // 필터 버튼 렌더링
  renderFilterButtons(filters);

  // 프로젝트 렌더링
  renderProjects(projects);

  // 필터 이벤트 초기화
  initializeFilters();

  // 모달 초기화
  initModal();

  // Intersection Observer 적용
  attachRevealObserver();
}

/**
 * 필터 버튼 렌더링
 */
function renderFilterButtons(filters: any[]): void {
  const filterContainer = document.getElementById("filter-buttons");
  if (!filterContainer) return;

  filterContainer.innerHTML = "";
  
  filters.forEach(filter => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = filter.label;
    btn.dataset.filter = filter.id;
    btn.className = "filter-btn";

    if (filter.id === "all") btn.classList.add("active");

    filterContainer.appendChild(btn);
  });
}

/**
 * 프로젝트 카드 렌더링
 */
function renderProjects(projects: CompanyProject[]): void {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  const tagColors = ["primary", "secondary", "purple", "green"];
  
  grid.innerHTML = "";

  projects.forEach((project: CompanyProject, index: number) => {
    const card = document.createElement("div");
    card.className = `portfolio-item animate-scale-in animate-delay-${((index % 6) + 1)}`;
    card.dataset.category = project.category;

    card.innerHTML = `
      <div class="portfolio-item__image"
          style="background-image: url('${project.thumbnail}')"></div>
      <div class="portfolio-item__body">
        <h3 class="portfolio-item__title">${project.title}</h3>
        <p class="portfolio-item__desc">${project.summary}</p>

        <div class="portfolio-item__tags">
          ${(project.tags || [])
            .map((tag: string, i: number) => {
              const color = tagColors[i % tagColors.length];
              return `<span class="portfolio-item__tag portfolio-item__tag--${color}">${tag}</span>`;
            })
            .join("")}
        </div>

        <button class="portfolio-item__link"
                type="button"
                data-project-id="${project.id}"
                aria-label="${project.title} 상세 보기">
          자세히 보기 →
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  // 카드 클릭 이벤트
  grid.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;
    const btn = target.closest(".portfolio-item__link") as HTMLButtonElement;
    if (!btn) return;
    
    const id = btn.dataset.projectId;
    if (id) openModalById(id);
  });
}

/**
 * 필터 이벤트 초기화
 */
function initializeFilters(): void {
  const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filter-btn");
  const items = document.querySelectorAll<HTMLElement>(".portfolio-item");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      items.forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
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

  // 닫기 버튼
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  // 오버레이 클릭으로 닫기
  if (modal) {
    modal.addEventListener("click", (e: Event) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // ESC key로 모달 닫기
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && modal?.classList.contains("active")) {
      closeModal();
    }
  });
}

/**
 * 모달 열기
 */
function openModalById(id: string): void {
  const project = companyData.projects.find(p => p.id === id);
  if (!project || !modal) return;

  if (modalTitleEl) modalTitleEl.textContent = project.title || "";
  if (modalImageEl) {
    modalImageEl.src = project.modalImage || project.thumbnail || "";
    modalImageEl.alt = project.title || "프로젝트 상세 이미지";
  }
  if (modalDescEl) modalDescEl.textContent = project.description || "";

  // Features
  if (modalFeaturesEl) {
    modalFeaturesEl.innerHTML = (project.features || [])
      .map((f: string) => `<li>${f}</li>`)
      .join("");
  }

  // Tech Stack
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

/**
 * 외부에서 사용할 수 있는 모달 오픈 함수
 */
export function openModal(project: CompanyProject): void {
  openModalById(project.id);
}