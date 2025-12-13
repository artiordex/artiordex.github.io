(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const oe={mountId:"layout-header",navListId:"header-nav-list",dataPath:"/data/sections.json",activeClass:"active",linkClass:"header-link",spyThreshold:.5,hideOnScrollDown:!0,scrollThreshold:100};class se{config;sections=[];navListEl=null;headerEl=null;links=[];observer=null;lastScrollY=0;ticking=!1;constructor(e={}){this.config={...oe,...e}}async init(){if(this.renderSkeleton(),await this.loadSections(),this.sections.length===0){console.warn("[Header] sections.json is empty or missing");return}this.renderNav(),this.setupScrollSpy(),this.bindClickEvents(),this.config.hideOnScrollDown&&this.setupScrollHide()}renderSkeleton(){const e=document.getElementById(this.config.mountId);if(!e){console.error(`[Header] Mount element not found: #${this.config.mountId}`);return}e.innerHTML=`
      <header id="main-header" class="header">
        <div class="header-inner">
          <div class="logo">민시우 - 디지털 전환 개발자</div>
          <nav>
            <ul id="${this.config.navListId}"></ul>
          </nav>
        </div>
      </header>
    `,this.headerEl=document.getElementById("main-header"),this.navListEl=document.getElementById(this.config.navListId)}async loadSections(){try{const e=await fetch(this.config.dataPath);if(!e.ok)throw new Error(`HTTP ${e.status}`);const i=await e.json();this.sections=i.sections??[],console.log("[Header] Loaded sections:",this.sections)}catch(e){console.error("[Header] Failed to load sections.json",e),this.sections=[]}}renderNav(){this.navListEl&&(this.navListEl.innerHTML=this.sections.map(e=>`
        <li>
          <a href="#${e.id}"
            class="${this.config.linkClass}"
            data-section="${e.id}">
            ${e.icon?`<i class="${e.icon}"></i>`:""}
            <span>${e.label}</span>
          </a>
        </li>
      `).join(""),this.links=[...this.navListEl.querySelectorAll("a")])}bindClickEvents(){this.links.forEach(e=>{e.addEventListener("click",i=>{i.preventDefault();const s=e.dataset.section;if(!s)return;const o=document.getElementById(s);if(!o)return;const n=this.headerEl?.offsetHeight||72,a=o.offsetTop-n;window.scrollTo({top:a,behavior:"smooth"})})})}setupScrollSpy(){const e=document.querySelectorAll("section[id]");e.length&&(this.observer?.disconnect(),this.observer=new IntersectionObserver(i=>{i.forEach(s=>{s.isIntersecting&&this.setActive(s.target.id)})},{threshold:this.config.spyThreshold,rootMargin:"-20% 0px -60% 0px"}),e.forEach(i=>this.observer.observe(i)))}setActive(e){this.links.forEach(i=>{i.classList.toggle(this.config.activeClass,i.dataset.section===e)})}setupScrollHide(){this.headerEl&&(this.headerEl.classList.add("header--visible"),window.addEventListener("scroll",()=>{const e=window.scrollY;if(e<=0){this.headerEl.classList.remove("header--hidden"),this.headerEl.classList.add("header--visible"),this.lastScrollY=e;return}e>this.lastScrollY?(this.headerEl.classList.add("header--hidden"),this.headerEl.classList.remove("header--visible")):(this.headerEl.classList.remove("header--hidden"),this.headerEl.classList.add("header--visible")),this.lastScrollY=e},{passive:!0}))}updateHeaderVisibility(){if(!this.headerEl)return;const e=window.scrollY;if(e<=0){this.headerEl.classList.remove("header--hidden"),this.headerEl.classList.add("header--visible"),this.lastScrollY=e;return}const i=e-this.lastScrollY;Math.abs(i)<this.config.scrollThreshold||(i>0&&e>this.config.scrollThreshold?(this.headerEl.classList.add("header--hidden"),this.headerEl.classList.remove("header--visible")):(this.headerEl.classList.remove("header--hidden"),this.headerEl.classList.add("header--visible")),this.lastScrollY=e)}destroy(){this.observer?.disconnect(),this.observer=null,window.removeEventListener("scroll",this.updateHeaderVisibility)}}let b=null;async function ne(t){return b||(b=new se(t),await b.init()),b}const le={mountId:"layout-nav",dataPath:"/data/sections.json",activeClass:"active",scrollBehavior:"smooth",observerThreshold:.5};class ae{config;sections=[];navListEl=null;mobileNavListEl=null;links=[];mobileLinks=[];observer=null;constructor(e={}){this.config={...le,...e}}async init(){if(console.log("[AnchorNav] Initializing..."),this.renderSkeleton(),await this.loadSections(),console.log("[AnchorNav] Loaded sections:",this.sections),this.sections.length===0){console.warn("[AnchorNav] sections.json empty");return}this.renderNav(),this.bindClickEvents(),this.setupScrollSpy(),console.log("[AnchorNav] Initialization complete")}renderSkeleton(){const e=document.getElementById(this.config.mountId);if(!e){console.error(`[AnchorNav] Mount element not found: #${this.config.mountId}`);return}e.innerHTML=`
      <!-- PC 사이드 네비게이션 -->
      <nav id="side-nav" class="side-nav">
        <ul id="side-nav-list"></ul>
      </nav>
      
      <!-- 모바일 하단 네비게이션 -->
      <nav id="mobile-nav" class="mobile-nav">
        <ul id="mobile-nav-list"></ul>
      </nav>
    `,this.navListEl=document.getElementById("side-nav-list"),this.mobileNavListEl=document.getElementById("mobile-nav-list")}async loadSections(){try{const e=await fetch(this.config.dataPath);if(!e.ok)throw new Error(`HTTP ${e.status}`);const i=await e.json();this.sections=i.sections??[]}catch(e){console.error("[AnchorNav] Failed to load sections.json",e),this.sections=[]}}renderNav(){this.navListEl&&(this.navListEl.innerHTML=this.sections.map(e=>`
          <li>
            <a href="#${e.id}"
               class="side-nav-link"
               data-section="${e.id}"
               aria-label="${e.label}"
               title="${e.label}">
              <i class="${e.icon}"></i>
            </a>
          </li>
        `).join(""),this.links=[...this.navListEl.querySelectorAll("a")]),this.mobileNavListEl&&(this.mobileNavListEl.innerHTML=this.sections.map(e=>`
          <li>
            <a href="#${e.id}"
               class="mobile-nav-link"
               data-section="${e.id}"
               aria-label="${e.label}">
              <i class="${e.icon}"></i>
            </a>
          </li>
        `).join(""),this.mobileLinks=[...this.mobileNavListEl.querySelectorAll("a")])}bindClickEvents(){[...this.links,...this.mobileLinks].forEach(i=>{i.addEventListener("click",s=>{s.preventDefault();const o=i.dataset.section;if(!o)return;const n=document.getElementById(o);if(!n){console.warn(`[AnchorNav] Section not found: #${o}`);return}const r=n.offsetTop-80;window.scrollTo({top:r,behavior:this.config.scrollBehavior})})})}setupScrollSpy(){const e=document.querySelectorAll("section[id]");if(!e.length){console.warn("[AnchorNav] No sections found for scroll spy");return}this.observer?.disconnect(),this.observer=new IntersectionObserver(i=>{i.forEach(s=>{if(s.isIntersecting){const o=s.target.id;this.setActive(o)}})},{threshold:this.config.observerThreshold,rootMargin:"-80px 0px -40% 0px"}),e.forEach(i=>this.observer.observe(i))}setActive(e){[...this.links,...this.mobileLinks].forEach(s=>{const o=s.dataset.section===e;s.classList.toggle(this.config.activeClass,o)})}destroy(){this.observer?.disconnect(),this.observer=null,this.links=[],this.mobileLinks=[],this.sections=[]}}let y=null;async function re(t){return y||(y=new ae(t),await y.init()),y}const ce=[{platform:"GitHub",url:"https://github.com/artiordex",icon:"ri-github-fill"},{platform:"Gmail",url:"mailto:artiordex@gmail.com",icon:"ri-mail-fill"},{platform:"LinkedIn",url:"https://www.linkedin.com/in/shiwoo-min-a493aa263/",icon:"ri-linkedin-fill"},{platform:"Instagram",url:"https://instagram.com/artiordex",icon:"ri-instagram-line"},{platform:"Threads",url:"https://www.threads.net/@artiordex",icon:"ri-threads-fill"},{platform:"Strava",url:"https://www.strava.com/athletes/artiordex",icon:"ri-run-line"},{platform:"YouTube",url:"https://youtube.com/@artiordex",icon:"ri-youtube-fill"},{platform:"Slack",url:"https://slack.com/artiordex-invite",icon:"ri-slack-fill"},{platform:"Discord",url:"https://discord.gg/artiordex",icon:"ri-discord-fill"}],N={socialLinks:ce},de={mountId:"layout-footer",copyrightText:"민시우"},me=N;class ue{config;constructor(e={}){this.config={...de,...e}}init(){this.render()}render(){const e=document.getElementById(this.config.mountId);if(!e)return;const i=new Date().getFullYear(),s=me.socialLinks||[];e.innerHTML=`
      <footer class="footer">
        <div class="footer-inner">
          <p class="footer-copy">
            © ${i} ${this.config.copyrightText}. All rights reserved.
          </p>

          <div class="footer-social">
            ${s.map(o=>`
                <a href="${o.url}"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="${o.platform}"
                   title="${o.platform}"
                   class="social-link">
                  <i class="${o.icon}"></i>
                </a>
              `).join("")}
          </div>
        </div>
      </footer>
    `}}function he(t){const e=new ue(t);return e.init(),e}function T(){const t=document.querySelectorAll("section[id]");let e="";t.forEach(i=>{const s=i.getBoundingClientRect();s.top<=150&&s.bottom>=150&&(e=i.id)}),document.querySelectorAll(".side-nav-link, .mobile-nav-link, .header-link").forEach(i=>{const s=i.dataset.target||i.dataset.section;i.classList.toggle("active",s===e)})}function pe(){T(),window.addEventListener("scroll",T)}document.addEventListener("DOMContentLoaded",pe);const D="active";let C=null,L=null,F=null;function fe(){C=document.getElementById("modal"),L=document.getElementById("modal-overlay"),F=document.getElementById("modal-close"),(!C||!L)&&console.warn("modal 요소를 찾을 수 없습니다.")}function w(){C?.classList.remove(D),L?.classList.remove(D),document.body.style.overflow=""}function ve(){document.addEventListener("keydown",t=>{t.key==="Escape"&&w()}),L?.addEventListener("click",()=>w()),F?.addEventListener("click",()=>w())}document.addEventListener("DOMContentLoaded",()=>{fe(),ve()});const ge={name:"민시우",title:"Full-Stack · DevOps · AI Agent Engineer",description:"AI와 자동화를 중심으로 디지털 전환을 선도하는 풀스택·AI 에이전트 엔지니어입니다. 비즈니스 목표에 맞춘 기술 전략, 안정적인 시스템 구축, 자동화 기반 운영 최적화를 통해 기업의 성장을 돕습니다.",profileImage:"/assets/images/profile.jpg"},be=["AI 기반 자동화 시스템 구축 경험","대규모 클라우드 인프라 설계 및 운영","React · Node.js 중심의 Full-Stack 개발","DevOps 파이프라인 구축 및 운영 자동화","대기업·스타트업 DX 컨설팅 프로젝트 다수 수행"],ye={core:[{name:"AI/ML",level:92},{name:"Full-Stack Development",level:90},{name:"DevOps & Automation",level:94},{name:"Cloud Architecture",level:88},{name:"System Design",level:86}]},Ee=[{name:"AWS Solutions Architect – Associate",issuer:"Amazon Web Services",year:2023},{name:"Google Cloud Professional Cloud Architect",issuer:"Google Cloud",year:2023},{name:"Certified Kubernetes Administrator (CKA)",issuer:"Linux Foundation",year:2022},{name:"Docker Certified Associate (DCA)",issuer:"Docker, Inc.",year:2022},{name:"Terraform Associate",issuer:"HashiCorp",year:2023},{name:"AWS Cloud Practitioner",issuer:"Amazon Web Services",year:2021},{name:"Google IT Automation with Python",issuer:"Google",year:2021},{name:"Linux Essentials",issuer:"Linux Professional Institute (LPI)",year:2020}],Le={profile:ge,highlights:be,skills:ye,certifications:Ee},k=Le,ke=N;function _e(){const t=document.getElementById("about");t&&(t.innerHTML=`
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
  `,we(),$e(),Ie(),Ae())}function we(){const t=k.profile,e=k.highlights||[],i=ke.socialLinks||[],s=document.getElementById("profile-image");s&&(s.style.backgroundImage=`url('${t.profileImage}')`),document.getElementById("profile-name").textContent=t.name,document.getElementById("profile-title").textContent=t.title;const o=document.getElementById("profile-description");o&&(o.innerHTML=Array.isArray(t.description)?t.description.map(r=>`<p>${r}</p>`).join(""):`<p>${t.description}</p>`);const n=document.getElementById("profile-highlights");if(n){const r=["hero-tag--primary","hero-tag--secondary","hero-tag--purple","hero-tag--green"];n.innerHTML=e.map((l,c)=>`<span class="hero-tag ${r[c%4]}">${l}</span>`).join("")}const a=document.getElementById("social-links");a&&(a.innerHTML=i.map(r=>`
        <a href="${r.url}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="${r.platform}"
           title="${r.platform}">
          <i class="${r.icon}"></i>
        </a>
      `).join(""))}function $e(){const t=k.skills?.core||[],e=document.getElementById("skills-core");e&&(e.innerHTML=t.map(i=>`
      <div class="skill-item">
        <div class="skill-header">
          <span class="skill-name">${i.name}</span>
          <span class="skill-percent">${i.level}%</span>
        </div>
        <div class="skill-bar">
          <div class="progress-bar" data-width="${i.level}%"></div>
        </div>
      </div>
    `).join(""),requestAnimationFrame(()=>{document.querySelectorAll(".progress-bar").forEach(i=>{i.style.width=i.dataset.width||"0%"})}))}function Ie(){const t=document.getElementById("certifications-list");if(!t)return;const e=["hero-cert-item--primary","hero-cert-item--secondary","hero-cert-item--purple","hero-cert-item--green"];t.innerHTML=k.certifications.map((i,s)=>`
      <div class="hero-cert-item ${e[s%4]}">
        <i class="ri-award-line"></i>
        <div class="hero-cert-item__info">
          <div class="hero-cert-item__title">${i.name}</div>
          <div class="hero-cert-item__org">${i.issuer} · ${i.year}</div>
        </div>
      </div>
    `).join("")}function Ae(){const t=document.querySelectorAll(".carousel-slide"),e=document.querySelectorAll(".carousel-indicator");let i=0;const s=o=>{t.forEach((n,a)=>n.classList.toggle("active",a===o)),e.forEach((n,a)=>n.classList.toggle("active",a===o)),i=o};document.querySelector(".carousel-nav.prev")?.addEventListener("click",()=>s((i-1+t.length)%t.length)),document.querySelector(".carousel-nav.next")?.addEventListener("click",()=>s((i+1)%t.length)),e.forEach((o,n)=>o.addEventListener("click",()=>s(n))),document.addEventListener("keydown",o=>{o.key==="ArrowLeft"&&s((i-1+t.length)%t.length),o.key==="ArrowRight"&&s((i+1)%t.length)})}const Se={title:"전문 컨설팅 서비스",subtitle:"디지털 전환부터 AI 구축까지, 비즈니스 성장을 위한 맞춤형 솔루션을 제공합니다"},Te={intro:Se},Ce=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&e.target.classList.add("visible","revealed")})},{threshold:.15});function f(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(t=>Ce.observe(t))}const Be=Te;let p=null,q=null,O=null,R=null,K=null,G=null,P=null;function xe(){const t=document.getElementById("portfolio");if(!t)return;const{intro:e,filters:i=[],projects:s=[]}=Be;t.innerHTML=`
    <section class="section section--light">
      <div class="section__inner">

        <header class="section__header">
          <h1 class="section__title animate-fade-in animate-delay-1">
            ${e?.title}
          </h1>
          <p class="section__subtitle animate-fade-in animate-delay-2">
            ${e?.subtitle}
          </p>
        </header>

        <div id="portfolio-filter-buttons"
             class="filter-buttons animate-fade-in animate-delay-3"></div>

        <div id="portfolio-grid"></div>

      </div>
    </section>

    ${He()}
  `,Me(i,s),W("all",s),je(),f()}function Me(t,e){const i=document.getElementById("portfolio-filter-buttons");i&&(i.innerHTML="",t.forEach(s=>{const o=document.createElement("button");o.type="button",o.className="filter-btn",o.textContent=s.label,o.dataset.filter=s.id,s.id==="all"&&o.classList.add("active"),o.addEventListener("click",()=>{i.querySelectorAll(".filter-btn").forEach(n=>n.classList.remove("active")),o.classList.add("active"),W(s.id,e)}),i.appendChild(o)}))}function W(t,e){const i=document.getElementById("portfolio-grid");if(!i)return;const s=["primary","secondary","purple","green"];i.innerHTML="",(t==="all"?e:e.filter(n=>n.category===t)).forEach((n,a)=>{const r=document.createElement("article");r.className=`portfolio-item animate-scale-in animate-delay-${a%6+1}`,r.innerHTML=`
      <div class="portfolio-item__image"
           style="background-image:url('${n.thumbnail}')"></div>

      <div class="portfolio-item__body">
        <h3 class="portfolio-item__title">${n.title}</h3>
        <p class="portfolio-item__desc">${n.summary}</p>

        <div class="portfolio-item__tags">
          ${(n.tags||[]).map((l,c)=>`<span class="portfolio-item__tag portfolio-item__tag--${s[c%s.length]}">${l}</span>`).join("")}
        </div>

        <button type="button" class="portfolio-item__link">
          자세히 보기 →
        </button>
      </div>
    `,r.querySelector(".portfolio-item__link")?.addEventListener("click",()=>De(n)),i.appendChild(r)}),f()}function He(){return`
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
  `}function je(){p=document.getElementById("modal"),q=document.getElementById("modal-title"),O=document.getElementById("modal-image"),R=document.getElementById("modal-description"),K=document.getElementById("modal-features"),G=document.getElementById("modal-techstack"),P=document.getElementById("modal-close"),P?.addEventListener("click",$),p?.addEventListener("click",t=>{t.target===p&&$()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&p?.classList.contains("active")&&$()})}function De(t){p&&(q.textContent=t.title,O.src=t.modalImage||t.thumbnail,R.textContent=t.description||"",K.innerHTML=(t.features||[]).map(e=>`<li>${e}</li>`).join(""),G.innerHTML=(t.techStack||[]).map(e=>`<span class="modal-tech-tag">${e}</span>`).join(""),p.classList.add("active"),p.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden")}function $(){p&&(p.classList.remove("active"),p.setAttribute("aria-hidden","true"),document.body.style.overflow="")}const Pe={title:"창업가로서의 신념",subtitle:"기술의 본질은 사람을 돕는 것이며, 혁신은 본질을 더 명확하게 드러낼 뿐입니다. 저는 기술 중심의 창업가로서 문제를 해결하고, 더 나은 방향으로 움직이는 변화를 만들어갑니다."},Ne=[{id:"innovation",title:"기술로 변화 만들기",description:"기술은 단순한 도구가 아니라 문제를 해결하는 사고 방식입니다. 복잡한 비즈니스 문제를 기술적 관점에서 재정의하고, 가장 효율적인 해결책을 찾는 데 집중합니다.",icon:"ri-lightbulb-flash-line",color:"primary",delay:1},{id:"future",title:"AI 혁신의 선도",description:"AI는 지금 이 순간에도 비즈니스의 형태를 재창조하고 있습니다. 저는 AI 기술을 단순한 자동화가 아니라 '새로운 가능성의 확장'으로 바라보고, 실질적인 비즈니스 가치로 연결합니다.",icon:"ri-brain-line",color:"purple",delay:2},{id:"experience",title:"15년의 현장 경험",description:"제조, 물류, 금융, 스타트업 등 다양한 산업에서 쌓아온 경험은 문제의 본질을 이해하는 데 큰 자산이 됩니다. 기술은 산업을 이해할 때 가장 강력해집니다.",icon:"ri-timer-2-line",color:"secondary",delay:3},{id:"collaboration",title:"함께 성장하는 협업",description:"좋은 팀은 함께 성장하며, 좋은 협업은 서로의 전문성을 더욱 명확하게 만듭니다. 저는 기술과 비즈니스의 간극을 잇는 다리 역할을 합니다.",icon:"ri-team-line",color:"green",delay:4}],Fe={title:"창업가의 세 가지 원칙",items:[{id:"innovationMindset",title:"혁신적 사고",description:"혁신은 거창한 기술에서 시작되지 않습니다. 작은 관찰과 날카로운 질문에서 출발하며, 저는 이를 반복적으로 실천합니다.",icon:"ri-focus-2-line",color:"primary"},{id:"qualityAssurance",title:"품질 중심의 실행",description:"빠른 개발이 목표가 아닙니다. 유지보수할 수 있고, 확장 가능하며, 신뢰할 수 있는 시스템을 만드는 것이 진짜 품질입니다.",icon:"ri-shield-check-line",color:"secondary"},{id:"continuousGrowth",title:"지속 가능한 성장",description:"기술 성장과 비즈니스 성장은 함께 가야 합니다. 장기적인 관점에서 의미 있는 성장을 설계합니다.",icon:"ri-line-chart-line",color:"purple"}]},qe={intro:Pe,visionCards:Ne,principles:Fe},Oe=qe;function Re(){const t=Oe,e=document.getElementById("consulting-intro-title"),i=document.getElementById("consulting-intro-subtitle");e&&(e.textContent=t.intro?.title),i&&(i.textContent=t.intro?.subtitle);const s=document.getElementById("service-grid");s&&Array.isArray(t.serviceCategories)&&(s.innerHTML="",t.serviceCategories.forEach((l,c)=>{const d={primary:"consulting-card__icon consulting-card__icon--primary",secondary:"consulting-card__icon consulting-card__icon--secondary",purple:"consulting-card__icon consulting-card__icon--purple",green:"consulting-card__icon consulting-card__icon--green"},u=d[l.color]||d.primary,v=l.delay||c+1,_=document.createElement("article");_.className=`consulting-card animate-scale-in animate-delay-${v}`,_.innerHTML=`
        <div class="${u}">
          <i class="${l.icon}"></i>
        </div>
        <h3 class="consulting-card__title">${l.title}</h3>
        <p class="consulting-card__desc">${l.description}</p>
        <ul class="consulting-card__list">
          ${(l.items||[]).map(ie=>`<li><i class="ri-check-line"></i>${ie}</li>`).join("")}
        </ul>
      `,s.appendChild(_)}));const o=document.getElementById("process-title"),n=document.getElementById("process-steps");o&&(o.textContent=t.process?.title||""),n&&Array.isArray(t.process?.steps)&&(n.innerHTML="",t.process.steps.forEach((l,c)=>{const d=l.delay||c+1,u=c%5+1,v=document.createElement("div");v.className=`process-step animate-scale-in animate-delay-${d}`,v.innerHTML=`
        <div class="process-step__icon process-step__icon--${u}">
          <i class="${l.icon}"></i>
        </div>
        <h4 class="process-step__title">${l.title}</h4>
        <p class="process-step__desc">${l.description}</p>
      `,n.appendChild(v)}));const a=document.getElementById("consulting-vision-cards");a&&t.visionCards&&(a.innerHTML=t.visionCards.map(l=>`
      <div class="vision-card vision-card--${l.color} animate-fade-in animate-delay-${l.delay||1}">
        <div class="vision-card__icon">
          <i class="${l.icon}"></i>
        </div>
        <h3 class="vision-card__title">${l.title}</h3>
        <p class="vision-card__desc">${l.description}</p>
      </div>`).join(""));const r=document.getElementById("consulting-principles");r&&t.principles&&(r.innerHTML=`
      <h3 class="principles__title">${t.principles.title}</h3>
      <div class="principles__grid">
        ${t.principles.items.map(l=>`
          <div class="principle-card principle-card--${l.color}">
            <div class="principle-card__icon">
              <i class="${l.icon}"></i>
            </div>
            <h4 class="principle-card__title">${l.title}</h4>
            <p class="principle-card__desc">${l.description}</p>
          </div>`).join("")}
      </div>
    `),f()}const Ke={title:"포트폴리오",subtitle:"다양한 산업 분야에서 성공적으로 완료한 프로젝트들을 확인해보세요"},Ge=[{id:"all",label:"전체"},{id:"web",label:"웹 개발"},{id:"ai",label:"AI 솔루션"},{id:"cloud",label:"클라우드"}],We=[{id:"project1",category:"web",title:"이커머스 플랫폼 구축",summary:"대형 유통업체를 위한 통합 이커머스 솔루션 개발 및 구축",thumbnail:"/assets/images/project1.jpg",tags:["React","Node.js","AWS"],modalImage:"/assets/images/project1-cover.jpg",description:"대형 유통업체를 위한 통합 이커머스 솔루션을 개발하여 온라인 매출 300% 증가를 달성했습니다. 마이크로서비스 아키텍처를 도입하여 확장성과 안정성을 확보했습니다.",features:["실시간 재고 관리 시스템","AI 기반 상품 추천 엔진","다중 결제 시스템 통합","모바일 최적화 반응형 디자인"],techStack:["React","Node.js","AWS","MongoDB"]},{id:"project2",category:"ai",title:"AI 기반 예측 분석 시스템",summary:"제조업체의 수요 예측 및 재고 최적화를 위한 AI 솔루션",thumbnail:"/assets/images/project2.jpg",tags:["Python","TensorFlow","Docker"],modalImage:"/assets/images/project2-cover.jpg",description:"AI 기반 예측 분석 시스템으로 제조업체의 수요 예측 정확도를 85%까지 향상시키고 재고 비용을 40% 절감했습니다.",features:["수요 예측 정확도 85%","재고 비용 40% 절감","생산 계획 최적화","실시간 데이터 분석"],techStack:["Python","TensorFlow","Docker","Kubernetes"]},{id:"project3",category:"cloud",title:"클라우드 마이그레이션",summary:"금융 기업 레거시 시스템 AWS 클라우드 이전",thumbnail:"/assets/images/project3.jpg",tags:["AWS","Kubernetes","DevOps"],modalImage:"/assets/images/project3-cover.jpg",description:"금융 기업의 시스템을 AWS로 완전 이전하여 운영 비용을 절감하고 시스템 가용성 99.9%를 달성했습니다.",features:["운영 비용 50% 절감","99.9% 가용성 확보","배포 시간 90% 단축","자동 스케일링 적용"],techStack:["AWS","Kubernetes","Terraform","DevOps"]}],Ve={intro:Ke,filters:Ge,projects:We},V=Ve;let h,B,E,x,M,H,I;function Ye(){const t=document.getElementById("company");if(!t)return;const e=V,i=e.intro||{},s=e.filters||[],o=e.projects||[];t.innerHTML=`
    <div class="section__inner">
      <!-- Header Section -->
      <header class="section__header">
        <div class="animate-fade-in animate-delay-1">
          <h1 id="intro-title" class="section__title">${i.title||""}</h1>
          <p id="intro-subtitle" class="section__subtitle">${i.subtitle||""}</p>
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
  `,Je(s),ze(o),Ue(),Xe(),f()}function Je(t){const e=document.getElementById("filter-buttons");e&&(e.innerHTML="",t.forEach(i=>{const s=document.createElement("button");s.type="button",s.textContent=i.label,s.dataset.filter=i.id,s.className="filter-btn",i.id==="all"&&s.classList.add("active"),e.appendChild(s)}))}function ze(t){const e=document.getElementById("portfolio-grid");if(!e)return;const i=["primary","secondary","purple","green"];e.innerHTML="",t.forEach((s,o)=>{const n=document.createElement("div");n.className=`portfolio-item animate-scale-in animate-delay-${o%6+1}`,n.dataset.category=s.category,n.innerHTML=`
      <div class="portfolio-item__image"
          style="background-image: url('${s.thumbnail}')"></div>
      <div class="portfolio-item__body">
        <h3 class="portfolio-item__title">${s.title}</h3>
        <p class="portfolio-item__desc">${s.summary}</p>

        <div class="portfolio-item__tags">
          ${(s.tags||[]).map((a,r)=>`<span class="portfolio-item__tag portfolio-item__tag--${i[r%i.length]}">${a}</span>`).join("")}
        </div>

        <button class="portfolio-item__link"
                type="button"
                data-project-id="${s.id}"
                aria-label="${s.title} 상세 보기">
          자세히 보기 →
        </button>
      </div>
    `,e.appendChild(n)}),e.addEventListener("click",s=>{const n=s.target.closest(".portfolio-item__link");if(!n)return;const a=n.dataset.projectId;a&&Qe(a)})}function Ue(){const t=document.querySelectorAll(".filter-btn"),e=document.querySelectorAll(".portfolio-item");t.forEach(i=>{i.addEventListener("click",()=>{t.forEach(o=>o.classList.remove("active")),i.classList.add("active");const s=i.dataset.filter;e.forEach(o=>{s==="all"||o.dataset.category===s?o.classList.remove("hidden"):o.classList.add("hidden")})})})}function Xe(){h=document.getElementById("modal"),B=document.getElementById("modal-title"),E=document.getElementById("modal-image"),x=document.getElementById("modal-description"),M=document.getElementById("modal-features"),H=document.getElementById("modal-techstack"),I=document.getElementById("modal-close"),I&&I.addEventListener("click",A),h&&h.addEventListener("click",t=>{t.target===h&&A()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&h?.classList.contains("active")&&A()})}function Qe(t){const e=V.projects.find(i=>i.id===t);!e||!h||(B&&(B.textContent=e.title||""),E&&(E.src=e.modalImage||e.thumbnail||"",E.alt=e.title||"프로젝트 상세 이미지"),x&&(x.textContent=e.description||""),M&&(M.innerHTML=(e.features||[]).map(i=>`<li>${i}</li>`).join("")),H&&(H.innerHTML=(e.techStack||[]).map(i=>`<span class="modal-tech-tag">${i}</span>`).join("")),h.classList.add("active"),h.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden")}function A(){h&&(h.classList.remove("active"),h.setAttribute("aria-hidden","true"),document.body.style.overflow="")}const Ze=[{id:"social",title:"Connect with Me",links:[{label:"Gmail",url:"mailto:artiordex@gmail.com",icon:"ri-mail-line",color:"#D14836"},{label:"LinkedIn",url:"https://www.linkedin.com/in/shiwoo-min-a493aa263/",icon:"ri-linkedin-fill",color:"#0A66C2"},{label:"Instagram",url:"https://instagram.com/artiordex",icon:"ri-instagram-line",color:"#E4405F"},{label:"Threads",url:"https://www.threads.net/@artiordex",icon:"ri-threads-fill",color:"#000000"},{label:"Strava",url:"https://www.strava.com/athletes/artiordex",icon:"ri-run-line",color:"#FC4C02"},{label:"YouTube",url:"https://youtube.com/@artiordex",icon:"ri-youtube-fill",color:"#FF0000"},{label:"Slack",url:"https://slack.com/artiordex-invite",icon:"ri-slack-fill",color:"#4A154B"},{label:"Discord",url:"https://discord.gg/artiordex",icon:"ri-discord-fill",color:"#5865F2"}]},{id:"artiordex",title:"My Work @Artiordex",links:[{label:"Artiordex Home (WordPress)",url:"https://www.artiordex.com/",icon:"ri-building-line",color:"#000000"},{label:"Artiordex GitHub Pages",url:"https://www.artiordex.github.io/",icon:"ri-github-fill",color:"#000000"},{label:"Artiordex Blog (Naver)",url:"https://blog.naver.com/artiordex",icon:"ri-book-line",color:"#03C75A"},{label:"Artiordex Store (Naver Smart Store)",url:"https://smartstore.naver.com/artiordex",icon:"ri-store-2-line",color:"#03C75A"},{label:"Artiordex Official Notion",url:"https://www.notion.so/artiordex/Artiordex-Official-Notion-20892a86c03b80acb32bccc3be49bc64?pvs=21",icon:"ri-notion-fill",color:"#000000"},{label:"Artiordex Consulting",url:"https://www.notion.so/artiordex/Artiordex-Consulting-22792a86c03b808786d5dcbc1054e508?pvs=21",icon:"ri-lightbulb-line",color:"#000000"},{label:"Artiordex Tech Insights",url:"https://www.notion.so/artiordex/Artiordex-Tech-Insights-22792a86c03b80d68445e2a7ba53fefb?pvs=21",icon:"ri-magic-line",color:"#000000"},{label:"Artiordex Project Space",url:"https://www.notion.so/artiordex/Artiordex-Project-20692a86c03b80e290e7f570db3f8024?pvs=21",icon:"ri-apps-line",color:"#000000"}]},{id:"notes",title:"Life & Work Notes",links:[{label:"Reference",url:"https://www.notion.so/Reference-23392a86c03b803b97d3c95409c5093c?pvs=21",icon:"ri-bookmark-line",color:"#000000"},{label:"Dev & Worklog",url:"https://www.notion.so/Dev-Worklog-22792a86c03b8031b989c3639c91dae7?pvs=21",icon:"ri-code-s-slash-line",color:"#000000"},{label:"Study & Reading Log",url:"https://www.notion.so/Study-Reading-Log-22792a86c03b8078bcffdf1d39055072?pvs=21",icon:"ri-book-open-line",color:"#000000"},{label:"Insights Log",url:"https://www.notion.so/Insights-Log-20892a86c03b8002bef6fbdfdb74e626?pvs=21",icon:"ri-lightbulb-flash-line",color:"#000000"},{label:"Creative Log",url:"https://www.notion.so/Creative-Log-22792a86c03b80d38f2fedb73a1cc421?pvs=21",icon:"ri-brush-line",color:"#000000"},{label:"Life Journal",url:"https://www.notion.so/Life-Journal-Log-20892a86c03b803ead65c1c2b281eeb6?pvs=21",icon:"ri-emotion-happy-line",color:"#000000"},{label:"Archive Log",url:"https://www.notion.so/Archive-Log-23192a86c03b807e9185da0b5d57e2d9?pvs=21",icon:"ri-archive-line",color:"#000000"}]}],et={categories:Ze},S=et;function tt(){const t=document.getElementById("links");if(!t)return;const e=S.intro?.title||"Links Hub",i=S.intro?.subtitle||"모든 소셜, 작업 공간, Notion 기록을 한 곳에서 확인하세요.";t.innerHTML=`
    <div class="section__inner">
      <!-- Intro -->
      <header class="section__header">
        <h1 class="section__title animate-fade-in animate-delay-1">${e}</h1>
        <p class="section__subtitle animate-fade-in animate-delay-2">${i}</p>
      </header>

      <div id="links-container"></div>
    </div>
  `;const s=document.getElementById("links-container");s&&(S.categories.forEach((o,n)=>{const a=document.createElement("section");a.className=`links-section animate-fade-in animate-delay-${n+1}`,a.innerHTML=`
      <h2 class="links-section__title">${o.title}</h2>
      <div class="links-grid links-grid--triple" id="links-cat-${o.id}"></div>
    `,s.appendChild(a);const r=a.querySelector(`#links-cat-${o.id}`);r&&o.links.forEach((l,c)=>{const d=document.createElement("a");d.href=l.url,d.target="_blank",d.rel="noopener noreferrer",d.className=`link-card link-card--large animate-scale-in animate-delay-${c%6+1}`;const u=l.color||"#4B5563";d.innerHTML=`
        <div class="link-card__icon" style="background:${u}">
          <i class="${l.icon}"></i>
        </div>
        <div>
          <div class="link-card__title">${l.label}</div>
          ${l.description?`<div class="link-card__desc">${l.description}</div>`:""}
        </div>
      `,r.appendChild(d)})}),f())}const it={title:"연락처",subtitle:"프로젝트 문의, 협업 제안, 컨설팅 요청 등 어떤 내용이든 편하게 연락해주세요."},ot={email:{label:"이메일",value:"artiordex@gmail.com",icon:"ri-mail-line"},phone:{label:"전화번호",value:"+82-10-2589-3152",icon:"ri-phone-line"},location:{label:"위치",value:"Gwangmyeong-si, Gyeonggi-do, South Korea",icon:"ri-map-pin-line"},hours:{label:"업무 시간",value:"월-토 · 09:00 - 22:00",icon:"ri-time-line"}},st={title:"문의하기",description:"아래 양식을 작성해주시면 빠르게 회신드리겠습니다.",fields:[{id:"name",label:"이름",placeholder:"이름을 입력하세요",type:"text",required:!0},{id:"email",label:"이메일",placeholder:"메일 주소를 입력하세요",type:"email",required:!0},{id:"subject",label:"제목",placeholder:"문의 제목을 입력하세요",type:"text",required:!0},{id:"message",label:"내용",placeholder:"문의 내용을 상세히 작성해주세요",type:"textarea",required:!0}],submit:{label:"문의 보내기",icon:"ri-send-plane-2-line"},successMessage:"문의가 성공적으로 제출되었습니다. 빠른 시일 내에 답변드리겠습니다."},nt={intro:it,contactInfo:ot,form:st};class g{constructor(e=0,i="Network Error"){this.status=e,this.text=i}}const lt=()=>{if(!(typeof localStorage>"u"))return{get:t=>Promise.resolve(localStorage.getItem(t)),set:(t,e)=>Promise.resolve(localStorage.setItem(t,e)),remove:t=>Promise.resolve(localStorage.removeItem(t))}},m={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:lt()},j=t=>t?typeof t=="string"?{publicKey:t}:t.toString()==="[object Object]"?t:{}:{},at=(t,e="https://api.emailjs.com")=>{if(!t)return;const i=j(t);m.publicKey=i.publicKey,m.blockHeadless=i.blockHeadless,m.storageProvider=i.storageProvider,m.blockList=i.blockList,m.limitRate=i.limitRate,m.origin=i.origin||e},Y=async(t,e,i={})=>{const s=await fetch(m.origin+t,{method:"POST",headers:i,body:e}),o=await s.text(),n=new g(s.status,o);if(s.ok)return n;throw n},J=(t,e,i)=>{if(!t||typeof t!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!e||typeof e!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!i||typeof i!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},rt=t=>{if(t&&t.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},z=t=>t.webdriver||!t.languages||t.languages.length===0,U=()=>new g(451,"Unavailable For Headless Browser"),ct=(t,e)=>{if(!Array.isArray(t))throw"The BlockList list has to be an array";if(typeof e!="string")throw"The BlockList watchVariable has to be a string"},dt=t=>!t.list?.length||!t.watchVariable,mt=(t,e)=>t instanceof FormData?t.get(e):t[e],X=(t,e)=>{if(dt(t))return!1;ct(t.list,t.watchVariable);const i=mt(e,t.watchVariable);return typeof i!="string"?!1:t.list.includes(i)},Q=()=>new g(403,"Forbidden"),ut=(t,e)=>{if(typeof t!="number"||t<0)throw"The LimitRate throttle has to be a positive number";if(e&&typeof e!="string")throw"The LimitRate ID has to be a non-empty string"},ht=async(t,e,i)=>{const s=Number(await i.get(t)||0);return e-Date.now()+s},Z=async(t,e,i)=>{if(!e.throttle||!i)return!1;ut(e.throttle,e.id);const s=e.id||t;return await ht(s,e.throttle,i)>0?!0:(await i.set(s,Date.now().toString()),!1)},ee=()=>new g(429,"Too Many Requests"),pt=async(t,e,i,s)=>{const o=j(s),n=o.publicKey||m.publicKey,a=o.blockHeadless||m.blockHeadless,r=o.storageProvider||m.storageProvider,l={...m.blockList,...o.blockList},c={...m.limitRate,...o.limitRate};return a&&z(navigator)?Promise.reject(U()):(J(n,t,e),rt(i),i&&X(l,i)?Promise.reject(Q()):await Z(location.pathname,c,r)?Promise.reject(ee()):Y("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:n,service_id:t,template_id:e,template_params:i}),{"Content-type":"application/json"}))},ft=t=>{if(!t||t.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},vt=t=>typeof t=="string"?document.querySelector(t):t,gt=async(t,e,i,s)=>{const o=j(s),n=o.publicKey||m.publicKey,a=o.blockHeadless||m.blockHeadless,r=m.storageProvider||o.storageProvider,l={...m.blockList,...o.blockList},c={...m.limitRate,...o.limitRate};if(a&&z(navigator))return Promise.reject(U());const d=vt(i);J(n,t,e),ft(d);const u=new FormData(d);return X(l,u)?Promise.reject(Q()):await Z(location.pathname,c,r)?Promise.reject(ee()):(u.append("lib_version","4.4.1"),u.append("service_id",t),u.append("template_id",e),u.append("user_id",n),Y("/api/v1.0/email/send-form",u))},te={init:at,send:pt,sendForm:gt,EmailJSResponseStatus:g},bt=void 0,yt=void 0,Et=void 0;te.init(bt);const Lt=nt;function kt(){const t=Lt,e=document.getElementById("contact");if(!e)return;const i=[],s={email:"primary",phone:"secondary",location:"purple",hours:"green"};t.contactInfo&&Object.entries(t.contactInfo).forEach(([l,c])=>{const d=l;i.push({icon:c.icon,label:c.label,value:c.value,color:s[d]})}),e.innerHTML=`
    <div class="section__header">
      <h1 class="section__title animate-fade-in">${t.intro?.title}</h1>
      <p class="section__subtitle animate-fade-in animate-delay-1">
        ${t.intro?.subtitle}
      </p>
    </div>

    <div class="contact-grid"></div>

    <div id="toast" class="toast">
      <i class="ri-check-line"></i>
      <span>${t.form?.successMessage}</span>
    </div>
  `;const o=e.querySelector(".contact-grid");if(!o)return;const n=document.createElement("div");n.className="contact-info animate-slide-up animate-delay-1",n.innerHTML=`
    <h3 class="contact-info__title">연락 정보</h3>
    <div class="contact-list">
      ${i.map(l=>`
          <div class="contact-item">
            <div class="contact-item__icon contact-item__icon--${l.color}">
              <i class="${l.icon}"></i>
            </div>
            <div>
              <div class="contact-item__label">${l.label}</div>
              <div class="contact-item__value">${l.value}</div>
            </div>
          </div>`).join("")}
    </div>
  `;const a=document.createElement("div");a.className="contact-form animate-slide-up animate-delay-2";const r=t.form;a.innerHTML=`
    <h3 class="contact-form__title">${r.title}</h3>
    <p class="contact-form__desc">${r.description}</p>

    <form id="contact-form">
      ${r.fields.map(l=>l.type==="textarea"?`
        <div class="form-group">
          <label for="${l.id}">${l.label}</label>
          <textarea id="${l.id}" placeholder="${l.placeholder}" ${l.required?"required":""}></textarea>
          <div id="${l.id}-error" class="error-message"></div>
        </div>`:`
        <div class="form-group">
          <label for="${l.id}">${l.label}</label>
          <input id="${l.id}" type="${l.type}" placeholder="${l.placeholder}" ${l.required?"required":""} />
          <div id="${l.id}-error" class="error-message"></div>
        </div>`).join("")}

      <button type="submit" class="btn-submit">
        <i class="${r.submit.icon}"></i>
        ${r.submit.label}
      </button>
    </form>
  `,o.appendChild(n),o.appendChild(a),_t(),f()}function _t(){const t=document.getElementById("contact-form"),e=document.getElementById("toast");if(!t||!e)return;const i=Array.from(t.querySelectorAll("input, textarea"));function s(o){const n=o.id,a=o.value.trim(),r=document.getElementById(`${n}-error`);return r&&(r.textContent=""),o.required&&!a?(r&&(r.textContent="필수 입력 항목입니다."),!1):n==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)?(r&&(r.textContent="올바른 이메일 형식을 입력해주세요."),!1):!0}t.addEventListener("submit",async o=>{if(o.preventDefault(),!i.every(s))return;const n={name:document.getElementById("name").value,email:document.getElementById("email").value,message:document.getElementById("message").value,time:wt()};try{await te.send(yt,Et,n),t.reset(),e.classList.add("show"),setTimeout(()=>e.classList.remove("show"),3e3)}catch(a){console.error("메일 전송 실패",a),alert("메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.")}})}function wt(){return new Date().toLocaleString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})}const $t=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&e.target.classList.add("visible","revealed")})},{threshold:.15});function It(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(t=>$t.observe(t))}document.addEventListener("DOMContentLoaded",()=>{ne(),re(),he(),_e(),xe(),Ye(),Re(),tt(),kt(),It(),T()});
