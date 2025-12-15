/**
 * about.ts - About 섹션 렌더러 및 캐러셀 구현
 */

import aboutDataJson from "@/data/about.json";
import socialDataJson from "@/data/social.json";

// 데이터 타입 정의
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

/* Public API */
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
      <div class="carousel-indicators carousel-indicators--numbered" id="indicators">
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
  // 아코디언 바인딩
  initializeAccordion();
  // 탭 바인딩
  initializeCompetencyTabs();
}

/* 슬라이드 렌더러 */
function renderSlideHtml(slide: AboutSlide, index: number, socials: SocialLink[]): string {
  // 첫 슬라이드 배경
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

/* 슬라이드 본문 렌더러 */
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

/* Slide: profile_strengths */
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

  const tagVariants = ["hero-tag--red", "hero-tag--orange", "hero-tag--yellow", "hero-tag--green", "hero-tag--blue", "hero-tag--purple"];

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
          .map(
            (k) =>
              `<span class="hero-tag ${
                tagVariants[Math.floor(Math.random() * tagVariants.length)]
              }">${escapeHtml(k)}</span>`
          )
          .join("")}
      </div>
      <div class="hero-socials" id="social-links">
        ${socialHtml}
      </div>
    </div>
    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">실행 원칙</h3>
      <div class="strengths-list">
        ${strengths
          .map(
            (st) => `
            <div class="strength-item" style="margin-bottom:1.25rem;">
              <div style="font-weight:700; margin-bottom:0.5rem;">${escapeHtml(st.title ?? "")}</div>
              <div style="color:inherit; line-height:1.7;">
                ${(Array.isArray(st.description) ? st.description : [])
                  .map((line) => `<div>${escapeHtml(line)}</div>`)
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

/* Slide: timeline_portrait (아코디언 버전) */
function renderTimelinePortrait(slide: AboutSlide): string {
  const title = slide.title ?? "주요 연혁";
  const portraitImage = slide.portraitImage ?? "";
  const timeline: Array<{ year?: string; title?: string; description?: string[] }> = Array.isArray(slide.timeline)
    ? slide.timeline
    : [];
  
  return `
    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">${escapeHtml(title)}</h3>
      <div class="timeline-accordion">
        ${timeline
          .map(
            (t, idx) => `
            <div class="accordion-item ${idx === 0 ? 'active' : ''}">
              <button class="accordion-header" type="button" aria-expanded="${idx === 0 ? 'true' : 'false'}">
                <span class="accordion-year">${escapeHtml(t.year ?? "")}</span>
                <span class="accordion-title">${escapeHtml(t.title ?? "")}</span>
                <i class="ri-arrow-down-s-line accordion-icon"></i>
              </button>
              <div class="accordion-content" ${idx === 0 ? 'style="max-height: 500px;"' : ''}>
                <div class="accordion-body">
                  ${(Array.isArray(t.description) ? t.description : [])
                    .map((d) => `<div>${escapeHtml(d)}</div>`)
                    .join("")}
                </div>
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
    <div class="timeline-portrait-wrapper">
      <img
        src="${escapeAttr(portraitImage)}"
        alt="${escapeAttr(String(title))} 인물 이미지"
        class="timeline-portrait-image"
      />
    </div>
  `;
}

/* Slide: core_competency (탭 버전) */
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

      <!-- 탭 헤더 -->
      <div class="competency-tabs">
        ${competencies
          .map(
            (c, idx) => `
            <button 
              class="competency-tab ${idx === 0 ? 'active' : ''}" 
              type="button"
              data-tab="${idx}"
            >
              ${escapeHtml(c.name ?? "")}
            </button>
          `
          )
          .join("")}
      </div>

      <!-- 탭 콘텐츠 -->
      <div class="competency-tab-contents">
        ${competencies
          .map(
            (c, idx) => `
            <div class="competency-tab-content ${idx === 0 ? 'active' : ''}" data-tab-content="${idx}">
              <div class="competency-summary">${escapeHtml(c.summary ?? "")}</div>
              <div class="competency-evidence">
                ${(Array.isArray(c.evidence) ? c.evidence : [])
                  .map((e) => `<div>• ${escapeHtml(e)}</div>`)
                  .join("")}
              </div>
              <div class="competency-result">${escapeHtml(c.result ?? "")}</div>
            </div>
          `
          )
          .join("")}
      </div>

      ${
        summaryKeywords.length
          ? `
        <div class="competency-keywords">
          <div class="competency-keywords__title">핵심 키워드</div>
          <div class="competency-keywords__list">
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
        <div class="competency-quote">
          <span class="competency-quote__line">${escapeHtml(Array.isArray(quote.lines) ? quote.lines.join(' ') : quote.lines ?? '')}</span>
          <span class="competency-quote__highlight">${escapeHtml(quote.highlight ?? "")}</span>
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
  const education: Array<{ degree?: string; school?: string; period?: string; year?: number | string }> = Array.isArray(slide.education)
    ? slide.education
    : [];
  const certifications: Array<{ name?: string; issuer?: string; year?: number | string }> = Array.isArray(slide.certifications)
    ? slide.certifications
    : [];

  // period에서 연도 추출 (예: "2019-2023" → "2023", "2019 - 2023" → "2023", "—" → "—")
  const extractYear = (period?: string): string => {
    if (!period || period === '—' || period === '-') return '—';
    // 끝 연도 추출 (하이픈 뒤의 숫자)
    const match = period.match(/(\d{4})\s*$/);
    if (match) return match[1];
    // 시작 연도만 있는 경우
    const startMatch = period.match(/^(\d{4})/);
    if (startMatch) return startMatch[1];
    return '—';
  };

  // 학력을 연도별로 그룹화
  const educationByYear = education.reduce((acc, edu) => {
    const year = String(edu.year ?? extractYear(edu.period));
    if (!acc[year]) acc[year] = [];
    acc[year].push(edu);
    return acc;
  }, {} as Record<string, typeof education>);

  // 자격을 연도별로 그룹화
  const certsByYear = certifications.reduce((acc, cert) => {
    const year = String(cert.year ?? '—');
    if (!acc[year]) acc[year] = [];
    acc[year].push(cert);
    return acc;
  }, {} as Record<string, typeof certifications>);

  // 연도 내림차순 정렬 (숫자로 변환해서 비교)
  const sortYears = (years: string[]) => {
    return years.sort((a, b) => {
      const aNum = parseInt(a, 10);
      const bNum = parseInt(b, 10);
      // 둘 다 숫자가 아니면 원래 순서 유지
      if (isNaN(aNum) && isNaN(bNum)) return 0;
      // a만 숫자가 아니면 뒤로
      if (isNaN(aNum)) return 1;
      // b만 숫자가 아니면 뒤로
      if (isNaN(bNum)) return -1;
      // 둘 다 숫자면 내림차순
      return bNum - aNum;
    });
  };

  const eduYears = sortYears(Object.keys(educationByYear));
  const certYears = sortYears(Object.keys(certsByYear));

  return `
    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">학력</h3>
      <div class="edu-cert-timeline">
        ${eduYears
          .map(
            (year) => `
            <div class="edu-cert-year-group">
              <div class="edu-cert-year">${escapeHtml(year)}</div>
              <div class="edu-cert-items">
                ${educationByYear[year]
                  .map(
                    (e) => `
                    <div class="edu-cert-item">
                      <div class="edu-cert-item__title">${escapeHtml(e.degree ?? "")}</div>
                      <div class="edu-cert-item__sub">${escapeHtml(e.school ?? "")}</div>
                    </div>
                  `
                  )
                  .join("")}
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    </div>

    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">자격</h3>
      <div class="edu-cert-timeline">
        ${certYears
          .map(
            (year) => `
            <div class="edu-cert-year-group">
              <div class="edu-cert-year">${escapeHtml(year)}</div>
              <div class="edu-cert-items">
                ${certsByYear[year]
                  .map(
                    (c) => `
                    <div class="edu-cert-item">
                      <i class="ri-award-line edu-cert-item__icon"></i>
                      <div>
                        <div class="edu-cert-item__title">${escapeHtml(c.name ?? "")}</div>
                        <div class="edu-cert-item__sub">${escapeHtml(c.issuer ?? "")}</div>
                      </div>
                    </div>
                  `
                  )
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
   Slide: persona
========================= */
function renderPersona(slide: AboutSlide): string {
  const header = slide.header ?? {};
  const badges: Array<{ label?: string; key?: string }> = Array.isArray(slide.badges) ? slide.badges : [];
  const table: Array<{ k?: string; v?: string }> = Array.isArray(slide.table) ? slide.table : [];
  const cards: Array<{ title?: string; icon?: string; items?: string[] }> = Array.isArray(slide.cards) ? slide.cards : [];

  return `
    <div class="hero-skills-card persona-card" style="grid-column:1/-1;">
      <!-- 헤더 섹션 -->
      <div class="persona-header">
        <div class="persona-header__info">
          <h3 class="persona-header__name">${escapeHtml(header.name ?? "")}</h3>
          <p class="persona-header__bio">${escapeHtml(header.bio ?? "")}</p>
          <div class="persona-badges">
            ${badges
              .map((b) => `<span class="persona-badge">${escapeHtml(b.label ?? "")}</span>`)
              .join("")}
          </div>
        </div>
      </div>

      <!-- 프로필 테이블 (2열) -->
      <div class="persona-table-wrapper">
        <table class="persona-table">
          ${table
            .map(
              (r, idx) => `
              <tr>
                <td class="persona-table__key">${escapeHtml(r.k ?? "")}</td>
                <td class="persona-table__value">${escapeHtml(r.v ?? "")}</td>
              </tr>
            `
            )
            .join("")}
        </table>
      </div>

      <!-- 카드 그리드 (4열) -->
      ${
        cards.length
          ? `
        <div class="persona-cards">
          ${cards
            .map(
              (c) => `
              <div class="persona-mini-card">
                <div class="persona-mini-card__header">
                  <i class="${escapeAttr(c.icon ?? "")}"></i>
                  <span>${escapeHtml(c.title ?? "")}</span>
                </div>
                <ul class="persona-mini-card__list">
                  ${(Array.isArray(c.items) ? c.items : [])
                    .map((it) => `<li>${escapeHtml(it)}</li>`)
                    .join("")}
                </ul>
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
   Accordion behavior
========================= */
function initializeAccordion(): void {
  const accordionItems = document.querySelectorAll<HTMLElement>('.accordion-item');
  
  accordionItems.forEach((item) => {
    const header = item.querySelector<HTMLButtonElement>('.accordion-header');
    const content = item.querySelector<HTMLElement>('.accordion-content');
    
    if (!header || !content) return;
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // 모든 아코디언 닫기
      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector<HTMLElement>('.accordion-content');
        const otherHeader = otherItem.querySelector<HTMLButtonElement>('.accordion-header');
        if (otherContent) otherContent.style.maxHeight = '0';
        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
      });
      
      // 클릭한 아코디언 토글
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* =========================
   Competency Tabs behavior
========================= */
function initializeCompetencyTabs(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.competency-tab');
  const contents = document.querySelectorAll<HTMLElement>('.competency-tab-content');
  
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabIndex = tab.dataset.tab;
      
      // 모든 탭 비활성화
      tabs.forEach((t) => t.classList.remove('active'));
      contents.forEach((c) => c.classList.remove('active'));
      
      // 클릭한 탭 활성화
      tab.classList.add('active');
      const targetContent = document.querySelector<HTMLElement>(`.competency-tab-content[data-tab-content="${tabIndex}"]`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* Utils */
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