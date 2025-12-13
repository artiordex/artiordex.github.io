/**
 * anchorNav.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * 사이드 앵커 네비게이션 SPA 컴포넌트
 * 
 * 주요 기능:
 * - @/data/sections.json 파일을 직접 import하여 네비게이션 구성
 * - PC 사이드 네비게이션 + 모바일 하단 네비게이션 동시 지원
 * - DOM 생성 + 부드러운 스크롤 + 스크롤스파이 전부 담당
 * - IntersectionObserver 기반 현재 섹션 하이라이트
 * ─────────────────────────────────────────────────────────────────────────────
 */

// =============================================================================
// 데이터 Import
// =============================================================================

// sections.json 직접 import (fetch 대신 빌드 타임에 포함)
import sectionsData from "@/data/sections.json";

// =============================================================================
// 타입 정의 (Type Definitions)
// =============================================================================

/**
 * 네비게이션에 표시될 섹션 정보 인터페이스
 * - sections.json의 각 항목 구조
 */
export interface NavSection {
  id: string;      // 섹션의 HTML id (예: "about", "portfolio")
  label: string;   // 네비게이션에 표시될 텍스트 (예: "소개")
  icon: string;    // 아이콘 클래스 (예: "ri-user-line")
}

/**
 * AnchorNav 컴포넌트 설정 인터페이스
 */
export interface AnchorNavConfig {
  mountId: string;              // 네비게이션이 마운트될 DOM 요소 id
  activeClass: string;          // 활성 링크에 적용될 CSS 클래스
  scrollBehavior: ScrollBehavior; // 스크롤 동작 ("smooth" | "auto")
  observerThreshold: number;    // IntersectionObserver 임계값 (0~1)
}

// =============================================================================
// 기본 설정값 (Default Configuration)
// =============================================================================

/**
 * AnchorNav 컴포넌트의 기본 설정값
 */
const DEFAULT_CONFIG: AnchorNavConfig = {
  mountId: "layout-nav",        // #layout-nav에 마운트
  activeClass: "active",        // 활성 상태 클래스
  scrollBehavior: "smooth",     // 부드러운 스크롤
  observerThreshold: 0.5        // 섹션 50% 보일 때 활성화
};

// =============================================================================
// AnchorNav 클래스 (Main Class)
// =============================================================================

/**
 * AnchorNav 클래스
 * - PC 사이드 네비게이션과 모바일 하단 네비게이션을 동시에 관리
 * - 스크롤 스파이로 현재 위치 표시
 * - Singleton 패턴으로 사용 권장
 */
class AnchorNav {
  // ---------------------------------------------------------------------------
  // 프라이빗 멤버 변수
  // ---------------------------------------------------------------------------
  
  private config: AnchorNavConfig;                    // 현재 적용된 설정값
  private sections: NavSection[] = [];                // 로드된 섹션 데이터 배열
  private navListEl: HTMLElement | null = null;       // PC 네비게이션 목록 DOM 참조
  private mobileNavListEl: HTMLElement | null = null; // 모바일 네비게이션 목록 DOM 참조
  private links: HTMLElement[] = [];                  // PC 네비게이션 링크 배열
  private mobileLinks: HTMLElement[] = [];            // 모바일 네비게이션 링크 배열
  private observer: IntersectionObserver | null = null; // 스크롤 스파이용 옵저버

  // ---------------------------------------------------------------------------
  // 생성자 (Constructor)
  // ---------------------------------------------------------------------------

