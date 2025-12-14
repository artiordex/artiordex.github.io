/**
 * consulting.ts
 * 컨설팅 섹션 렌더링 (section#consulting 직접 사용)
 * DEBUG ENABLED
 */

import consultingJson from "@/data/consulting.json";
import type { ConsultingData } from "@/scripts/data.types";
import { attachRevealObserver } from "@/scripts/utils/reveal";

// JSON 데이터를 타입으로 단언
const consultingData = consultingJson as unknown as ConsultingData;

export function renderConsulting(): void {
  console.group("[renderConsulting] start");

  // 1. section#consulting 확인
  const sectionEl = document.getElementById("consulting");
  console.log("section#consulting:", sectionEl);

  if (!sectionEl) {
    console.warn("❌ #consulting section not found. render aborted.");
    console.groupEnd();
    return;
  }

  // 2. 데이터 확인
  const data = consultingData;
  console.log("consultingData:", data);

  if (!data?.header) {
    console.error("❌ data.header is missing");
    console.groupEnd();
    return;
  }

  // 안전 배열 처리
  const safeArray = <T>(arr: T[] | undefined, key: string): T[] => {
    if (!Array.isArray(arr)) {
      console.warn(`⚠️ data.${key} is not an array. fallback to empty array.`);
      return [];
    }
    return arr;
  };

  const problems = safeArray(data.problems, "problems");
  const services = safeArray(data.services, "services");
  const process = safeArray(data.process, "process");

  /* =========================
     Hero Section
  ========================= */
  const heroSection = `
    <section class="hero-section animate-fade-in">
      <div class="container">
        <div class="hero-card animate-scale-in">
          <div class="hero-content">
            <h1 class="hero-title">${data.header.title ?? ""}</h1>
            <p class="hero-slogan">${data.header.slogan ?? ""}</p>
            <p class="hero-description">${data.header.description ?? ""}</p>
            <div class="hero-actions">
              <a href="#" class="btn btn-primary">
                <i class="ri-message-3-line"></i>
                상담 신청하기
              </a>
              <a href="#" class="btn btn-secondary" target="_blank">
                <i class="ri-file-text-line"></i>
                서비스 브로셔 보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  /* =========================
     Problems
  ========================= */
  const problemsSection = `
    <section class="section">
      <div class="container">
        <div class="section__header animate-slide-up">
          <h2 class="section__title">무엇을 해결하는가</h2>
          <p class="section__subtitle">
            기업이 직면한 핵심 문제들을 체계적으로 해결하여 비즈니스 성과를 극대화합니다
          </p>
        </div>
        <div class="problems-grid">
          ${problems
            .map(
              (problem, index) => `
              <div class="problem-card animate-scale-in" style="animation-delay:${index * 0.15}s">
                <div class="problem-icon">
                  <i class="${problem.icon ?? ""}"></i>
                </div>
                <div class="problem-content">
                  <div class="problem-title">${problem.problem ?? ""}</div>
                  <div class="outcome-divider">→</div>
                  <div class="outcome-title">${problem.outcome ?? ""}</div>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;

  /* =========================
     Services
  ========================= */
  const servicesSection = `
    <section class="section">
      <div class="container">
        <div class="section__header animate-slide-up">
          <h2 class="section__title">컨설팅 서비스 라인업</h2>
          <p class="section__subtitle">
            검증된 방법론과 최신 기술을 활용한 맞춤형 컨설팅 서비스를 제공합니다
          </p>
        </div>
        <div class="consulting-grid">
          ${services
            .map(
              (service, index) => `
              <div class="consulting-card animate-scale-in" style="animation-delay:${index * 0.2}s">
                <div class="consulting-card__icon consulting-card__icon--primary">
                  <i class="${service.icon ?? ""}"></i>
                </div>
                <h3 class="consulting-card__title">${service.title ?? ""}</h3>
                <p class="consulting-card__desc">${service.description ?? ""}</p>
                <ul class="consulting-card__list">
                  ${(service.deliverables ?? [])
                    .map(item => `<li><i class="ri-check-line"></i>${item}</li>`)
                    .join("")}
                </ul>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;

  /* =========================
     Process
  ========================= */
  const processSection = `
    <section class="section">
      <div class="container">
        <div class="process-card">
          <h2 class="process-card__title">컨설팅 진행 프로세스</h2>
          <div class="process-grid">
            ${process
              .map(
                (step, index) => `
                <div class="process-step animate-slide-up">
                  <div class="process-step__icon process-step__icon--${index + 1}">
                    <i class="ri-number-${index + 1}"></i>
                  </div>
                  <div class="process-step__title">${step.title ?? ""}</div>
                  <div class="process-step__desc">${step.description ?? ""}</div>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>
  `;

  /* =========================
     DOM Injection
  ========================= */
  sectionEl.innerHTML = `
    ${heroSection}
    ${problemsSection}
    ${servicesSection}
    ${processSection}
  `;

  // Reveal 애니메이션
  attachRevealObserver();

  console.log("consulting section rendered");
  console.groupEnd();
}
