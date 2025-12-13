/**
 * header.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * 헤더 컴포넌트 모듈
 * 
 * 주요 기능:
 * - 헤더 마크업을 TypeScript에서 동적으로 생성
 * - @/data/sections.json 파일을 직접 import하여 네비게이션 구성
 * - 스크롤 방향에 따른 헤더 숨김/표시 기능 (Hide on Scroll)
 * - IntersectionObserver 기반 스크롤 스파이 기능 (현재 섹션 하이라이트)
 * - 부드러운 스크롤 이동 (Smooth Scroll)
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
 * 헤더 네비게이션에 표시될 섹션 정보 인터페이스
 * - sections.json에서 로드되는 각 섹션 데이터 구조
 */
export interface HeaderSection {
  id: string;      // 섹션의 HTML id (예: "about", "portfolio")
  label: string;   // 네비게이션에 표시될 텍스트 (예: "소개", "포트폴리오")
  icon?: string;   // Font Awesome 아이콘 클래스 (선택적, 예: "fas fa-user")
}

/**
 * 헤더 컴포넌트 설정 인터페이스
 * - 헤더의 동작 및 스타일을 커스터마이징하기 위한 옵션들
 */
export interface HeaderConfig {
  mountId: string;          // 헤더가 마운트될 DOM 요소의 id
  navListId: string;        // 네비게이션 목록(<ul>)의 id
  activeClass: string;      // 활성 링크에 적용될 CSS 클래스명
  linkClass: string;        // 모든 네비게이션 링크에 적용될 CSS 클래스명
  spyThreshold: number;     // IntersectionObserver 임계값 (0~1, 섹션이 얼마나 보여야 활성화)
  hideOnScrollDown: boolean; // 아래로 스크롤 시 헤더 숨김 기능 활성화 여부
  scrollThreshold: number;   // 스크롤 감지 민감도 (px, 이 값 이상 스크롤해야 반응)
}

// =============================================================================
// 기본 설정값 (Default Configuration)
// =============================================================================

/**
 * 헤더 컴포넌트의 기본 설정값
 * - 생성자에서 사용자 설정과 병합되어 사용됨
 */
const DEFAULT_CONFIG: HeaderConfig = {
  mountId: "layout-header",           // #layout-header에 마운트
  navListId: "header-nav-list",       // 네비게이션 목록 id
  activeClass: "active",              // 활성 상태 클래스
  linkClass: "header-link",           // 링크 공통 클래스
  spyThreshold: 0.5,                  // 섹션 50% 보일 때 활성화
  hideOnScrollDown: true,             // 스크롤 다운 시 헤더 숨김 활성화
  scrollThreshold: 100                // 100px 이상 스크롤해야 숨김/표시 전환
};

// =============================================================================
// Header 클래스 (Main Class)
// =============================================================================

/**
 * Header 클래스
 * - 헤더 렌더링 및 상호작용을 담당하는 메인 클래스
 * - Singleton 패턴으로 사용 권장 (initHeader 함수 참조)
 */
class Header {
  // ---------------------------------------------------------------------------
  // 프라이빗 멤버 변수
  // ---------------------------------------------------------------------------
  
  private config: HeaderConfig;                    // 현재 적용된 설정값
  private sections: HeaderSection[] = [];          // 로드된 섹션 데이터 배열
  private navListEl: HTMLElement | null = null;    // 네비게이션 목록 DOM 요소 참조
  private headerEl: HTMLElement | null = null;     // 헤더 DOM 요소 참조
  private links: HTMLElement[] = [];               // 네비게이션 링크 요소들의 배열
  private observer: IntersectionObserver | null = null;  // 스크롤 스파이용 옵저버
  private lastScrollY: number = 0;                 // 마지막 스크롤 위치 (방향 감지용)
  private ticking: boolean = false;                // requestAnimationFrame 중복 방지 플래그

  // ---------------------------------------------------------------------------
  // 생성자 (Constructor)
  // ---------------------------------------------------------------------------
  
