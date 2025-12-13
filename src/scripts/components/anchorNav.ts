/**
 * anchorNav.ts
 * - 사이드 앵커 네비게이션 SPA 컴포넌트
 * - /data/sections.json 단일 소스
 * - DOM 생성 + 스크롤 + 스크롤스파이 전부 담당
 */

export interface NavSection {
  id: string;
  label: string;
  icon: string;
}

export interface AnchorNavConfig {
  mountId: string;        // layout-nav
  dataPath: string;       // sections.json
  activeClass: string;
  scrollBehavior: ScrollBehavior;
  observerThreshold: number;
}

const DEFAULT_CONFIG: AnchorNavConfig = {
  mountId: "layout-nav",
  dataPath: "/data/sections.json",
  activeClass: "active",
  scrollBehavior: "smooth",
  observerThreshold: 0.5
};

class AnchorNav {
  private config: AnchorNavConfig;
  private sections: NavSection[] = [];
  private navListEl: HTMLElement | null = null;
  private mobileNavListEl: HTMLElement | null = null;
  private links: HTMLElement[] = [];
  private mobileLinks: HTMLElement[] = [];
  private observer: IntersectionObserver | null = null;

  constructor(config: Partial<AnchorNavConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  public async init(): Promise<void> {
    console.log('[AnchorNav] Initializing...');
    
    this.renderSkeleton();
    await this.loadSections();

    console.log('[AnchorNav] Loaded sections:', this.sections);

    if (this.sections.length === 0) {
      console.warn("[AnchorNav] sections.json empty");
      return;
    }

    this.renderNav();
    this.bindClickEvents();
    this.setupScrollSpy();
    
    console.log('[AnchorNav] Initialization complete');
  }

  // DOM 전체 생성 (PC + Mobile)
  private renderSkeleton(): void {
    const mount = document.getElementById(this.config.mountId);
    if (!mount) {
      console.error(`[AnchorNav] Mount element not found: #${this.config.mountId}`);
      return;
    }

    mount.innerHTML = `
      <!-- PC 사이드 네비게이션 -->
      <nav id="side-nav" class="side-nav">
        <ul id="side-nav-list"></ul>
      </nav>
      
      <!-- 모바일 하단 네비게이션 -->
      <nav id="mobile-nav" class="mobile-nav">
        <ul id="mobile-nav-list"></ul>
      </nav>
    `;

    this.navListEl = document.getElementById("side-nav-list");
    this.mobileNavListEl = document.getElementById("mobile-nav-list");
  }

  // JSON 로드
  private async loadSections(): Promise<void> {
    try {
      const res = await fetch(this.config.dataPath);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      this.sections = data.sections ?? [];
    } catch (err) {
      console.error("[AnchorNav] Failed to load sections.json", err);
      this.sections = [];
    }
  }

  // 네비게이션 렌더링 (PC + Mobile)
  private renderNav(): void {
    // PC 네비게이션
    if (this.navListEl) {
      this.navListEl.innerHTML = this.sections
        .map(
          (s) => `
          <li>
            <a href="#${s.id}"
               class="side-nav-link"
               data-section="${s.id}"
               aria-label="${s.label}"
               title="${s.label}">
              <i class="${s.icon}"></i>
            </a>
          </li>
        `
        )
        .join("");
      
      this.links = [...this.navListEl.querySelectorAll<HTMLElement>("a")];
    }

    // 모바일 네비게이션
    if (this.mobileNavListEl) {
      this.mobileNavListEl.innerHTML = this.sections
        .map(
          (s) => `
          <li>
            <a href="#${s.id}"
               class="mobile-nav-link"
               data-section="${s.id}"
               aria-label="${s.label}">
              <i class="${s.icon}"></i>
            </a>
          </li>
        `
        )
        .join("");
      
      this.mobileLinks = [...this.mobileNavListEl.querySelectorAll<HTMLElement>("a")];
    }
  }

  // 클릭 → 부드러운 스크롤
  private bindClickEvents(): void {
    const allLinks = [...this.links, ...this.mobileLinks];
    
    allLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.dataset.section;
        if (!id) return;

        const section = document.getElementById(id);
        if (!section) {
          console.warn(`[AnchorNav] Section not found: #${id}`);
          return;
        }

        // 헤더 높이를 고려한 스크롤
        const headerHeight = 80; // 헤더 높이
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: this.config.scrollBehavior
        });
      });
    });
  }

  // IntersectionObserver 기반 스크롤 스파이
  private setupScrollSpy(): void {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    if (!sections.length) {
      console.warn("[AnchorNav] No sections found for scroll spy");
      return;
    }

    this.observer?.disconnect();

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            this.setActive(id);
          }
        });
      },
      { 
        threshold: this.config.observerThreshold,
        rootMargin: "-80px 0px -40% 0px" // 헤더 높이와 뷰포트 고려
      }
    );

    sections.forEach((sec) => this.observer!.observe(sec));
  }

  private setActive(id: string): void {
    const allLinks = [...this.links, ...this.mobileLinks];
    
    allLinks.forEach((link) => {
      const isActive = link.dataset.section === id;
      link.classList.toggle(this.config.activeClass, isActive);
    });
  }

  public destroy(): void {
    this.observer?.disconnect();
    this.observer = null;
    this.links = [];
    this.mobileLinks = [];
    this.sections = [];
  }
}

// SPA singleton
let instance: AnchorNav | null = null;

export async function initAnchorNav(config?: Partial<AnchorNavConfig>): Promise<AnchorNav> {
  if (!instance) {
    instance = new AnchorNav(config);
    await instance.init();
  }
  return instance;
}

export function destroyAnchorNav(): void {
  instance?.destroy();
  instance = null;
}

export { AnchorNav };