// =============================================================================
// animation.ts
// ----------------------------------------------------------------------------
// 목적:
//  - 페이지 전반의 UI 애니메이션을 중앙에서 통합 관리하는 모듈
//  - 스크롤 기반 애니메이션, 캐러셀, 카운터, 패럴랙스 등
//    반복적으로 쓰이는 인터랙션 로직을 한 곳에 모음
//
// 사용 대상:
//  - Hero / About / Portfolio / Consulting / Contact 등
//  - IntersectionObserver 기반의 진입 애니메이션
//
// 특징:
//  - DOM 의존 로직 분리
//  - 설정 기반(config) 구조
//  - SPA / 섹션 동적 로딩 환경 대응
// =============================================================================


// 애니메이션 동작을 제어하기 위한 전체 설정 인터페이스
interface AnimationConfig {
  // 스크롤 진입 시 reveal 애니메이션
  scrollReveal: {
    threshold: number;
    rootMargin: string;
    selectors: string[];
  };

  // 스킬 프로그레스 바 애니메이션
  progressBar: {
    threshold: number;
    delay: number;
  };

  // Hero 캐러셀 동작 설정
  carousel: {
    autoplayDelay: number;
    swipeThreshold: number;
  };

  // 숫자 카운터 애니메이션
  counter: {
    duration: number;
    threshold: number;
  };
}


// 기본 애니메이션 설정값 (전역 기본값)
const DEFAULT_CONFIG: AnimationConfig = {
  scrollReveal: {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    selectors: [
      ".animate-fade",
      ".animate-up",
      ".animate-scale",
      ".scroll-reveal"
    ]
  },
  progressBar: { threshold: 0.5, delay: 200 },
  carousel: { autoplayDelay: 5000, swipeThreshold: 50 },
  counter: { duration: 2000, threshold: 0.5 }
};


// 페이지 애니메이션 전체를 담당하는 메인 클래스
class Animation {
  // 병합된 최종 설정값
  private readonly config: AnimationConfig;

  // Hero 캐러셀 현재 인덱스
  private carouselIndex = 0;

  // 캐러셀 자동 재생 타이머
  private carouselTimer: ReturnType<typeof setInterval> | null = null;

  // IntersectionObserver 인스턴스 관리용
  private observers: IntersectionObserver[] = [];

  // 사용자 설정과 기본 설정 병합
  constructor(config: Partial<AnimationConfig> = {}) {
    this.config = {
      scrollReveal: { ...DEFAULT_CONFIG.scrollReveal, ...config.scrollReveal },
      progressBar: { ...DEFAULT_CONFIG.progressBar, ...config.progressBar },
      carousel: { ...DEFAULT_CONFIG.carousel, ...config.carousel },
      counter: { ...DEFAULT_CONFIG.counter, ...config.counter }
    };
  }

  // 애니메이션 초기화 진입점
  // DOMContentLoaded + sectionsLoaded 이벤트 모두 대응
  public init(): void {
    const start = () => this.setup();

    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", start)
      : start();

    // 섹션이 동적으로 로드되는 경우 대응
    document.addEventListener("sectionsLoaded", start);
  }

  // 실제 애니메이션 기능 초기화
  private setup(): void {
    this.initScrollReveal();   // 스크롤 진입 애니메이션
    this.initProgressBars();   // 프로그레스 바
    this.initCarousel();       // Hero 캐러셀
    this.initCounters();       // 숫자 카운터
    this.initParallax();       // 패럴랙스 스크롤
    this.initTextReveal();     // 텍스트 타이핑 효과

    console.log("Animations initialized");
  }

  // 모든 옵저버 / 타이머 정리 (SPA 전환 대비)
  public destroy(): void {
    this.observers.forEach(o => o.disconnect());
    this.observers = [];

    if (this.carouselTimer) clearInterval(this.carouselTimer);

    console.log("Animations destroyed");
  }