  /**
   * Header 인스턴스 생성
   * @param config - 사용자 정의 설정 (기본값과 병합됨)
   */
  constructor(config: Partial<HeaderConfig> = {}) {
    // 스프레드 연산자로 기본 설정과 사용자 설정 병합
    // 사용자 설정이 기본 설정을 덮어씀
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ---------------------------------------------------------------------------
  // 공개 메서드 (Public Methods)
  // ---------------------------------------------------------------------------

  /**
   * 헤더 초기화 메서드
   * - 외부에서 호출하는 진입점
   */
  public init(): void {
    // 1단계: 기본 HTML 구조(스켈레톤) 렌더링
    this.renderSkeleton();
    
    // 2단계: import된 JSON에서 섹션 데이터 로드
    this.loadSections();

    // 섹션 데이터가 없으면 초기화 중단
    if (this.sections.length === 0) {
      console.warn("[Header] sections.json is empty or missing");
      return;
    }

    // 3단계: 네비게이션 메뉴 렌더링
    this.renderNav();
    
    // 4단계: 스크롤 스파이 설정 (현재 섹션 하이라이트)
    this.setupScrollSpy();
    
    // 5단계: 클릭 이벤트 바인딩 (부드러운 스크롤)
    this.bindClickEvents();
    
    // 6단계: 스크롤 시 헤더 숨김 기능 설정 (옵션)
    if (this.config.hideOnScrollDown) {
      this.setupScrollHide();
    }
  }

  /**
   * 리소스 정리 메서드
   * - SPA에서 컴포넌트 제거 시 호출
   * - 이벤트 리스너 및 옵저버 해제
   */
  public destroy(): void {
    // IntersectionObserver 연결 해제
    this.observer?.disconnect();
    this.observer = null;
    
    // 스크롤 이벤트 리스너 제거
    window.removeEventListener("scroll", this.updateHeaderVisibility);
  }

  // ---------------------------------------------------------------------------
  // 프라이빗 메서드 - 렌더링 (Private Methods - Rendering)
  // ---------------------------------------------------------------------------

  /**
   * 헤더 기본 HTML 구조 생성
   * - 데이터 로드 전에 먼저 DOM 구조를 만들어 놓음
   * - 이후 네비게이션 항목만 동적으로 채워짐
   */
  private renderSkeleton(): void {
    // 마운트 포인트 DOM 요소 찾기
    const mount = document.getElementById(this.config.mountId);
    
    // 마운트 포인트가 없으면 에러 로그 출력 후 종료
    if (!mount) {
      console.error(`[Header] Mount element not found: #${this.config.mountId}`);
      return;
    }

    // 헤더 HTML 구조 삽입
    // - header: 전체 헤더 컨테이너
    // - header-inner: 최대 너비 제한 및 내부 정렬용
    // - logo: 로고/타이틀 영역
    // - nav > ul: 네비게이션 메뉴 (나중에 채워짐)
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

    // 자주 사용할 DOM 요소 참조 저장
    this.headerEl = document.getElementById("main-header");
    this.navListEl = document.getElementById(this.config.navListId);
  }

  /**
   * import된 JSON에서 섹션 데이터 로드
   * - fetch 대신 빌드 타임에 번들링된 JSON 사용
   * - 동기 방식으로 즉시 데이터 사용 가능
   */
  private loadSections(): void {
    try {
      // import된 sectionsData에서 sections 배열 추출
      // 타입 안전성을 위해 as 캐스팅 사용
      const data = sectionsData as { sections: HeaderSection[] };
      
      // sections 배열 저장 (없으면 빈 배열)
      this.sections = data.sections ?? [];
      
      // 디버깅용 로그
      console.log("[Header] Loaded sections:", this.sections);
      
    } catch (err) {
      // 에러 발생 시 콘솔에 출력하고 빈 배열로 설정
      console.error("[Header] Failed to load sections", err);
      this.sections = [];
    }
  }

  /**
   * 네비게이션 메뉴 HTML 렌더링
   * - 로드된 sections 데이터 기반으로 <li> 항목 생성
   * - 아이콘이 있는 경우 <i> 태그도 포함
   */
  private renderNav(): void {
    // navListEl이 없으면 종료
    if (!this.navListEl) return;
    
    // sections 배열을 순회하며 HTML 문자열 생성
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
      .join("");  // 배열을 하나의 문자열로 합침
    
    // 생성된 링크 요소들을 배열로 저장 (이벤트 바인딩 및 스크롤 스파이에 사용)
    this.links = [...this.navListEl.querySelectorAll<HTMLElement>("a")];
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
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        // 기본 앵커 점프 동작 방지
        e.preventDefault();
        
        // data-section 속성에서 타겟 섹션 id 추출
        const id = link.dataset.section;
        if (!id) return;

        // 타겟 섹션 DOM 요소 찾기
        const section = document.getElementById(id);
        if (!section) return;

        // 헤더 높이 계산 (고정 헤더 때문에 오프셋 필요)
        const headerHeight = this.headerEl?.offsetHeight || 72;
        
        // 섹션 위치에서 헤더 높이만큼 빼서 정확한 위치 계산
        const targetPosition = section.offsetTop - headerHeight;
        
        // 부드러운 스크롤로 이동
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 프라이빗 메서드 - 스크롤 스파이 (Private Methods - Scroll Spy)
  // ---------------------------------------------------------------------------

  /**
   * 스크롤 스파이 설정
   * - IntersectionObserver를 사용하여 현재 보이는 섹션 감지
   * - 해당 섹션의 네비게이션 링크에 active 클래스 추가
   */
  private setupScrollSpy(): void {
    // 페이지 내 모든 섹션 요소 선택 (id 속성이 있는 section만)
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    
    // 섹션이 없으면 종료
    if (!sections.length) return;
    
    // 기존 옵저버가 있으면 해제
    this.observer?.disconnect();
    
    // 새 IntersectionObserver 생성
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 섹션이 화면에 들어오면 해당 링크 활성화
          if (entry.isIntersecting) {
            this.setActive(entry.target.id);
          }
        });
      },
      { 
        // threshold: 요소의 몇 %가 보여야 콜백 실행할지
        threshold: this.config.spyThreshold,
        
        // rootMargin: 감지 영역 조정
        // 상단 20% 무시, 하단 60% 무시 → 화면 중앙 부근의 섹션만 감지
        rootMargin: "-20% 0px -60% 0px"
      }
    );
    
    // 모든 섹션에 옵저버 연결
    sections.forEach((s) => this.observer!.observe(s));
  }

  /**
   * 특정 섹션의 네비게이션 링크를 활성 상태로 설정
   * @param id - 활성화할 섹션의 id
   */
  private setActive(id: string): void {
    this.links.forEach((link) => {
      // data-section 속성이 현재 id와 일치하면 active 클래스 추가, 아니면 제거
      link.classList.toggle(
        this.config.activeClass,
        link.dataset.section === id
      );
    });
  }

  // ---------------------------------------------------------------------------
  // 프라이빗 메서드 - 스크롤 숨김 (Private Methods - Scroll Hide)
  // ---------------------------------------------------------------------------

  /**
   * 스크롤 방향에 따른 헤더 숨김/표시 설정
   * - 아래로 스크롤: 헤더 숨김 (콘텐츠에 집중)
   * - 위로 스크롤: 헤더 표시 (네비게이션 접근)
   * - 최상단: 항상 표시
   */
  private setupScrollHide(): void {
    // 헤더 요소가 없으면 종료
    if (!this.headerEl) return;

    // 초기 상태: 헤더 표시
    this.headerEl.classList.add("header--visible");

    // 스크롤 이벤트 리스너 등록
    // passive: true → 성능 최적화 (브라우저에게 preventDefault 안 쓴다고 알림)
    window.addEventListener(
      "scroll",
      () => {
        const currentY = window.scrollY;

        // 최상단에서는 항상 헤더 표시
        if (currentY <= 0) {
          this.headerEl!.classList.remove("header--hidden");
          this.headerEl!.classList.add("header--visible");
          this.lastScrollY = currentY;
          return;
        }

        // 스크롤 방향 감지 및 헤더 상태 변경
        if (currentY > this.lastScrollY) {
          // 아래로 스크롤 → 헤더 숨김
          this.headerEl!.classList.add("header--hidden");
          this.headerEl!.classList.remove("header--visible");
        } else {
          // 위로 스크롤 → 헤더 표시
          this.headerEl!.classList.remove("header--hidden");
          this.headerEl!.classList.add("header--visible");
        }

        // 현재 스크롤 위치 저장 (다음 비교용)
        this.lastScrollY = currentY;
      },
      { passive: true }
    );
  }

  /**
   * 헤더 가시성 업데이트 (대체 구현)
   * - scrollThreshold를 사용한 더 정교한 스크롤 감지
   * - 작은 스크롤 움직임은 무시하여 떨림 방지
   * 
   * 참고: 현재는 setupScrollHide()가 사용됨
   *       필요시 이 메서드로 교체 가능
   */
  private updateHeaderVisibility(): void {
    // 헤더 요소가 없으면 종료
    if (!this.headerEl) return;

    const currentScrollY = window.scrollY;
    
    // 최상단에서는 항상 헤더 표시
    if (currentScrollY <= 0) {
      this.headerEl.classList.remove("header--hidden");
      this.headerEl.classList.add("header--visible");
      this.lastScrollY = currentScrollY;
      return;
    }

    // 스크롤 변화량 계산
    const scrollDelta = currentScrollY - this.lastScrollY;
    
    // 작은 움직임은 무시 (떨림 방지)
    if (Math.abs(scrollDelta) < this.config.scrollThreshold) {
      return;
    }

    if (scrollDelta > 0 && currentScrollY > this.config.scrollThreshold) {
      // 아래로 스크롤 & 임계값 이상 스크롤됨 → 헤더 숨김
      this.headerEl.classList.add("header--hidden");
      this.headerEl.classList.remove("header--visible");
    } else {
      // 위로 스크롤 → 헤더 표시
      this.headerEl.classList.remove("header--hidden");
      this.headerEl.classList.add("header--visible");
    }

    // 현재 스크롤 위치 저장
    this.lastScrollY = currentScrollY;
  }
}

