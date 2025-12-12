/**
 * revealObserver.ts
 * 스크롤 진입 시 애니메이션을 적용하는 IntersectionObserver 유틸
 */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible", "revealed");
        }
    });
}, { threshold: 0.15 });
/**
 * 특정 요소들에 reveal observer 등록
 */
export function attachRevealObserver() {
    document
        .querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal")
        .forEach((el) => revealObserver.observe(el));
}
