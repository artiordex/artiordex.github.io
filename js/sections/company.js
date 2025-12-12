/**
 * company.ts
 * 회사 프로젝트 섹션 렌더링
 */
import companyJson from "@/data/company.json";
import { openModal } from "@ts/components/modal";
import { attachRevealObserver } from "@ts/utils/reveal";
// JSON → 타입 적용
const companyData = companyJson;
/**
 * 회사 프로젝트 렌더링
 */
export function renderCompany() {
    const data = companyData;
    const titleEl = document.getElementById("company-intro-title");
    const subtitleEl = document.getElementById("company-intro-subtitle");
    const filterEl = document.getElementById("company-filter-buttons");
    const gridEl = document.getElementById("company-grid");
    if (titleEl)
        titleEl.textContent = data.intro.title;
    if (subtitleEl)
        subtitleEl.textContent = data.intro.subtitle;
    /** 필터 버튼 렌더링 */
    if (filterEl) {
        filterEl.innerHTML = "";
        data.filters.forEach((f) => {
            const btn = document.createElement("button");
            btn.textContent = f.label;
            btn.dataset.filter = f.id;
            btn.className = "filter-btn";
            if (f.id === "all")
                btn.classList.add("active");
            btn.addEventListener("click", () => {
                document
                    .querySelectorAll(".filter-btn")
                    .forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                renderCompanyProjects(f.id);
            });
            filterEl.appendChild(btn);
        });
    }
    /** 기본: 전체(all) 렌더링 */
    renderCompanyProjects("all");
    /** 애니메이션 attach */
    attachRevealObserver();
}
/**
 * 프로젝트 카드 리스트 렌더링
 */
function renderCompanyProjects(filter) {
    const gridEl = document.getElementById("company-grid");
    if (!gridEl)
        return;
    const tagColors = ["primary", "secondary", "purple", "green"];
    gridEl.innerHTML = "";
    const list = companyData.projects.filter((p) => filter === "all" || p.category === filter);
    list.forEach((project, i) => {
        const card = document.createElement("article");
        card.className = `portfolio-item animate-scale-in animate-delay-${(i % 6) + 1}`;
        card.innerHTML = `
      <div class="portfolio-item__image" style="background-image:url('${project.thumbnail}')"></div>
      <div class="portfolio-item__body">
        <h3>${project.title}</h3>
        <p>${project.summary}</p>

        <div class="portfolio-item__tags">
          ${project.tags
            .map((t, ti) => `<span class="portfolio-item__tag portfolio-item__tag--${tagColors[ti % 4]}">${t}</span>`)
            .join("")}
        </div>

        <button type="button" class="portfolio-item__link">자세히 보기 →</button>
      </div>
    `;
        const btn = card.querySelector("button");
        if (btn) {
            btn.addEventListener("click", () => openModal(project));
        }
        gridEl.appendChild(card);
    });
    // 애니메이션 오브저버 적용
    attachRevealObserver();
}
