/**
 * company.ts
 * 회사 소개 섹션 렌더링
 * - CTA 히어로
 * - 서비스 소개
 * - 솔루션 라인업
 * - 타임라인
 * - 비전 & 철학
 * - 클로징 CTA
 */

import companyJson from "@/data/company.json";
import type { 
  CompanyData, 
  CompanyService, 
  CompanySolution, 
  CompanyTimelineItem, 
  CompanyVisionItem 
} from "@/scripts/data.types";
import { attachRevealObserver } from "@/scripts/utils/reveal";

const companyData = companyJson as CompanyData;

export function renderCompany(): void {
  const root = document.getElementById("company");
  if (!root) return;

  root.className = "";

  const { hero, services, solutions, timeline, vision, closing } = companyData;

  root.innerHTML = `
    <!-- 히어로 CTA -->
    ${hero ? renderHero(hero) : ''}

    <!-- 서비스 섹션 -->
    ${services ? renderServices(services) : ''}

    <!-- 솔루션 섹션 -->
    ${solutions ? renderSolutions(solutions) : ''}

    <!-- 타임라인 섹션 -->
    ${timeline ? renderTimeline(timeline) : ''}

    <!-- 비전 섹션 -->
    ${vision ? renderVision(vision) : ''}
  `;

  attachRevealObserver();
}

/* ============================================
   HERO SECTION
   ============================================ */
function renderHero(hero: CompanyData['hero']): string {
  if (!hero) return '';

  return `
    <div class="company-hero">
      <div class="company-hero__bg"></div>
      <div class="company-hero__content">
        <div class="company-hero__icon animate-fade-in">
          <i class="${hero.icon || 'ri-building-4-line'}"></i>
        </div>
        <h1 class="company-hero__title animate-fade-in animate-delay-1">${hero.title}</h1>
        <p class="company-hero__subtitle animate-fade-in animate-delay-2">${hero.subtitle}</p>
        ${hero.cta ? `
          <a href="${hero.cta.link}" class="company-hero__btn animate-fade-in animate-delay-3">
            ${hero.cta.icon ? `<i class="${hero.cta.icon}"></i>` : ''}
            ${hero.cta.label}
          </a>
        ` : ''}
      </div>
    </div>
  `;
}

/* ============================================
   SERVICES SECTION
   ============================================ */
function renderServices(services: CompanyData['services']): string {
  if (!services) return '';

  return `
    <div class="section section--light">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">${services.title}</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">${services.subtitle}</p>
        </header>

        <div class="company-services">
          ${services.items.map((item, i) => renderServiceCard(item, i)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderServiceCard(service: CompanyService, index: number): string {
  const isFeatureObject = (f: any): f is { name: string; desc: string } => 
    typeof f === 'object' && f.name;

  return `
    <div class="company-service-card animate-fade-in animate-delay-${index + 1}">
      <div class="company-service-card__icon company-service-card__icon--${service.color}">
        <i class="${service.icon}"></i>
      </div>
      <h3 class="company-service-card__title">${service.title}</h3>
      <ul class="company-service-card__list">
        ${service.features.map(f => `
          <li>
            <span class="company-service-card__bullet company-service-card__bullet--${service.color}"></span>
            ${isFeatureObject(f) ? `<strong>${f.name}:</strong> ${f.desc}` : f}
          </li>
        `).join('')}
      </ul>
      <p class="company-service-card__desc">${service.description}</p>
    </div>
  `;
}

/* ============================================
   SOLUTIONS SECTION
   ============================================ */
function renderSolutions(solutions: CompanyData['solutions']): string {
  if (!solutions) return '';

  return `
    <div class="section section--white">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">${solutions.title}</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">${solutions.subtitle}</p>
        </header>

        <div class="company-solutions">
          ${solutions.items.map((item, i) => renderSolutionCard(item, i)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderSolutionCard(solution: CompanySolution, index: number): string {
  return `
    <div class="company-solution-card animate-fade-in animate-delay-${index + 1}">
      <div class="company-solution-card__header">
        <div class="company-solution-card__icon company-solution-card__icon--${solution.color}">
          <i class="${solution.icon}"></i>
        </div>
        <div class="company-solution-card__info">
          <h3 class="company-solution-card__name">${solution.name}</h3>
          <span class="company-solution-card__tagline">${solution.tagline}</span>
        </div>
      </div>
      <p class="company-solution-card__desc">${solution.description}</p>
      <div class="company-solution-card__features">
        ${solution.features.map(f => `
          <span class="company-solution-card__feature">${f}</span>
        `).join('')}
      </div>
    </div>
  `;
}

/* ============================================
   TIMELINE SECTION
   ============================================ */
function renderTimeline(timeline: CompanyData['timeline']): string {
  if (!timeline) return '';

  return `
    <div class="section section--light">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">${timeline.title}</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">${timeline.subtitle}</p>
        </header>

        <div class="company-timeline">
          <div class="company-timeline__line"></div>
          <div class="company-timeline__items">
            ${timeline.items.map((item, i) => renderTimelineItem(item, i)).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTimelineItem(item: CompanyTimelineItem, index: number): string {
  return `
    <div class="company-timeline-item animate-fade-in animate-delay-${index + 1}">
      <div class="company-timeline-item__marker company-timeline-item__marker--${item.color}">
        <span>${item.year.slice(-2)}</span>
      </div>
      <div class="company-timeline-item__card">
        <h3 class="company-timeline-item__year">${item.year}</h3>
        <p class="company-timeline-item__desc">${item.description}</p>
      </div>
    </div>
  `;
}

/* ============================================
   VISION SECTION
   ============================================ */
function renderVision(vision: CompanyData['vision']): string {
  if (!vision) return '';

  return `
    <div class="section section--white">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">${vision.title}</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">${vision.subtitle}</p>
        </header>

        <div class="company-vision">
          ${vision.items.map((item, i) => renderVisionCard(item, i)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderVisionCard(item: CompanyVisionItem, index: number): string {
  return `
    <div class="company-vision-card animate-fade-in animate-delay-${index + 1}">
      <div class="company-vision-card__icon company-vision-card__icon--${item.color}">
        <i class="${item.icon}"></i>
      </div>
      <h3 class="company-vision-card__title">${item.title}</h3>
      <p class="company-vision-card__desc">${item.description}</p>
    </div>
  `;
}