// 
/**
 * main.ts
 * 메인 엔트리 포인트 - 모든 섹션 렌더링 및 초기화
 */

// JSON Import
import aboutJson from "../data/about.json";
import portfolioJson from "../data/portfolio.json";
import companyJson from "../data/company.json";
import consultingJson from "../data/consulting.json";
import contactJson from "../data/contact.json";
import linksJson from "../data/links.json";
import sectionJson from "../data/section.json";
import socialJson from "../data/social.json";

// Type Import
import type {
  AboutData,
  PortfolioData,
  CompanyData,
  ConsultingData,
  ContactPageData,
  LinksData,
  HeaderSectionsData,
  SimpleSocialList,
  CompanyProject,
  LinksCategory,
  LinkItem,
  ContactInfoItem
} from "./data.types";

// JSON → 타입 캐스팅
const aboutData = aboutJson as AboutData;
const portfolioData = portfolioJson as PortfolioData;
const companyData = companyJson as CompanyData;
const consultingData = consultingJson as ConsultingData;
const contactData = contactJson as ContactPageData;
const linksData = linksJson as LinksData;
const sectionData = sectionJson as HeaderSectionsData;
const socialData = socialJson as SimpleSocialList;

/* Header Scroll Spy (IntersectionObserver) */
function setupHeaderScrollSpy(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>(".header-link");
  const sections = document.querySelectorAll<HTMLElement>("section[id]");

  // smooth scroll
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.dataset.section;
      if (id) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // IntersectionObserver for active state
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          links.forEach((link) => {
            const target = link.dataset.section;
            link.classList.toggle("active", target === id);
          });
        }
      });
    },
    { threshold: 0.55 }
  );

  sections.forEach((sec) => observer.observe(sec));
}



/* Header Scroll Behavior (hide + solid toggle) */
function setupHeaderScrollBehavior(): void {
  const header = document.getElementById("main-header");
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;

    // hide header when scrolling down
    if (current > lastScroll && current > 100) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }

    // solid background only after leaving top area
    if (current < 50) {
      header.classList.remove("solid");
    } else {
      header.classList.add("solid");
    }

    lastScroll = current;
  });
}

