/**
 * header.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * 헤더 컴포넌트 모듈
 *
 * 주요 기능:
 * - 헤더 마크업을 TypeScript에서 동적으로 생성
 * - sections.json 기반 네비게이션 구성
 * - languages.json 기반 언어 선택
 * - Google 자동 번역 연동 (goog-te-combo 제어)
 * - 스크롤 스파이 / Hide on Scroll / Smooth Scroll
 * ─────────────────────────────────────────────────────────────────────────────
 */

import sectionsData from "@/data/sections.json";
import languagesData from "@/data/languages.json";

export interface HeaderSection {
  id: string;
  label: string;
  icon?: string;
}

export interface HeaderConfig {
  mountId: string;
  navListId: string;
  activeClass: string;
  linkClass: string;
  spyThreshold: number;
  hideOnScrollDown: boolean;
  scrollThreshold: number;
}

// =============================================================================
// 기본 설정값
// =============================================================================

const DEFAULT_CONFIG: HeaderConfig = {
  mountId: "layout-header",
  navListId: "header-nav-list",
  activeClass: "active",
  linkClass: "header-link",
  spyThreshold: 0.5,
  hideOnScrollDown: true,
  scrollThreshold: 100
};

// =============================================================================
// Header 클래스
// =============================================================================

class Header {
  private config: HeaderConfig;
  private sections: HeaderSection[] = [];
  private navListEl: HTMLElement | null = null;
  private headerEl: HTMLElement | null = null;
  private links: HTMLElement[] = [];
  private observer: IntersectionObserver | null = null;
  private lastScrollY = 0;

  constructor(config: Partial<HeaderConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ===========================================================================
// Public
// ===========================================================================

  public init(): void {
    this.renderSkeleton();
    this.loadSections();

    if (this.sections.length === 0) return;

    this.renderNav();
    this.setupScrollSpy();
    this.bindClickEvents();
    this.bindLanguageSelector();

    if (this.config.hideOnScrollDown) {
      this.setupScrollHide();
    }
  }

  public destroy(): void {
    this.observer?.disconnect();
    window.removeEventListener("scroll", this.updateHeaderVisibility);
  }

  // ===========================================================================
// Rendering
// ===========================================================================

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

          <nav class="header-nav">
            <ul id="${this.config.navListId}"></ul>
          </nav>

          <div class="header-lang">
            <!-- 네이티브 언어 셀렉트 (option 안에 국기 표시) -->
            <select id="lang-select" aria-label="Language selector">
              ${languagesData.languages
                .map(
                  (lang) =>
                    `<option value="${lang.code}" data-flag="${lang.code}">
                      ${lang.label}
                    </option>`
                )
                .join("")}
            </select>
          </div>
        </div>
      </header>
    `;

    this.headerEl = document.getElementById("main-header");
    this.navListEl = document.getElementById(this.config.navListId);
  }

  private loadSections(): void {
    try {
      const data = sectionsData as { sections: HeaderSection[] };
      this.sections = data.sections ?? [];
    } catch (err) {
      console.error("[Header] Failed to load sections", err);
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
            ${s.icon ? `<i class="${s.icon}"></i>` : ""}
            <span>${s.label}</span>
          </a>
        </li>
      `
      )
      .join("");

    this.links = [...this.navListEl.querySelectorAll<HTMLElement>("a")];
  }

  // ===========================================================================
// Events
// ===========================================================================

  private bindClickEvents(): void {
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const id = link.dataset.section;
        if (!id) return;

        const section = document.getElementById(id);
        if (!section) return;

        const headerHeight = this.headerEl?.offsetHeight || 72;
        const targetPosition = section.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      });
    });
  }

  /**
   * 커스텀 언어 셀렉트 → Google Translate 연동
   */
  private bindLanguageSelector(): void {
    const select = document.getElementById("lang-select") as HTMLSelectElement | null;
    if (!select) return;

    // 초기값
    select.value = languagesData.default;

    select.addEventListener("change", () => {
      const lang = select.value;

      let retry = 0;
      const interval = setInterval(() => {
        const googleSelect = document.querySelector<HTMLSelectElement>(
          "select.goog-te-combo"
        );

        if (googleSelect) {
          googleSelect.value = lang;
          googleSelect.dispatchEvent(new Event("change"));
          clearInterval(interval);
        }

        retry++;
        if (retry > 20) {
          console.warn("[Header] Google Translate select not ready");
          clearInterval(interval);
        }
      }, 200);
    });
  }

  // ===========================================================================
// Scroll Spy
// ===========================================================================

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

  // ===========================================================================
// Hide on Scroll
// ===========================================================================

  private setupScrollHide(): void {
    if (!this.headerEl) return;

    this.headerEl.classList.add("header--visible");

    window.addEventListener(
      "scroll",
      () => {
        const currentY = window.scrollY;

        if (currentY <= 0) {
          this.headerEl!.classList.remove("header--hidden");
          this.headerEl!.classList.add("header--visible");
          this.lastScrollY = currentY;
          return;
        }

        if (currentY > this.lastScrollY) {
          this.headerEl!.classList.add("header--hidden");
          this.headerEl!.classList.remove("header--visible");
        } else {
          this.headerEl!.classList.remove("header--hidden");
          this.headerEl!.classList.add("header--visible");
        }

        this.lastScrollY = currentY;
      },
      { passive: true }
    );
  }

  private updateHeaderVisibility(): void {}
}

// =============================================================================
// Singleton
// =============================================================================

let instance: Header | null = null;

export function initHeader(config?: Partial<HeaderConfig>): Header {
  if (!instance) {
    instance = new Header(config);
    instance.init();
  }
  return instance;
}

export function destroyHeader(): void {
  instance?.destroy();
  instance = null;
}

export { Header };
