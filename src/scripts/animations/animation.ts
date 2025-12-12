/**
 * animation.ts (Refactored Clean Version)
 * ScrollReveal / ProgressBar / Carousel / Counter / Parallax / TextReveal
 */

interface AnimationConfig {
  scrollReveal: { threshold: number; rootMargin: string; selectors: string[] };
  progressBar: { threshold: number; delay: number };
  carousel: { autoplayDelay: number; swipeThreshold: number };
  counter: { duration: number; threshold: number };
}

const DEFAULT_CONFIG: AnimationConfig = {
  scrollReveal: {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    selectors: [".animate-fade", ".animate-up", ".animate-scale", ".scroll-reveal"]
  },
  progressBar: { threshold: 0.5, delay: 200 },
  carousel: { autoplayDelay: 5000, swipeThreshold: 50 },
  counter: { duration: 2000, threshold: 0.5 }
};

class Animation {
  private readonly config: AnimationConfig;
  private carouselIndex = 0;
  private carouselTimer: ReturnType<typeof setInterval> | null = null;
  private observers: IntersectionObserver[] = [];

  constructor(config: Partial<AnimationConfig> = {}) {
    this.config = {
      scrollReveal: { ...DEFAULT_CONFIG.scrollReveal, ...config.scrollReveal },
      progressBar: { ...DEFAULT_CONFIG.progressBar, ...config.progressBar },
      carousel: { ...DEFAULT_CONFIG.carousel, ...config.carousel },
      counter: { ...DEFAULT_CONFIG.counter, ...config.counter }
    };
  }

  public init(): void {
    const start = () => this.setup();
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", start)
      : start();

    document.addEventListener("sectionsLoaded", start);
  }

  private setup(): void {
    this.initScrollReveal();
    this.initProgressBars();
    this.initCarousel();
    this.initCounters();
    this.initParallax();
    this.initTextReveal();

    console.log("Animations initialized");
  }

  public destroy(): void {
    this.observers.forEach(o => o.disconnect());
    this.observers = [];

    if (this.carouselTimer) clearInterval(this.carouselTimer);
    console.log("Animations destroyed");
  }

  /* Scroll Reveal */
  private initScrollReveal(): void {
    const { threshold, rootMargin, selectors } = this.config.scrollReveal;

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;

        if (el.dataset.delay) el.style.transitionDelay = `${el.dataset.delay}ms`;
        el.classList.add("visible", "revealed");

        observer.unobserve(el);
      }),
      { threshold, rootMargin }
    );

    document.querySelectorAll(selectors.join(",")).forEach(el => observer.observe(el));
    this.observers.push(observer);
  }

  /* Progress Bar */
  private initProgressBars(): void {
    const { threshold, delay } = this.config.progressBar;
    const bars = document.querySelectorAll<HTMLElement>(".progress-bar[data-width]");
    if (!bars.length) return;

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const bar = entry.target as HTMLElement;
        setTimeout(() => (bar.style.width = bar.dataset.width || "0"), delay);

        observer.unobserve(bar);
      }),
      { threshold }
    );

    bars.forEach(el => observer.observe(el));
    this.observers.push(observer);
  }

  /* Carousel */
  private initCarousel(): void {
    const root = document.querySelector<HTMLElement>(".hero-carousel");
    if (!root) return;

    const slides = root.querySelectorAll<HTMLElement>(".carousel-slide");
    const dots = root.querySelectorAll<HTMLElement>(".carousel-indicator");
    const prev = root.querySelector<HTMLElement>(".carousel-nav.prev");
    const next = root.querySelector<HTMLElement>(".carousel-nav.next");

    if (!slides.length) return;

    const total = slides.length;
    const show = (i: number) => {
      slides.forEach(s => s.classList.remove("active"));
      dots.forEach(d => d.classList.remove("active"));

      slides[i].classList.add("active");
      dots[i]?.classList.add("active");

      slides[i].querySelectorAll<HTMLElement>(".progress-bar[data-width]").forEach(bar => {
        bar.style.width = "0";
        setTimeout(() => (bar.style.width = bar.dataset.width || "0"), 10);
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

    /* autoplay */
    this.carouselTimer = setInterval(nextSlide, this.config.carousel.autoplayDelay);

    next?.addEventListener("click", () => nextSlide());
    prev?.addEventListener("click", () => prevSlideFn());

    dots.forEach((d, i) =>
      d.addEventListener("click", () => {
        this.carouselIndex = i;
        show(i);
      })
    );

    /* swipe */
    let startX = 0;
    root.addEventListener("touchstart", e => (startX = e.touches[0].clientX), { passive: true });
    root.addEventListener(
      "touchend",
      e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > this.config.carousel.swipeThreshold)
          diff > 0 ? nextSlide() : prevSlideFn();
      },
      { passive: true }
    );

    show(0);
  }

  /* Counter */
  private initCounters(): void {
    const { threshold, duration } = this.config.counter;
    const items = document.querySelectorAll<HTMLElement>("[data-count]");

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target as HTMLElement;
        const target = Number.parseInt(el.dataset.count || "0", 10);
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

  /* Parallax */
  private initParallax(): void {
    const els = document.querySelectorAll<HTMLElement>("[data-parallax]");
    if (!els.length) return;

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      els.forEach(el => {
        const speed = Number.parseFloat(el.dataset.parallax || "0.5");
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

  /* Text Reveal */
  private initTextReveal(): void {
    const items = document.querySelectorAll<HTMLElement>("[data-text-reveal]");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        this.revealText(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }),
      { threshold: 0.5 }
    );

    items.forEach(i => observer.observe(i));
    this.observers.push(observer);
  }

  private revealText(el: HTMLElement): void {
    const text = el.textContent || "";
    const delay = Number.parseInt(el.dataset.textRevealDelay || "50", 10);

    el.textContent = "";
    el.style.visibility = "visible";

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      span.style.transition = `opacity 0.3s ease ${i * delay}ms`;

      el.appendChild(span);
      requestAnimationFrame(() => (span.style.opacity = "1"));
    });
  }
}

/* Singleton instance */
export const animationInstance = new Animation();
animationInstance.init();

export { Animation };
export type { AnimationConfig };
