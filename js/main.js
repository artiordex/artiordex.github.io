(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(s){if(s.ep)return;s.ep=!0;const l=o(s);fetch(s.href,l)}})();const J={headerId:"main-header",navListId:"header-nav-list",dataPath:"./data/sections.json",activeClass:"active",linkClass:"header-link",spyThreshold:.5};class K{config;sections=[];headerEl=null;navListEl=null;links=[];observer=null;constructor(t={}){this.config={...J,...t}}async init(){this.cacheElements(),this.navListEl&&(await this.loadSections(),this.renderNav(),this.setupScrollSpy(),console.log("Header initialized (simple mode)"))}cacheElements(){this.headerEl=document.getElementById(this.config.headerId),this.navListEl=document.getElementById(this.config.navListId)}async loadSections(){try{const t=await fetch(this.config.dataPath);if(!t.ok)throw new Error;const o=await t.json();this.sections=o.sections||[]}catch{console.warn("JSON 로드 실패 → 기본 섹션 사용"),this.sections=this.getDefaultSections()}}getDefaultSections(){return[{id:"about",label:"소개"},{id:"portfolio",label:"포트폴리오"},{id:"consulting",label:"컨설팅"},{id:"company",label:"창업가 소개"},{id:"links",label:"링크"},{id:"contact",label:"연락처"}]}renderNav(){this.navListEl&&(this.navListEl.innerHTML="",this.sections.forEach(t=>{const o=document.createElement("li");o.innerHTML=`
        <a href="#${t.id}"
          class="${this.config.linkClass}"
          data-section="${t.id}">
          ${t.label}
        </a>
      `,this.navListEl.appendChild(o)}),this.links=[...this.navListEl.querySelectorAll("a")])}setupScrollSpy(){const t=document.querySelectorAll("section[id]");t.length!==0&&(this.observer?.disconnect(),this.observer=new IntersectionObserver(o=>{o.forEach(n=>{if(!n.isIntersecting)return;const s=n.target.id;this.updateActiveLink(s)})},{threshold:this.config.spyThreshold}),t.forEach(o=>this.observer.observe(o)))}updateActiveLink(t){this.links.forEach(o=>{const n=o,s=n.dataset.section;n.classList.toggle(this.config.activeClass,s===t)})}destroy(){this.observer?.disconnect(),this.observer=null,console.log("Header destroyed (simple)")}}let _=null;function z(e){return _||(_=new K(e),_.init()),_}document.addEventListener("DOMContentLoaded",()=>{z()});function x(){const e=document.querySelectorAll("section[id]");let t="";e.forEach(o=>{const n=o.getBoundingClientRect();n.top<=150&&n.bottom>=150&&(t=o.id)}),document.querySelectorAll(".side-nav-link, .mobile-nav-link, .header-link").forEach(o=>{const n=o.dataset.target||o.dataset.section;o.classList.toggle("active",n===t)})}function V(){x(),window.addEventListener("scroll",x)}document.addEventListener("DOMContentLoaded",V);const F="active";let S=null,I=null,P=null;function U(){S=document.getElementById("modal"),I=document.getElementById("modal-overlay"),P=document.getElementById("modal-close"),(!S||!I)&&console.warn("modal 요소를 찾을 수 없습니다.")}function k(){S?.classList.remove(F),I?.classList.remove(F),document.body.style.overflow=""}function X(){document.addEventListener("keydown",e=>{e.key==="Escape"&&k()}),I?.addEventListener("click",()=>k()),P?.addEventListener("click",()=>k())}document.addEventListener("DOMContentLoaded",()=>{U(),X()});const Y={name:"민시우",title:"Full-Stack · DevOps · AI · Cloud Automation 전문가",description:"AI와 자동화를 중심으로 디지털 전환을 선도하는 풀스택·클라우드 엔지니어입니다. 비즈니스 목표에 맞춘 기술 전략, 안정적인 시스템 구축, 자동화 기반 운영 최적화를 통해 기업의 성장을 돕습니다.",profileImage:"/assets/images/profile.jpg"},Q=["AI 기반 자동화 시스템 구축 경험","대규모 클라우드 인프라 설계 및 운영","React · Node.js 중심의 Full-Stack 개발","DevOps 파이프라인 구축 및 운영 자동화","대기업·스타트업 DX 컨설팅 프로젝트 다수 수행"],Z={core:[{name:"AI/ML",level:92},{name:"Full-Stack Development",level:90},{name:"DevOps & Automation",level:94},{name:"Cloud Architecture",level:88},{name:"System Design",level:86}]},ee=[{name:"AWS Solutions Architect – Associate",issuer:"Amazon Web Services",year:2023},{name:"Google Cloud Professional Cloud Architect",issuer:"Google Cloud",year:2023},{name:"Kubernetes CKA",issuer:"Linux Foundation",year:2022}],te=[{platform:"GitHub",url:"https://github.com/artiordex",icon:"ri-github-fill"},{platform:"LinkedIn",url:"https://www.linkedin.com/in/artiordex",icon:"ri-linkedin-box-fill"},{platform:"Instagram",url:"https://instagram.com",icon:"ri-instagram-line"},{platform:"Blog",url:"https://artiordex.dev",icon:"ri-book-open-line"}],ie={profile:Y,highlights:Q,skills:Z,certifications:ee,socialLinks:te},y=ie;function oe(){if(!document.getElementById("about"))return;const t=y.profile,o=y.highlights||[],n=y.skills?.core||[],s=y.certifications||[],l=y.socialLinks||[],a=document.getElementById("profile-image"),r=document.getElementById("profile-name"),i=document.getElementById("profile-title"),p=document.getElementById("profile-description"),f=document.getElementById("profile-highlights"),c=document.getElementById("social-links"),m=document.getElementById("skills-core"),u=document.getElementById("certifications-list");if(a&&t.profileImage&&(a.style.backgroundImage=`url('${t.profileImage}')`),r&&(r.textContent=t.name),i&&(i.textContent=t.title),p&&(Array.isArray(t.description)?p.innerHTML=t.description.map(d=>`<p>${d}</p>`).join(""):p.innerHTML=`<p>${t.description}</p>`),f){const d=["hero-tag--primary","hero-tag--secondary","hero-tag--purple","hero-tag--green"];f.innerHTML=o.map((v,E)=>`<span class="hero-tag ${d[E%4]}">${v}</span>`).join("")}if(c&&(c.innerHTML=l.map(d=>`
        <a href="${d.url}" target="_blank" rel="noopener noreferrer">
          <i class="${d.icon}"></i>
        </a>`).join("")),m&&(m.innerHTML=n.map(d=>`
      <div class="skill-item">
        <div class="skill-header">
          <span class="skill-name">${d.name}</span>
          <span class="skill-percent">${d.level}%</span>
        </div>
        <div class="skill-bar">
          <div class="progress-bar" data-width="${d.level}%"></div>
        </div>
      </div>`).join("")),u){const d=["hero-cert-item--primary","hero-cert-item--secondary","hero-cert-item--purple","hero-cert-item--green"];u.innerHTML=s.map((v,E)=>`
      <div class="hero-cert-item ${d[E%4]}">
        <i class="ri-award-line"></i>
        <div class="hero-cert-item__info">
          <div class="hero-cert-item__title">${v.name}</div>
          <div class="hero-cert-item__org">
            ${v.issuer} · ${v.year}
          </div>
        </div>
      </div>`).join("")}requestAnimationFrame(()=>{document.querySelectorAll(".progress-bar").forEach(d=>{const v=d.dataset.width||"0%";d.style.width=v})})}const ne={title:"전문 컨설팅 서비스",subtitle:"디지털 전환부터 AI 구축까지, 비즈니스 성장을 위한 맞춤형 솔루션을 제공합니다"},le=[{id:"strategy",title:"전략 컨설팅",description:"비즈니스 목표에 맞는 디지털 전환 전략을 수립하고 실행 로드맵을 제시합니다",icon:"ri-lightbulb-line",color:"primary",delay:1,features:["현황 분석 및 진단","전략 수립 및 설계","실행 계획 수립"]},{id:"digital",title:"디지털 전환",description:"클라우드 마이그레이션부터 업무 프로세스 디지털화까지 완전한 전환을 지원합니다",icon:"ri-rocket-line",color:"secondary",delay:2,features:["클라우드 마이그레이션","프로세스 자동화","데이터 통합 관리"]},{id:"ai",title:"AI 구축",description:"머신러닝과 AI 기술을 활용하여 비즈니스 인사이트와 자동화 솔루션을 구현합니다",icon:"ri-cpu-line",color:"purple",delay:3,features:["AI 모델 개발","데이터 분석 시스템","예측 분석 구현"]}],se={title:"컨설팅 프로세스",steps:[{id:"consult",label:"상담",description:"요구사항 분석 및 목표 설정",icon:"ri-chat-3-line",color:"primary"},{id:"analysis",label:"분석",description:"현황 진단 및 개선점 도출",icon:"ri-search-line",color:"secondary"},{id:"proposal",label:"제안",description:"맞춤형 솔루션 설계",icon:"ri-file-text-line",color:"purple"},{id:"implementation",label:"구축",description:"시스템 개발 및 구현",icon:"ri-tools-line",color:"green"},{id:"maintenance",label:"유지보수",description:"지속적인 모니터링 및 개선",icon:"ri-customer-service-line",color:"orange"}]},re={intro:ne,services:le,process:se},ae=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add("visible","revealed")})},{threshold:.15});function b(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(e=>ae.observe(e))}const W=re;let h,M,$,T,H,j,w;function ce(){const e=W,t=e.intro||{title:"",subtitle:""},o=e.filters||[],n=e.projects||[],s=e.services||[],l=e.process||null,a=document.getElementById("portfolio-intro-title"),r=document.getElementById("portfolio-intro-subtitle");a&&(a.textContent=t.title||""),r&&(r.textContent=t.subtitle||""),de(o),R("all",n),me(s),l&&ue(l),pe(),b()}function de(e){const t=document.getElementById("portfolio-filter-buttons");t&&(t.innerHTML="",e.forEach(o=>{const n=document.createElement("button");n.type="button",n.textContent=o.label,n.dataset.filter=o.id,n.className="filter-btn",o.id==="all"&&n.classList.add("active"),n.addEventListener("click",()=>{document.querySelectorAll("#portfolio-filter-buttons .filter-btn").forEach(s=>s.classList.remove("active")),n.classList.add("active"),R(o.id,W.projects||[])}),t.appendChild(n)}))}function R(e="all",t){const o=document.getElementById("portfolio-grid");if(!o)return;const n=["primary","secondary","purple","green"];o.innerHTML="",t.filter(l=>e==="all"?!0:l.category===e).forEach((l,a)=>{const r=document.createElement("article");r.className=`portfolio-item animate-scale-in animate-delay-${a%6+1}`,r.dataset.category=l.category,r.innerHTML=`
      <div class="portfolio-item__image"
          style="background-image:url('${l.thumbnail}')"></div>

      <div class="portfolio-item__body">
        <h3 class="portfolio-item__title">${l.title}</h3>
        <p class="portfolio-item__desc">${l.summary}</p>

        <div class="portfolio-item__tags">
          ${(l.tags||[]).map((p,f)=>`<span class="portfolio-item__tag portfolio-item__tag--${n[f%n.length]}">${p}</span>`).join("")}
        </div>

        <button type="button"
                class="portfolio-item__link"
                aria-label="${l.title} 상세 보기">
          자세히 보기 →
        </button>
      </div>
    `;const i=r.querySelector(".portfolio-item__link");i&&i.addEventListener("click",()=>fe(l)),o.appendChild(r)}),b()}function me(e){const t=document.getElementById("portfolio-services");!t||!e||e.length===0||(t.innerHTML=e.map((o,n)=>`
      <div class="service-card service-card--${o.color} animate-scale-in animate-delay-${n+1}">
        <div class="service-card__icon">
          <i class="${o.icon}"></i>
        </div>
        <h3 class="service-card__title">${o.title}</h3>
        <p class="service-card__desc">${o.description}</p>
        <ul class="service-card__features">
          ${(o.features||[]).map(s=>`<li><i class="ri-check-line"></i>${s}</li>`).join("")}
        </ul>
      </div>
    `).join(""))}function ue(e){const t=document.getElementById("portfolio-process");!t||!e||(t.innerHTML=`
    <h3 class="process__title">${e.title}</h3>
    <div class="process__steps">
      ${(e.steps||[]).map(o=>`
          <div class="process-step process-step--${o.color}">
            <div class="process-step__icon">
              <i class="${o.icon}"></i>
            </div>
            <h4 class="process-step__label">${o.label}</h4>
            <p class="process-step__desc">${o.description}</p>
          </div>
        `).join("")}
    </div>
  `)}function pe(){h=document.getElementById("modal"),M=document.getElementById("modal-title"),$=document.getElementById("modal-image"),T=document.getElementById("modal-description"),H=document.getElementById("modal-features"),j=document.getElementById("modal-techstack"),w=document.getElementById("modal-close"),w&&w.addEventListener("click",A),h&&h.addEventListener("click",e=>{e.target===h&&A()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&h?.classList.contains("active")&&A()})}function fe(e){!e||!h||(M&&(M.textContent=e.title||""),$&&($.src=e.modalImage||e.thumbnail||"",$.alt=e.title||"포트폴리오 상세 이미지"),T&&(T.textContent=e.description||""),H&&(H.innerHTML=(e.features||[]).map(t=>`<li>${t}</li>`).join("")),j&&(j.innerHTML=(e.techStack||[]).map(t=>`<span class="modal-tech-tag">${t}</span>`).join("")),h.classList.add("active"),h.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden")}function A(){h&&(h.classList.remove("active"),h.setAttribute("aria-hidden","true"),document.body.style.overflow="")}const he={title:"창업가로서의 신념",subtitle:"기술의 본질은 사람을 돕는 것이며, 혁신은 본질을 더 명확하게 드러낼 뿐입니다. 저는 기술 중심의 창업가로서 문제를 해결하고, 더 나은 방향으로 움직이는 변화를 만들어갑니다."},ge=[{id:"innovation",title:"기술로 변화 만들기",description:"기술은 단순한 도구가 아니라 문제를 해결하는 사고 방식입니다. 복잡한 비즈니스 문제를 기술적 관점에서 재정의하고, 가장 효율적인 해결책을 찾는 데 집중합니다.",icon:"ri-lightbulb-flash-line",color:"primary",delay:1},{id:"future",title:"AI 혁신의 선도",description:"AI는 지금 이 순간에도 비즈니스의 형태를 재창조하고 있습니다. 저는 AI 기술을 단순한 자동화가 아니라 '새로운 가능성의 확장'으로 바라보고, 실질적인 비즈니스 가치로 연결합니다.",icon:"ri-brain-line",color:"purple",delay:2},{id:"experience",title:"15년의 현장 경험",description:"제조, 물류, 금융, 스타트업 등 다양한 산업에서 쌓아온 경험은 문제의 본질을 이해하는 데 큰 자산이 됩니다. 기술은 산업을 이해할 때 가장 강력해집니다.",icon:"ri-timer-2-line",color:"secondary",delay:3},{id:"collaboration",title:"함께 성장하는 협업",description:"좋은 팀은 함께 성장하며, 좋은 협업은 서로의 전문성을 더욱 명확하게 만듭니다. 저는 기술과 비즈니스의 간극을 잇는 다리 역할을 합니다.",icon:"ri-team-line",color:"green",delay:4}],ve={title:"창업가의 세 가지 원칙",items:[{id:"innovationMindset",title:"혁신적 사고",description:"혁신은 거창한 기술에서 시작되지 않습니다. 작은 관찰과 날카로운 질문에서 출발하며, 저는 이를 반복적으로 실천합니다.",icon:"ri-focus-2-line",color:"primary"},{id:"qualityAssurance",title:"품질 중심의 실행",description:"빠른 개발이 목표가 아닙니다. 유지보수할 수 있고, 확장 가능하며, 신뢰할 수 있는 시스템을 만드는 것이 진짜 품질입니다.",icon:"ri-shield-check-line",color:"secondary"},{id:"continuousGrowth",title:"지속 가능한 성장",description:"기술 성장과 비즈니스 성장은 함께 가야 합니다. 장기적인 관점에서 의미 있는 성장을 설계합니다.",icon:"ri-line-chart-line",color:"purple"}]},be={intro:he,visionCards:ge,principles:ve},ye=be;function Ee(){const e=ye,t=document.getElementById("consulting-intro-title"),o=document.getElementById("consulting-intro-subtitle");t&&(t.textContent=e.intro?.title),o&&(o.textContent=e.intro?.subtitle);const n=document.getElementById("service-grid");n&&Array.isArray(e.serviceCategories)&&(n.innerHTML="",e.serviceCategories.forEach((i,p)=>{const f={primary:"consulting-card__icon consulting-card__icon--primary",secondary:"consulting-card__icon consulting-card__icon--secondary",purple:"consulting-card__icon consulting-card__icon--purple",green:"consulting-card__icon consulting-card__icon--green"},c=f[i.color]||f.primary,m=i.delay||p+1,u=document.createElement("article");u.className=`consulting-card animate-scale-in animate-delay-${m}`,u.innerHTML=`
        <div class="${c}">
          <i class="${i.icon}"></i>
        </div>
        <h3 class="consulting-card__title">${i.title}</h3>
        <p class="consulting-card__desc">${i.description}</p>
        <ul class="consulting-card__list">
          ${(i.items||[]).map(d=>`<li><i class="ri-check-line"></i>${d}</li>`).join("")}
        </ul>
      `,n.appendChild(u)}));const s=document.getElementById("process-title"),l=document.getElementById("process-steps");s&&(s.textContent=e.process?.title||""),l&&Array.isArray(e.process?.steps)&&(l.innerHTML="",e.process.steps.forEach((i,p)=>{const f=i.delay||p+1,c=p%5+1,m=document.createElement("div");m.className=`process-step animate-scale-in animate-delay-${f}`,m.innerHTML=`
        <div class="process-step__icon process-step__icon--${c}">
          <i class="${i.icon}"></i>
        </div>
        <h4 class="process-step__title">${i.title}</h4>
        <p class="process-step__desc">${i.description}</p>
      `,l.appendChild(m)}));const a=document.getElementById("consulting-vision-cards");a&&e.visionCards&&(a.innerHTML=e.visionCards.map(i=>`
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
    `),b()}const _e={title:"포트폴리오",subtitle:"다양한 산업 분야에서 성공적으로 완료한 프로젝트들을 확인해보세요"},$e=[{id:"all",label:"전체"},{id:"web",label:"웹 개발"},{id:"ai",label:"AI 솔루션"},{id:"cloud",label:"클라우드"}],Le=[{id:"project1",category:"web",title:"이커머스 플랫폼 구축",summary:"대형 유통업체를 위한 통합 이커머스 솔루션 개발 및 구축",thumbnail:"/assets/images/project1.jpg",tags:["React","Node.js","AWS"],modalImage:"/assets/images/project1-cover.jpg",description:"대형 유통업체를 위한 통합 이커머스 솔루션을 개발하여 온라인 매출 300% 증가를 달성했습니다. 마이크로서비스 아키텍처를 도입하여 확장성과 안정성을 확보했습니다.",features:["실시간 재고 관리 시스템","AI 기반 상품 추천 엔진","다중 결제 시스템 통합","모바일 최적화 반응형 디자인"],techStack:["React","Node.js","AWS","MongoDB"]},{id:"project2",category:"ai",title:"AI 기반 예측 분석 시스템",summary:"제조업체의 수요 예측 및 재고 최적화를 위한 AI 솔루션",thumbnail:"/assets/images/project2.jpg",tags:["Python","TensorFlow","Docker"],modalImage:"/assets/images/project2-cover.jpg",description:"AI 기반 예측 분석 시스템으로 제조업체의 수요 예측 정확도를 85%까지 향상시키고 재고 비용을 40% 절감했습니다.",features:["수요 예측 정확도 85%","재고 비용 40% 절감","생산 계획 최적화","실시간 데이터 분석"],techStack:["Python","TensorFlow","Docker","Kubernetes"]},{id:"project3",category:"cloud",title:"클라우드 마이그레이션",summary:"금융 기업 레거시 시스템 AWS 클라우드 이전",thumbnail:"/assets/images/project3.jpg",tags:["AWS","Kubernetes","DevOps"],modalImage:"/assets/images/project3-cover.jpg",description:"금융 기업의 시스템을 AWS로 완전 이전하여 운영 비용을 절감하고 시스템 가용성 99.9%를 달성했습니다.",features:["운영 비용 50% 절감","99.9% 가용성 확보","배포 시간 90% 단축","자동 스케일링 적용"],techStack:["AWS","Kubernetes","Terraform","DevOps"]}],Ie={intro:_e,filters:$e,projects:Le},G=Ie;let g,D,L,O,N,q,C;function ke(){const e=G,t=e.intro||{},o=e.filters||[],n=e.projects||[],s=document.getElementById("intro-title"),l=document.getElementById("intro-subtitle");s&&(s.textContent=t.title||""),l&&(l.textContent=t.subtitle||"");const a=document.getElementById("filter-buttons"),r=["primary","secondary","purple","green"];a&&(a.innerHTML="",o.forEach(c=>{const m=document.createElement("button");m.type="button",m.textContent=c.label,m.dataset.filter=c.id,m.className="filter-btn",c.id==="all"&&m.classList.add("active"),a.appendChild(m)}));const i=document.getElementById("portfolio-grid");i&&n.forEach((c,m)=>{const u=document.createElement("div");u.className=`portfolio-item animate-scale-in animate-delay-${m%6+1}`,u.dataset.category=c.category,u.innerHTML=`
        <div class="portfolio-item__image"
             style="background-image: url('${c.thumbnail}')"></div>
        <div class="portfolio-item__body">
          <h3 class="portfolio-item__title">${c.title}</h3>
          <p class="portfolio-item__desc">${c.summary}</p>

          <div class="portfolio-item__tags">
            ${(c.tags||[]).map((d,v)=>`<span class="portfolio-item__tag portfolio-item__tag--${r[v%r.length]}">${d}</span>`).join("")}
          </div>

          <button class="portfolio-item__link"
                  type="button"
                  data-project-id="${c.id}"
                  aria-label="${c.title} 상세 보기">
            자세히 보기 →
          </button>
        </div>
      `,i.appendChild(u)});const p=document.querySelectorAll(".filter-btn"),f=document.querySelectorAll(".portfolio-item");p.forEach(c=>{c.addEventListener("click",()=>{p.forEach(u=>u.classList.remove("active")),c.classList.add("active");const m=c.dataset.filter;f.forEach(u=>{m==="all"||u.dataset.category===m?u.classList.remove("hidden"):u.classList.add("hidden")})})}),we(),i&&i.addEventListener("click",c=>{const u=c.target.closest(".portfolio-item__link");if(!u)return;const d=u.dataset.projectId;d&&Ae(d)}),b()}function we(){g=document.getElementById("modal"),D=document.getElementById("modal-title"),L=document.getElementById("modal-image"),O=document.getElementById("modal-description"),N=document.getElementById("modal-features"),q=document.getElementById("modal-techstack"),C=document.getElementById("modal-close"),C&&C.addEventListener("click",B),g&&g.addEventListener("click",e=>{e.target===g&&B()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&g?.classList.contains("active")&&B()})}function Ae(e){const t=G.projects.find(o=>o.id===e);!t||!g||(D&&(D.textContent=t.title||""),L&&(L.src=t.modalImage||t.thumbnail||"",L.alt=t.title||"프로젝트 상세 이미지"),O&&(O.textContent=t.description||""),N&&(N.innerHTML=(t.features||[]).map(o=>`<li>${o}</li>`).join("")),q&&(q.innerHTML=(t.techStack||[]).map(o=>`<span class="modal-tech-tag">${o}</span>`).join("")),g.classList.add("active"),g.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden")}function B(){g&&(g.classList.remove("active"),g.setAttribute("aria-hidden","true"),document.body.style.overflow="")}const Ce=[{id:"social",title:"Connect with Me",links:[{label:"Gmail",url:"mailto:artiordex@gmail.com",icon:"ri-mail-line",color:"#D14836"},{label:"LinkedIn",url:"https://www.linkedin.com/in/shiwoo-min-a493aa263/",icon:"ri-linkedin-fill",color:"#0A66C2"},{label:"Instagram",url:"https://instagram.com/artiordex",icon:"ri-instagram-line",color:"#E4405F"},{label:"Threads",url:"https://www.threads.net/@artiordex",icon:"ri-threads-fill",color:"#000000"},{label:"Strava",url:"https://www.strava.com/athletes/artiordex",icon:"ri-run-line",color:"#FC4C02"},{label:"YouTube",url:"https://youtube.com/@artiordex",icon:"ri-youtube-fill",color:"#FF0000"},{label:"Slack",url:"https://slack.com/artiordex-invite",icon:"ri-slack-fill",color:"#4A154B"},{label:"Discord",url:"https://discord.gg/artiordex",icon:"ri-discord-fill",color:"#5865F2"}]},{id:"artiordex",title:"My Work @Artiordex",links:[{label:"Artiordex Home (WordPress)",url:"https://www.artiordex.com/",icon:"ri-building-line",color:"#000000"},{label:"Artiordex GitHub Pages",url:"https://www.artiordex.github.io/",icon:"ri-github-fill",color:"#000000"},{label:"Artiordex Blog (Naver)",url:"https://blog.naver.com/artiordex",icon:"ri-book-line",color:"#03C75A"},{label:"Artiordex Store (Naver Smart Store)",url:"https://smartstore.naver.com/artiordex",icon:"ri-store-2-line",color:"#03C75A"},{label:"Artiordex Official Notion",url:"https://www.notion.so/artiordex/Artiordex-Official-Notion-20892a86c03b80acb32bccc3be49bc64?pvs=21",icon:"ri-notion-fill",color:"#000000"},{label:"Artiordex Consulting",url:"https://www.notion.so/artiordex/Artiordex-Consulting-22792a86c03b808786d5dcbc1054e508?pvs=21",icon:"ri-lightbulb-line",color:"#000000"},{label:"Artiordex Tech Insights",url:"https://www.notion.so/artiordex/Artiordex-Tech-Insights-22792a86c03b80d68445e2a7ba53fefb?pvs=21",icon:"ri-magic-line",color:"#000000"},{label:"Artiordex Project Space",url:"https://www.notion.so/artiordex/Artiordex-Project-20692a86c03b80e290e7f570db3f8024?pvs=21",icon:"ri-apps-line",color:"#000000"}]},{id:"notes",title:"Life & Work Notes",links:[{label:"Reference",url:"https://www.notion.so/Reference-23392a86c03b803b97d3c95409c5093c?pvs=21",icon:"ri-bookmark-line",color:"#000000"},{label:"Dev & Worklog",url:"https://www.notion.so/Dev-Worklog-22792a86c03b8031b989c3639c91dae7?pvs=21",icon:"ri-code-s-slash-line",color:"#000000"},{label:"Study & Reading Log",url:"https://www.notion.so/Study-Reading-Log-22792a86c03b8078bcffdf1d39055072?pvs=21",icon:"ri-book-open-line",color:"#000000"},{label:"Insights Log",url:"https://www.notion.so/Insights-Log-20892a86c03b8002bef6fbdfdb74e626?pvs=21",icon:"ri-lightbulb-flash-line",color:"#000000"},{label:"Creative Log",url:"https://www.notion.so/Creative-Log-22792a86c03b80d38f2fedb73a1cc421?pvs=21",icon:"ri-brush-line",color:"#000000"},{label:"Life Journal",url:"https://www.notion.so/Life-Journal-Log-20892a86c03b803ead65c1c2b281eeb6?pvs=21",icon:"ri-emotion-happy-line",color:"#000000"},{label:"Archive Log",url:"https://www.notion.so/Archive-Log-23192a86c03b807e9185da0b5d57e2d9?pvs=21",icon:"ri-archive-line",color:"#000000"}]}],Be={categories:Ce},xe=Be;function Se(){const e=document.getElementById("links-container");e&&(e.innerHTML="",xe.categories.forEach((t,o)=>{const n=document.createElement("section");n.className=`links-section animate-fade-in animate-delay-${o+1}`,n.innerHTML=`
      <h2 class="links-section__title">${t.title}</h2>
      <div class="links-grid links-grid--triple" id="links-cat-${t.id}"></div>
    `,e.appendChild(n);const s=n.querySelector(`#links-cat-${t.id}`);s&&t.links.forEach((l,a)=>{const r=document.createElement("a");r.href=l.url,r.target="_blank",r.rel="noopener noreferrer",r.className=`link-card link-card--large animate-scale-in animate-delay-${a%6+1}`;const i=l.color||"#4B5563";r.innerHTML=`
        <div class="link-card__icon" style="background:${i}">
          <i class="${l.icon}"></i>
        </div>
        <div>
          <div class="link-card__title">${l.label}</div>
          ${l.description?`<div class="link-card__desc">${l.description}</div>`:""}
        </div>
      `,s.appendChild(r)})}),b())}const Me={title:"연락처",subtitle:"프로젝트 문의, 협업 제안, 컨설팅 요청 등 어떤 내용이든 편하게 연락해주세요."},Te={email:{label:"이메일",value:"artiordex@gmail.com",icon:"ri-mail-line"},phone:{label:"전화번호",value:"+82-10-1234-5678",icon:"ri-phone-line"},location:{label:"위치",value:"Seoul, South Korea",icon:"ri-map-pin-line"},hours:{label:"업무 시간",value:"월–금 · 09:00–18:00",icon:"ri-time-line"}},He={title:"문의하기",description:"아래 양식을 작성해주시면 빠르게 회신드리겠습니다.",fields:[{id:"name",label:"이름",placeholder:"이름을 입력하세요",type:"text",required:!0},{id:"email",label:"이메일",placeholder:"메일 주소를 입력하세요",type:"email",required:!0},{id:"subject",label:"제목",placeholder:"문의 제목을 입력하세요",type:"text",required:!0},{id:"message",label:"내용",placeholder:"문의 내용을 상세히 작성해주세요",type:"textarea",required:!0}],submit:{label:"문의 보내기",icon:"ri-send-plane-2-line"},successMessage:"문의가 성공적으로 제출되었습니다. 빠른 시일 내에 답변드리겠습니다."},je={intro:Me,contactInfo:Te,form:He},De=je;function Oe(){const e=De,t=document.getElementById("contact");if(!t)return;const o=[],n={email:"primary",phone:"secondary",location:"purple",hours:"green"};e.contactInfo&&Object.entries(e.contactInfo).forEach(([i,p])=>{o.push({icon:p.icon,label:p.label,value:p.value,color:n[i]||"primary"})}),t.innerHTML=`
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
  `;const s=t.querySelector(".contact-grid");if(!s)return;const l=document.createElement("div");l.className="contact-info animate-slide-up animate-delay-1",l.innerHTML=`
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
  `,s.appendChild(l),s.appendChild(a),Ne(),b()}function Ne(){const e=document.getElementById("contact-form"),t=document.getElementById("toast");if(!e||!t)return;const o=Array.from(e.querySelectorAll("input, textarea"));function n(a,r){const i=document.getElementById(`${a}-error`);i&&(i.textContent=r,i.classList.add("show"))}function s(a){const r=document.getElementById(`${a}-error`);r&&r.classList.remove("show")}function l(a){const r=a.id,i=a.value.trim();return s(r),a.required&&!i?(n(r,"필수 입력 항목입니다."),!1):r==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)?(n(r,"올바른 이메일 형식을 입력해주세요."),!1):!0}o.forEach(a=>{a.addEventListener("blur",()=>l(a))}),e.addEventListener("submit",a=>{a.preventDefault();let r=!0;o.forEach(i=>{l(i)||(r=!1)}),r&&(e.reset(),t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),3e3))})}const qe=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add("visible","revealed")})},{threshold:.15});function Fe(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(e=>qe.observe(e))}document.addEventListener("DOMContentLoaded",()=>{oe(),ce(),ke(),Ee(),Se(),Oe(),Fe(),x()});
