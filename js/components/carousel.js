// carousel.ts
// 기본 캐러셀 기능: 자동재생, 버튼 이동, 인디케이터 이동, 터치 스와이프
export class Carousel {
    container; // 캐러셀 최상위 요소
    slides; // 전체 슬라이드
    indicators; // 인디케이터
    prevBtn; // 이전 버튼
    nextBtn; // 다음 버튼
    current = 0; // 현재 슬라이드 index
    interval = null;
    autoplayDelay;
    swipeThreshold;
    constructor(selector, options = {}) {
        const root = document.querySelector(selector);
        if (!root)
            throw new Error(`Carousel root not found: ${selector}`);
        this.container = root;
        this.slides = [...root.querySelectorAll(".carousel-slide")];
        this.indicators = [...root.querySelectorAll(".carousel-indicator")];
        this.prevBtn = root.querySelector(".carousel-prev");
        this.nextBtn = root.querySelector(".carousel-next");
        this.autoplayDelay = options.autoplayDelay ?? 5000;
        this.swipeThreshold = options.swipeThreshold ?? 50;
    }
    // 초기화
    init() {
        if (this.slides.length === 0)
            return;
        this.showSlide(0);
        this.startAutoplay();
        this.bindButtons();
        this.bindIndicators();
        this.bindTouchEvents();
        console.log("Carousel initialized");
    }
    // 특정 슬라이드 표시
    showSlide(index) {
        this.slides.forEach((slide) => slide.classList.remove("active"));
        this.indicators.forEach((ind) => ind.classList.remove("active"));
        this.slides[index].classList.add("active");
        this.indicators[index]?.classList.add("active");
        this.current = index;
    }
    // 다음 슬라이드
    next() {
        const nextIndex = (this.current + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    // 이전 슬라이드
    prev() {
        const prevIndex = (this.current - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }
    // 자동재생 시작
    startAutoplay() {
        this.stopAutoplay();
        this.interval = setInterval(() => this.next(), this.autoplayDelay);
    }
    // 자동재생 정지
    stopAutoplay() {
        if (this.interval)
            clearInterval(this.interval);
        this.interval = null;
    }
    // 버튼 이벤트 바인딩
    bindButtons() {
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
    bindIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
                this.stopAutoplay();
                this.showSlide(index);
                this.startAutoplay();
            });
        });
    }
    // 터치 스와이프 기능
    bindTouchEvents() {
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
    goTo(index) {
        if (index < 0 || index >= this.slides.length)
            return;
        this.stopAutoplay();
        this.showSlide(index);
        this.startAutoplay();
    }
    // destroy
    destroy() {
        this.stopAutoplay();
        console.log("Carousel destroyed");
    }
}
