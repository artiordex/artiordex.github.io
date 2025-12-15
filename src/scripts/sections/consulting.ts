/**
 * consulting.ts
 * 컨설팅 섹션 렌더링 (section#consulting 직접 사용)
 * SVG 제거 버전 / 텍스트 아이콘 화살표 사용
 */

import consultingJson from "@/data/consulting.json";
import type { ConsultingData } from "@/scripts/data.types";
import { attachRevealObserver } from "@/scripts/utils/reveal";

// JSON 데이터를 타입으로 단언
const consultingData = consultingJson as unknown as ConsultingData;

export function renderConsulting(): void {
  console.group("[renderConsulting] start");

  /* =========================
     Section Guard
  ========================= */
  const sectionEl = document.getElementById("consulting");
  if (!sectionEl) {
    console.warn("❌ #consulting section not found. render aborted.");
    console.groupEnd();
    return;
  }

  const data = consultingData;
  if (!data?.header) {
    console.error("❌ data.header is missing");
    console.groupEnd();
    return;
  }

  const safeArray = <T>(arr: T[] | undefined): T[] =>
    Array.isArray(arr) ? arr : [];

  const problems = safeArray(data.problems);
  const services = safeArray(data.services);
  const process = safeArray(data.process);

  /* =========================
     Hero Section
  ========================= */
  const heroSection = `
    <section class="hero-section animate-fade-in">
      <div class="container">
        <div class="hero-card animate-scale-in">
          <h1 class="hero-title">${data.header.title}</h1>
          <p class="hero-slogan">${data.header.slogan}</p>
          <p class="hero-description">${data.header.description}</p>
        </div>
      </div>
    </section>
  `;

  /* =========================
     Tabs + Contents
  ========================= */
  const tabbedSection = `
    <section class="section consulting-tabs-section">
      <div class="container">

        <!-- Tabs -->
        <div class="consulting-tabs">
          <button class="consulting-tab active" data-tab="problems">
            <i class="ri-lightbulb-line"></i>
            <span>무엇을 해결하는가</span>
          </button>
          <button class="consulting-tab" data-tab="services">
            <i class="ri-service-line"></i>
            <span>서비스 라인업</span>
          </button>
          <button class="consulting-tab" data-tab="process">
            <i class="ri-flow-chart"></i>
            <span>진행 프로세스</span>
          </button>
        </div>

        <div class="consulting-tab-contents">

          <!-- Problems -->
          <div class="consulting-tab-content active" data-tab-content="problems">
            <div class="problems-grid">
              ${problems
                .map(
                  (p, i) => `
                  <div class="problem-card animate-scale-in" style="animation-delay:${i * 0.1}s">
                    <div class="problem-icon">
                      <i class="${p.icon}"></i>
                    </div>
                    <div class="problem-content">
                      <div class="problem-title">${p.problem}</div>
                      <div class="outcome-divider">→</div>
                      <div class="outcome-title">${p.outcome}</div>
                    </div>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>

          <!-- Services -->
          <div class="consulting-tab-content" data-tab-content="services">
            <div class="consulting-grid">
              ${services
                .map(
                  (s, i) => `
                  <div class="consulting-card animate-scale-in" style="animation-delay:${i * 0.1}s">
                    <div class="consulting-card__icon">
                      <i class="${s.icon}"></i>
                    </div>
                    <h3 class="consulting-card__title">${s.title}</h3>
                    <p class="consulting-card__desc">${s.description}</p>
                    <ul class="consulting-card__list">
                      ${(s.deliverables ?? [])
                        .map(
                          d => `<li><i class="ri-check-line"></i>${d}</li>`
                        )
                        .join("")}
                    </ul>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>

          <!-- Process -->
          <div class="consulting-tab-content" data-tab-content="process">
            <div class="process-card">

              <!-- Row 1 -->
              <div class="process-row">
                ${process
                  .slice(0, 4)
                  .map(
                    (step, i) => `
                    <div class="process-step">
                      <div class="process-step__icon process-step__icon--${i + 1}">
                        <i class="${step.icon}"></i>
                      </div>
                      <div class="process-step__title">${step.title}</div>
                      <div class="process-step__desc">${step.description}</div>
                    </div>
                    ${i < 3 ? `<div class="process-arrow">→</div>` : ""}
                  `
                  )
                  .join("")}
              </div>

              <!-- Down Arrow -->
              <div class="process-arrow process-arrow--down">↓</div>

              <!-- Row 2 (reverse) -->
              <div class="process-row process-row--reverse">
                ${process
                  .slice(4)
                  .reverse()
                  .map(
                    (step, i) => `
                    <div class="process-step">
                      <div class="process-step__icon process-step__icon--${6 - i}">
                        <i class="${step.icon}"></i>
                      </div>
                      <div class="process-step__title">${step.title}</div>
                      <div class="process-step__desc">${step.description}</div>
                    </div>
                    ${i < 2 ? `<div class="process-arrow">←</div>` : ""}
                  `
                  )
                  .join("")}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  `;

  /* =========================
     Inject DOM
  ========================= */
  sectionEl.innerHTML = heroSection + tabbedSection;

  initConsultingTabs();
  attachRevealObserver();

  console.groupEnd();
}

/* =========================
   Tabs Behavior
========================= */
function initConsultingTabs(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>(".consulting-tab");
  const contents =
    document.querySelectorAll<HTMLElement>(".consulting-tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      document
        .querySelector(
          `.consulting-tab-content[data-tab-content="${id}"]`
        )
        ?.classList.add("active");
    });
  });
}
