/**
 * modal.ts
 * 최소 기능 모달 컴포넌트
 * - 열기 / 닫기
 * - ESC 닫기
 * - 배경 클릭 닫기
 */
const DEFAULT_CONFIG = {
    activeClass: "open"
};
class Modal {
    config;
    modalEl = null;
    overlayEl = null;
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }
    // 초기화
    init() {
        this.modalEl = document.getElementById("modal");
        this.overlayEl = document.getElementById("modal-overlay");
        if (!this.modalEl || !this.overlayEl) {
            console.warn("모달 요소를 찾을 수 없습니다.");
            return;
        }
        this.bindEvents();
    }
    // 이벤트 설정
    bindEvents() {
        // ESC 버튼으로 모달 닫기
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape")
                this.close();
        });
        // 오버레이 클릭 시 닫기
        this.overlayEl?.addEventListener("click", () => this.close());
        // data-modal-open="modal" 클릭 시 모달 열기
        document.querySelectorAll("[data-modal-open]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.modalOpen;
                if (id === "modal")
                    this.open();
            });
        });
        // data-modal-close 클릭 시 닫기
        document.querySelectorAll("[data-modal-close]").forEach((btn) => {
            btn.addEventListener("click", () => this.close());
        });
    }
    // 모달 열기
    open() {
        this.modalEl?.classList.add(this.config.activeClass);
        this.overlayEl?.classList.add(this.config.activeClass);
    }
    // 모달 닫기
    close() {
        this.modalEl?.classList.remove(this.config.activeClass);
        this.overlayEl?.classList.remove(this.config.activeClass);
    }
    // 상태 확인
    isOpen() {
        return this.modalEl?.classList.contains(this.config.activeClass) ?? false;
    }
}
// 싱글톤 인스턴스
let modalInstance = null;
// 초기화 함수
export function initModal(config) {
    if (!modalInstance) {
        modalInstance = new Modal(config);
        modalInstance.init();
    }
    return modalInstance;
}
// 인스턴스 가져오기
export function getModal() {
    return modalInstance;
}
// DOMContentLoaded 자동 초기화
document.addEventListener("DOMContentLoaded", () => {
    initModal();
});
export { Modal };
