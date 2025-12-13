/**
 * about.ts
 * About 섹션 렌더링 통합 모듈 (전체 HTML 동적 생성)
 */

import aboutDataJson from "@/data/about.json";
import socialDataJson from "@/data/social.json";

import type { AboutData, SocialLink } from "@/scripts/data.types";

const aboutData = aboutDataJson as AboutData;
const socialData = socialDataJson as { socialLinks: SocialLink[] };

export function renderAbout(): void {
  const root = document.getElementById("about");
  if (!root) return;

  root.innerHTML = `
    <!-- 슬라이드 1: 프로필 소개 -->
    <div class="carousel-slide active" id="about-slide-profile">
      <div class="hero-inner">
        <div id="profile-section">
          <div class="hero-avatar">
            <div id="profile-image" class="hero-avatar__image"></div>
          </div>

          <h1 id="profile-name" class="hero-title"></h1>
          <p id="profile-title" class="hero-subtitle"></p>

          <div id="profile-description" class="hero-description"></div>
          <div id="profile-highlights" class="hero-tags"></div>
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
      <button class="carousel-indicator active" type="button"></button>
      <button class="carousel-indicator" type="button"></button>
      <button class="carousel-indicator" type="button"></button>
    </div>
  `;

  renderProfileData();
  renderSkills();
  renderCertifications();
  initializeCarousel();
}

/* =========================
   프로필 렌더링
========================= */
function renderProfileData(): void {
  const profile = aboutData.profile;
  const highlights = aboutData.highlights || [];
  const socials = socialData.socialLinks || [];

  const elImg = document.getElementById("profile-image") as HTMLElement | null;
  if (elImg) elImg.style.backgroundImage = `url('${profile.profileImage}')`;

  document.getElementById("profile-name")!.textContent = profile.name;
  document.getElementById("profile-title")!.textContent = profile.title;

  const elDesc = document.getElementById("profile-description");
  if (elDesc) {
    elDesc.innerHTML = Array.isArray(profile.description)
      ? profile.description.map(p => `<p>${p}</p>`).join("")
      : `<p>${profile.description}</p>`;
  }

  const elHighlights = document.getElementById("profile-highlights");
  if (elHighlights) {
    const variants = ["hero-tag--primary", "hero-tag--secondary", "hero-tag--purple", "hero-tag--green"];
    elHighlights.innerHTML = highlights
      .map((t, i) => `<span class="hero-tag ${variants[i % 4]}">${t}</span>`)
      .join("");
  }

  const elSocials = document.getElementById("social-links");
  if (elSocials) {
    elSocials.innerHTML = socials
      .map(s => `
        <a href="${s.url}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="${s.platform}"
           title="${s.platform}">
          <i class="${s.icon}"></i>
        </a>
      `)
      .join("");
  }
}

/* =========================
   스킬 렌더링
========================= */
function renderSkills(): void {
  const skills = aboutData.skills?.core || [];
  const elSkills = document.getElementById("skills-core");

  if (!elSkills) return;

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
    `)
    .join("");

  requestAnimationFrame(() => {
    document.querySelectorAll<HTMLElement>(".progress-bar").forEach(bar => {
      bar.style.width = bar.dataset.width || "0%";
    });
  });
}

/* =========================
   자격증 렌더링
========================= */
function renderCertifications(): void {
  const elCert = document.getElementById("certifications-list");
  if (!elCert) return;

  const variants = ["hero-cert-item--primary", "hero-cert-item--secondary", "hero-cert-item--purple", "hero-cert-item--green"];

  elCert.innerHTML = aboutData.certifications
    .map((cert, i) => `
      <div class="hero-cert-item ${variants[i % 4]}">
        <i class="ri-award-line"></i>
        <div class="hero-cert-item__info">
          <div class="hero-cert-item__title">${cert.name}</div>
          <div class="hero-cert-item__org">${cert.issuer} · ${cert.year}</div>
        </div>
      </div>
    `)
    .join("");
}

/* =========================
   캐러셀
========================= */
function initializeCarousel(): void {
  const slides = document.querySelectorAll<HTMLElement>(".carousel-slide");
  const indicators = document.querySelectorAll<HTMLElement>(".carousel-indicator");
  let current = 0;

  const show = (i: number) => {
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
    indicators.forEach((d, idx) => d.classList.toggle("active", idx === i));
    current = i;
  };

  document.querySelector(".carousel-nav.prev")?.addEventListener("click", () =>
    show((current - 1 + slides.length) % slides.length)
  );

  document.querySelector(".carousel-nav.next")?.addEventListener("click", () =>
    show((current + 1) % slides.length)
  );

  indicators.forEach((d, i) => d.addEventListener("click", () => show(i)));

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") show((current - 1 + slides.length) % slides.length);
    if (e.key === "ArrowRight") show((current + 1) % slides.length);
  });
}
