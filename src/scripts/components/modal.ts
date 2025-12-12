/**
 * modal.ts
 * 프로젝트 상세 모달 전용 컴포넌트
 * - openModal(project)
 * - closeModal()
 * - ESC / 오버레이 클릭 닫기
 */

import type { CompanyProject } from "@/scripts/data.types";

const MODAL_ACTIVE_CLASS = "active";

let modalEl: HTMLElement | null = null;
let overlayEl: HTMLElement | null = null;
let closeBtn: HTMLElement | null = null;

/**
 * 모달 내부 요소 캐싱
 */
function cacheModalElements(): void {
  modalEl = document.getElementById("modal");
  overlayEl = document.getElementById("modal-overlay");
  closeBtn = document.getElementById("modal-close");

  if (!modalEl || !overlayEl) {
    console.warn("modal 요소를 찾을 수 없습니다.");
  }
}

/**
 * 모달 열기
 */
export function openModal(project: CompanyProject): void {
  if (!modalEl) cacheModalElements();
  if (!modalEl) return;

  // 각 요소 찾기
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImage = document.getElementById("modal-image") as HTMLImageElement | null;
  const modalFeatures = document.getElementById("modal-features");
  const modalTechstack = document.getElementById("modal-techstack");

  // 값 삽입
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalDescription) modalDescription.textContent = project.description ?? "";
  if (modalImage) {
    modalImage.src = project.modalImage || project.thumbnail;
    modalImage.alt = project.title;
  }
  if (modalFeatures) {
    modalFeatures.innerHTML = (project.features ?? [])
      .map((f) => `<li>${f}</li>`)
      .join("");
  }
  if (modalTechstack) {
    modalTechstack.innerHTML = (project.techStack ?? [])
      .map((t) => `<span class="modal-tech-tag">${t}</span>`)
      .join("");
  }

  // 보여주기
  modalEl.classList.add(MODAL_ACTIVE_CLASS);
  overlayEl?.classList.add(MODAL_ACTIVE_CLASS);
  document.body.style.overflow = "hidden";
}

/**
 * 모달 닫기
 */
export function closeModal(): void {
  modalEl?.classList.remove(MODAL_ACTIVE_CLASS);
  overlayEl?.classList.remove(MODAL_ACTIVE_CLASS);
  document.body.style.overflow = "";
}

/**
 * 초기 이벤트 바인딩
 */
function bindModalEvents(): void {
  // ESC 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // 오버레이 클릭 닫기
  overlayEl?.addEventListener("click", () => closeModal());

  // 닫기 버튼
  closeBtn?.addEventListener("click", () => closeModal());
}

/**
 * DOM 로딩 후 자동 초기화
 */
document.addEventListener("DOMContentLoaded", () => {
  cacheModalElements();
  bindModalEvents();
});

export default {
  openModal,
  closeModal,
};
