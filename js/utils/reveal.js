// src/ts/utils/reveal.ts
/**
 * reveal.ts
 * 스크롤 애니메이션 IntersectionObserver 유틸
 */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible", "revealed");
        }
    });
}, { threshold: 0.15 });
/**
 * 지정된 CSS 애니메이션 클래스가 붙은 엘리먼트들에 Observer 연결
 */
export function attachRevealObserver() {
    document
        .querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal")
        .forEach((el) => revealObserver.observe(el));
}
