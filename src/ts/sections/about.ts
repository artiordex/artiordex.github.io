/**
 * about.ts
 * About 섹션 렌더링 전용 모듈
 */

import aboutDataJson from "@/data/about.json";
import type { AboutData } from "@/ts/data.types";

// JSON 타입 캐스팅
const aboutData = aboutDataJson as AboutData;

/**
 * About 섹션 렌더링
 */
export function renderAbout(): void {
  const el = document.getElementById("about");
  if (!el) return;

  const profile = aboutData.profile;
  const highlights = aboutData.highlights || [];
  const socials = aboutData.socialLinks || [];

  // DOM 요소 캐싱
  const profileImage = document.getElementById("profile-image") as HTMLElement | null;
  const profileName = document.getElementById("profile-name");
  const profileTitle = document.getElementById("profile-title");
  const profileDescription = document.getElementById("profile-description");
  const profileHighlights = document.getElementById("profile-highlights");
  const socialLinks = document.getElementById("social-links");

  /* 프로필 이미지 */
  if (profileImage) {
    profileImage.style.backgroundImage = `url('${profile.profileImage}')`;
  }

  /* 이름 / 타이틀 */
  if (profileName) profileName.textContent = profile.name;
  if (profileTitle) profileTitle.textContent = profile.title;

  /* 소개 문단 */
  if (profileDescription) {
    profileDescription.innerHTML = `<p>${profile.description}</p>`;
  }

  /* 하이라이트 태그 (키워드) */
  if (profileHighlights) {
    const variants = [
      "hero-tag--primary",
      "hero-tag--secondary",
      "hero-tag--purple",
      "hero-tag--green"
    ];

    profileHighlights.innerHTML = highlights
      .map((t, i) => `<span class="hero-tag ${variants[i % 4]}">${t}</span>`)
      .join("");
  }

  /* 소셜 링크 */
  if (socialLinks) {
    socialLinks.innerHTML = socials
      .map(
        (s) =>
          `<a href="${s.url}" target="_blank" rel="noopener noreferrer">
            <i class="${s.icon}"></i>
          </a>`
      )
      .join("");
  }
}
