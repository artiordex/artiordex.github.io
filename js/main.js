(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(l){if(l.ep)return;l.ep=!0;const s=i(l);fetch(l.href,s)}})();const P={headerId:"main-header",navListId:"header-nav-list",dataPath:"./data/sections.json",activeClass:"active",linkClass:"header-link",spyThreshold:.5};class W{config;sections=[];headerEl=null;navListEl=null;links=[];observer=null;constructor(t={}){this.config={...P,...t}}async init(){this.cacheElements(),this.navListEl&&(await this.loadSections(),this.renderNav(),this.setupScrollSpy(),console.log("Header initialized (simple mode)"))}cacheElements(){this.headerEl=document.getElementById(this.config.headerId),this.navListEl=document.getElementById(this.config.navListId)}async loadSections(){try{const t=await fetch(this.config.dataPath);if(!t.ok)throw new Error;const i=await t.json();this.sections=i.sections||[]}catch{console.warn("JSON 로드 실패 → 기본 섹션 사용"),this.sections=this.getDefaultSections()}}getDefaultSections(){return[{id:"about",label:"소개"},{id:"portfolio",label:"포트폴리오"},{id:"consulting",label:"컨설팅"},{id:"company",label:"창업가 소개"},{id:"links",label:"링크"},{id:"contact",label:"연락처"}]}renderNav(){this.navListEl&&(this.navListEl.innerHTML="",this.sections.forEach(t=>{const i=document.createElement("li");i.innerHTML=`
        <a href="#${t.id}"
          class="${this.config.linkClass}"
          data-section="${t.id}">
          ${t.label}
        </a>
      `,this.navListEl.appendChild(i)}),this.links=[...this.navListEl.querySelectorAll("a")])}setupScrollSpy(){const t=document.querySelectorAll("section[id]");t.length!==0&&(this.observer?.disconnect(),this.observer=new IntersectionObserver(i=>{i.forEach(o=>{if(!o.isIntersecting)return;const l=o.target.id;this.updateActiveLink(l)})},{threshold:this.config.spyThreshold}),t.forEach(i=>this.observer.observe(i)))}updateActiveLink(t){this.links.forEach(i=>{const o=i,l=o.dataset.section;o.classList.toggle(this.config.activeClass,l===t)})}destroy(){this.observer?.disconnect(),this.observer=null,console.log("Header destroyed (simple)")}}let g=null;function R(e){return g||(g=new W(e),g.init()),g}document.addEventListener("DOMContentLoaded",()=>{R()});function w(){const e=document.querySelectorAll("section[id]");let t="";e.forEach(i=>{const o=i.getBoundingClientRect();o.top<=150&&o.bottom>=150&&(t=i.id)}),document.querySelectorAll(".side-nav-link, .mobile-nav-link, .header-link").forEach(i=>{const o=i.dataset.target||i.dataset.section;i.classList.toggle("active",o===t)})}function G(){w(),window.addEventListener("scroll",w)}document.addEventListener("DOMContentLoaded",G);const M="active";let I=null,y=null,T=null;function J(){I=document.getElementById("modal"),y=document.getElementById("modal-overlay"),T=document.getElementById("modal-close"),(!I||!y)&&console.warn("modal 요소를 찾을 수 없습니다.")}function _(){I?.classList.remove(M),y?.classList.remove(M),document.body.style.overflow=""}function K(){document.addEventListener("keydown",e=>{e.key==="Escape"&&_()}),y?.addEventListener("click",()=>_()),T?.addEventListener("click",()=>_())}document.addEventListener("DOMContentLoaded",()=>{J(),K()});const z={name:"민시우",title:"Full-Stack · DevOps · AI · Cloud Automation 전문가",description:"AI와 자동화를 중심으로 디지털 전환을 선도하는 풀스택·클라우드 엔지니어입니다. 비즈니스 목표에 맞춘 기술 전략, 안정적인 시스템 구축, 자동화 기반 운영 최적화를 통해 기업의 성장을 돕습니다.",profileImage:"/assets/images/profile.jpg"},V=["AI 기반 자동화 시스템 구축 경험","대규모 클라우드 인프라 설계 및 운영","React · Node.js 중심의 Full-Stack 개발","DevOps 파이프라인 구축 및 운영 자동화","대기업·스타트업 DX 컨설팅 프로젝트 다수 수행"],U={core:[{name:"AI/ML",level:92},{name:"Full-Stack Development",level:90},{name:"DevOps & Automation",level:94},{name:"Cloud Architecture",level:88},{name:"System Design",level:86}]},X=[{name:"AWS Solutions Architect – Associate",issuer:"Amazon Web Services",year:2023},{name:"Google Cloud Professional Cloud Architect",issuer:"Google Cloud",year:2023},{name:"Kubernetes CKA",issuer:"Linux Foundation",year:2022}],Y=[{platform:"GitHub",url:"https://github.com/artiordex",icon:"ri-github-fill"},{platform:"LinkedIn",url:"https://www.linkedin.com/in/artiordex",icon:"ri-linkedin-box-fill"},{platform:"Instagram",url:"https://instagram.com",icon:"ri-instagram-line"},{platform:"Blog",url:"https://artiordex.dev",icon:"ri-book-open-line"}],Q={profile:z,highlights:V,skills:U,certifications:X,socialLinks:Y},v=Q;function Z(){const e=document.getElementById("about");e&&(e.innerHTML=`
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
  `,ee(),te(),ie(),oe())}function ee(){const e=v.profile,t=v.highlights||[],i=v.socialLinks||[],o=document.getElementById("profile-image");o&&e.profileImage&&(o.style.backgroundImage=`url('${e.profileImage}')`);const l=document.getElementById("profile-name"),s=document.getElementById("profile-title");l&&(l.textContent=e.name),s&&(s.textContent=e.title);const a=document.getElementById("profile-description");a&&(Array.isArray(e.description)?a.innerHTML=e.description.map(c=>`<p>${c}</p>`).join(""):a.innerHTML=`<p>${e.description}</p>`);const r=document.getElementById("profile-highlights");if(r){const c=["hero-tag--primary","hero-tag--secondary","hero-tag--purple","hero-tag--green"];r.innerHTML=t.map((d,p)=>`<span class="hero-tag ${c[p%4]}">${d}</span>`).join("")}const n=document.getElementById("social-links");n&&(n.innerHTML=i.map(c=>`
        <a href="${c.url}" target="_blank" rel="noopener noreferrer" aria-label="${c.platform}">
          <i class="${c.icon}"></i>
        </a>
      `).join(""))}function te(){const e=v.skills?.core||[],t=document.getElementById("skills-core");t&&(t.innerHTML=e.map(i=>`
        <div class="skill-item">
          <div class="skill-header">
            <span class="skill-name">${i.name}</span>
            <span class="skill-percent">${i.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="progress-bar" data-width="${i.level}%"></div>
          </div>
        </div>
      `).join(""),requestAnimationFrame(()=>{document.querySelectorAll(".progress-bar").forEach(i=>{const o=i.dataset.width||"0%";i.style.width=o})}))}function ie(){const e=v.certifications||[],t=document.getElementById("certifications-list");if(t){const i=["hero-cert-item--primary","hero-cert-item--secondary","hero-cert-item--purple","hero-cert-item--green"];t.innerHTML=e.map((o,l)=>`
        <div class="hero-cert-item ${i[l%4]}">
          <i class="ri-award-line"></i>
          <div class="hero-cert-item__info">
            <div class="hero-cert-item__title">${o.name}</div>
            <div class="hero-cert-item__org">${o.issuer} · ${o.year}</div>
          </div>
        </div>
      `).join("")}}function oe(){const e=document.querySelectorAll(".carousel-slide"),t=document.querySelectorAll(".carousel-indicator"),i=document.querySelector(".carousel-nav.prev"),o=document.querySelector(".carousel-nav.next");let l=0;function s(n){e.forEach((c,d)=>{c.classList.toggle("active",d===n)}),t.forEach((c,d)=>{c.classList.toggle("active",d===n)}),l=n}function a(){s((l+1)%e.length)}function r(){s((l-1+e.length)%e.length)}i?.addEventListener("click",r),o?.addEventListener("click",a),t.forEach((n,c)=>{n.addEventListener("click",()=>s(c))}),document.addEventListener("keydown",n=>{n.key==="ArrowLeft"&&r(),n.key==="ArrowRight"&&a()})}const ne={title:"전문 컨설팅 서비스",subtitle:"디지털 전환부터 AI 구축까지, 비즈니스 성장을 위한 맞춤형 솔루션을 제공합니다"},le={intro:ne},se=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add("visible","revealed")})},{threshold:.15});function h(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(e=>se.observe(e))}const ae=le;let u=null,H=null,D=null,j=null,q=null,N=null,x=null;function re(){const e=document.getElementById("portfolio");if(!e)return;const{intro:t,filters:i=[],projects:o=[]}=ae;e.innerHTML=`
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

    ${de()}
  `,ce(i,o),O("all",o),me(),h()}function ce(e,t){const i=document.getElementById("portfolio-filter-buttons");i&&(i.innerHTML="",e.forEach(o=>{const l=document.createElement("button");l.type="button",l.className="filter-btn",l.textContent=o.label,l.dataset.filter=o.id,o.id==="all"&&l.classList.add("active"),l.addEventListener("click",()=>{i.querySelectorAll(".filter-btn").forEach(s=>s.classList.remove("active")),l.classList.add("active"),O(o.id,t)}),i.appendChild(l)}))}function O(e,t){const i=document.getElementById("portfolio-grid");if(!i)return;const o=["primary","secondary","purple","green"];i.innerHTML="",(e==="all"?t:t.filter(s=>s.category===e)).forEach((s,a)=>{const r=document.createElement("article");r.className=`portfolio-item animate-scale-in animate-delay-${a%6+1}`,r.innerHTML=`
      <div class="portfolio-item__image"
           style="background-image:url('${s.thumbnail}')"></div>

      <div class="portfolio-item__body">
        <h3 class="portfolio-item__title">${s.title}</h3>
        <p class="portfolio-item__desc">${s.summary}</p>

        <div class="portfolio-item__tags">
          ${(s.tags||[]).map((n,c)=>`<span class="portfolio-item__tag portfolio-item__tag--${o[c%o.length]}">${n}</span>`).join("")}
        </div>

        <button type="button" class="portfolio-item__link">
          자세히 보기 →
        </button>
      </div>
    `,r.querySelector(".portfolio-item__link")?.addEventListener("click",()=>ue(s)),i.appendChild(r)}),h()}function de(){return`
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
  `}function me(){u=document.getElementById("modal"),H=document.getElementById("modal-title"),D=document.getElementById("modal-image"),j=document.getElementById("modal-description"),q=document.getElementById("modal-features"),N=document.getElementById("modal-techstack"),x=document.getElementById("modal-close"),x?.addEventListener("click",E),u?.addEventListener("click",e=>{e.target===u&&E()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&u?.classList.contains("active")&&E()})}function ue(e){u&&(H.textContent=e.title,D.src=e.modalImage||e.thumbnail,j.textContent=e.description||"",q.innerHTML=(e.features||[]).map(t=>`<li>${t}</li>`).join(""),N.innerHTML=(e.techStack||[]).map(t=>`<span class="modal-tech-tag">${t}</span>`).join(""),u.classList.add("active"),u.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden")}function E(){u&&(u.classList.remove("active"),u.setAttribute("aria-hidden","true"),document.body.style.overflow="")}const pe={title:"창업가로서의 신념",subtitle:"기술의 본질은 사람을 돕는 것이며, 혁신은 본질을 더 명확하게 드러낼 뿐입니다. 저는 기술 중심의 창업가로서 문제를 해결하고, 더 나은 방향으로 움직이는 변화를 만들어갑니다."},he={intro:pe},fe=he;function ve(){const e=document.getElementById("consulting");if(!e)return;const t=fe,i=document.createElement("section");i.className="section section--white",i.innerHTML=`
    <div class="section__inner">
      <header class="section__header">
        <h1 class="section__title animate-fade-in animate-delay-1">
          ${t.intro.title}
        </h1>
        <p class="section__subtitle animate-fade-in animate-delay-2">
          ${t.intro.subtitle}
        </p>
      </header>
    </div>
  `;const o=document.createElement("section");o.className="section section--gradient",o.innerHTML=`
    <div class="section__inner">
      <header class="section__header">
        <h2 class="section__title animate-fade-in animate-delay-1">
          컨설팅 서비스
        </h2>
      </header>
      <div class="consulting-grid" id="service-grid"></div>
    </div>
  `;const l=o.querySelector("#service-grid"),s={primary:"consulting-card__icon consulting-card__icon--primary",secondary:"consulting-card__icon consulting-card__icon--secondary",purple:"consulting-card__icon consulting-card__icon--purple",green:"consulting-card__icon consulting-card__icon--green"};t.serviceCategories.forEach((n,c)=>{const d=n.delay||c+1,p=document.createElement("article");p.className=`consulting-card animate-scale-in animate-delay-${d}`,p.innerHTML=`
      <div class="${s[n.color]}">
        <i class="${n.icon}"></i>
      </div>
      <h3 class="consulting-card__title">${n.title}</h3>
      <p class="consulting-card__desc">${n.description}</p>
      <ul class="consulting-card__list">
        ${n.items.map(f=>`<li><i class="ri-check-line"></i>${f}</li>`).join("")}
      </ul>
    `,l.appendChild(p)});const a=document.createElement("section");a.className="section section--white",a.innerHTML=`
    <div class="section__inner">
      <div class="process-card animate-fade-in animate-delay-1">
        <h2 class="process-card__title">
          ${t.process.title}
        </h2>
        <div class="process-grid" id="process-steps"></div>
      </div>
    </div>
  `;const r=a.querySelector("#process-steps");t.process.steps.forEach((n,c)=>{const d=n.delay||c+1,p=c%5+1,f=document.createElement("div");f.className=`process-step animate-scale-in animate-delay-${d}`,f.innerHTML=`
      <div class="process-step__icon process-step__icon--${p}">
        <i class="${n.icon}"></i>
      </div>
      <h4 class="process-step__title">${n.title}</h4>
      <p class="process-step__desc">${n.description}</p>
    `,r.appendChild(f)}),e.innerHTML="",e.appendChild(i),e.appendChild(o),e.appendChild(a),h()}const ge={title:"포트폴리오",subtitle:"다양한 산업 분야에서 성공적으로 완료한 프로젝트들을 확인해보세요"},be=[{id:"all",label:"전체"},{id:"web",label:"웹 개발"},{id:"ai",label:"AI 솔루션"},{id:"cloud",label:"클라우드"}],ye=[{id:"project1",category:"web",title:"이커머스 플랫폼 구축",summary:"대형 유통업체를 위한 통합 이커머스 솔루션 개발 및 구축",thumbnail:"/assets/images/project1.jpg",tags:["React","Node.js","AWS"],modalImage:"/assets/images/project1-cover.jpg",description:"대형 유통업체를 위한 통합 이커머스 솔루션을 개발하여 온라인 매출 300% 증가를 달성했습니다. 마이크로서비스 아키텍처를 도입하여 확장성과 안정성을 확보했습니다.",features:["실시간 재고 관리 시스템","AI 기반 상품 추천 엔진","다중 결제 시스템 통합","모바일 최적화 반응형 디자인"],techStack:["React","Node.js","AWS","MongoDB"]},{id:"project2",category:"ai",title:"AI 기반 예측 분석 시스템",summary:"제조업체의 수요 예측 및 재고 최적화를 위한 AI 솔루션",thumbnail:"/assets/images/project2.jpg",tags:["Python","TensorFlow","Docker"],modalImage:"/assets/images/project2-cover.jpg",description:"AI 기반 예측 분석 시스템으로 제조업체의 수요 예측 정확도를 85%까지 향상시키고 재고 비용을 40% 절감했습니다.",features:["수요 예측 정확도 85%","재고 비용 40% 절감","생산 계획 최적화","실시간 데이터 분석"],techStack:["Python","TensorFlow","Docker","Kubernetes"]},{id:"project3",category:"cloud",title:"클라우드 마이그레이션",summary:"금융 기업 레거시 시스템 AWS 클라우드 이전",thumbnail:"/assets/images/project3.jpg",tags:["AWS","Kubernetes","DevOps"],modalImage:"/assets/images/project3-cover.jpg",description:"금융 기업의 시스템을 AWS로 완전 이전하여 운영 비용을 절감하고 시스템 가용성 99.9%를 달성했습니다.",features:["운영 비용 50% 절감","99.9% 가용성 확보","배포 시간 90% 단축","자동 스케일링 적용"],techStack:["AWS","Kubernetes","Terraform","DevOps"]}],_e={intro:ge,filters:be,projects:ye},F=_e;let m,A,b,S,C,B,L;function Ee(){const e=document.getElementById("company");if(!e)return;const t=F,i=t.intro||{},o=t.filters||[],l=t.projects||[];e.innerHTML=`
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
  `,Le(o),$e(l),ke(),we(),h()}function Le(e){const t=document.getElementById("filter-buttons");t&&(t.innerHTML="",e.forEach(i=>{const o=document.createElement("button");o.type="button",o.textContent=i.label,o.dataset.filter=i.id,o.className="filter-btn",i.id==="all"&&o.classList.add("active"),t.appendChild(o)}))}function $e(e){const t=document.getElementById("portfolio-grid");if(!t)return;const i=["primary","secondary","purple","green"];t.innerHTML="",e.forEach((o,l)=>{const s=document.createElement("div");s.className=`portfolio-item animate-scale-in animate-delay-${l%6+1}`,s.dataset.category=o.category,s.innerHTML=`
      <div class="portfolio-item__image"
           style="background-image: url('${o.thumbnail}')"></div>
      <div class="portfolio-item__body">
        <h3 class="portfolio-item__title">${o.title}</h3>
        <p class="portfolio-item__desc">${o.summary}</p>

        <div class="portfolio-item__tags">
          ${(o.tags||[]).map((a,r)=>`<span class="portfolio-item__tag portfolio-item__tag--${i[r%i.length]}">${a}</span>`).join("")}
        </div>

        <button class="portfolio-item__link"
                type="button"
                data-project-id="${o.id}"
                aria-label="${o.title} 상세 보기">
          자세히 보기 →
        </button>
      </div>
    `,t.appendChild(s)}),t.addEventListener("click",o=>{const s=o.target.closest(".portfolio-item__link");if(!s)return;const a=s.dataset.projectId;a&&Ie(a)})}function ke(){const e=document.querySelectorAll(".filter-btn"),t=document.querySelectorAll(".portfolio-item");e.forEach(i=>{i.addEventListener("click",()=>{e.forEach(l=>l.classList.remove("active")),i.classList.add("active");const o=i.dataset.filter;t.forEach(l=>{o==="all"||l.dataset.category===o?l.classList.remove("hidden"):l.classList.add("hidden")})})})}function we(){m=document.getElementById("modal"),A=document.getElementById("modal-title"),b=document.getElementById("modal-image"),S=document.getElementById("modal-description"),C=document.getElementById("modal-features"),B=document.getElementById("modal-techstack"),L=document.getElementById("modal-close"),L&&L.addEventListener("click",$),m&&m.addEventListener("click",e=>{e.target===m&&$()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&m?.classList.contains("active")&&$()})}function Ie(e){const t=F.projects.find(i=>i.id===e);!t||!m||(A&&(A.textContent=t.title||""),b&&(b.src=t.modalImage||t.thumbnail||"",b.alt=t.title||"프로젝트 상세 이미지"),S&&(S.textContent=t.description||""),C&&(C.innerHTML=(t.features||[]).map(i=>`<li>${i}</li>`).join("")),B&&(B.innerHTML=(t.techStack||[]).map(i=>`<span class="modal-tech-tag">${i}</span>`).join("")),m.classList.add("active"),m.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden")}function $(){m&&(m.classList.remove("active"),m.setAttribute("aria-hidden","true"),document.body.style.overflow="")}const Ae=[{id:"social",title:"Connect with Me",links:[{label:"Gmail",url:"mailto:artiordex@gmail.com",icon:"ri-mail-line",color:"#D14836"},{label:"LinkedIn",url:"https://www.linkedin.com/in/shiwoo-min-a493aa263/",icon:"ri-linkedin-fill",color:"#0A66C2"},{label:"Instagram",url:"https://instagram.com/artiordex",icon:"ri-instagram-line",color:"#E4405F"},{label:"Threads",url:"https://www.threads.net/@artiordex",icon:"ri-threads-fill",color:"#000000"},{label:"Strava",url:"https://www.strava.com/athletes/artiordex",icon:"ri-run-line",color:"#FC4C02"},{label:"YouTube",url:"https://youtube.com/@artiordex",icon:"ri-youtube-fill",color:"#FF0000"},{label:"Slack",url:"https://slack.com/artiordex-invite",icon:"ri-slack-fill",color:"#4A154B"},{label:"Discord",url:"https://discord.gg/artiordex",icon:"ri-discord-fill",color:"#5865F2"}]},{id:"artiordex",title:"My Work @Artiordex",links:[{label:"Artiordex Home (WordPress)",url:"https://www.artiordex.com/",icon:"ri-building-line",color:"#000000"},{label:"Artiordex GitHub Pages",url:"https://www.artiordex.github.io/",icon:"ri-github-fill",color:"#000000"},{label:"Artiordex Blog (Naver)",url:"https://blog.naver.com/artiordex",icon:"ri-book-line",color:"#03C75A"},{label:"Artiordex Store (Naver Smart Store)",url:"https://smartstore.naver.com/artiordex",icon:"ri-store-2-line",color:"#03C75A"},{label:"Artiordex Official Notion",url:"https://www.notion.so/artiordex/Artiordex-Official-Notion-20892a86c03b80acb32bccc3be49bc64?pvs=21",icon:"ri-notion-fill",color:"#000000"},{label:"Artiordex Consulting",url:"https://www.notion.so/artiordex/Artiordex-Consulting-22792a86c03b808786d5dcbc1054e508?pvs=21",icon:"ri-lightbulb-line",color:"#000000"},{label:"Artiordex Tech Insights",url:"https://www.notion.so/artiordex/Artiordex-Tech-Insights-22792a86c03b80d68445e2a7ba53fefb?pvs=21",icon:"ri-magic-line",color:"#000000"},{label:"Artiordex Project Space",url:"https://www.notion.so/artiordex/Artiordex-Project-20692a86c03b80e290e7f570db3f8024?pvs=21",icon:"ri-apps-line",color:"#000000"}]},{id:"notes",title:"Life & Work Notes",links:[{label:"Reference",url:"https://www.notion.so/Reference-23392a86c03b803b97d3c95409c5093c?pvs=21",icon:"ri-bookmark-line",color:"#000000"},{label:"Dev & Worklog",url:"https://www.notion.so/Dev-Worklog-22792a86c03b8031b989c3639c91dae7?pvs=21",icon:"ri-code-s-slash-line",color:"#000000"},{label:"Study & Reading Log",url:"https://www.notion.so/Study-Reading-Log-22792a86c03b8078bcffdf1d39055072?pvs=21",icon:"ri-book-open-line",color:"#000000"},{label:"Insights Log",url:"https://www.notion.so/Insights-Log-20892a86c03b8002bef6fbdfdb74e626?pvs=21",icon:"ri-lightbulb-flash-line",color:"#000000"},{label:"Creative Log",url:"https://www.notion.so/Creative-Log-22792a86c03b80d38f2fedb73a1cc421?pvs=21",icon:"ri-brush-line",color:"#000000"},{label:"Life Journal",url:"https://www.notion.so/Life-Journal-Log-20892a86c03b803ead65c1c2b281eeb6?pvs=21",icon:"ri-emotion-happy-line",color:"#000000"},{label:"Archive Log",url:"https://www.notion.so/Archive-Log-23192a86c03b807e9185da0b5d57e2d9?pvs=21",icon:"ri-archive-line",color:"#000000"}]}],Se={categories:Ae},k=Se;function Ce(){const e=document.getElementById("links");if(!e)return;const t=k.intro?.title||"Links Hub",i=k.intro?.subtitle||"모든 소셜, 작업 공간, Notion 기록을 한 곳에서 확인하세요.";e.innerHTML=`
    <div class="section__inner">
      <!-- Intro -->
      <header class="section__header">
        <h1 class="section__title animate-fade-in animate-delay-1">${t}</h1>
        <p class="section__subtitle animate-fade-in animate-delay-2">${i}</p>
      </header>

      <div id="links-container"></div>
    </div>
  `;const o=document.getElementById("links-container");o&&(k.categories.forEach((l,s)=>{const a=document.createElement("section");a.className=`links-section animate-fade-in animate-delay-${s+1}`,a.innerHTML=`
      <h2 class="links-section__title">${l.title}</h2>
      <div class="links-grid links-grid--triple" id="links-cat-${l.id}"></div>
    `,o.appendChild(a);const r=a.querySelector(`#links-cat-${l.id}`);r&&l.links.forEach((n,c)=>{const d=document.createElement("a");d.href=n.url,d.target="_blank",d.rel="noopener noreferrer",d.className=`link-card link-card--large animate-scale-in animate-delay-${c%6+1}`;const p=n.color||"#4B5563";d.innerHTML=`
        <div class="link-card__icon" style="background:${p}">
          <i class="${n.icon}"></i>
        </div>
        <div>
          <div class="link-card__title">${n.label}</div>
          ${n.description?`<div class="link-card__desc">${n.description}</div>`:""}
        </div>
      `,r.appendChild(d)})}),h())}const Be={title:"연락처",subtitle:"프로젝트 문의, 협업 제안, 컨설팅 요청 등 어떤 내용이든 편하게 연락해주세요."},Me={email:{label:"이메일",value:"artiordex@gmail.com",icon:"ri-mail-line"},phone:{label:"전화번호",value:"+82-10-1234-5678",icon:"ri-phone-line"},location:{label:"위치",value:"Seoul, South Korea",icon:"ri-map-pin-line"},hours:{label:"업무 시간",value:"월–금 · 09:00–18:00",icon:"ri-time-line"}},xe={title:"문의하기",description:"아래 양식을 작성해주시면 빠르게 회신드리겠습니다.",fields:[{id:"name",label:"이름",placeholder:"이름을 입력하세요",type:"text",required:!0},{id:"email",label:"이메일",placeholder:"메일 주소를 입력하세요",type:"email",required:!0},{id:"subject",label:"제목",placeholder:"문의 제목을 입력하세요",type:"text",required:!0},{id:"message",label:"내용",placeholder:"문의 내용을 상세히 작성해주세요",type:"textarea",required:!0}],submit:{label:"문의 보내기",icon:"ri-send-plane-2-line"},successMessage:"문의가 성공적으로 제출되었습니다. 빠른 시일 내에 답변드리겠습니다."},Te={intro:Be,contactInfo:Me,form:xe},He=Te;function De(){const e=He,t=document.getElementById("contact");if(!t)return;const i=[],o={email:"primary",phone:"secondary",location:"purple",hours:"green"};e.contactInfo&&Object.entries(e.contactInfo).forEach(([n,c])=>{i.push({icon:c.icon,label:c.label,value:c.value,color:o[n]||"primary"})}),t.innerHTML=`
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
      ${i.map(n=>`
        <div class="contact-item">
          <div class="contact-item__icon contact-item__icon--${n.color}">
            <i class="${n.icon}"></i>
          </div>
          <div>
            <div class="contact-item__label">${n.label}</div>
            <div class="contact-item__value">${n.value}</div>
          </div>
        </div>`).join("")}
    </div>
  `;const a=document.createElement("div");a.className="contact-form animate-slide-up animate-delay-2";const r=e.form;a.innerHTML=`
    <h3 class="contact-form__title">${r.title}</h3>
    <p class="contact-form__desc">${r.description}</p>

    <form id="contact-form">
      ${r.fields.map(n=>n.type==="textarea"?`
            <div class="form-group">
              <label for="${n.id}">${n.label}</label>
              <textarea id="${n.id}" placeholder="${n.placeholder}" ${n.required?"required":""}></textarea>
              <div id="${n.id}-error" class="error-message"></div>
            </div>`:`
          <div class="form-group">
            <label for="${n.id}">${n.label}</label>
            <input id="${n.id}" type="${n.type}" placeholder="${n.placeholder}" ${n.required?"required":""} />
            <div id="${n.id}-error" class="error-message"></div>
          </div>`).join("")}

      <button type="submit" class="btn-submit">
        <i class="${r.submit.icon}"></i>
        ${r.submit.label}
      </button>
    </form>
  `,l.appendChild(s),l.appendChild(a),je(),h()}function je(){const e=document.getElementById("contact-form"),t=document.getElementById("toast");if(!e||!t)return;const i=Array.from(e.querySelectorAll("input, textarea"));function o(a,r){const n=document.getElementById(`${a}-error`);n&&(n.textContent=r,n.classList.add("show"))}function l(a){const r=document.getElementById(`${a}-error`);r&&r.classList.remove("show")}function s(a){const r=a.id,n=a.value.trim();return l(r),a.required&&!n?(o(r,"필수 입력 항목입니다."),!1):r==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)?(o(r,"올바른 이메일 형식을 입력해주세요."),!1):!0}i.forEach(a=>{a.addEventListener("blur",()=>s(a))}),e.addEventListener("submit",a=>{a.preventDefault();let r=!0;i.forEach(n=>{s(n)||(r=!1)}),r&&(e.reset(),t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),3e3))})}const qe=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add("visible","revealed")})},{threshold:.15});function Ne(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(e=>qe.observe(e))}document.addEventListener("DOMContentLoaded",()=>{Z(),re(),Ee(),ve(),Ce(),De(),Ne(),w()});