  // ---------------------------------------------------------------------------
  // Scroll Reveal
  // - 요소가 뷰포트에 진입할 때 클래스 부여
  // ---------------------------------------------------------------------------
  private initScrollReveal(): void {
    const { threshold, rootMargin, selectors } = this.config.scrollReveal;

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;

          // data-delay가 있으면 transition delay 적용
          if (el.dataset.delay) {
            el.style.transitionDelay = `${el.dataset.delay}ms`;
          }

          // CSS 애니메이션 트리거
          el.classList.add("visible", "revealed");

          observer.unobserve(el);
        }),
      { threshold, rootMargin }
    );

    document
      .querySelectorAll(selectors.join(","))
      .forEach(el => observer.observe(el));

    this.observers.push(observer);
  }


  // ---------------------------------------------------------------------------
  // Progress Bar
  // - 스킬 바가 화면에 들어오면 width 애니메이션
  // ---------------------------------------------------------------------------
  private initProgressBars(): void {
    const { threshold, delay } = this.config.progressBar;
    const bars = document.querySelectorAll<HTMLElement>(
      ".progress-bar[data-width]"
    );

    if (!bars.length) return;

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const bar = entry.target as HTMLElement;

          setTimeout(() => {
            bar.style.width = bar.dataset.width || "0";
          }, delay);

          observer.unobserve(bar);
        }),
      { threshold }
    );

    bars.forEach(el => observer.observe(el));
    this.observers.push(observer);
  }


  // ---------------------------------------------------------------------------
  // Carousel (Hero)
  // - 자동 재생, 버튼, 스와이프 지원
  // ---------------------------------------------------------------------------
  private initCarousel(): void {
    const root = document.querySelector<HTMLElement>(".hero-carousel");
    if (!root) return;

    const slides = root.querySelectorAll<HTMLElement>(".carousel-slide");
    const dots = root.querySelectorAll<HTMLElement>(".carousel-indicator");
    const prev = root.querySelector<HTMLElement>(".carousel-nav.prev");
    const next = root.querySelector<HTMLElement>(".carousel-nav.next");

    if (!slides.length) return;

    const total = slides.length;

    // 특정 슬라이드 활성화
    const show = (i: number) => {
      slides.forEach(s => s.classList.remove("active"));
      dots.forEach(d => d.classList.remove("active"));

      slides[i].classList.add("active");
      dots[i]?.classList.add("active");

      // 슬라이드 내 프로그레스 바 초기화
      slides[i]
        .querySelectorAll<HTMLElement>(".progress-bar[data-width]")
        .forEach(bar => {
          bar.style.width = "0";
          setTimeout(() => {
            bar.style.width = bar.dataset.width || "0";
          }, 10);
        });
    };

    const nextSlide = () => {
      this.carouselIndex = (this.carouselIndex + 1) % total;
      show(this.carouselIndex);
    };

    const prevSlideFn = () => {
      this.carouselIndex = (this.carouselIndex - 1 + total) % total;
      show(this.carouselIndex);
    };

    // 자동 재생
    this.carouselTimer = setInterval(
      nextSlide,
      this.config.carousel.autoplayDelay
    );

    // 버튼 이벤트
    next?.addEventListener("click", nextSlide);
    prev?.addEventListener("click", prevSlideFn);

    // 인디케이터 클릭
    dots.forEach((d, i) =>
      d.addEventListener("click", () => {
        this.carouselIndex = i;
        show(i);
      })
    );

    // 터치 스와이프
    let startX = 0;
    root.addEventListener(
      "touchstart",
      e => (startX = e.touches[0].clientX),
      { passive: true }
    );

    root.addEventListener(
      "touchend",
      e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > this.config.carousel.swipeThreshold) {
          diff > 0 ? nextSlide() : prevSlideFn();
        }
      },
      { passive: true }
    );

    show(0);
  }


  // ---------------------------------------------------------------------------
  // Counter
  // - 숫자 증가 애니메이션
  // ---------------------------------------------------------------------------
  private initCounters(): void {
    const { threshold, duration } = this.config.counter;
    const items = document.querySelectorAll<HTMLElement>("[data-count]");

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.count || "0", 10);
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";

          this.animateCounter(el, target, duration, prefix, suffix);
          observer.unobserve(el);
        }),
      { threshold }
    );

    items.forEach(el => observer.observe(el));
    this.observers.push(observer);
  }

  // 실제 숫자 증가 애니메이션 처리
  private animateCounter(
    el: HTMLElement,
    target: number,
    duration: number,
    prefix: string,
    suffix: string
  ) {
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      const value = Math.floor(target * eased);

      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }


  // ---------------------------------------------------------------------------
  // Parallax
  // - 스크롤 위치에 따라 배경 이동
  // ---------------------------------------------------------------------------
  private initParallax(): void {
    const els = document.querySelectorAll<HTMLElement>("[data-parallax]");
    if (!els.length) return;

    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      els.forEach(el => {
        const speed = parseFloat(el.dataset.parallax || "0.5");
        el.style.transform = `translate3d(0, ${-(y * speed)}px, 0)`;
      });
    };

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    });
  }


  // ---------------------------------------------------------------------------
  // Text Reveal
  // - 글자를 하나씩 나타내는 효과
  // ---------------------------------------------------------------------------
  private initTextReveal(): void {
    const items = document.querySelectorAll<HTMLElement>("[data-text-reveal]");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          this.revealText(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }),
      { threshold: 0.5 }
    );

    items.forEach(i => observer.observe(i));
    this.observers.push(observer);
  }

  // 실제 텍스트 분해 및 reveal 처리
  private revealText(el: HTMLElement): void {
    const text = el.textContent || "";
    const delay = parseInt(el.dataset.textRevealDelay || "50", 10);

    el.textContent = "";
    el.style.visibility = "visible";

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      span.style.transition = `opacity 0.3s ease ${i * delay}ms`;

      el.appendChild(span);
      requestAnimationFrame(() => {
        span.style.opacity = "1";
      });
    });
  }
}


// -----------------------------------------------------------------------------
// Singleton 인스턴스
// - 페이지 전역에서 하나만 사용
// -----------------------------------------------------------------------------
export const animationInstance = new Animation();
animationInstance.init();

export { Animation };
export type { AnimationConfig };
