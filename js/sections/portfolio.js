// src/ts/sections/portfolio.ts
/**
 * portfolio.ts
 * 포트폴리오 섹션 렌더링 모듈
 */
import portfolioJson from "@data/portfolio.json";
import { attachRevealObserver } from "@ts/utils/reveal";
// JSON → 타입 캐스팅
const portfolioData = portfolioJson;
/**
 * Portfolio 영역 렌더링
 */
export function renderPortfolio() {
    const data = portfolioData;
    const titleEl = document.getElementById("portfolio-intro-title");
    const subtitleEl = document.getElementById("portfolio-intro-subtitle");
    const servicesEl = document.getElementById("portfolio-services");
    const processEl = document.getElementById("portfolio-process");
    // Intro Title
    if (titleEl) {
        titleEl.textContent = data.intro.title;
    }
    if (subtitleEl) {
        subtitleEl.textContent = data.intro.subtitle;
    }
    // Services
    if (servicesEl && data.services) {
        servicesEl.innerHTML = data.services
            .map((service, i) => `
        <div class="service-card service-card--${service.color} animate-scale-in animate-delay-${i + 1}">
          <div class="service-card__icon">
            <i class="${service.icon}"></i>
          </div>
          <h3 class="service-card__title">${service.title}</h3>
          <p class="service-card__desc">${service.description}</p>
          <ul class="service-card__features">
            ${service.features
            .map((f) => `<li><i class="ri-check-line"></i>${f}</li>`)
            .join("")}
          </ul>
        </div>
      `)
            .join("");
    }
    // Process section
    if (processEl && data.process) {
        processEl.innerHTML = `
      <h3 class="process__title">${data.process.title}</h3>
      <div class="process__steps">
        ${data.process.steps
            .map((step) => `
            <div class="process-step process-step--${step.color}">
              <div class="process-step__icon">
                <i class="${step.icon}"></i>
              </div>
              <h4 class="process-step__label">${step.label}</h4>
              <p class="process-step__desc">${step.description}</p>
            </div>
          `)
            .join("")}
      </div>
    `;
    }
    // scroll reveal
    attachRevealObserver();
}
