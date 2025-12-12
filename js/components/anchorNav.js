/**
 * anchorNav.ts
 * 앵커 네비게이션 컴포넌트
 */
const DEFAULT_CONFIG = {
    dataPath: "./data/sections.json",
    desktopNavId: "side-nav",
    mobileNavId: "mobile-nav",
    headerNavSelector: "header nav",
    scrollOffset: 80,
    spyOffset: 150,
    activeClass: "active",
    scrollBehavior: "smooth"
};
class AnchorNav {
    config;
    sections = [];
    elements = null;
    currentSection = "";
    isScrolling = false;
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }
    // 초기화
    async init() {
        try {
            await this.loadSections();
        }
        catch (error) {
            console.warn("JSON 로드 실패, 기본 섹션 사용");
            this.sections = this.getFallbackSections();
        }
        this.cacheElements();
        this.renderDesktopNav();
        this.renderMobileNav();
        this.renderHeaderNav();
        this.bindEvents();
        this.updateActiveSection();
    }
    // JSON 섹션 데이터 로드
    async loadSections() {
        const res = await fetch(this.config.dataPath);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        this.sections = data.sections ?? [];
    }
    // 기본 섹션(폴백)
    getFallbackSections() {
        return [
            { id: "about", label: "소개", icon: "ri-user-line" },
            { id: "portfolio", label: "포트폴리오", icon: "ri-briefcase-line" },
            { id: "consulting", label: "컨설팅", icon: "ri-lightbulb-line" },
            { id: "company", label: "창업가 소개", icon: "ri-building-line" },
            { id: "links", label: "링크", icon: "ri-links-line" },
            { id: "contact", label: "연락처", icon: "ri-mail-line" }
        ];
    }
    // DOM 요소 캐싱
    cacheElements() {
        this.elements = {
            desktopNav: document.getElementById(this.config.desktopNavId),
            mobileNav: document.getElementById(this.config.mobileNavId),
            headerNav: document.querySelector(this.config.headerNavSelector),
            sections: document.querySelectorAll("section[id]")
        };
    }
    // 데스크톱 네비 렌더링
    renderDesktopNav() {
        if (!this.elements?.desktopNav)
            return;
        const container = this.elements.desktopNav.querySelector(".flex.flex-col") ?? this.elements.desktopNav;
        container.innerHTML = this.sections.map((s) => this.createDesktopNavItem(s)).join("");
    }
    // 데스크톱 아이템 생성
    createDesktopNavItem(section) {
        return `
      <a href="#${section.id}" 
        class="side-nav-link group flex items-center justify-center w-10 h-10 rounded-full"
        data-section="${section.id}">
        <i class="${section.icon} text-gray-600"></i>
      </a>
    `;
    }
    // 모바일 네비 렌더링
    renderMobileNav() {
        if (!this.elements?.mobileNav)
            return;
        const container = this.elements.mobileNav.querySelector(".flex.justify-around") ?? this.elements.mobileNav;
        container.innerHTML = this.sections.map((s) => this.createMobileNavItem(s)).join("");
    }
    // 모바일 네비 아이템 생성
    createMobileNavItem(section) {
        return `
      <a href="#${section.id}" 
        class="mobile-nav-link flex items-center justify-center w-10 h-10 rounded-full"
        data-section="${section.id}">
        <i class="${section.icon} text-gray-600"></i>
      </a>
    `;
    }
    // 헤더 네비 렌더링
    renderHeaderNav() {
        if (!this.elements?.headerNav)
            return;
        this.elements.headerNav.innerHTML = this.sections
            .map((s) => `
      <a href="#${s.id}" class="header-nav-link" data-section="${s.id}">
        ${s.label}
      </a>`)
            .join("");
    }
    // 이벤트 바인딩
    bindEvents() {
        this.bindNavClickEvents();
        this.bindScrollSpy();
        this.bindKeyboardNavigation();
    }
    // 클릭 이벤트
    bindNavClickEvents() {
        document.querySelectorAll("[data-section]").forEach((el) => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                const id = el.dataset.section;
                if (id)
                    this.scrollToSection(id);
            });
        });
    }
    // 섹션 이동
    scrollToSection(id) {
        const section = document.getElementById(id);
        if (!section)
            return;
        this.isScrolling = true;
        window.scrollTo({
            top: section.offsetTop - this.config.scrollOffset,
            behavior: this.config.scrollBehavior
        });
        setTimeout(() => {
            this.isScrolling = false;
            this.setActiveSection(id);
        }, 400);
        history.replaceState(null, "", `#${id}`);
    }
    // 스크롤 스파이
    bindScrollSpy() {
        let ticking = false;
        window.addEventListener("scroll", () => {
            if (ticking || this.isScrolling)
                return;
            ticking = true;
            requestAnimationFrame(() => {
                this.updateActiveSection();
                ticking = false;
            });
        });
    }
    // 현재 활성 섹션 업데이트
    updateActiveSection() {
        if (!this.elements?.sections)
            return;
        const scrollY = window.scrollY + this.config.spyOffset;
        let target = "";
        this.elements.sections.forEach((sec) => {
            const top = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            if (scrollY >= top && scrollY < bottom) {
                target = sec.id;
            }
        });
        // 페이지 하단 → 마지막 섹션 활성화
        if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 10) {
            target = this.sections.at(-1)?.id ?? "";
        }
        if (target && target !== this.currentSection) {
            this.setActiveSection(target);
        }
    }
    // active 클래스 적용
    setActiveSection(id) {
        this.currentSection = id;
        document.querySelectorAll("[data-section]").forEach((el) => {
            const htmlEl = el;
            htmlEl.classList.toggle(this.config.activeClass, htmlEl.dataset.section === id);
        });
    }
    // 키보드 네비게이션
    bindKeyboardNavigation() {
        document.addEventListener("keydown", (e) => {
            if (!e.altKey)
                return;
            const index = Number.parseInt(e.key, 10) - 1;
            const section = this.sections.at(index);
            if (section)
                this.scrollToSection(section.id);
        });
    }
    // cleanup
    destroy() {
        this.sections = [];
        this.elements = null;
    }
}
// 싱글톤
let anchorNavInstance = null;
export function initAnchorNav(config) {
    if (!anchorNavInstance) {
        anchorNavInstance = new AnchorNav(config);
        anchorNavInstance.init();
    }
    return anchorNavInstance;
}
export function getAnchorNav() {
    return anchorNavInstance;
}
export { AnchorNav };