  /**
   * AnchorNav 인스턴스 생성
   * @param config - 사용자 정의 설정 (기본값과 병합됨)
   */
  constructor(config: Partial<AnchorNavConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ---------------------------------------------------------------------------
  // 공개 메서드 (Public Methods)
  // ---------------------------------------------------------------------------

  /**
   * 네비게이션 초기화 메서드
   * - 외부에서 호출하는 진입점
   */
  public init(): void {
    console.log('[AnchorNav] Initializing...');
    
    // 1단계: 기본 HTML 구조 생성 (PC + 모바일)
    this.renderSkeleton();
    
    // 2단계: import된 JSON에서 섹션 데이터 로드
    this.loadSections();

    console.log('[AnchorNav] Loaded sections:', this.sections);

    // 섹션 데이터가 없으면 초기화 중단
    if (this.sections.length === 0) {
      console.warn("[AnchorNav] sections.json empty");
      return;
    }

    // 3단계: 네비게이션 메뉴 렌더링
    this.renderNav();
    
    // 4단계: 클릭 이벤트 바인딩 (부드러운 스크롤)
    this.bindClickEvents();
    
    // 5단계: 스크롤 스파이 설정
    this.setupScrollSpy();
    
    console.log('[AnchorNav] Initialization complete');
  }

  /**
   * 리소스 정리 메서드
   * - SPA에서 컴포넌트 제거 시 호출
   */
  public destroy(): void {
    // IntersectionObserver 연결 해제
    this.observer?.disconnect();
    this.observer = null;
    
    // 배열 초기화
    this.links = [];
    this.mobileLinks = [];
    this.sections = [];
  }

  // ---------------------------------------------------------------------------
  // 프라이빗 메서드 - 렌더링 (Private Methods - Rendering)
  // ---------------------------------------------------------------------------

  /**
   * 네비게이션 기본 HTML 구조 생성
   * - PC 사이드 네비게이션과 모바일 하단 네비게이션 동시 생성
   */
  private renderSkeleton(): void {
    // 마운트 포인트 찾기
    const mount = document.getElementById(this.config.mountId);
    
    if (!mount) {
      console.error(`[AnchorNav] Mount element not found: #${this.config.mountId}`);
      return;
    }

    // PC + 모바일 네비게이션 HTML 구조 삽입
    mount.innerHTML = `
      <!-- PC 사이드 네비게이션 (화면 우측 고정) -->
      <nav id="side-nav" class="side-nav">
        <ul id="side-nav-list"></ul>
      </nav>
      
      <!-- 모바일 하단 네비게이션 (화면 하단 고정) -->
      <nav id="mobile-nav" class="mobile-nav">
        <ul id="mobile-nav-list"></ul>
      </nav>
    `;

    // DOM 요소 참조 저장
    this.navListEl = document.getElementById("side-nav-list");
    this.mobileNavListEl = document.getElementById("mobile-nav-list");
  }

  /**
   * import된 JSON에서 섹션 데이터 로드
   * - fetch 대신 빌드 타임에 번들링된 JSON 사용
   */
  private loadSections(): void {
    try {
      // import된 sectionsData에서 sections 배열 추출
      const data = sectionsData as { sections: NavSection[] };
      
      // sections 배열 저장 (없으면 빈 배열)
      this.sections = data.sections ?? [];
      
    } catch (err) {
      console.error("[AnchorNav] Failed to load sections", err);
      this.sections = [];
    }
  }

  /**
   * 네비게이션 메뉴 HTML 렌더링
   * - PC와 모바일 네비게이션 모두 렌더링
   */
  private renderNav(): void {
    // ----- PC 사이드 네비게이션 -----
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
      
      // 생성된 링크 요소들 저장
      this.links = [...this.navListEl.querySelectorAll<HTMLElement>("a")];
    }

    // ----- 모바일 하단 네비게이션 -----
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
      
      // 생성된 링크 요소들 저장
      this.mobileLinks = [...this.mobileNavListEl.querySelectorAll<HTMLElement>("a")];
    }
  }

  // ---------------------------------------------------------------------------
  // 프라이빗 메서드 - 이벤트 처리 (Private Methods - Event Handling)
  // ---------------------------------------------------------------------------

  /**
   * 네비게이션 링크 클릭 이벤트 바인딩
   * - 기본 앵커 동작 방지
   * - 헤더 높이를 고려한 부드러운 스크롤 구현
   */
  private bindClickEvents(): void {
    // PC + 모바일 링크 모두 합침
    const allLinks = [...this.links, ...this.mobileLinks];
    
    allLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // 기본 앵커 점프 동작 방지
        e.preventDefault();
        
        // data-section 속성에서 타겟 섹션 id 추출
        const id = link.dataset.section;
        if (!id) return;

        // 타겟 섹션 DOM 요소 찾기
        const section = document.getElementById(id);
        if (!section) {
          console.warn(`[AnchorNav] Section not found: #${id}`);
          return;
        }

        // 헤더 높이를 고려한 스크롤 위치 계산
        const headerHeight = 80; // 헤더 높이 (px)
        const targetPosition = section.offsetTop - headerHeight;
        
        // 부드러운 스크롤로 이동
        window.scrollTo({
          top: targetPosition,
          behavior: this.config.scrollBehavior
        });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 프라이빗 메서드 - 스크롤 스파이 (Private Methods - Scroll Spy)
  // ---------------------------------------------------------------------------

  /**
   * 스크롤 스파이 설정
   * - IntersectionObserver로 현재 보이는 섹션 감지
   * - 해당 섹션의 네비게이션 링크에 active 클래스 추가
   */
  private setupScrollSpy(): void {
    // 페이지 내 모든 섹션 요소 선택
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    
    if (!sections.length) {
      console.warn("[AnchorNav] No sections found for scroll spy");
      return;
    }

    // 기존 옵저버 해제
    this.observer?.disconnect();

    // 새 IntersectionObserver 생성
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 섹션이 화면에 들어오면 해당 링크 활성화
          if (entry.isIntersecting) {
            const id = entry.target.id;
            this.setActive(id);
          }
        });
      },
      { 
        // 섹션의 몇 %가 보여야 콜백 실행할지
        threshold: this.config.observerThreshold,
        
        // 감지 영역 조정 (헤더 높이와 뷰포트 고려)
        // 상단 80px 무시 (헤더), 하단 40% 무시
        rootMargin: "-80px 0px -40% 0px"
      }
    );

    // 모든 섹션에 옵저버 연결
    sections.forEach((sec) => this.observer!.observe(sec));
  }

  /**
   * 특정 섹션의 네비게이션 링크를 활성 상태로 설정
   * - PC와 모바일 네비게이션 모두 업데이트
   * @param id - 활성화할 섹션의 id
   */
  private setActive(id: string): void {
    // PC + 모바일 링크 모두 합침
    const allLinks = [...this.links, ...this.mobileLinks];
    
    allLinks.forEach((link) => {
      // data-section이 현재 id와 일치하면 active 클래스 추가
      const isActive = link.dataset.section === id;
      link.classList.toggle(this.config.activeClass, isActive);
    });
  }
}

