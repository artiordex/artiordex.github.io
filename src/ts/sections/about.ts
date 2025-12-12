/**
 * about.ts
 * About 섹션 렌더링 통합 모듈
 */

import aboutDataJson from "@/data/about.json";
import type { AboutData } from "@/ts/data.types";

const aboutData = aboutDataJson as AboutData;

export function renderAbout(): void {
  const root = document.getElementById("about");
  if (!root) return;

  const profile = aboutData.profile;
  const highlights = aboutData.highlights || [];
  const skills = aboutData.skills?.core || [];
  const certifications = aboutData.certifications || [];
  const socials = aboutData.socialLinks || [];

  /* 요소 찾기 */
  const elImg = document.getElementById("profile-image") as HTMLElement | null;
  const elName = document.getElementById("profile-name");
  const elTitle = document.getElementById("profile-title");
  const elDesc = document.getElementById("profile-description");
  const elHighlights = document.getElementById("profile-highlights");
  const elSocials = document.getElementById("social-links");
  const elSkills = document.getElementById("skills-core");
  const elCert = document.getElementById("certifications-list");

  /* 프로필 이미지 */
  if (elImg && profile.profileImage) {
    elImg.style.backgroundImage = `url('${profile.profileImage}')`;
  }

  /* 텍스트 */
  if (elName) elName.textContent = profile.name;
  if (elTitle) elTitle.textContent = profile.title;

  /* 설명 */
  if (elDesc) {
    if (Array.isArray(profile.description)) {
      elDesc.innerHTML = profile.description.map(p => `<p>${p}</p>`).join("");
    } else {
      elDesc.innerHTML = `<p>${profile.description}</p>`;
    }
  }

  /* 하이라이트 (태그) */
  if (elHighlights) {
    const variants = [
      "hero-tag--primary",
      "hero-tag--secondary",
      "hero-tag--purple",
      "hero-tag--green"
    ];

    elHighlights.innerHTML = highlights
      .map((t, i) => `<span class="hero-tag ${variants[i % 4]}">${t}</span>`)
      .join("");
  }

  /* 소셜 링크 */
  if (elSocials) {
    elSocials.innerHTML = socials
      .map(
        s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer">
          <i class="${s.icon}"></i>
        </a>`
      )
      .join("");
  }

  /* 핵심역량 스킬바 */
  if (elSkills) {
    elSkills.innerHTML = skills
      .map(
        skill => `
      <div class="skill-item">
        <div class="skill-header">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percent">${skill.level}%</span>
        </div>
        <div class="skill-bar">
          <div class="progress-bar" data-width="${skill.level}%"></div>
        </div>
      </div>`
      )
      .join("");
  }

  /* 자격증 리스트 */
  if (elCert) {
    const variants = [
      "hero-cert-item--primary",
      "hero-cert-item--secondary",
      "hero-cert-item--purple",
      "hero-cert-item--green"
    ];

    elCert.innerHTML = certifications
      .map(
        (cert, i) => `
      <div class="hero-cert-item ${variants[i % 4]}">
        <i class="ri-award-line"></i>
        <div class="hero-cert-item__info">
          <div class="hero-cert-item__title">${cert.name}</div>
          <div class="hero-cert-item__org">
            ${cert.issuer} · ${cert.year}
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  /* Progress bar 부드럽게 채우기 */
  requestAnimationFrame(() => {
    document.querySelectorAll<HTMLElement>(".progress-bar").forEach(bar => {
      const w = bar.dataset.width || "0%";
      bar.style.width = w;
    });
  });
}
