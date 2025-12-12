// carousel.ts
// 기본 캐러셀 기능: 자동재생, 버튼 이동, 인디케이터 이동, 터치 스와이프

export interface CarouselOptions {
  autoplayDelay?: number; // 자동재생 딜레이
  swipeThreshold?: number; // 터치 스와이프 민감도
}

export class Carousel {
  private readonly container: HTMLElement;                 // 캐러셀 최상위 요소
  private readonly slides: HTMLElement[];                  // 전체 슬라이드
  private readonly indicators: HTMLElement[];              // 인디케이터
  private readonly prevBtn: HTMLElement | null;            // 이전 버튼
  private readonly nextBtn: HTMLElement | null;            // 다음 버튼

  private current = 0;                                     // 현재 슬라이드 index
  private interval: ReturnType<typeof setInterval> | null = null;
  private readonly autoplayDelay: number;
  private readonly swipeThreshold: number;

  constructor(selector: string, options: CarouselOptions = {}) {
    const root = document.querySelector(selector);
    if (!root) throw new Error(`Carousel root not found: ${selector}`);

    this.container = root as HTMLElement;
    this.slides = [...root.querySelectorAll<HTMLElement>(".carousel-slide")];
    this.indicators = [...root.querySelectorAll<HTMLElement>(".carousel-indicator")];
    this.prevBtn = root.querySelector<HTMLElement>(".carousel-prev");
    this.nextBtn = root.querySelector<HTMLElement>(".carousel-next");

    this.autoplayDelay = options.autoplayDelay ?? 5000;
    this.swipeThreshold = options.swipeThreshold ?? 50;
  }

  // 초기화
  public init(): void {
    if (this.slides.length === 0) return;

    this.showSlide(0);
    this.startAutoplay();
    this.bindButtons();
    this.bindIndicators();
    this.bindTouchEvents();

    console.log("Carousel initialized");
  }

  // 특정 슬라이드 표시
  private showSlide(index: number): void {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.indicators.forEach((ind) => ind.classList.remove("active"));

    this.slides[index].classList.add("active");
    this.indicators[index]?.classList.add("active");

    this.current = index;
  }

  // 다음 슬라이드
  private next(): void {
    const nextIndex = (this.current + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  // 이전 슬라이드
  private prev(): void {
    const prevIndex = (this.current - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
  }

  // 자동재생 시작
  private startAutoplay(): void {
    this.stopAutoplay();
    this.interval = setInterval(() => this.next(), this.autoplayDelay);
  }

  // 자동재생 정지
  private stopAutoplay(): void {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  // 버튼 이벤트 바인딩
  private bindButtons(): void {
    this.nextBtn?.addEventListener("click", () => {
      this.stopAutoplay();
      this.next();
      this.startAutoplay();
    });

    this.prevBtn?.addEventListener("click", () => {
      this.stopAutoplay();
      this.prev();
      this.startAutoplay();
    });
  }

  // 인디케이터 클릭 이동
  private bindIndicators(): void {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.stopAutoplay();
        this.showSlide(index);
        this.startAutoplay();
      });
    });
  }

  // 터치 스와이프 기능
  private bindTouchEvents(): void {
    let startX = 0;

    this.container.addEventListener("touchstart", (e) => {
      startX = e.changedTouches[0].clientX;
      this.stopAutoplay();
    });

    this.container.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > this.swipeThreshold) {
        diff > 0 ? this.next() : this.prev();
      }

      this.startAutoplay();
    });
  }

  // 외부에서 특정 슬라이드 이동 요청
  public goTo(index: number): void {
    if (index < 0 || index >= this.slides.length) return;
    this.stopAutoplay();
    this.showSlide(index);
    this.startAutoplay();
  }

  // destroy
  public destroy(): void {
    this.stopAutoplay();
    console.log("Carousel destroyed");
  }
}