/* Header Navigation 렌더링 (section.json 기반) */
function renderHeaderNav(): void {
  const navList = document.getElementById("header-nav-list");
  if (!navList) return;

  navList.innerHTML = "";

  sectionData.sections.forEach((sec) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="#${sec.id}" class="header-link" data-section="${sec.id}">
        ${sec.label}
      </a>
    `;
    navList.appendChild(li);
  });

  setupHeaderScrollSpy();
  setupHeaderScrollBehavior();
}

/* Footer Social 렌더링 (social.json 기반) */
function renderFooterSocial(): void {
  const box = document.getElementById("footer-social");
  if (!box) return;

  box.innerHTML = "";

  socialData.socialLinks.forEach((s) => {
    const a = document.createElement("a");
    a.href = s.url;
    a.target = "_blank";
    a.setAttribute("aria-label", s.label);
    a.innerHTML = `<i class="${s.icon}"></i>`;
    box.appendChild(a);
  });
}

// Intersection Observer
const revealObserver = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible", "revealed");
      }
    });
  },
  { threshold: 0.15 }
);

function attachRevealObserver(): void {
  document
    .querySelectorAll<HTMLElement>(
      ".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal"
    )
    .forEach((el) => revealObserver.observe(el));
}

// Navigation Active 상태 유지
function updateActiveNav(): void {
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  let current = "";

  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      current = sec.id;
    }
  });

  document
    .querySelectorAll<HTMLElement>(".side-nav-link, .mobile-nav-link, .header-link")
    .forEach((link) => {
      const target = link.dataset.target || link.dataset.section;
      link.classList.toggle("active", target === current);
    });
}
window.addEventListener("scroll", updateActiveNav);

/* Modal (너의 원본 그대로) */
const modal = document.getElementById("modal") as HTMLElement | null;
const modalClose = document.getElementById("modal-close") as HTMLElement | null;

function openModal(project: CompanyProject): void {
  if (!modal) return;

  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImage = document.getElementById("modal-image") as HTMLImageElement | null;
  const modalFeatures = document.getElementById("modal-features");
  const modalTechstack = document.getElementById("modal-techstack");

  if (modalTitle) {
    modalTitle.textContent = project.title;
  }

  if (modalDescription) {
    modalDescription.textContent = project.description || "";
  }

  if (modalImage) {
    modalImage.src = project.modalImage || project.thumbnail;
    modalImage.alt = project.title;
  }

  if (modalFeatures) {
    modalFeatures.innerHTML = (project.features || [])
      .map((f: string) => `<li>${f}</li>`)
      .join("");
  }

  if (modalTechstack) {
    modalTechstack.innerHTML = (project.techStack || [])
      .map((t: string) => `<span class="modal-tech-tag">${t}</span>`)
      .join("");
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(): void {
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modal?.addEventListener("click", (e: MouseEvent) => {
  if (e.target === modal) closeModal();
});

modalClose?.addEventListener("click", closeModal);

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Escape") closeModal();
});

/* About */
function renderAbout(): void {
  const el = document.getElementById("about");
  if (!el) return;

  const profile = aboutData.profile;
  const highlights = aboutData.highlights || [];
  const socials = aboutData.socialLinks || [];

  const profileImage = document.getElementById("profile-image") as HTMLElement | null;
  const profileName = document.getElementById("profile-name");
  const profileTitle = document.getElementById("profile-title");
  const profileDescription = document.getElementById("profile-description");
  const profileHighlights = document.getElementById("profile-highlights");
  const socialLinks = document.getElementById("social-links");

  if (profileImage) {
    profileImage.style.backgroundImage = `url('${profile.profileImage}')`;
  }

  if (profileName) {
    profileName.textContent = profile.name;
  }

  if (profileTitle) {
    profileTitle.textContent = profile.title;
  }

  if (profileDescription) {
    profileDescription.innerHTML = `<p>${profile.description}</p>`;
  }

  if (profileHighlights) {
    const variants = ["hero-tag--primary", "hero-tag--secondary", "hero-tag--purple", "hero-tag--green"];
    profileHighlights.innerHTML = highlights
      .map((t: string, i: number) => `<span class="hero-tag ${variants[i % 4]}">${t}</span>`)
      .join("");
  }

  if (socialLinks) {
    socialLinks.innerHTML = socials
      .map((s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer"><i class="${s.icon}"></i></a>`)
      .join("");
  }
}

/* Portfolio */
function renderPortfolio(): void {
  const data = portfolioData;

  const titleEl = document.getElementById("portfolio-intro-title");
  const subtitleEl = document.getElementById("portfolio-intro-subtitle");
  const servicesEl = document.getElementById("portfolio-services");
  const processEl = document.getElementById("portfolio-process");

  if (titleEl) {
    titleEl.textContent = data.intro.title;
  }

  if (subtitleEl) {
    subtitleEl.textContent = data.intro.subtitle;
  }

  if (servicesEl && data.services) {
    servicesEl.innerHTML = data.services
      .map((service, i) => `
        <div class="service-card service-card--${service.color} animate-scale-in animate-delay-${i + 1}">
          <div class="service-card__icon">
            <i class="${service.icon}"></i>
          </div>
          <h3 class="service-card__title">${service.title}</h3>
          <p class="service-card__desc">${service.description}</p>
          <ul class="service-card__features">
            ${service.features.map((f: string) => `<li><i class="ri-check-line"></i>${f}</li>`).join("")}
          </ul>
        </div>
      `)
      .join("");
  }

  if (processEl && data.process) {
    processEl.innerHTML = `
      <h3 class="process__title">${data.process.title}</h3>
      <div class="process__steps">
        ${data.process.steps
          .map((step) => `
            <div class="process-step process-step--${step.color}">
              <div class="process-step__icon">
                <i class="${step.icon}"></i>
              </div>
              <h4 class="process-step__label">${step.label}</h4>
              <p class="process-step__desc">${step.description}</p>
            </div>
          `)
          .join("")}
      </div>
    `;
  }

  attachRevealObserver();
}

