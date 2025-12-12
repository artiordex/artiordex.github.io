/**
 * consulting.ts
 * 컨설팅 섹션 렌더링 모듈
 */
import consultingJson from "@/data/consulting.json";
import { attachRevealObserver } from "@/ts/utils/reveal";
/* JSON 데이터 타입 적용 */
const consultingData = consultingJson;
/**
 * 컨설팅 섹션 렌더링
 */
export function renderConsulting() {
    const data = consultingData;
    const titleEl = document.getElementById("consulting-intro-title");
    const subtitleEl = document.getElementById("consulting-intro-subtitle");
    const visionEl = document.getElementById("consulting-vision-cards");
    const principlesEl = document.getElementById("consulting-principles");
    /* 제목 & 서브타이틀 */
    if (titleEl)
        titleEl.textContent = data.intro.title;
    if (subtitleEl)
        subtitleEl.textContent = data.intro.subtitle;
    /* 비전 카드 (Vision Cards) */
    if (visionEl && data.visionCards) {
        visionEl.innerHTML = data.visionCards
            .map((card) => `
          <div class="vision-card vision-card--${card.color} animate-fade-in animate-delay-${card.delay || 1}">
            <div class="vision-card__icon">
              <i class="${card.icon}"></i>
            </div>
            <h3 class="vision-card__title">${card.title}</h3>
            <p class="vision-card__desc">${card.description}</p>
          </div>
      `)
            .join("");
    }
    /* 운영 원칙 (Principles) */
    if (principlesEl && data.principles) {
        principlesEl.innerHTML = `
      <h3 class="principles__title">${data.principles.title}</h3>
      <div class="principles__grid">
        ${data.principles.items
            .map((item) => `
              <div class="principle-card principle-card--${item.color}">
                <div class="principle-card__icon">
                  <i class="${item.icon}"></i>
                </div>
                <h4 class="principle-card__title">${item.title}</h4>
                <p class="principle-card__desc">${item.description}</p>
              </div>
            `)
            .join("")}
      </div>
    `;
    }
    // 등장 애니메이션 등록
    attachRevealObserver();
}
