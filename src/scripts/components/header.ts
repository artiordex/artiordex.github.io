/**
 * header.ts
 * - 헤더 마크업을 TS에서 직접 생성
 * - /data/sections.json 단일 소스 사용
 * - 스크롤 시 숨김/표시 기능 추가
 */

export interface HeaderSection {
  id: string;
  label: string;
  icon?: string;
}

export interface HeaderConfig {
  mountId: string;
  navListId: string;
  dataPath: string;
  activeClass: string;
  linkClass: string;
  spyThreshold: number;
  hideOnScrollDown: boolean;
  scrollThreshold: number;
}

const DEFAULT_CONFIG: HeaderConfig = {
  mountId: "layout-header",
  navListId: "header-nav-list",
  dataPath: "/data/sections.json",
  activeClass: "active",
  linkClass: "header-link",
  spyThreshold: 0.5,
  hideOnScrollDown: true,
  scrollThreshold: 100 // 스크롤 감지 민감도
};

class Header {
  private config: HeaderConfig;
  private sections: HeaderSection[] = [];
  private navListEl: HTMLElement | null = null;
  private headerEl: HTMLElement | null = null;
  private links: HTMLElement[] = [];
  private observer: IntersectionObserver | null = null;
  private lastScrollY: number = 0;
  private ticking: boolean = false;

  constructor(config: Partial<HeaderConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  public async init(): Promise<void> {
    this.renderSkeleton();
    await this.loadSections();

    if (this.sections.length === 0) {
      console.warn("[Header] sections.json is empty or missing");
      return;
    }

    this.renderNav();
    this.setupScrollSpy();
    this.bindClickEvents();
    
    if (this.config.hideOnScrollDown) {
      this.setupScrollHide();
    }
  }

  private renderSkeleton(): void {
    const mount = document.getElementById(this.config.mountId);
    if (!mount) {
      console.error(`[Header] Mount element not found: #${this.config.mountId}`);
      return;
    }

    mount.innerHTML = `
      <header id="main-header" class="header">
        <div class="header-inner">
          <div class="logo">민시우 - 디지털 전환 개발자</div>
          <nav>
            <ul id="${this.config.navListId}"></ul>
          </nav>
        </div>
      </header>
    `;

    this.headerEl = document.getElementById("main-header");
    this.navListEl = document.getElementById(this.config.navListId);
  }

  private async loadSections(): Promise<void> {
    try {
      const res = await fetch(this.config.dataPath);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      this.sections = data.sections ?? [];
      console.log("[Header] Loaded sections:", this.sections);
    } catch (err) {
      console.error("[Header] Failed to load sections.json", err);
      this.sections = [];
    }
  }

  private renderNav(): void {
    if (!this.navListEl) return;
    this.navListEl.innerHTML = this.sections
      .map(
        (s) => `
        <li>
          <a href="#${s.id}"
            class="${this.config.linkClass}"
            data-section="${s.id}">
            ${s.icon ? `<i class="${s.icon}"></i>` : ''}
            <span>${s.label}</span>
          </a>
        </li>
      `
      )
      .join("");
    this.links = [...this.navListEl.querySelectorAll<HTMLElement>("a")];
  }

  private bindClickEvents(): void {
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.dataset.section;
        if (!id) return;

        const section = document.getElementById(id);
        if (!section) return;

        // 헤더 높이를 고려한 스크롤
        const headerHeight = this.headerEl?.offsetHeight || 72;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      });
    });
  }

  private setupScrollSpy(): void {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    if (!sections.length) return;
    
    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setActive(entry.target.id);
          }
        });
      },
      { 
        threshold: this.config.spyThreshold,
        rootMargin: "-20% 0px -60% 0px"
      }
    );
    sections.forEach((s) => this.observer!.observe(s));
  }

  private setActive(id: string): void {
    this.links.forEach((link) => {
      link.classList.toggle(
        this.config.activeClass,
        link.dataset.section === id
      );
    });
  }

  private setupScrollHide(): void {
    if (!this.headerEl) return;

    this.headerEl.classList.add("header--visible"); // 초기 표시

    window.addEventListener(
      "scroll",
      () => {
        const currentY = window.scrollY;

        // 최상단: 항상 보이기
        if (currentY <= 0) {
          this.headerEl!.classList.remove("header--hidden");
          this.headerEl!.classList.add("header--visible");
          this.lastScrollY = currentY;
          return;
        }

        // 아래로 스크롤 → 숨김
        if (currentY > this.lastScrollY) {
          this.headerEl!.classList.add("header--hidden");
          this.headerEl!.classList.remove("header--visible");
        }
        // 위로 스크롤 → 표시
        else {
          this.headerEl!.classList.remove("header--hidden");
          this.headerEl!.classList.add("header--visible");
        }

        this.lastScrollY = currentY;
      },
      { passive: true }
    );
  }

  private updateHeaderVisibility(): void {
    if (!this.headerEl) return;

    const currentScrollY = window.scrollY;
    
    // 스크롤이 최상단일 때는 항상 표시
    if (currentScrollY <= 0) {
      this.headerEl.classList.remove("header--hidden");
      this.headerEl.classList.add("header--visible");
      this.lastScrollY = currentScrollY;
      return;
    }

    // 스크롤 방향 감지
    const scrollDelta = currentScrollY - this.lastScrollY;
    
    if (Math.abs(scrollDelta) < this.config.scrollThreshold) {
      // 작은 움직임은 무시
      return;
    }

    if (scrollDelta > 0 && currentScrollY > this.config.scrollThreshold) {
      // 아래로 스크롤 - 헤더 숨김
      this.headerEl.classList.add("header--hidden");
      this.headerEl.classList.remove("header--visible");
    } else {
      // 위로 스크롤 - 헤더 표시
      this.headerEl.classList.remove("header--hidden");
      this.headerEl.classList.add("header--visible");
    }

    this.lastScrollY = currentScrollY;
  }

  public destroy(): void {
    this.observer?.disconnect();
    this.observer = null;
    window.removeEventListener("scroll", this.updateHeaderVisibility);
  }
}

// SPA singleton
let instance: Header | null = null;
export async function initHeader(config?: Partial<HeaderConfig>): Promise<Header> {
  if (!instance) {
    instance = new Header(config);
    await instance.init();
  }
  return instance;
}

export function destroyHeader(): void {
  instance?.destroy();
  instance = null;
}

export { Header };