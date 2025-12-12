/**
 * header.ts
 * 최소 기능 헤더 컴포넌트
 * - JSON 기반 네비게이션 생성
 * - 스크롤 스파이로 현재 섹션 하이라이트
 */
// 기본 설정
const DEFAULT_CONFIG = {
    headerId: "main-header",
    navListId: "header-nav-list",
    dataPath: "./data/sections.json",
    activeClass: "active",
    linkClass: "header-link",
    spyThreshold: 0.5
};
// Header 클래스
class Header {
    config;
    sections = [];
    headerEl = null;
    navListEl = null;
    links = [];
    observer = null;
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }
    // 초기화
    async init() {
        this.cacheElements();
        if (!this.navListEl)
            return;
        await this.loadSections();
        this.renderNav();
        this.setupScrollSpy();
        console.log("Header initialized (simple mode)");
    }
    // DOM 요소 캐싱
    cacheElements() {
        this.headerEl = document.getElementById(this.config.headerId);
        this.navListEl = document.getElementById(this.config.navListId);
    }
    // JSON 또는 기본 섹션 로드
    async loadSections() {
        try {
            const res = await fetch(this.config.dataPath);
            if (!res.ok)
                throw new Error();
            const data = await res.json();
            this.sections = data.sections || [];
        }
        catch {
            console.warn("JSON 로드 실패 → 기본 섹션 사용");
            this.sections = this.getDefaultSections();
        }
    }
    // 기본 섹션
    getDefaultSections() {
        return [
            { id: "about", label: "소개" },
            { id: "portfolio", label: "포트폴리오" },
            { id: "consulting", label: "컨설팅" },
            { id: "company", label: "창업가 소개" },
            { id: "links", label: "링크" },
            { id: "contact", label: "연락처" }
        ];
    }
    // 네비게이션 렌더링
    renderNav() {
        if (!this.navListEl)
            return;
        this.navListEl.innerHTML = "";
        this.sections.forEach((section) => {
            const li = document.createElement("li");
            li.innerHTML = `
        <a href="#${section.id}"
          class="${this.config.linkClass}"
          data-section="${section.id}">
          ${section.label}
        </a>
      `;
            this.navListEl.appendChild(li);
        });
        this.links = [...this.navListEl.querySelectorAll("a")];
    }
    // 스크롤 스파이 설정
    setupScrollSpy() {
        const sectionEls = document.querySelectorAll("section[id]");
        if (sectionEls.length === 0)
            return;
        this.observer?.disconnect();
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting)
                    return;
                const id = entry.target.id;
                this.updateActiveLink(id);
            });
        }, { threshold: this.config.spyThreshold });
        sectionEls.forEach((sec) => this.observer.observe(sec));
    }
    // active 처리
    updateActiveLink(id) {
        this.links.forEach((link) => {
            const target = link;
            const sectionId = target.dataset.section;
            target.classList.toggle(this.config.activeClass, sectionId === id);
        });
    }
    // destroy
    destroy() {
        this.observer?.disconnect();
        this.observer = null;
        console.log("Header destroyed (simple)");
    }
}
// Export & 자동 초기화
let headerInstance = null;
export function initHeader(config) {
    if (!headerInstance) {
        headerInstance = new Header(config);
        headerInstance.init();
    }
    return headerInstance;
}
export function getHeader() {
    return headerInstance;
}
document.addEventListener("DOMContentLoaded", () => {
    initHeader();
});
export { Header };
