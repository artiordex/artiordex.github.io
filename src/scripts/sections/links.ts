/**
 * links.ts
 * Links Hub 섹션 렌더링
 * - CTA 스타일 히어로
 * - 2열 노트북 레이아웃
 */

import linksJson from "@/data/links.json";
import type { LinksData, LinksCategory, LinkItem } from "@/scripts/data.types";
import { attachRevealObserver } from "@/scripts/utils/reveal";

const linksData = linksJson as LinksData;

export function renderLinks(): void {
  const root = document.getElementById("links");
  if (!root) return;

  root.className = "";  // 섹션 클래스 제거 (히어로가 직접 배경 처리)

  const { hero, intro, categories, cta } = linksData;
  const heroData = hero || intro;  // 하위 호환

  root.innerHTML = `
    <!-- 히어로 CTA -->
    ${heroData ? renderHero(heroData) : ''}

    <!-- 노트북 섹션 -->
    <div class="section section--white">
      <div class="section__inner">
        <div class="links-notebook animate-fade-in">
          <!-- 노트북 스파인 -->
          <div class="notebook-spine"></div>
          
          <!-- 노트북 링 -->
          <div class="notebook-rings">
            ${Array(8).fill('<div class="notebook-ring"></div>').join('')}
          </div>

          <!-- 2열 페이지 -->
          <div class="notebook-pages">
            ${categories.map((cat, i) => renderNotebookPage(cat, i)).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 CTA -->
    ${cta ? renderBottomCTA(cta) : ''}
  `;

  attachRevealObserver();
}

/**
 * 히어로 CTA 렌더링
 */
function renderHero(hero: LinksData['hero']): string {
  if (!hero) return '';

  return `
    <div class="links-hero">
      <div class="links-hero__bg"></div>
      <div class="links-hero__content">
        <div class="links-hero__icon animate-fade-in">
          <i class="${hero.icon || 'ri-links-line'}"></i>
        </div>
        <h1 class="links-hero__title animate-fade-in animate-delay-1">${hero.title}</h1>
        <p class="links-hero__subtitle animate-fade-in animate-delay-2">${hero.subtitle}</p>
        <div class="links-hero__scroll animate-fade-in animate-delay-3">
          <i class="ri-arrow-down-line"></i>
        </div>
      </div>
    </div>
  `;
}

/**
 * 노트북 페이지 렌더링
 */
function renderNotebookPage(category: LinksCategory, index: number): string {
  const isLeft = index % 2 === 0;
  
  return `
    <div class="notebook-page ${isLeft ? 'notebook-page--left' : 'notebook-page--right'}">
      <!-- 페이지 헤더 -->
      <div class="notebook-page__header">
        <div class="notebook-page__icon" style="background: ${getGradient(index)}">
          <i class="${category.icon || 'ri-folder-line'}"></i>
        </div>
        <div class="notebook-page__info">
          <h3 class="notebook-page__title">${category.title}</h3>
          <span class="notebook-page__count">${category.links.length} links</span>
        </div>
      </div>

      <!-- 구분선 -->
      <div class="notebook-page__divider"></div>

      <!-- 링크 목록 -->
      <ul class="notebook-page__links">
        ${category.links.map((item, i) => renderLinkItem(item, i)).join('')}
      </ul>

      <!-- 페이지 번호 -->
      <div class="notebook-page__number">${String(index + 1).padStart(2, '0')}</div>
    </div>
  `;
}

/**
 * 링크 아이템 렌더링
 */
function renderLinkItem(item: LinkItem, index: number): string {
  return `
    <li class="notebook-link">
      <a href="${item.url}" target="_blank" rel="noopener noreferrer">
        <span class="notebook-link__bullet" style="background: ${item.color}"></span>
        <span class="notebook-link__icon" style="color: ${item.color}">
          <i class="${item.icon}"></i>
        </span>
        <span class="notebook-link__text">
          <span class="notebook-link__label">${item.label}</span>
          ${item.description ? `<span class="notebook-link__desc">${item.description}</span>` : ''}
        </span>
        <i class="ri-external-link-line notebook-link__external"></i>
      </a>
    </li>
  `;
}

/**
 * 하단 CTA 렌더링
 */
function renderBottomCTA(cta: LinksData['cta']): string {
  if (!cta) return '';
  
  return `
    <div class="links-cta">
      <div class="links-cta__inner">
        <div class="links-cta__icon">
          <i class="ri-chat-smile-3-line"></i>
        </div>
        <h2 class="links-cta__title">${cta.title}</h2>
        <p class="links-cta__subtitle">${cta.subtitle}</p>
        <a href="${cta.button.link}" class="links-cta__btn">
          ${cta.button.icon ? `<i class="${cta.button.icon}"></i>` : ''}
          ${cta.button.label}
        </a>
      </div>
    </div>
  `;
}

/**
 * 그라데이션 색상
 */
function getGradient(index: number): string {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  ];
  return gradients[index % gradients.length];
}