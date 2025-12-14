/**
 * about.ts
 * About 섹션 렌더링 통합 모듈 (about.json + social.json 기반)
 * - about.json: slides[] 기반 (profile_strengths ~ summary)
 * - social.json: socialLinks[] 기반
 * - 캐러셀: translateX 방식 (.carousel-container)
 */

import aboutDataJson from "@/data/about.json";
import socialDataJson from "@/data/social.json";

type SlideType =
  | "profile_strengths"
  | "timeline_portrait"
  | "core_competency"
  | "education_certifications"
  | "persona"
  | "summary";

type AboutSlide = { id: string; type: SlideType } & Record<string, any>;

interface AboutData {
  meta?: { lang?: string; version?: number; updatedAt?: string };
  slides: AboutSlide[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

const aboutData = aboutDataJson as AboutData;
const socialData = socialDataJson as { socialLinks: SocialLink[] };

/* =========================
   Public API
========================= */
export function renderAbout(): void {
  const root = document.getElementById("about");
  if (!root) return;

  const slides = Array.isArray(aboutData.slides) ? aboutData.slides : [];
  const socials = Array.isArray(socialData.socialLinks) ? socialData.socialLinks : [];

  // 슬라이드가 없으면 렌더링 중단
  if (slides.length === 0) {
    root.innerHTML = "";
    return;
  }

  // 섹션(캐러셀) 전체 마크업
  root.innerHTML = `
    <section class="section hero-carousel" id="about-carousel">
      <div class="carousel-container" id="carousel-container">
        ${slides
          .map((s, idx) => renderSlideHtml(s, idx, socials))
          .join("")}
      </div>

      <!-- 네비게이션 -->
      <button class="carousel-nav prev" type="button" aria-label="이전 슬라이드" id="prev-btn">
        <i class="ri-arrow-left-line"></i>
      </button>
      <button class="carousel-nav next" type="button" aria-label="다음 슬라이드" id="next-btn">
        <i class="ri-arrow-right-line"></i>
      </button>

      <!-- 인디케이터(about.scss: .indicator 사용) -->
      <div class="carousel-indicators" id="indicators">
        ${slides
          .map(
            (_, i) =>
              `<div class="indicator ${i === 0 ? "active" : ""}" data-slide="${i}" role="button" aria-label="슬라이드 ${i + 1}"></div>`
          )
          .join("")}
      </div>
    </section>
  `;

  // 캐러셀 바인딩
  initializeCarousel();
}

/* =========================
   Slide renderer
========================= */
function renderSlideHtml(slide: AboutSlide, index: number, socials: SocialLink[]): string {
  // 첫 슬라이드 배경 (profile_strengths.profile.backgroundImage)
  const bg =
    index === 0 ? slide?.profile?.backgroundImage ?? slide?.backgroundImage ?? "" : "";

  const slideStyle =
    index === 0 && bg
      ? `style="background-image:url('${escapeAttr(bg)}')"`
      : "";

  const firstSlideClass = index === 0 ? "first-slide" : "";

  return `
    <div class="carousel-slide ${firstSlideClass}" data-slide-id="${escapeAttr(slide.id)}" ${slideStyle}>
      <div class="hero-inner">
        ${renderSlideBody(slide, socials)}
      </div>
    </div>
  `;
}

function renderSlideBody(slide: AboutSlide, socials: SocialLink[]): string {
  switch (slide.type) {
    case "profile_strengths":
      return renderProfileStrengths(slide, socials);

    case "timeline_portrait":
      return renderTimelinePortrait(slide);

    case "core_competency":
      return renderCoreCompetency(slide);

    case "education_certifications":
      return renderEducationCertifications(slide);

    case "persona":
      return renderPersona(slide);

    case "summary":
      return renderSummary(slide);

    default:
      return `<div style="grid-column:1/-1;">Unsupported slide type</div>`;
  }
}

/* =========================
   Slide: profile_strengths
========================= */
function renderProfileStrengths(slide: AboutSlide, socials: SocialLink[]): string {
  const profile = slide.profile ?? {};
  const keywords: string[] = Array.isArray(slide.keywords) ? slide.keywords : [];
  const strengths: Array<{ title?: string; description?: string[] }> = Array.isArray(slide.strengths)
    ? slide.strengths
    : [];

  const descLines: string[] = Array.isArray(profile.description)
    ? profile.description
    : typeof profile.description === "string"
      ? [profile.description]
      : [];

  const tagVariants = ["hero-tag--primary", "hero-tag--secondary", "hero-tag--purple", "hero-tag--green"];

  // 소셜 링크(메일/외부 링크 구분)
  const socialHtml = socials
    .map((s) => {
      const url = String(s.url ?? "");
      const isExternal = /^https?:\/\//i.test(url);
      const targetRel = isExternal ? `target="_blank" rel="noopener noreferrer"` : `rel="noopener noreferrer"`;

      return `
        <a href="${escapeAttr(url)}"
           ${targetRel}
           aria-label="${escapeAttr(s.platform ?? "")}"
           title="${escapeAttr(s.platform ?? "")}">
          <i class="${escapeAttr(s.icon ?? "")}"></i>
        </a>
      `;
    })
    .join("");

  return `
    <!-- 좌: 프로필 / 우: 강점 -->
    <div id="profile-section">
      <div class="hero-avatar">
        <img
          src="${escapeAttr(profile.profileImage ?? "")}"
          alt="${escapeAttr(profile.name ?? "프로필")} 사진"
          class="hero-avatar__image"
        />
      </div>

      <h1 class="hero-title">${escapeHtml(profile.name ?? "")}</h1>
      <p class="hero-subtitle">${escapeHtml(profile.title ?? "")}</p>

      <div class="hero-description">
        ${descLines.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
      </div>

      <div class="hero-tags" id="profile-highlights">
        ${keywords
          .map((k, i) => `<span class="hero-tag ${tagVariants[i % 4]}">${escapeHtml(k)}</span>`)
          .join("")}
      </div>

      <div class="hero-socials" id="social-links">
        ${socialHtml}
      </div>
    </div>

    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">성격 & 강점</h3>

      <!-- strengths는 기존 progress-bar 대신 텍스트 카드로 표시 -->
      <div class="strengths-list">
        ${strengths
          .map(
            (st) => `
            <div class="strength-item" style="margin-bottom:1.25rem;">
              <div style="font-weight:700; margin-bottom:0.5rem;">${escapeHtml(st.title ?? "")}</div>
              <div style="color:inherit; line-height:1.7;">
                ${(Array.isArray(st.description) ? st.description : [])
                  .map((line) => `<div>• ${escapeHtml(line)}</div>`)
                  .join("")}
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
  `;
}

/* =========================
   Slide: timeline_portrait
========================= */
function renderTimelinePortrait(slide: AboutSlide): string {
  const title = slide.title ?? "주요 연혁";
  const portraitImage = slide.portraitImage ?? "";
  const timeline: Array<{ year?: string; title?: string; description?: string[] }> = Array.isArray(slide.timeline)
    ? slide.timeline
    : [];

  return `
    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">${escapeHtml(title)}</h3>

      <div class="timeline-list" style="display:flex; flex-direction:column; gap:1rem;">
        ${timeline
          .map(
            (t) => `
            <div class="timeline-item" style="padding:0.75rem 0; border-bottom:1px solid rgba(0,0,0,0.06);">
              <div style="font-weight:800; margin-bottom:0.25rem;">${escapeHtml(t.year ?? "")}</div>
              <div style="font-weight:700; margin-bottom:0.4rem;">${escapeHtml(t.title ?? "")}</div>
              <div style="line-height:1.7;">
                ${(Array.isArray(t.description) ? t.description : [])
                  .map((d) => `<div>${escapeHtml(d)}</div>`)
                  .join("")}
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    </div>

    <div class="hero-skills-card" style="display:flex; align-items:center; justify-content:center;">
      <img
        src="${escapeAttr(portraitImage)}"
        alt="${escapeAttr(String(title))} 인물 이미지"
        style="width:100%; max-width:420px; border-radius:16px; display:block;"
      />
    </div>
  `;
}

/* =========================
   Slide: core_competency
========================= */
function renderCoreCompetency(slide: AboutSlide): string {
  const title = slide.title ?? "자기소개서 핵심역량";
  const competencies: Array<{
    name?: string;
    summary?: string;
    evidence?: string[];
    result?: string;
  }> = Array.isArray(slide.competencies) ? slide.competencies : [];

  const summaryKeywords: string[] = Array.isArray(slide.summaryKeywords) ? slide.summaryKeywords : [];
  const quote = slide.brandingQuote ?? null;

  return `
    <div class="hero-skills-card" style="grid-column:1/-1;">
      <h3 class="hero-skills-card__title">${escapeHtml(title)}</h3>

      <div class="competency-list" style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
        ${competencies
          .map(
            (c) => `
            <div class="competency-item" style="border:1px solid rgba(0,0,0,0.06); border-radius:16px; padding:1rem;">
              <div style="font-weight:800; margin-bottom:0.5rem;">${escapeHtml(c.name ?? "")}</div>
              <div style="opacity:0.9; line-height:1.7; margin-bottom:0.75rem;">${escapeHtml(c.summary ?? "")}</div>
              <div style="line-height:1.7; margin-bottom:0.75rem;">
                ${(Array.isArray(c.evidence) ? c.evidence : [])
                  .map((e) => `<div>• ${escapeHtml(e)}</div>`)
                  .join("")}
              </div>
              <div style="font-weight:700;">${escapeHtml(c.result ?? "")}</div>
            </div>
          `
          )
          .join("")}
      </div>

      ${
        summaryKeywords.length
          ? `
        <div style="margin-top:1.5rem;">
          <div style="font-weight:700; margin-bottom:0.75rem;">핵심 키워드</div>
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
            ${summaryKeywords
              .map((k) => `<span class="hero-tag hero-tag--primary">${escapeHtml(k)}</span>`)
              .join("")}
          </div>
        </div>
      `
          : ""
      }

      ${
        quote
          ? `
        <div style="margin-top:1.5rem; padding-top:1.25rem; border-top:1px solid rgba(0,0,0,0.06);">
          <div style="line-height:1.8;">
            ${(Array.isArray(quote.lines) ? quote.lines : [])
              .map((l: string) => `<div>${escapeHtml(l)}</div>`)
              .join("")}
            <div style="font-weight:900; margin-top:0.5rem;">${escapeHtml(quote.highlight ?? "")}</div>
          </div>
        </div>
      `
          : ""
      }
    </div>
  `;
}

/* =========================
   Slide: education_certifications
========================= */
function renderEducationCertifications(slide: AboutSlide): string {
  const title = slide.title ?? "학력 · 자격";
  const education: Array<{ degree?: string; school?: string; period?: string }> = Array.isArray(slide.education)
    ? slide.education
    : [];
  const certifications: Array<{ name?: string; issuer?: string; year?: number | string }> = Array.isArray(slide.certifications)
    ? slide.certifications
    : [];

  return `
    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">${escapeHtml(title)} - 학력</h3>

      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        ${education
          .map(
            (e) => `
            <div style="padding:0.75rem 0; border-bottom:1px solid rgba(0,0,0,0.06);">
              <div style="font-weight:800;">${escapeHtml(e.degree ?? "")}</div>
              <div style="opacity:0.9;">${escapeHtml(e.school ?? "")}</div>
              <div style="opacity:0.7; font-size:0.9rem;">${escapeHtml(e.period ?? "")}</div>
            </div>
          `
          )
          .join("")}
      </div>
    </div>

    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">${escapeHtml(title)} - 자격</h3>

      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        ${certifications
          .map(
            (c) => `
            <div style="display:flex; gap:0.75rem; align-items:flex-start; padding:0.75rem 0; border-bottom:1px solid rgba(0,0,0,0.06);">
              <i class="ri-award-line" style="margin-top:2px;"></i>
              <div>
                <div style="font-weight:800;">${escapeHtml(c.name ?? "")}</div>
                <div style="opacity:0.85;">${escapeHtml(c.issuer ?? "")} · ${escapeHtml(c.year ?? "")}</div>
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
  `;
}

/* =========================
   Slide: persona
========================= */
function renderPersona(slide: AboutSlide): string {
  const header = slide.header ?? {};
  const badges: Array<{ label?: string; key?: string }> = Array.isArray(slide.badges) ? slide.badges : [];
  const tools: string[] = Array.isArray(slide.tools) ? slide.tools : [];
  const table: Array<{ k?: string; v?: string }> = Array.isArray(slide.table) ? slide.table : [];
  const cards: Array<{ title?: string; icon?: string; items?: string[] }> = Array.isArray(slide.cards) ? slide.cards : [];

  return `
    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">${escapeHtml(slide.title ?? "My Persona")}</h3>

      <div style="font-weight:900; font-size:1.4rem; margin-bottom:0.5rem;">
        ${escapeHtml(header.name ?? "")}
      </div>
      <div style="line-height:1.8; opacity:0.9; margin-bottom:1rem;">
        ${escapeHtml(header.bio ?? "")}
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
        ${badges
          .map((b) => `<span class="hero-tag hero-tag--primary">${escapeHtml(b.label ?? "")}</span>`)
          .join("")}
      </div>

      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        ${tools.map((ic) => `<span title="${escapeAttr(ic)}"><i class="${escapeAttr(ic)}"></i></span>`).join("")}
      </div>
    </div>

    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">Profile Table</h3>

      <table style="width:100%; border-collapse:collapse;">
        ${table
          .map(
            (r) => `
            <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
              <td style="padding:0.6rem 0; font-weight:800; width:34%;">${escapeHtml(r.k ?? "")}</td>
              <td style="padding:0.6rem 0; opacity:0.9;">${escapeHtml(r.v ?? "")}</td>
            </tr>
          `
          )
          .join("")}
      </table>

      ${
        cards.length
          ? `
        <div style="margin-top:1.25rem; display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          ${cards
            .map(
              (c) => `
              <div style="border:1px solid rgba(0,0,0,0.06); border-radius:16px; padding:1rem;">
                <div style="display:flex; align-items:center; gap:0.5rem; font-weight:900; margin-bottom:0.5rem;">
                  <i class="${escapeAttr(c.icon ?? "")}"></i>
                  <span>${escapeHtml(c.title ?? "")}</span>
                </div>
                <div style="line-height:1.7;">
                  ${(Array.isArray(c.items) ? c.items : [])
                    .map((it) => `<div>• ${escapeHtml(it)}</div>`)
                    .join("")}
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      `
          : ""
      }
    </div>
  `;
}

/* =========================
   Slide: summary
========================= */
function renderSummary(slide: AboutSlide): string {
  const sections: Array<{ title?: string; text?: string }> = Array.isArray(slide.sections)
    ? slide.sections
    : [];

  return `
    <div class="hero-skills-card" style="grid-column:1/-1;">
      <h3 class="hero-skills-card__title">${escapeHtml(slide.title ?? "자기소개서 요약")}</h3>

      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        ${sections
          .map(
            (s) => `
            <div>
              <div style="font-weight:900; margin-bottom:0.35rem;">${escapeHtml(s.title ?? "")}</div>
              <div style="line-height:1.8; opacity:0.9;">${escapeHtml(s.text ?? "")}</div>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
  `;
}

/* =========================
   Carousel behavior (translateX)
========================= */
function initializeCarousel(): void {
  const root = document.getElementById("about-carousel");
  if (!root) return;

  const track = root.querySelector<HTMLElement>("#carousel-container");
  const slides = Array.from(root.querySelectorAll<HTMLElement>(".carousel-slide"));
  const indicators = Array.from(root.querySelectorAll<HTMLElement>(".indicator"));
  const prevBtn = root.querySelector<HTMLElement>("#prev-btn");
  const nextBtn = root.querySelector<HTMLElement>("#next-btn");

  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  let current = 0;

  const update = () => {
    track.style.transform = `translateX(${-current * 100}%)`;
    indicators.forEach((d, i) => d.classList.toggle("active", i === current));
  };

  const show = (idx: number) => {
    current = Math.max(0, Math.min(idx, slides.length - 1));
    update();
  };

  const next = () => show((current + 1) % slides.length);
  const prev = () => show((current - 1 + slides.length) % slides.length);

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  indicators.forEach((dot, i) => {
    dot.addEventListener("click", () => show(i));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  update();
}

/* =========================
   Utils
========================= */
function escapeHtml(input: unknown): string {
  const s = String(input ?? "");
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(input: unknown): string {
  // 속성용(따옴표/각종 기호 최소 방지)
  return escapeHtml(input).replaceAll("\n", " ").replaceAll("\r", " ");
}
