(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(l){if(l.ep)return;l.ep=!0;const s=o(l);fetch(l.href,s)}})();const R={headerId:"main-header",navListId:"header-nav-list",dataPath:"./data/sections.json",activeClass:"active",linkClass:"header-link",spyThreshold:.5};class G{config;sections=[];headerEl=null;navListEl=null;links=[];observer=null;constructor(t={}){this.config={...R,...t}}async init(){this.cacheElements(),this.navListEl&&(await this.loadSections(),this.renderNav(),this.setupScrollSpy(),console.log("Header initialized (simple mode)"))}cacheElements(){this.headerEl=document.getElementById(this.config.headerId),this.navListEl=document.getElementById(this.config.navListId)}async loadSections(){try{const t=await fetch(this.config.dataPath);if(!t.ok)throw new Error;const o=await t.json();this.sections=o.sections||[]}catch{console.warn("JSON 로드 실패 → 기본 섹션 사용"),this.sections=this.getDefaultSections()}}getDefaultSections(){return[{id:"about",label:"소개"},{id:"portfolio",label:"포트폴리오"},{id:"consulting",label:"컨설팅"},{id:"company",label:"창업가 소개"},{id:"links",label:"링크"},{id:"contact",label:"연락처"}]}renderNav(){this.navListEl&&(this.navListEl.innerHTML="",this.sections.forEach(t=>{const o=document.createElement("li");o.innerHTML=`
        <a href="#${t.id}"
          class="${this.config.linkClass}"
          data-section="${t.id}">
          ${t.label}
        </a>
      `,this.navListEl.appendChild(o)}),this.links=[...this.navListEl.querySelectorAll("a")])}setupScrollSpy(){const t=document.querySelectorAll("section[id]");t.length!==0&&(this.observer?.disconnect(),this.observer=new IntersectionObserver(o=>{o.forEach(n=>{if(!n.isIntersecting)return;const l=n.target.id;this.updateActiveLink(l)})},{threshold:this.config.spyThreshold}),t.forEach(o=>this.observer.observe(o)))}updateActiveLink(t){this.links.forEach(o=>{const n=o,l=n.dataset.section;n.classList.toggle(this.config.activeClass,l===t)})}destroy(){this.observer?.disconnect(),this.observer=null,console.log("Header destroyed (simple)")}}let g=null;function J(e){return g||(g=new G(e),g.init()),g}document.addEventListener("DOMContentLoaded",()=>{J()});function w(){const e=document.querySelectorAll("section[id]");let t="";e.forEach(o=>{const n=o.getBoundingClientRect();n.top<=150&&n.bottom>=150&&(t=o.id)}),document.querySelectorAll(".side-nav-link, .mobile-nav-link, .header-link").forEach(o=>{const n=o.dataset.target||o.dataset.section;o.classList.toggle("active",n===t)})}function K(){w(),window.addEventListener("scroll",w)}document.addEventListener("DOMContentLoaded",K);const x="active";let A=null,y=null,H=null;function z(){A=document.getElementById("modal"),y=document.getElementById("modal-overlay"),H=document.getElementById("modal-close"),(!A||!y)&&console.warn("modal 요소를 찾을 수 없습니다.")}function _(){A?.classList.remove(x),y?.classList.remove(x),document.body.style.overflow=""}function V(){document.addEventListener("keydown",e=>{e.key==="Escape"&&_()}),y?.addEventListener("click",()=>_()),H?.addEventListener("click",()=>_())}document.addEventListener("DOMContentLoaded",()=>{z(),V()});const U={name:"민시우",title:"Full-Stack · DevOps · AI · Cloud Automation 전문가",description:"AI와 자동화를 중심으로 디지털 전환을 선도하는 풀스택·클라우드 엔지니어입니다. 비즈니스 목표에 맞춘 기술 전략, 안정적인 시스템 구축, 자동화 기반 운영 최적화를 통해 기업의 성장을 돕습니다.",profileImage:"/assets/images/profile.jpg"},X=["AI 기반 자동화 시스템 구축 경험","대규모 클라우드 인프라 설계 및 운영","React · Node.js 중심의 Full-Stack 개발","DevOps 파이프라인 구축 및 운영 자동화","대기업·스타트업 DX 컨설팅 프로젝트 다수 수행"],Y={core:[{name:"AI/ML",level:92},{name:"Full-Stack Development",level:90},{name:"DevOps & Automation",level:94},{name:"Cloud Architecture",level:88},{name:"System Design",level:86}]},Q=[{name:"AWS Solutions Architect – Associate",issuer:"Amazon Web Services",year:2023},{name:"Google Cloud Professional Cloud Architect",issuer:"Google Cloud",year:2023},{name:"Kubernetes CKA",issuer:"Linux Foundation",year:2022}],Z=[{platform:"GitHub",url:"https://github.com/artiordex",icon:"ri-github-fill"},{platform:"LinkedIn",url:"https://www.linkedin.com/in/artiordex",icon:"ri-linkedin-box-fill"},{platform:"Instagram",url:"https://instagram.com",icon:"ri-instagram-line"},{platform:"Blog",url:"https://artiordex.dev",icon:"ri-book-open-line"}],ee={profile:U,highlights:X,skills:Y,certifications:Q,socialLinks:Z},h=ee;function te(){const e=document.getElementById("about");e&&(e.innerHTML=`
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
  `,ie(),oe(),ne(),le())}function ie(){const e=h.profile,t=h.highlights||[],o=h.socialLinks||[],n=document.getElementById("profile-image");n&&e.profileImage&&(n.style.backgroundImage=`url('${e.profileImage}')`);const l=document.getElementById("profile-name"),s=document.getElementById("profile-title");l&&(l.textContent=e.name),s&&(s.textContent=e.title);const a=document.getElementById("profile-description");a&&(Array.isArray(e.description)?a.innerHTML=e.description.map(c=>`<p>${c}</p>`).join(""):a.innerHTML=`<p>${e.description}</p>`);const r=document.getElementById("profile-highlights");if(r){const c=["hero-tag--primary","hero-tag--secondary","hero-tag--purple","hero-tag--green"];r.innerHTML=t.map((d,p)=>`<span class="hero-tag ${c[p%4]}">${d}</span>`).join("")}const i=document.getElementById("social-links");i&&(i.innerHTML=o.map(c=>`
        <a href="${c.url}" target="_blank" rel="noopener noreferrer" aria-label="${c.platform}">
          <i class="${c.icon}"></i>
        </a>
      `).join(""))}function oe(){const e=h.skills?.core||[],t=document.getElementById("skills-core");t&&(t.innerHTML=e.map(o=>`
        <div class="skill-item">
          <div class="skill-header">
            <span class="skill-name">${o.name}</span>
            <span class="skill-percent">${o.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="progress-bar" data-width="${o.level}%"></div>
          </div>
        </div>
      `).join(""),requestAnimationFrame(()=>{document.querySelectorAll(".progress-bar").forEach(o=>{const n=o.dataset.width||"0%";o.style.width=n})}))}function ne(){const e=h.certifications||[],t=document.getElementById("certifications-list");if(t){const o=["hero-cert-item--primary","hero-cert-item--secondary","hero-cert-item--purple","hero-cert-item--green"];t.innerHTML=e.map((n,l)=>`
        <div class="hero-cert-item ${o[l%4]}">
          <i class="ri-award-line"></i>
          <div class="hero-cert-item__info">
            <div class="hero-cert-item__title">${n.name}</div>
            <div class="hero-cert-item__org">${n.issuer} · ${n.year}</div>
          </div>
        </div>
      `).join("")}}function le(){const e=document.querySelectorAll(".carousel-slide"),t=document.querySelectorAll(".carousel-indicator"),o=document.querySelector(".carousel-nav.prev"),n=document.querySelector(".carousel-nav.next");let l=0;function s(i){e.forEach((c,d)=>{c.classList.toggle("active",d===i)}),t.forEach((c,d)=>{c.classList.toggle("active",d===i)}),l=i}function a(){s((l+1)%e.length)}function r(){s((l-1+e.length)%e.length)}o?.addEventListener("click",r),n?.addEventListener("click",a),t.forEach((i,c)=>{i.addEventListener("click",()=>s(c))}),document.addEventListener("keydown",i=>{i.key==="ArrowLeft"&&r(),i.key==="ArrowRight"&&a()})}const se={title:"전문 컨설팅 서비스",subtitle:"디지털 전환부터 AI 구축까지, 비즈니스 성장을 위한 맞춤형 솔루션을 제공합니다"},ae={intro:se},re=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add("visible","revealed")})},{threshold:.15});function f(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(e=>re.observe(e))}const ce=ae;let m=null,j=null,D=null,q=null,N=null,O=null,T=null;function de(){const e=document.getElementById("portfolio");if(!e)return;const{intro:t,filters:o=[],projects:n=[]}=ce;e.innerHTML=`
    <section class="section section--light">
      <div class="section__inner">

        <header class="section__header">
          <h1 class="section__title animate-fade-in animate-delay-1">
            ${t?.title}
          </h1>
          <p class="section__subtitle animate-fade-in animate-delay-2">
            ${t?.subtitle}
          </p>
        </header>

        <div id="portfolio-filter-buttons"
             class="filter-buttons animate-fade-in animate-delay-3"></div>

        <div id="portfolio-grid"></div>

      </div>
    </section>

    ${me()}
  `,ue(o,n),F("all",n),pe(),f()}function ue(e,t){const o=document.getElementById("portfolio-filter-buttons");o&&(o.innerHTML="",e.forEach(n=>{const l=document.createElement("button");l.type="button",l.className="filter-btn",l.textContent=n.label,l.dataset.filter=n.id,n.id==="all"&&l.classList.add("active"),l.addEventListener("click",()=>{o.querySelectorAll(".filter-btn").forEach(s=>s.classList.remove("active")),l.classList.add("active"),F(n.id,t)}),o.appendChild(l)}))}function F(e,t){const o=document.getElementById("portfolio-grid");if(!o)return;const n=["primary","secondary","purple","green"];o.innerHTML="",(e==="all"?t:t.filter(s=>s.category===e)).forEach((s,a)=>{const r=document.createElement("article");r.className=`portfolio-item animate-scale-in animate-delay-${a%6+1}`,r.innerHTML=`
      <div class="portfolio-item__image"
           style="background-image:url('${s.thumbnail}')"></div>

      <div class="portfolio-item__body">
        <h3 class="portfolio-item__title">${s.title}</h3>
        <p class="portfolio-item__desc">${s.summary}</p>

        <div class="portfolio-item__tags">
          ${(s.tags||[]).map((i,c)=>`<span class="portfolio-item__tag portfolio-item__tag--${n[c%n.length]}">${i}</span>`).join("")}
        </div>

        <button type="button" class="portfolio-item__link">
          자세히 보기 →
        </button>
      </div>
    `,r.querySelector(".portfolio-item__link")?.addEventListener("click",()=>fe(s)),o.appendChild(r)}),f()}function me(){return`
    <div id="modal" class="modal" aria-hidden="true">
      <div class="modal-content" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h2 id="modal-title" class="modal-title"></h2>
          <button id="modal-close"
                  class="modal-close"
                  type="button"
                  aria-label="포트폴리오 상세 닫기">
            <i class="ri-close-line"></i>
          </button>
        </div>

        <div class="modal-body">
          <img id="modal-image" class="modal-image" alt="">
          <p id="modal-description" class="modal-description"></p>

          <h3 class="modal-section-title">주요 기능</h3>
          <ul id="modal-features" class="modal-features"></ul>

          <h3 class="modal-section-title">기술 스택</h3>
          <div id="modal-techstack" class="modal-techstack"></div>
        </div>
      </div>
    </div>
  `}function pe(){m=document.getElementById("modal"),j=document.getElementById("modal-title"),D=document.getElementById("modal-image"),q=document.getElementById("modal-description"),N=document.getElementById("modal-features"),O=document.getElementById("modal-techstack"),T=document.getElementById("modal-close"),T?.addEventListener("click",L),m?.addEventListener("click",e=>{e.target===m&&L()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&m?.classList.contains("active")&&L()})}function fe(e){m&&(j.textContent=e.title,D.src=e.modalImage||e.thumbnail,q.textContent=e.description||"",N.innerHTML=(e.features||[]).map(t=>`<li>${t}</li>`).join(""),O.innerHTML=(e.techStack||[]).map(t=>`<span class="modal-tech-tag">${t}</span>`).join(""),m.classList.add("active"),m.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden")}function L(){m&&(m.classList.remove("active"),m.setAttribute("aria-hidden","true"),document.body.style.overflow="")}const ve={title:"창업가로서의 신념",subtitle:"기술의 본질은 사람을 돕는 것이며, 혁신은 본질을 더 명확하게 드러낼 뿐입니다. 저는 기술 중심의 창업가로서 문제를 해결하고, 더 나은 방향으로 움직이는 변화를 만들어갑니다."},he=[{id:"innovation",title:"기술로 변화 만들기",description:"기술은 단순한 도구가 아니라 문제를 해결하는 사고 방식입니다. 복잡한 비즈니스 문제를 기술적 관점에서 재정의하고, 가장 효율적인 해결책을 찾는 데 집중합니다.",icon:"ri-lightbulb-flash-line",color:"primary",delay:1},{id:"future",title:"AI 혁신의 선도",description:"AI는 지금 이 순간에도 비즈니스의 형태를 재창조하고 있습니다. 저는 AI 기술을 단순한 자동화가 아니라 '새로운 가능성의 확장'으로 바라보고, 실질적인 비즈니스 가치로 연결합니다.",icon:"ri-brain-line",color:"purple",delay:2},{id:"experience",title:"15년의 현장 경험",description:"제조, 물류, 금융, 스타트업 등 다양한 산업에서 쌓아온 경험은 문제의 본질을 이해하는 데 큰 자산이 됩니다. 기술은 산업을 이해할 때 가장 강력해집니다.",icon:"ri-timer-2-line",color:"secondary",delay:3},{id:"collaboration",title:"함께 성장하는 협업",description:"좋은 팀은 함께 성장하며, 좋은 협업은 서로의 전문성을 더욱 명확하게 만듭니다. 저는 기술과 비즈니스의 간극을 잇는 다리 역할을 합니다.",icon:"ri-team-line",color:"green",delay:4}],ge={title:"창업가의 세 가지 원칙",items:[{id:"innovationMindset",title:"혁신적 사고",description:"혁신은 거창한 기술에서 시작되지 않습니다. 작은 관찰과 날카로운 질문에서 출발하며, 저는 이를 반복적으로 실천합니다.",icon:"ri-focus-2-line",color:"primary"},{id:"qualityAssurance",title:"품질 중심의 실행",description:"빠른 개발이 목표가 아닙니다. 유지보수할 수 있고, 확장 가능하며, 신뢰할 수 있는 시스템을 만드는 것이 진짜 품질입니다.",icon:"ri-shield-check-line",color:"secondary"},{id:"continuousGrowth",title:"지속 가능한 성장",description:"기술 성장과 비즈니스 성장은 함께 가야 합니다. 장기적인 관점에서 의미 있는 성장을 설계합니다.",icon:"ri-line-chart-line",color:"purple"}]},be={intro:ve,visionCards:he,principles:ge},ye=be;function Ee(){const e=ye,t=document.getElementById("consulting-intro-title"),o=document.getElementById("consulting-intro-subtitle");t&&(t.textContent=e.intro?.title),o&&(o.textContent=e.intro?.subtitle);const n=document.getElementById("service-grid");n&&Array.isArray(e.serviceCategories)&&(n.innerHTML="",e.serviceCategories.forEach((i,c)=>{const d={primary:"consulting-card__icon consulting-card__icon--primary",secondary:"consulting-card__icon consulting-card__icon--secondary",purple:"consulting-card__icon consulting-card__icon--purple",green:"consulting-card__icon consulting-card__icon--green"},p=d[i.color]||d.primary,v=i.delay||c+1,E=document.createElement("article");E.className=`consulting-card animate-scale-in animate-delay-${v}`,E.innerHTML=`
        <div class="${p}">
          <i class="${i.icon}"></i>
        </div>
        <h3 class="consulting-card__title">${i.title}</h3>
        <p class="consulting-card__desc">${i.description}</p>
        <ul class="consulting-card__list">
          ${(i.items||[]).map(W=>`<li><i class="ri-check-line"></i>${W}</li>`).join("")}
        </ul>
      `,n.appendChild(E)}));const l=document.getElementById("process-title"),s=document.getElementById("process-steps");l&&(l.textContent=e.process?.title||""),s&&Array.isArray(e.process?.steps)&&(s.innerHTML="",e.process.steps.forEach((i,c)=>{const d=i.delay||c+1,p=c%5+1,v=document.createElement("div");v.className=`process-step animate-scale-in animate-delay-${d}`,v.innerHTML=`
        <div class="process-step__icon process-step__icon--${p}">
          <i class="${i.icon}"></i>
        </div>
        <h4 class="process-step__title">${i.title}</h4>
        <p class="process-step__desc">${i.description}</p>
      `,s.appendChild(v)}));const a=document.getElementById("consulting-vision-cards");a&&e.visionCards&&(a.innerHTML=e.visionCards.map(i=>`
      <div class="vision-card vision-card--${i.color} animate-fade-in animate-delay-${i.delay||1}">
        <div class="vision-card__icon">
          <i class="${i.icon}"></i>
        </div>
        <h3 class="vision-card__title">${i.title}</h3>
        <p class="vision-card__desc">${i.description}</p>
      </div>`).join(""));const r=document.getElementById("consulting-principles");r&&e.principles&&(r.innerHTML=`
      <h3 class="principles__title">${e.principles.title}</h3>
      <div class="principles__grid">
        ${e.principles.items.map(i=>`
          <div class="principle-card principle-card--${i.color}">
            <div class="principle-card__icon">
              <i class="${i.icon}"></i>
            </div>
            <h4 class="principle-card__title">${i.title}</h4>
            <p class="principle-card__desc">${i.description}</p>
          </div>`).join("")}
      </div>
    `),f()}const _e={title:"포트폴리오",subtitle:"다양한 산업 분야에서 성공적으로 완료한 프로젝트들을 확인해보세요"},Le=[{id:"all",label:"전체"},{id:"web",label:"웹 개발"},{id:"ai",label:"AI 솔루션"},{id:"cloud",label:"클라우드"}],$e=[{id:"project1",category:"web",title:"이커머스 플랫폼 구축",summary:"대형 유통업체를 위한 통합 이커머스 솔루션 개발 및 구축",thumbnail:"/assets/images/project1.jpg",tags:["React","Node.js","AWS"],modalImage:"/assets/images/project1-cover.jpg",description:"대형 유통업체를 위한 통합 이커머스 솔루션을 개발하여 온라인 매출 300% 증가를 달성했습니다. 마이크로서비스 아키텍처를 도입하여 확장성과 안정성을 확보했습니다.",features:["실시간 재고 관리 시스템","AI 기반 상품 추천 엔진","다중 결제 시스템 통합","모바일 최적화 반응형 디자인"],techStack:["React","Node.js","AWS","MongoDB"]},{id:"project2",category:"ai",title:"AI 기반 예측 분석 시스템",summary:"제조업체의 수요 예측 및 재고 최적화를 위한 AI 솔루션",thumbnail:"/assets/images/project2.jpg",tags:["Python","TensorFlow","Docker"],modalImage:"/assets/images/project2-cover.jpg",description:"AI 기반 예측 분석 시스템으로 제조업체의 수요 예측 정확도를 85%까지 향상시키고 재고 비용을 40% 절감했습니다.",features:["수요 예측 정확도 85%","재고 비용 40% 절감","생산 계획 최적화","실시간 데이터 분석"],techStack:["Python","TensorFlow","Docker","Kubernetes"]},{id:"project3",category:"cloud",title:"클라우드 마이그레이션",summary:"금융 기업 레거시 시스템 AWS 클라우드 이전",thumbnail:"/assets/images/project3.jpg",tags:["AWS","Kubernetes","DevOps"],modalImage:"/assets/images/project3-cover.jpg",description:"금융 기업의 시스템을 AWS로 완전 이전하여 운영 비용을 절감하고 시스템 가용성 99.9%를 달성했습니다.",features:["운영 비용 50% 절감","99.9% 가용성 확보","배포 시간 90% 단축","자동 스케일링 적용"],techStack:["AWS","Kubernetes","Terraform","DevOps"]}],ke={intro:_e,filters:Le,projects:$e},P=ke;let u,C,b,S,B,M,$;function Ie(){const e=document.getElementById("company");if(!e)return;const t=P,o=t.intro||{},n=t.filters||[],l=t.projects||[];e.innerHTML=`
    <div class="section__inner">
      <!-- Header Section -->
      <header class="section__header">
        <div class="animate-fade-in animate-delay-1">
          <h1 id="intro-title" class="section__title">${o.title||""}</h1>
          <p id="intro-subtitle" class="section__subtitle">${o.subtitle||""}</p>
        </div>
      </header>

      <!-- Filter Buttons -->
      <div class="filter-buttons animate-fade-in animate-delay-2" id="filter-buttons"></div>

      <!-- Portfolio Grid -->
      <div id="portfolio-grid"></div>
    </div>

    <!-- Modal -->
    <div id="modal" class="modal" aria-hidden="true">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="modal-title" class="modal-title">프로젝트 상세</h2>
          <button
            id="modal-close"
            class="modal-close"
            type="button"
            aria-label="프로젝트 상세 닫기"
          >
            <i class="ri-close-line"></i>
          </button>
        </div>
        <div class="modal-body">
          <img id="modal-image" class="modal-image" alt="">
          <p id="modal-description" class="modal-description"></p>

          <h3 class="modal-section-title">주요 기능</h3>
          <ul id="modal-features" class="modal-features"></ul>

          <h3 class="modal-section-title">기술 스택</h3>
          <div id="modal-techstack" class="modal-techstack"></div>
        </div>
      </div>
    </div>
  `,we(n),Ae(l),Ce(),Se(),f()}function we(e){const t=document.getElementById("filter-buttons");t&&(t.innerHTML="",e.forEach(o=>{const n=document.createElement("button");n.type="button",n.textContent=o.label,n.dataset.filter=o.id,n.className="filter-btn",o.id==="all"&&n.classList.add("active"),t.appendChild(n)}))}function Ae(e){const t=document.getElementById("portfolio-grid");if(!t)return;const o=["primary","secondary","purple","green"];t.innerHTML="",e.forEach((n,l)=>{const s=document.createElement("div");s.className=`portfolio-item animate-scale-in animate-delay-${l%6+1}`,s.dataset.category=n.category,s.innerHTML=`
      <div class="portfolio-item__image"
          style="background-image: url('${n.thumbnail}')"></div>
      <div class="portfolio-item__body">
        <h3 class="portfolio-item__title">${n.title}</h3>
        <p class="portfolio-item__desc">${n.summary}</p>

        <div class="portfolio-item__tags">
          ${(n.tags||[]).map((a,r)=>`<span class="portfolio-item__tag portfolio-item__tag--${o[r%o.length]}">${a}</span>`).join("")}
        </div>

        <button class="portfolio-item__link"
                type="button"
                data-project-id="${n.id}"
                aria-label="${n.title} 상세 보기">
          자세히 보기 →
        </button>
      </div>
    `,t.appendChild(s)}),t.addEventListener("click",n=>{const s=n.target.closest(".portfolio-item__link");if(!s)return;const a=s.dataset.projectId;a&&Be(a)})}function Ce(){const e=document.querySelectorAll(".filter-btn"),t=document.querySelectorAll(".portfolio-item");e.forEach(o=>{o.addEventListener("click",()=>{e.forEach(l=>l.classList.remove("active")),o.classList.add("active");const n=o.dataset.filter;t.forEach(l=>{n==="all"||l.dataset.category===n?l.classList.remove("hidden"):l.classList.add("hidden")})})})}function Se(){u=document.getElementById("modal"),C=document.getElementById("modal-title"),b=document.getElementById("modal-image"),S=document.getElementById("modal-description"),B=document.getElementById("modal-features"),M=document.getElementById("modal-techstack"),$=document.getElementById("modal-close"),$&&$.addEventListener("click",k),u&&u.addEventListener("click",e=>{e.target===u&&k()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&u?.classList.contains("active")&&k()})}function Be(e){const t=P.projects.find(o=>o.id===e);!t||!u||(C&&(C.textContent=t.title||""),b&&(b.src=t.modalImage||t.thumbnail||"",b.alt=t.title||"프로젝트 상세 이미지"),S&&(S.textContent=t.description||""),B&&(B.innerHTML=(t.features||[]).map(o=>`<li>${o}</li>`).join("")),M&&(M.innerHTML=(t.techStack||[]).map(o=>`<span class="modal-tech-tag">${o}</span>`).join("")),u.classList.add("active"),u.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden")}function k(){u&&(u.classList.remove("active"),u.setAttribute("aria-hidden","true"),document.body.style.overflow="")}const Me=[{id:"social",title:"Connect with Me",links:[{label:"Gmail",url:"mailto:artiordex@gmail.com",icon:"ri-mail-line",color:"#D14836"},{label:"LinkedIn",url:"https://www.linkedin.com/in/shiwoo-min-a493aa263/",icon:"ri-linkedin-fill",color:"#0A66C2"},{label:"Instagram",url:"https://instagram.com/artiordex",icon:"ri-instagram-line",color:"#E4405F"},{label:"Threads",url:"https://www.threads.net/@artiordex",icon:"ri-threads-fill",color:"#000000"},{label:"Strava",url:"https://www.strava.com/athletes/artiordex",icon:"ri-run-line",color:"#FC4C02"},{label:"YouTube",url:"https://youtube.com/@artiordex",icon:"ri-youtube-fill",color:"#FF0000"},{label:"Slack",url:"https://slack.com/artiordex-invite",icon:"ri-slack-fill",color:"#4A154B"},{label:"Discord",url:"https://discord.gg/artiordex",icon:"ri-discord-fill",color:"#5865F2"}]},{id:"artiordex",title:"My Work @Artiordex",links:[{label:"Artiordex Home (WordPress)",url:"https://www.artiordex.com/",icon:"ri-building-line",color:"#000000"},{label:"Artiordex GitHub Pages",url:"https://www.artiordex.github.io/",icon:"ri-github-fill",color:"#000000"},{label:"Artiordex Blog (Naver)",url:"https://blog.naver.com/artiordex",icon:"ri-book-line",color:"#03C75A"},{label:"Artiordex Store (Naver Smart Store)",url:"https://smartstore.naver.com/artiordex",icon:"ri-store-2-line",color:"#03C75A"},{label:"Artiordex Official Notion",url:"https://www.notion.so/artiordex/Artiordex-Official-Notion-20892a86c03b80acb32bccc3be49bc64?pvs=21",icon:"ri-notion-fill",color:"#000000"},{label:"Artiordex Consulting",url:"https://www.notion.so/artiordex/Artiordex-Consulting-22792a86c03b808786d5dcbc1054e508?pvs=21",icon:"ri-lightbulb-line",color:"#000000"},{label:"Artiordex Tech Insights",url:"https://www.notion.so/artiordex/Artiordex-Tech-Insights-22792a86c03b80d68445e2a7ba53fefb?pvs=21",icon:"ri-magic-line",color:"#000000"},{label:"Artiordex Project Space",url:"https://www.notion.so/artiordex/Artiordex-Project-20692a86c03b80e290e7f570db3f8024?pvs=21",icon:"ri-apps-line",color:"#000000"}]},{id:"notes",title:"Life & Work Notes",links:[{label:"Reference",url:"https://www.notion.so/Reference-23392a86c03b803b97d3c95409c5093c?pvs=21",icon:"ri-bookmark-line",color:"#000000"},{label:"Dev & Worklog",url:"https://www.notion.so/Dev-Worklog-22792a86c03b8031b989c3639c91dae7?pvs=21",icon:"ri-code-s-slash-line",color:"#000000"},{label:"Study & Reading Log",url:"https://www.notion.so/Study-Reading-Log-22792a86c03b8078bcffdf1d39055072?pvs=21",icon:"ri-book-open-line",color:"#000000"},{label:"Insights Log",url:"https://www.notion.so/Insights-Log-20892a86c03b8002bef6fbdfdb74e626?pvs=21",icon:"ri-lightbulb-flash-line",color:"#000000"},{label:"Creative Log",url:"https://www.notion.so/Creative-Log-22792a86c03b80d38f2fedb73a1cc421?pvs=21",icon:"ri-brush-line",color:"#000000"},{label:"Life Journal",url:"https://www.notion.so/Life-Journal-Log-20892a86c03b803ead65c1c2b281eeb6?pvs=21",icon:"ri-emotion-happy-line",color:"#000000"},{label:"Archive Log",url:"https://www.notion.so/Archive-Log-23192a86c03b807e9185da0b5d57e2d9?pvs=21",icon:"ri-archive-line",color:"#000000"}]}],xe={categories:Me},I=xe;function Te(){const e=document.getElementById("links");if(!e)return;const t=I.intro?.title||"Links Hub",o=I.intro?.subtitle||"모든 소셜, 작업 공간, Notion 기록을 한 곳에서 확인하세요.";e.innerHTML=`
    <div class="section__inner">
      <!-- Intro -->
      <header class="section__header">
        <h1 class="section__title animate-fade-in animate-delay-1">${t}</h1>
        <p class="section__subtitle animate-fade-in animate-delay-2">${o}</p>
      </header>

      <div id="links-container"></div>
    </div>
  `;const n=document.getElementById("links-container");n&&(I.categories.forEach((l,s)=>{const a=document.createElement("section");a.className=`links-section animate-fade-in animate-delay-${s+1}`,a.innerHTML=`
      <h2 class="links-section__title">${l.title}</h2>
      <div class="links-grid links-grid--triple" id="links-cat-${l.id}"></div>
    `,n.appendChild(a);const r=a.querySelector(`#links-cat-${l.id}`);r&&l.links.forEach((i,c)=>{const d=document.createElement("a");d.href=i.url,d.target="_blank",d.rel="noopener noreferrer",d.className=`link-card link-card--large animate-scale-in animate-delay-${c%6+1}`;const p=i.color||"#4B5563";d.innerHTML=`
        <div class="link-card__icon" style="background:${p}">
          <i class="${i.icon}"></i>
        </div>
        <div>
          <div class="link-card__title">${i.label}</div>
          ${i.description?`<div class="link-card__desc">${i.description}</div>`:""}
        </div>
      `,r.appendChild(d)})}),f())}const He={title:"연락처",subtitle:"프로젝트 문의, 협업 제안, 컨설팅 요청 등 어떤 내용이든 편하게 연락해주세요."},je={email:{label:"이메일",value:"artiordex@gmail.com",icon:"ri-mail-line"},phone:{label:"전화번호",value:"+82-10-1234-5678",icon:"ri-phone-line"},location:{label:"위치",value:"Seoul, South Korea",icon:"ri-map-pin-line"},hours:{label:"업무 시간",value:"월–금 · 09:00–18:00",icon:"ri-time-line"}},De={title:"문의하기",description:"아래 양식을 작성해주시면 빠르게 회신드리겠습니다.",fields:[{id:"name",label:"이름",placeholder:"이름을 입력하세요",type:"text",required:!0},{id:"email",label:"이메일",placeholder:"메일 주소를 입력하세요",type:"email",required:!0},{id:"subject",label:"제목",placeholder:"문의 제목을 입력하세요",type:"text",required:!0},{id:"message",label:"내용",placeholder:"문의 내용을 상세히 작성해주세요",type:"textarea",required:!0}],submit:{label:"문의 보내기",icon:"ri-send-plane-2-line"},successMessage:"문의가 성공적으로 제출되었습니다. 빠른 시일 내에 답변드리겠습니다."},qe={intro:He,contactInfo:je,form:De},Ne=qe;function Oe(){const e=Ne,t=document.getElementById("contact");if(!t)return;const o=[],n={email:"primary",phone:"secondary",location:"purple",hours:"green"};e.contactInfo&&Object.entries(e.contactInfo).forEach(([i,c])=>{const d=i;o.push({icon:c.icon,label:c.label,value:c.value,color:n[d]})}),t.innerHTML=`
    <div class="section__header">
      <h1 class="section__title animate-fade-in">${e.intro?.title}</h1>
      <p class="section__subtitle animate-fade-in animate-delay-1">
        ${e.intro?.subtitle}
      </p>
    </div>

    <div class="contact-grid"></div>

    <!-- Toast -->
    <div id="toast" class="toast">
      <i class="ri-check-line"></i>
      <span>${e.form?.successMessage}</span>
    </div>
  `;const l=t.querySelector(".contact-grid");if(!l)return;const s=document.createElement("div");s.className="contact-info animate-slide-up animate-delay-1",s.innerHTML=`
    <h3 class="contact-info__title">연락 정보</h3>
    <div class="contact-list">
      ${o.map(i=>`
        <div class="contact-item">
          <div class="contact-item__icon contact-item__icon--${i.color}">
            <i class="${i.icon}"></i>
          </div>
          <div>
            <div class="contact-item__label">${i.label}</div>
            <div class="contact-item__value">${i.value}</div>
          </div>
        </div>`).join("")}
    </div>
  `;const a=document.createElement("div");a.className="contact-form animate-slide-up animate-delay-2";const r=e.form;a.innerHTML=`
    <h3 class="contact-form__title">${r.title}</h3>
    <p class="contact-form__desc">${r.description}</p>

    <form id="contact-form">
      ${r.fields.map(i=>i.type==="textarea"?`
            <div class="form-group">
              <label for="${i.id}">${i.label}</label>
              <textarea id="${i.id}" placeholder="${i.placeholder}" ${i.required?"required":""}></textarea>
              <div id="${i.id}-error" class="error-message"></div>
            </div>`:`
          <div class="form-group">
            <label for="${i.id}">${i.label}</label>
            <input id="${i.id}" type="${i.type}" placeholder="${i.placeholder}" ${i.required?"required":""} />
            <div id="${i.id}-error" class="error-message"></div>
          </div>`).join("")}

      <button type="submit" class="btn-submit">
        <i class="${r.submit.icon}"></i>
        ${r.submit.label}
      </button>
    </form>
  `,l.appendChild(s),l.appendChild(a),Fe(),f()}function Fe(){const e=document.getElementById("contact-form"),t=document.getElementById("toast");if(!e||!t)return;const o=Array.from(e.querySelectorAll("input, textarea"));function n(a,r){const i=document.getElementById(`${a}-error`);i&&(i.textContent=r,i.classList.add("show"))}function l(a){const r=document.getElementById(`${a}-error`);r&&r.classList.remove("show")}function s(a){const r=a.id,i=a.value.trim();return l(r),a.required&&!i?(n(r,"필수 입력 항목입니다."),!1):r==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)?(n(r,"올바른 이메일 형식을 입력해주세요."),!1):!0}o.forEach(a=>{a.addEventListener("blur",()=>s(a))}),e.addEventListener("submit",a=>{a.preventDefault();let r=!0;o.forEach(i=>{s(i)||(r=!1)}),r&&(e.reset(),t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),3e3))})}const Pe=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add("visible","revealed")})},{threshold:.15});function We(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(e=>Pe.observe(e))}document.addEventListener("DOMContentLoaded",()=>{te(),de(),Ie(),Ee(),Te(),Oe(),We(),w()});