/* Company */
function renderCompany(): void {
  const data = companyData;

  const titleEl = document.getElementById("company-intro-title");
  const subtitleEl = document.getElementById("company-intro-subtitle");
  const filterEl = document.getElementById("company-filter-buttons");
  const gridEl = document.getElementById("company-grid");

  if (titleEl) {
    titleEl.textContent = data.intro.title;
  }

  if (subtitleEl) {
    subtitleEl.textContent = data.intro.subtitle;
  }

  if (filterEl) {
    filterEl.innerHTML = "";

    data.filters.forEach((f) => {
      const btn = document.createElement("button");
      btn.textContent = f.label;
      btn.dataset.filter = f.id;
      btn.className = "filter-btn";
      if (f.id === "all") btn.classList.add("active");

      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderCompanyProjects(f.id);
      });

      filterEl.appendChild(btn);
    });
  }

  function renderCompanyProjects(filter: string = "all"): void {
    if (!gridEl) return;

    gridEl.innerHTML = "";

    const list = data.projects.filter(
      (p: CompanyProject) => filter === "all" || p.category === filter
    );

    const tagColors = ["primary", "secondary", "purple", "green"];

    list.forEach((p: CompanyProject, i: number) => {
      const card = document.createElement("article");
      card.className = `portfolio-item animate-scale-in animate-delay-${(i % 6) + 1}`;

      card.innerHTML = `
        <div class="portfolio-item__image" style="background-image:url('${p.thumbnail}')"></div>
        <div class="portfolio-item__body">
          <h3>${p.title}</h3>
          <p>${p.summary}</p>
          <div class="portfolio-item__tags">
            ${p.tags
              .map((t: string, ti: number) => 
                `<span class="portfolio-item__tag portfolio-item__tag--${tagColors[ti % 4]}">${t}</span>`
              )
              .join("")}
          </div>
          <button type="button" class="portfolio-item__link">자세히 보기 →</button>
        </div>
      `;
      const btn = card.querySelector("button");
      if (btn) {
        btn.addEventListener("click", () => openModal(p));
      }
      gridEl.appendChild(card);
    });
    attachRevealObserver();
  }
  renderCompanyProjects();
}

/* Consulting */
function renderConsulting(): void {
  const data = consultingData;

  const titleEl = document.getElementById("consulting-intro-title");
  const subtitleEl = document.getElementById("consulting-intro-subtitle");
  const visionEl = document.getElementById("consulting-vision-cards");
  const principlesEl = document.getElementById("consulting-principles");

  if (titleEl) {
    titleEl.textContent = data.intro.title;
  }

  if (subtitleEl) {
    subtitleEl.textContent = data.intro.subtitle;
  }

  if (visionEl && data.visionCards) {
    visionEl.innerHTML = data.visionCards
      .map((card) => `
        <div class="vision-card vision-card--${card.color} animate-fade-in animate-delay-${card.delay || 1}">
          <div class="vision-card__icon">
            <i class="${card.icon}"></i>
          </div>
          <h3 class="vision-card__title">${card.title}</h3>
          <p class="vision-card__desc">${card.description}</p>
        </div>
      `)
      .join("");
  }

  if (principlesEl && data.principles) {
    principlesEl.innerHTML = `
      <h3 class="principles__title">${data.principles.title}</h3>
      <div class="principles__grid">
        ${data.principles.items
          .map((item) => `
            <div class="principle-card principle-card--${item.color}">
              <div class="principle-card__icon">
                <i class="${item.icon}"></i>
              </div>
              <h4 class="principle-card__title">${item.title}</h4>
              <p class="principle-card__desc">${item.description}</p>
            </div>
          `)
          .join("")}
      </div>
    `;
  }
  attachRevealObserver();
}

/* Links */
function renderLinks(): void {
  const data = linksData;
  const container = document.getElementById("links-container");
  
  if (!container) return;

  container.innerHTML = "";

  data.categories.forEach((cat: LinksCategory, i: number) => {
    const section = document.createElement("section");
    section.className = `links-section animate-fade-in animate-delay-${i + 1}`;

    section.innerHTML = `
      <h2 class="links-section__title">${cat.title}</h2>
      <div class="links-grid links-grid--triple" id="links-cat-${cat.id}"></div>
    `;

    container.appendChild(section);

    const grid = document.getElementById(`links-cat-${cat.id}`);
    if (!grid) return;

    cat.links.forEach((link: LinkItem, li: number) => {
      const card = document.createElement("a");
      card.href = link.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.className = `link-card link-card--large animate-scale-in animate-delay-${(li % 6) + 1}`;

      card.innerHTML = `
        <div class="link-card__icon" style="background:${link.color}">
          <i class="${link.icon}"></i>
        </div>
        <div>
          <div class="link-card__title">${link.label}</div>
          ${link.description ? `<div class="link-card__desc">${link.description}</div>` : ""}
        </div>
      `;
      grid.appendChild(card);
    });
  });
  attachRevealObserver();
}

