/**
 * company.ts
 * 회사 프로젝트 섹션 렌더링
 */

import companyJson from "@/data/company.json";
import type { CompanyData, CompanyProject } from "@ts/data.types";
import { attachRevealObserver } from "@ts/utils/reveal";

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
  const data = companyData;

  // 기본값 설정 (방어코드)
  const intro = data.intro || {};
  const filters = data.filters || [];
  const projects = data.projects || [];

  // Intro 설정
  const introTitleEl = document.getElementById("intro-title");
  const introSubtitleEl = document.getElementById("intro-subtitle");

  if (introTitleEl) introTitleEl.textContent = intro.title || "";
  if (introSubtitleEl) introSubtitleEl.textContent = intro.subtitle || "";

  // 필터 버튼 렌더링
  const filterContainer = document.getElementById("filter-buttons");
  const tagColors = ["primary", "secondary", "purple", "green"];

  if (filterContainer) {
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

  // 포트폴리오 프로젝트 렌더링
  const grid = document.getElementById("portfolio-grid");
  
  if (grid) {
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
  }

  // 필터 로직
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

  // 모달 초기화
  initModal();

  // 카드 내부 "자세히 보기" 버튼 클릭 이벤트
  if (grid) {
    grid.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      const btn = target.closest(".portfolio-item__link") as HTMLButtonElement;
      if (!btn) return;
      
      const id = btn.dataset.projectId;
      if (id) openModalById(id);
    });
  }

  // Intersection Observer 적용
  attachRevealObserver();
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