// =============================================================================
// 싱글톤 인스턴스 관리 (Singleton Instance Management)
// =============================================================================

/**
 * AnchorNav 싱글톤 인스턴스
 * - 페이지 내에 하나의 네비게이션만 존재하도록 보장
 */
let instance: AnchorNav | null = null;

/**
 * 앵커 네비게이션 초기화 함수 (권장 사용법)
 * - 싱글톤 패턴으로 AnchorNav 인스턴스 생성 및 초기화
 * 
 * @param config - 선택적 설정 객체
 * @returns AnchorNav - 초기화된 AnchorNav 인스턴스
 * 
 * @example
 * // 기본 설정으로 초기화
 * const nav = initAnchorNav();
 * 
 * // 커스텀 설정으로 초기화
 * const nav = initAnchorNav({
 *   activeClass: "is-active",
 *   scrollBehavior: "auto"
 * });
 */
export function initAnchorNav(config?: Partial<AnchorNavConfig>): AnchorNav {
  if (!instance) {
    instance = new AnchorNav(config);
    instance.init();
  }
  return instance;
}

/**
 * 앵커 네비게이션 인스턴스 제거 함수
 * - SPA에서 페이지 전환 시 정리용
 * 
 * @example
 * destroyAnchorNav();
 */
export function destroyAnchorNav(): void {
  instance?.destroy();
  instance = null;
}

// AnchorNav 클래스도 export
export { AnchorNav };