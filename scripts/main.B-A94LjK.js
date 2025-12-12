(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const R={headerId:"main-header",navListId:"header-nav-list",dataPath:"./data/sections.json",activeClass:"active",linkClass:"header-link",spyThreshold:.5};class K{config;sections=[];headerEl=null;navListEl=null;links=[];observer=null;constructor(t={}){this.config={...R,...t}}async init(){this.cacheElements(),this.navListEl&&(await this.loadSections(),this.renderNav(),this.setupScrollSpy(),console.log("Header initialized (simple mode)"))}cacheElements(){this.headerEl=document.getElementById(this.config.headerId),this.navListEl=document.getElementById(this.config.navListId)}async loadSections(){try{const t=await fetch(this.config.dataPath);if(!t.ok)throw new Error;const n=await t.json();this.sections=n.sections||[]}catch{console.warn("JSON 로드 실패 → 기본 섹션 사용"),this.sections=this.getDefaultSections()}}getDefaultSections(){return[{id:"about",label:"소개"},{id:"portfolio",label:"포트폴리오"},{id:"consulting",label:"컨설팅"},{id:"company",label:"창업가 소개"},{id:"links",label:"링크"},{id:"contact",label:"연락처"}]}renderNav(){this.navListEl&&(this.navListEl.innerHTML="",this.sections.forEach(t=>{const n=document.createElement("li");n.innerHTML=`
        <a href="#${t.id}"
          class="${this.config.linkClass}"
          data-section="${t.id}">
          ${t.label}
        </a>
      `,this.navListEl.appendChild(n)}),this.links=[...this.navListEl.querySelectorAll("a")])}setupScrollSpy(){const t=document.querySelectorAll("section[id]");t.length!==0&&(this.observer?.disconnect(),this.observer=new IntersectionObserver(n=>{n.forEach(i=>{if(!i.isIntersecting)return;const o=i.target.id;this.updateActiveLink(o)})},{threshold:this.config.spyThreshold}),t.forEach(n=>this.observer.observe(n)))}updateActiveLink(t){this.links.forEach(n=>{const i=n,o=i.dataset.section;i.classList.toggle(this.config.activeClass,o===t)})}destroy(){this.observer?.disconnect(),this.observer=null,console.log("Header destroyed (simple)")}}let g=null;function G(e){return g||(g=new K(e),g.init()),g}document.addEventListener("DOMContentLoaded",()=>{G()});function w(){const e=document.querySelectorAll("section[id]");let t="";e.forEach(n=>{const i=n.getBoundingClientRect();i.top<=150&&i.bottom>=150&&(t=n.id)}),document.querySelectorAll(".side-nav-link, .mobile-nav-link, .header-link").forEach(n=>{const i=n.dataset.target||n.dataset.section;n.classList.toggle("active",i===t)})}function J(){w(),window.addEventListener("scroll",w)}document.addEventListener("DOMContentLoaded",J);const j="active";let A=null,y=null,T=null;function z(){A=document.getElementById("modal"),y=document.getElementById("modal-overlay"),T=document.getElementById("modal-close"),(!A||!y)&&console.warn("modal 요소를 찾을 수 없습니다.")}function E(){A?.classList.remove(j),y?.classList.remove(j),document.body.style.overflow=""}function X(){document.addEventListener("keydown",e=>{e.key==="Escape"&&E()}),y?.addEventListener("click",()=>E()),T?.addEventListener("click",()=>E())}document.addEventListener("DOMContentLoaded",()=>{z(),X()});const Y={name:"민시우",title:"Full-Stack · DevOps · AI · Cloud Automation 전문가",description:"AI와 자동화를 중심으로 디지털 전환을 선도하는 풀스택·클라우드 엔지니어입니다. 비즈니스 목표에 맞춘 기술 전략, 안정적인 시스템 구축, 자동화 기반 운영 최적화를 통해 기업의 성장을 돕습니다.",profileImage:"/assets/images/profile.jpg"},Q=["AI 기반 자동화 시스템 구축 경험","대규모 클라우드 인프라 설계 및 운영","React · Node.js 중심의 Full-Stack 개발","DevOps 파이프라인 구축 및 운영 자동화","대기업·스타트업 DX 컨설팅 프로젝트 다수 수행"],U={core:[{name:"AI/ML",level:92},{name:"Full-Stack Development",level:90},{name:"DevOps & Automation",level:94},{name:"Cloud Architecture",level:88},{name:"System Design",level:86}]},V=[{name:"AWS Solutions Architect – Associate",issuer:"Amazon Web Services",year:2023},{name:"Google Cloud Professional Cloud Architect",issuer:"Google Cloud",year:2023},{name:"Kubernetes CKA",issuer:"Linux Foundation",year:2022}],Z=[{platform:"GitHub",url:"https://github.com/artiordex",icon:"ri-github-fill"},{platform:"LinkedIn",url:"https://www.linkedin.com/in/artiordex",icon:"ri-linkedin-box-fill"},{platform:"Instagram",url:"https://instagram.com",icon:"ri-instagram-line"},{platform:"Blog",url:"https://artiordex.dev",icon:"ri-book-open-line"}],ee={profile:Y,highlights:Q,skills:U,certifications:V,socialLinks:Z},f=ee;function te(){const e=document.getElementById("about");e&&(e.innerHTML=`
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
  `,ie(),oe(),ne(),le())}function ie(){const e=f.profile,t=f.highlights||[],n=f.socialLinks||[],i=document.getElementById("profile-image");i&&e.profileImage&&(i.style.backgroundImage=`url('${e.profileImage}')`);const o=document.getElementById("profile-name"),s=document.getElementById("profile-title");o&&(o.textContent=e.name),s&&(s.textContent=e.title);const a=document.getElementById("profile-description");a&&(Array.isArray(e.description)?a.innerHTML=e.description.map(c=>`<p>${c}</p>`).join(""):a.innerHTML=`<p>${e.description}</p>`);const r=document.getElementById("profile-highlights");if(r){const c=["hero-tag--primary","hero-tag--secondary","hero-tag--purple","hero-tag--green"];r.innerHTML=t.map((d,p)=>`<span class="hero-tag ${c[p%4]}">${d}</span>`).join("")}const l=document.getElementById("social-links");l&&(l.innerHTML=n.map(c=>`
        <a href="${c.url}" target="_blank" rel="noopener noreferrer" aria-label="${c.platform}">
          <i class="${c.icon}"></i>
        </a>
      `).join(""))}function oe(){const e=f.skills?.core||[],t=document.getElementById("skills-core");t&&(t.innerHTML=e.map(n=>`
        <div class="skill-item">
          <div class="skill-header">
            <span class="skill-name">${n.name}</span>
            <span class="skill-percent">${n.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="progress-bar" data-width="${n.level}%"></div>
          </div>
        </div>
      `).join(""),requestAnimationFrame(()=>{document.querySelectorAll(".progress-bar").forEach(n=>{const i=n.dataset.width||"0%";n.style.width=i})}))}function ne(){const e=f.certifications||[],t=document.getElementById("certifications-list");if(t){const n=["hero-cert-item--primary","hero-cert-item--secondary","hero-cert-item--purple","hero-cert-item--green"];t.innerHTML=e.map((i,o)=>`
        <div class="hero-cert-item ${n[o%4]}">
          <i class="ri-award-line"></i>
          <div class="hero-cert-item__info">
            <div class="hero-cert-item__title">${i.name}</div>
            <div class="hero-cert-item__org">${i.issuer} · ${i.year}</div>
          </div>
        </div>
      `).join("")}}function le(){const e=document.querySelectorAll(".carousel-slide"),t=document.querySelectorAll(".carousel-indicator"),n=document.querySelector(".carousel-nav.prev"),i=document.querySelector(".carousel-nav.next");let o=0;function s(l){e.forEach((c,d)=>{c.classList.toggle("active",d===l)}),t.forEach((c,d)=>{c.classList.toggle("active",d===l)}),o=l}function a(){s((o+1)%e.length)}function r(){s((o-1+e.length)%e.length)}n?.addEventListener("click",r),i?.addEventListener("click",a),t.forEach((l,c)=>{l.addEventListener("click",()=>s(c))}),document.addEventListener("keydown",l=>{l.key==="ArrowLeft"&&r(),l.key==="ArrowRight"&&a()})}const se={title:"전문 컨설팅 서비스",subtitle:"디지털 전환부터 AI 구축까지, 비즈니스 성장을 위한 맞춤형 솔루션을 제공합니다"},ae={intro:se},re=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add("visible","revealed")})},{threshold:.15});function h(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(e=>re.observe(e))}const ce=ae;let u=null,H=null,q=null,N=null,O=null,D=null,M=null;function de(){const e=document.getElementById("portfolio");if(!e)return;const{intro:t,filters:n=[],projects:i=[]}=ce;e.innerHTML=`
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

    ${ue()}
  `,me(n,i),P("all",i),pe(),h()}function me(e,t){const n=document.getElementById("portfolio-filter-buttons");n&&(n.innerHTML="",e.forEach(i=>{const o=document.createElement("button");o.type="button",o.className="filter-btn",o.textContent=i.label,o.dataset.filter=i.id,i.id==="all"&&o.classList.add("active"),o.addEventListener("click",()=>{n.querySelectorAll(".filter-btn").forEach(s=>s.classList.remove("active")),o.classList.add("active"),P(i.id,t)}),n.appendChild(o)}))}function P(e,t){const n=document.getElementById("portfolio-grid");if(!n)return;const i=["primary","secondary","purple","green"];n.innerHTML="",(e==="all"?t:t.filter(o=>o.category===e)).forEach((o,s)=>{const a=document.createElement("article");a.className=`portfolio-item animate-scale-in animate-delay-${s%6+1}`,a.innerHTML=`
      <div class="portfolio-item__image"
           style="background-image:url('${o.thumbnail}')"></div>

      <div class="portfolio-item__body">
        <h3 class="portfolio-item__title">${o.title}</h3>
        <p class="portfolio-item__desc">${o.summary}</p>

        <div class="portfolio-item__tags">
          ${(o.tags||[]).map((r,l)=>`<span class="portfolio-item__tag portfolio-item__tag--${i[l%i.length]}">${r}</span>`).join("")}
        </div>

        <button type="button" class="portfolio-item__link">
          자세히 보기 →
        </button>
      </div>
    `,a.querySelector(".portfolio-item__link")?.addEventListener("click",()=>he(o)),n.appendChild(a)}),h()}function ue(){return`
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
  `}function pe(){u=document.getElementById("modal"),H=document.getElementById("modal-title"),q=document.getElementById("modal-image"),N=document.getElementById("modal-description"),O=document.getElementById("modal-features"),D=document.getElementById("modal-techstack"),M=document.getElementById("modal-close"),M?.addEventListener("click",L),u?.addEventListener("click",e=>{e.target===u&&L()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&u?.classList.contains("active")&&L()})}function he(e){u&&(H.textContent=e.title,q.src=e.modalImage||e.thumbnail,N.textContent=e.description||"",O.innerHTML=(e.features||[]).map(t=>`<li>${t}</li>`).join(""),D.innerHTML=(e.techStack||[]).map(t=>`<span class="modal-tech-tag">${t}</span>`).join(""),u.classList.add("active"),u.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden")}function L(){u&&(u.classList.remove("active"),u.setAttribute("aria-hidden","true"),document.body.style.overflow="")}const ve={title:"창업가로서의 신념",subtitle:"기술의 본질은 사람을 돕는 것이며, 혁신은 본질을 더 명확하게 드러낼 뿐입니다. 저는 기술 중심의 창업가로서 문제를 해결하고, 더 나은 방향으로 움직이는 변화를 만들어갑니다."},fe=[{id:"innovation",title:"기술로 변화 만들기",description:"기술은 단순한 도구가 아니라 문제를 해결하는 사고 방식입니다. 복잡한 비즈니스 문제를 기술적 관점에서 재정의하고, 가장 효율적인 해결책을 찾는 데 집중합니다.",icon:"ri-lightbulb-flash-line",color:"primary",delay:1},{id:"future",title:"AI 혁신의 선도",description:"AI는 지금 이 순간에도 비즈니스의 형태를 재창조하고 있습니다. 저는 AI 기술을 단순한 자동화가 아니라 '새로운 가능성의 확장'으로 바라보고, 실질적인 비즈니스 가치로 연결합니다.",icon:"ri-brain-line",color:"purple",delay:2},{id:"experience",title:"15년의 현장 경험",description:"제조, 물류, 금융, 스타트업 등 다양한 산업에서 쌓아온 경험은 문제의 본질을 이해하는 데 큰 자산이 됩니다. 기술은 산업을 이해할 때 가장 강력해집니다.",icon:"ri-timer-2-line",color:"secondary",delay:3},{id:"collaboration",title:"함께 성장하는 협업",description:"좋은 팀은 함께 성장하며, 좋은 협업은 서로의 전문성을 더욱 명확하게 만듭니다. 저는 기술과 비즈니스의 간극을 잇는 다리 역할을 합니다.",icon:"ri-team-line",color:"green",delay:4}],ge={title:"창업가의 세 가지 원칙",items:[{id:"innovationMindset",title:"혁신적 사고",description:"혁신은 거창한 기술에서 시작되지 않습니다. 작은 관찰과 날카로운 질문에서 출발하며, 저는 이를 반복적으로 실천합니다.",icon:"ri-focus-2-line",color:"primary"},{id:"qualityAssurance",title:"품질 중심의 실행",description:"빠른 개발이 목표가 아닙니다. 유지보수할 수 있고, 확장 가능하며, 신뢰할 수 있는 시스템을 만드는 것이 진짜 품질입니다.",icon:"ri-shield-check-line",color:"secondary"},{id:"continuousGrowth",title:"지속 가능한 성장",description:"기술 성장과 비즈니스 성장은 함께 가야 합니다. 장기적인 관점에서 의미 있는 성장을 설계합니다.",icon:"ri-line-chart-line",color:"purple"}]},be={intro:ve,visionCards:fe,principles:ge},ye=be;function _e(){const e=ye,t=document.getElementById("consulting-intro-title"),n=document.getElementById("consulting-intro-subtitle");t&&(t.textContent=e.intro?.title),n&&(n.textContent=e.intro?.subtitle);const i=document.getElementById("service-grid");i&&Array.isArray(e.serviceCategories)&&(i.innerHTML="",e.serviceCategories.forEach((l,c)=>{const d={primary:"consulting-card__icon consulting-card__icon--primary",secondary:"consulting-card__icon consulting-card__icon--secondary",purple:"consulting-card__icon consulting-card__icon--purple",green:"consulting-card__icon consulting-card__icon--green"},p=d[l.color]||d.primary,v=l.delay||c+1,_=document.createElement("article");_.className=`consulting-card animate-scale-in animate-delay-${v}`,_.innerHTML=`
        <div class="${p}">
          <i class="${l.icon}"></i>
        </div>
        <h3 class="consulting-card__title">${l.title}</h3>
        <p class="consulting-card__desc">${l.description}</p>
        <ul class="consulting-card__list">
          ${(l.items||[]).map(W=>`<li><i class="ri-check-line"></i>${W}</li>`).join("")}
        </ul>
      `,i.appendChild(_)}));const o=document.getElementById("process-title"),s=document.getElementById("process-steps");o&&(o.textContent=e.process?.title||""),s&&Array.isArray(e.process?.steps)&&(s.innerHTML="",e.process.steps.forEach((l,c)=>{const d=l.delay||c+1,p=c%5+1,v=document.createElement("div");v.className=`process-step animate-scale-in animate-delay-${d}`,v.innerHTML=`
        <div class="process-step__icon process-step__icon--${p}">
          <i class="${l.icon}"></i>
        </div>
        <h4 class="process-step__title">${l.title}</h4>
        <p class="process-step__desc">${l.description}</p>
      `,s.appendChild(v)}));const a=document.getElementById("consulting-vision-cards");a&&e.visionCards&&(a.innerHTML=e.visionCards.map(l=>`
      <div class="vision-card vision-card--${l.color} animate-fade-in animate-delay-${l.delay||1}">
        <div class="vision-card__icon">
          <i class="${l.icon}"></i>
        </div>
        <h3 class="vision-card__title">${l.title}</h3>
        <p class="vision-card__desc">${l.description}</p>
      </div>`).join(""));const r=document.getElementById("consulting-principles");r&&e.principles&&(r.innerHTML=`
      <h3 class="principles__title">${e.principles.title}</h3>
      <div class="principles__grid">
        ${e.principles.items.map(l=>`
          <div class="principle-card principle-card--${l.color}">
            <div class="principle-card__icon">
              <i class="${l.icon}"></i>
            </div>
            <h4 class="principle-card__title">${l.title}</h4>
            <p class="principle-card__desc">${l.description}</p>
          </div>`).join("")}
      </div>
    `),h()}const Ee={title:"포트폴리오",subtitle:"다양한 산업 분야에서 성공적으로 완료한 프로젝트들을 확인해보세요"},Le=[{id:"all",label:"전체"},{id:"web",label:"웹 개발"},{id:"ai",label:"AI 솔루션"},{id:"cloud",label:"클라우드"}],ke=[{id:"project1",category:"web",title:"이커머스 플랫폼 구축",summary:"대형 유통업체를 위한 통합 이커머스 솔루션 개발 및 구축",thumbnail:"/assets/images/project1.jpg",tags:["React","Node.js","AWS"],modalImage:"/assets/images/project1-cover.jpg",description:"대형 유통업체를 위한 통합 이커머스 솔루션을 개발하여 온라인 매출 300% 증가를 달성했습니다. 마이크로서비스 아키텍처를 도입하여 확장성과 안정성을 확보했습니다.",features:["실시간 재고 관리 시스템","AI 기반 상품 추천 엔진","다중 결제 시스템 통합","모바일 최적화 반응형 디자인"],techStack:["React","Node.js","AWS","MongoDB"]},{id:"project2",category:"ai",title:"AI 기반 예측 분석 시스템",summary:"제조업체의 수요 예측 및 재고 최적화를 위한 AI 솔루션",thumbnail:"/assets/images/project2.jpg",tags:["Python","TensorFlow","Docker"],modalImage:"/assets/images/project2-cover.jpg",description:"AI 기반 예측 분석 시스템으로 제조업체의 수요 예측 정확도를 85%까지 향상시키고 재고 비용을 40% 절감했습니다.",features:["수요 예측 정확도 85%","재고 비용 40% 절감","생산 계획 최적화","실시간 데이터 분석"],techStack:["Python","TensorFlow","Docker","Kubernetes"]},{id:"project3",category:"cloud",title:"클라우드 마이그레이션",summary:"금융 기업 레거시 시스템 AWS 클라우드 이전",thumbnail:"/assets/images/project3.jpg",tags:["AWS","Kubernetes","DevOps"],modalImage:"/assets/images/project3-cover.jpg",description:"금융 기업의 시스템을 AWS로 완전 이전하여 운영 비용을 절감하고 시스템 가용성 99.9%를 달성했습니다.",features:["운영 비용 50% 절감","99.9% 가용성 확보","배포 시간 90% 단축","자동 스케일링 적용"],techStack:["AWS","Kubernetes","Terraform","DevOps"]}],$e={intro:Ee,filters:Le,projects:ke},F=$e;let m,S,b,x,B,C,k;function Ie(){const e=document.getElementById("company");if(!e)return;const t=F,n=t.intro||{},i=t.filters||[],o=t.projects||[];e.innerHTML=`
    <div class="section__inner">
      <!-- Header Section -->
      <header class="section__header">
        <div class="animate-fade-in animate-delay-1">
          <h1 id="intro-title" class="section__title">${n.title||""}</h1>
          <p id="intro-subtitle" class="section__subtitle">${n.subtitle||""}</p>
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
  `,we(i),Ae(o),Se(),xe(),h()}function we(e){const t=document.getElementById("filter-buttons");t&&(t.innerHTML="",e.forEach(n=>{const i=document.createElement("button");i.type="button",i.textContent=n.label,i.dataset.filter=n.id,i.className="filter-btn",n.id==="all"&&i.classList.add("active"),t.appendChild(i)}))}function Ae(e){const t=document.getElementById("portfolio-grid");if(!t)return;const n=["primary","secondary","purple","green"];t.innerHTML="",e.forEach((i,o)=>{const s=document.createElement("div");s.className=`portfolio-item animate-scale-in animate-delay-${o%6+1}`,s.dataset.category=i.category,s.innerHTML=`
      <div class="portfolio-item__image"
          style="background-image: url('${i.thumbnail}')"></div>
      <div class="portfolio-item__body">
        <h3 class="portfolio-item__title">${i.title}</h3>
        <p class="portfolio-item__desc">${i.summary}</p>

        <div class="portfolio-item__tags">
          ${(i.tags||[]).map((a,r)=>`<span class="portfolio-item__tag portfolio-item__tag--${n[r%n.length]}">${a}</span>`).join("")}
        </div>

        <button class="portfolio-item__link"
                type="button"
                data-project-id="${i.id}"
                aria-label="${i.title} 상세 보기">
          자세히 보기 →
        </button>
      </div>
    `,t.appendChild(s)}),t.addEventListener("click",i=>{const o=i.target.closest(".portfolio-item__link");if(!o)return;const s=o.dataset.projectId;s&&Be(s)})}function Se(){const e=document.querySelectorAll(".filter-btn"),t=document.querySelectorAll(".portfolio-item");e.forEach(n=>{n.addEventListener("click",()=>{e.forEach(o=>o.classList.remove("active")),n.classList.add("active");const i=n.dataset.filter;t.forEach(o=>{i==="all"||o.dataset.category===i?o.classList.remove("hidden"):o.classList.add("hidden")})})})}function xe(){m=document.getElementById("modal"),S=document.getElementById("modal-title"),b=document.getElementById("modal-image"),x=document.getElementById("modal-description"),B=document.getElementById("modal-features"),C=document.getElementById("modal-techstack"),k=document.getElementById("modal-close"),k&&k.addEventListener("click",$),m&&m.addEventListener("click",e=>{e.target===m&&$()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&m?.classList.contains("active")&&$()})}function Be(e){const t=F.projects.find(n=>n.id===e);!t||!m||(S&&(S.textContent=t.title||""),b&&(b.src=t.modalImage||t.thumbnail||"",b.alt=t.title||"프로젝트 상세 이미지"),x&&(x.textContent=t.description||""),B&&(B.innerHTML=(t.features||[]).map(n=>`<li>${n}</li>`).join("")),C&&(C.innerHTML=(t.techStack||[]).map(n=>`<span class="modal-tech-tag">${n}</span>`).join("")),m.classList.add("active"),m.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden")}function $(){m&&(m.classList.remove("active"),m.setAttribute("aria-hidden","true"),document.body.style.overflow="")}const Ce=[{id:"social",title:"Connect with Me",links:[{label:"Gmail",url:"mailto:artiordex@gmail.com",icon:"ri-mail-line",color:"#D14836"},{label:"LinkedIn",url:"https://www.linkedin.com/in/shiwoo-min-a493aa263/",icon:"ri-linkedin-fill",color:"#0A66C2"},{label:"Instagram",url:"https://instagram.com/artiordex",icon:"ri-instagram-line",color:"#E4405F"},{label:"Threads",url:"https://www.threads.net/@artiordex",icon:"ri-threads-fill",color:"#000000"},{label:"Strava",url:"https://www.strava.com/athletes/artiordex",icon:"ri-run-line",color:"#FC4C02"},{label:"YouTube",url:"https://youtube.com/@artiordex",icon:"ri-youtube-fill",color:"#FF0000"},{label:"Slack",url:"https://slack.com/artiordex-invite",icon:"ri-slack-fill",color:"#4A154B"},{label:"Discord",url:"https://discord.gg/artiordex",icon:"ri-discord-fill",color:"#5865F2"}]},{id:"artiordex",title:"My Work @Artiordex",links:[{label:"Artiordex Home (WordPress)",url:"https://www.artiordex.com/",icon:"ri-building-line",color:"#000000"},{label:"Artiordex GitHub Pages",url:"https://www.artiordex.github.io/",icon:"ri-github-fill",color:"#000000"},{label:"Artiordex Blog (Naver)",url:"https://blog.naver.com/artiordex",icon:"ri-book-line",color:"#03C75A"},{label:"Artiordex Store (Naver Smart Store)",url:"https://smartstore.naver.com/artiordex",icon:"ri-store-2-line",color:"#03C75A"},{label:"Artiordex Official Notion",url:"https://www.notion.so/artiordex/Artiordex-Official-Notion-20892a86c03b80acb32bccc3be49bc64?pvs=21",icon:"ri-notion-fill",color:"#000000"},{label:"Artiordex Consulting",url:"https://www.notion.so/artiordex/Artiordex-Consulting-22792a86c03b808786d5dcbc1054e508?pvs=21",icon:"ri-lightbulb-line",color:"#000000"},{label:"Artiordex Tech Insights",url:"https://www.notion.so/artiordex/Artiordex-Tech-Insights-22792a86c03b80d68445e2a7ba53fefb?pvs=21",icon:"ri-magic-line",color:"#000000"},{label:"Artiordex Project Space",url:"https://www.notion.so/artiordex/Artiordex-Project-20692a86c03b80e290e7f570db3f8024?pvs=21",icon:"ri-apps-line",color:"#000000"}]},{id:"notes",title:"Life & Work Notes",links:[{label:"Reference",url:"https://www.notion.so/Reference-23392a86c03b803b97d3c95409c5093c?pvs=21",icon:"ri-bookmark-line",color:"#000000"},{label:"Dev & Worklog",url:"https://www.notion.so/Dev-Worklog-22792a86c03b8031b989c3639c91dae7?pvs=21",icon:"ri-code-s-slash-line",color:"#000000"},{label:"Study & Reading Log",url:"https://www.notion.so/Study-Reading-Log-22792a86c03b8078bcffdf1d39055072?pvs=21",icon:"ri-book-open-line",color:"#000000"},{label:"Insights Log",url:"https://www.notion.so/Insights-Log-20892a86c03b8002bef6fbdfdb74e626?pvs=21",icon:"ri-lightbulb-flash-line",color:"#000000"},{label:"Creative Log",url:"https://www.notion.so/Creative-Log-22792a86c03b80d38f2fedb73a1cc421?pvs=21",icon:"ri-brush-line",color:"#000000"},{label:"Life Journal",url:"https://www.notion.so/Life-Journal-Log-20892a86c03b803ead65c1c2b281eeb6?pvs=21",icon:"ri-emotion-happy-line",color:"#000000"},{label:"Archive Log",url:"https://www.notion.so/Archive-Log-23192a86c03b807e9185da0b5d57e2d9?pvs=21",icon:"ri-archive-line",color:"#000000"}]}],je={categories:Ce},I=je;function Me(){const e=document.getElementById("links");if(!e)return;const t=I.intro?.title||"Links Hub",n=I.intro?.subtitle||"모든 소셜, 작업 공간, Notion 기록을 한 곳에서 확인하세요.";e.innerHTML=`
    <div class="section__inner">
      <!-- Intro -->
      <header class="section__header">
        <h1 class="section__title animate-fade-in animate-delay-1">${t}</h1>
        <p class="section__subtitle animate-fade-in animate-delay-2">${n}</p>
      </header>

      <div id="links-container"></div>
    </div>
  `;const i=document.getElementById("links-container");i&&(I.categories.forEach((o,s)=>{const a=document.createElement("section");a.className=`links-section animate-fade-in animate-delay-${s+1}`,a.innerHTML=`
      <h2 class="links-section__title">${o.title}</h2>
      <div class="links-grid links-grid--triple" id="links-cat-${o.id}"></div>
    `,i.appendChild(a);const r=a.querySelector(`#links-cat-${o.id}`);r&&o.links.forEach((l,c)=>{const d=document.createElement("a");d.href=l.url,d.target="_blank",d.rel="noopener noreferrer",d.className=`link-card link-card--large animate-scale-in animate-delay-${c%6+1}`;const p=l.color||"#4B5563";d.innerHTML=`
        <div class="link-card__icon" style="background:${p}">
          <i class="${l.icon}"></i>
        </div>
        <div>
          <div class="link-card__title">${l.label}</div>
          ${l.description?`<div class="link-card__desc">${l.description}</div>`:""}
        </div>
      `,r.appendChild(d)})}),h())}const Te={title:"연락처",subtitle:"프로젝트 문의, 협업 제안, 컨설팅 요청 등 어떤 내용이든 편하게 연락해주세요."},He={email:{label:"이메일",value:"artiordex@gmail.com",icon:"ri-mail-line"},phone:{label:"전화번호",value:"+82-10-1234-5678",icon:"ri-phone-line"},location:{label:"위치",value:"Seoul, South Korea",icon:"ri-map-pin-line"},hours:{label:"업무 시간",value:"월–금 · 09:00–18:00",icon:"ri-time-line"}},qe={title:"문의하기",description:"아래 양식을 작성해주시면 빠르게 회신드리겠습니다.",fields:[{id:"name",label:"이름",placeholder:"이름을 입력하세요",type:"text",required:!0},{id:"email",label:"이메일",placeholder:"메일 주소를 입력하세요",type:"email",required:!0},{id:"subject",label:"제목",placeholder:"문의 제목을 입력하세요",type:"text",required:!0},{id:"message",label:"내용",placeholder:"문의 내용을 상세히 작성해주세요",type:"textarea",required:!0}],submit:{label:"문의 보내기",icon:"ri-send-plane-2-line"},successMessage:"문의가 성공적으로 제출되었습니다. 빠른 시일 내에 답변드리겠습니다."},Ne={intro:Te,contactInfo:He,form:qe},Oe=Ne;function De(){const e=Oe,t=document.getElementById("contact");if(!t)return;const n=[],i={email:"primary",phone:"secondary",location:"purple",hours:"green"};e.contactInfo&&Object.entries(e.contactInfo).forEach(([l,c])=>{const d=l;n.push({icon:c.icon,label:c.label,value:c.value,color:i[d]})}),t.innerHTML=`
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
  `;const o=t.querySelector(".contact-grid");if(!o)return;const s=document.createElement("div");s.className="contact-info animate-slide-up animate-delay-1",s.innerHTML=`
    <h3 class="contact-info__title">연락 정보</h3>
    <div class="contact-list">
      ${n.map(l=>`
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
  `;const a=document.createElement("div");a.className="contact-form animate-slide-up animate-delay-2";const r=e.form;a.innerHTML=`
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
  `,o.appendChild(s),o.appendChild(a),Pe(),h()}function Pe(){const e=document.getElementById("contact-form"),t=document.getElementById("toast");if(!e||!t)return;const n=Array.from(e.querySelectorAll("input, textarea"));function i(a,r){const l=document.getElementById(`${a}-error`);l&&(l.textContent=r,l.classList.add("show"))}function o(a){const r=document.getElementById(`${a}-error`);r&&r.classList.remove("show")}function s(a){const r=a.id,l=a.value.trim();return o(r),a.required&&!l?(i(r,"필수 입력 항목입니다."),!1):r==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)?(i(r,"올바른 이메일 형식을 입력해주세요."),!1):!0}n.forEach(a=>{a.addEventListener("blur",()=>s(a))}),e.addEventListener("submit",a=>{a.preventDefault();let r=!0;n.forEach(l=>{s(l)||(r=!1)}),r&&(e.reset(),t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),3e3))})}const Fe=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add("visible","revealed")})},{threshold:.15});function We(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(e=>Fe.observe(e))}document.addEventListener("DOMContentLoaded",()=>{te(),de(),Ie(),_e(),Me(),De(),We(),w()});