// =============================================================================
// 싱글톤 인스턴스 관리 (Singleton Instance Management)
// =============================================================================

/**
 * Header 싱글톤 인스턴스
 * - 페이지 내에 하나의 헤더만 존재하도록 보장
 * - SPA 환경에서 중복 초기화 방지
 */
let instance: Header | null = null;

/**
 * 헤더 초기화 함수 (권장 사용법)
 * - 싱글톤 패턴으로 Header 인스턴스 생성 및 초기화
 * - 이미 인스턴스가 있으면 기존 인스턴스 반환
 * 
 * @param config - 선택적 설정 객체
 * @returns Header - 초기화된 Header 인스턴스
 * 
 * @example
 * // 기본 설정으로 초기화
 * const header = initHeader();
 * 
 * // 커스텀 설정으로 초기화
 * const header = initHeader({
 *   hideOnScrollDown: false,
 *   scrollThreshold: 50
 * });
 */
export function initHeader(config?: Partial<HeaderConfig>): Header {
  if (!instance) {
    instance = new Header(config);
    instance.init();
  }
  return instance;
}

/**
 * 헤더 인스턴스 제거 함수
 * - SPA에서 페이지 전환 시 정리용
 * - 이벤트 리스너 및 옵저버 해제
 * 
 * @example
 * // 페이지 언마운트 시
 * destroyHeader();
 */
export function destroyHeader(): void {
  instance?.destroy();
  instance = null;
}

// Header 클래스도 export (필요시 직접 인스턴스 생성 가능)
export { Header };