/* Contact */
function renderContact(): void {
  const data = contactData;
  const el = document.getElementById("contact");
  
  if (!el) return;

  const contactItems: { icon: string; label: string; value: string; color: string }[] = [];
  
  if (data.contactInfo) {
    const colorMap: Record<string, string> = {
      email: "primary",
      phone: "secondary",
      location: "purple",
      hours: "green"
    };

    Object.entries(data.contactInfo).forEach(([key, item]) => {
      contactItems.push({
        icon: item.icon,
        label: item.label,
        value: item.value,
        color: colorMap[key] || "primary"
      });
    });
  }

  el.innerHTML = `
    <div class="section__header">
      <h1 class="section__title animate-fade-in">${data.intro?.title || data.pageTitle}</h1>
      <p class="section__subtitle animate-fade-in animate-delay-1">${data.intro?.subtitle || ""}</p>
    </div>
    <div class="contact-grid"></div>
  `;

  const grid = el.querySelector(".contact-grid");
  if (!grid) return;

  const info = document.createElement("div");
  info.className = "contact-info animate-slide-up animate-delay-1";

  info.innerHTML = `
    <h3 class="contact-info__title">연락 정보</h3>
    <div class="contact-list">
      ${contactItems
        .map((item) => `
          <div class="contact-item">
            <div class="contact-item__icon contact-item__icon--${item.color}">
              <i class="${item.icon}"></i>
            </div>
            <div>
              <div class="contact-item__label">${item.label}</div>
              <div class="contact-item__value">${item.value}</div>
            </div>
          </div>
        `)
        .join("")}
    </div>
  `;

  const formBox = document.createElement("div");
  formBox.className = "contact-form animate-slide-up animate-delay-2";

  const formConfig = data.form;
  
  if (formConfig) {
    formBox.innerHTML = `
      <h3 class="contact-form__title">${formConfig.title}</h3>
      <p class="contact-form__desc">${formConfig.description}</p>
      <form id="contact-form">
        ${formConfig.fields
          .map((field) => `
            <div class="form-group">
              <label for="${field.id}">${field.label}</label>
              ${
                field.type === "textarea"
                  ? `<textarea id="${field.id}" placeholder="${field.placeholder}" ${field.required ? "required" : ""}></textarea>`
                  : `<input id="${field.id}" type="${field.type}" placeholder="${field.placeholder}" ${field.required ? "required" : ""} />`
              }
            </div>
          `)
          .join("")}
        <button type="submit" class="btn-submit">
          <i class="${formConfig.submit.icon}"></i>
          ${formConfig.submit.label}
        </button>
      </form>
    `;
  }

  grid.appendChild(info);
  grid.appendChild(formBox);

  setupContactForm();
  attachRevealObserver();
}

/* Contact Form */
function setupContactForm(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  
  if (!form) return;

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement)?.value;
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const message = (document.getElementById("message") as HTMLTextAreaElement)?.value;

    if (!name || !email || !message) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    console.log("Form submitted:", { name, email, message });
    alert(contactData.form?.successMessage || "문의가 성공적으로 제출되었습니다.");
    form.reset();
  });
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  // JSON 기반 네비게이션 + 소셜 추가
  renderHeaderNav();
  renderFooterSocial();

  // 기존 섹션들
  renderAbout();
  renderPortfolio();
  renderCompany();
  renderConsulting();
  renderLinks();
  renderContact();

  attachRevealObserver();
  updateActiveNav();

  console.log("All sections initialized");
});

// Export 
export {
  renderAbout,
  renderPortfolio,
  renderCompany,
  renderConsulting,
  renderLinks,
  renderContact,
  openModal,
  closeModal
};
