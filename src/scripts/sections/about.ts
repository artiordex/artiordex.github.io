/**
 * about.ts
 * About 섹션 렌더링 통합 모듈 (전체 HTML 동적 생성)
 */

import aboutDataJson from "@/data/about.json";
import type { AboutData } from "@/scripts/data.types";

const aboutData = aboutDataJson as AboutData;

export function renderAbout(): void {
  const root = document.getElementById("about");
  if (!root) return;

  // 전체 HTML 구조 생성
  root.innerHTML = `
    <!-- 슬라이드 1: 프로필 소개 -->
    <div class="carousel-slide active" id="about-slide-profile">
      <div class="hero-inner">
        <div id="profile-section">
          <!-- 아바타 -->
          <div class="hero-avatar">
            <div id="profile-image" class="hero-avatar__image"></div>
          </div>
          
          <!-- 이름 / 직함 -->
          <h1 id="profile-name" class="hero-title"></h1>
          <p id="profile-title" class="hero-subtitle"></p>
          
          <!-- 자기소개 텍스트 -->
          <div id="profile-description" class="hero-description"></div>
          
          <!-- 하이라이트 태그들 -->
          <div id="profile-highlights" class="hero-tags"></div>
          
          <!-- 소셜 아이콘 링크 -->
          <div id="social-links" class="hero-socials"></div>
        </div>
      </div>
    </div>

    <!-- 슬라이드 2: 핵심 역량 -->
    <div class="carousel-slide" id="about-slide-skills">
      <div class="hero-inner">
        <div class="hero-skills-card">
          <h3 class="hero-skills-card__title">핵심 역량</h3>
          <div id="skills-core"></div>
        </div>
      </div>
    </div>

    <!-- 슬라이드 3: 자격증 -->
    <div class="carousel-slide" id="about-slide-cert">
      <div class="hero-inner">
        <div class="hero-skills-card">
          <h3 class="hero-skills-card__title">자격증 및 인증</h3>
          <div id="certifications-list" class="hero-cert-list"></div>
        </div>
      </div>
    </div>

    <!-- 캐러셀 네비게이션 -->
    <button class="carousel-nav prev" type="button" aria-label="이전 슬라이드">
      <i class="ri-arrow-left-line"></i>
    </button>
    <button class="carousel-nav next" type="button" aria-label="다음 슬라이드">
      <i class="ri-arrow-right-line"></i>
    </button>

    <!-- 인디케이터 -->
    <div class="carousel-indicators">
      <button class="carousel-indicator active" type="button" aria-label="슬라이드 1"></button>
      <button class="carousel-indicator" type="button" aria-label="슬라이드 2"></button>
      <button class="carousel-indicator" type="button" aria-label="슬라이드 3"></button>
    </div>
  `;

  // 데이터 렌더링
  renderProfileData();
  renderSkills();
  renderCertifications();

  // 캐러셀 초기화
  initializeCarousel();
}

/**
 * 프로필 데이터 렌더링
 */
function renderProfileData(): void {
  const profile = aboutData.profile;
  const highlights = aboutData.highlights || [];
  const socials = aboutData.socialLinks || [];

  // 프로필 이미지
  const elImg = document.getElementById("profile-image") as HTMLElement | null;
  if (elImg && profile.profileImage) {
    elImg.style.backgroundImage = `url('${profile.profileImage}')`;
  }

  // 이름과 직함
  const elName = document.getElementById("profile-name");
  const elTitle = document.getElementById("profile-title");
  if (elName) elName.textContent = profile.name;
  if (elTitle) elTitle.textContent = profile.title;

  // 설명
  const elDesc = document.getElementById("profile-description");
  if (elDesc) {
    if (Array.isArray(profile.description)) {
      elDesc.innerHTML = profile.description.map(p => `<p>${p}</p>`).join("");
    } else {
      elDesc.innerHTML = `<p>${profile.description}</p>`;
    }
  }

  // 하이라이트 태그
  const elHighlights = document.getElementById("profile-highlights");
  if (elHighlights) {
    const variants = ["hero-tag--primary", "hero-tag--secondary", "hero-tag--purple", "hero-tag--green"];
    elHighlights.innerHTML = highlights
      .map((t, i) => `<span class="hero-tag ${variants[i % 4]}">${t}</span>`)
      .join("");
  }

  // 소셜 링크
  const elSocials = document.getElementById("social-links");
  if (elSocials) {
    elSocials.innerHTML = socials
      .map(s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.platform}">
          <i class="${s.icon}"></i>
        </a>
      `).join("");
  }
}

/**
 * 스킬 렌더링
 */
function renderSkills(): void {
  const skills = aboutData.skills?.core || [];
  const elSkills = document.getElementById("skills-core");
  
  if (elSkills) {
    elSkills.innerHTML = skills
      .map(skill => `
        <div class="skill-item">
          <div class="skill-header">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-percent">${skill.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="progress-bar" data-width="${skill.level}%"></div>
          </div>
        </div>
      `).join("");

    // Progress bar 애니메이션
    requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>(".progress-bar").forEach(bar => {
        const w = bar.dataset.width || "0%";
        bar.style.width = w;
      });
    });
  }
}

/**
 * 자격증 렌더링
 */
function renderCertifications(): void {
  const certifications = aboutData.certifications || [];
  const elCert = document.getElementById("certifications-list");
  
  if (elCert) {
    const variants = ["hero-cert-item--primary", "hero-cert-item--secondary", "hero-cert-item--purple", "hero-cert-item--green"];
    elCert.innerHTML = certifications
      .map((cert, i) => `
        <div class="hero-cert-item ${variants[i % 4]}">
          <i class="ri-award-line"></i>
          <div class="hero-cert-item__info">
            <div class="hero-cert-item__title">${cert.name}</div>
            <div class="hero-cert-item__org">${cert.issuer} · ${cert.year}</div>
          </div>
        </div>
      `).join("");
  }
}

/**
 * 캐러셀 초기화
 */
function initializeCarousel(): void {
  const slides = document.querySelectorAll<HTMLElement>(".carousel-slide");
  const indicators = document.querySelectorAll<HTMLElement>(".carousel-indicator");
  const prevBtn = document.querySelector<HTMLElement>(".carousel-nav.prev");
  const nextBtn = document.querySelector<HTMLElement>(".carousel-nav.next");

  let currentIndex = 0;

  function showSlide(index: number): void {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  function nextSlide(): void {
    showSlide((currentIndex + 1) % slides.length);
  }

  function prevSlide(): void {
    showSlide((currentIndex - 1 + slides.length) % slides.length);
  }

  // 이벤트 리스너
  prevBtn?.addEventListener("click", prevSlide);
  nextBtn?.addEventListener("click", nextSlide);

  indicators.forEach((indicator, i) => {
    indicator.addEventListener("click", () => showSlide(i));
  });

  // 키보드 네비게이션
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  // 자동 슬라이드 (옵션)
  // setInterval(nextSlide, 5000);
}