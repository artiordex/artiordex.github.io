(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();const z=[{id:"about",label:"자기소개",icon:"ri-user-line"},{id:"portfolio",label:"포트폴리오",icon:"ri-briefcase-line"},{id:"consulting",label:"컨설팅",icon:"ri-lightbulb-line"},{id:"company",label:"회사소개",icon:"ri-building-line"},{id:"links",label:"링크",icon:"ri-links-line"},{id:"contact",label:"연락처",icon:"ri-chat-smile-3-line"}],M={sections:z},U=[{code:"ko",label:"KR",name:"한국어"},{code:"en",label:"EN",name:"English"},{code:"ja",label:"JP",name:"日本語"},{code:"vi",label:"VN",name:"Tiếng Việt"},{code:"de",label:"DE",name:"Deutsch"},{code:"es",label:"ES",name:"Español"},{code:"zh",label:"ZH",name:"中文"}],T={default:"ko",languages:U},Z={mountId:"layout-header",navListId:"header-nav-list",activeClass:"active",linkClass:"header-link",spyThreshold:.5,hideOnScrollDown:!0,scrollThreshold:100};class ee{config;sections=[];navListEl=null;headerEl=null;links=[];observer=null;lastScrollY=0;constructor(t={}){this.config={...Z,...t}}init(){this.renderSkeleton(),this.loadSections(),this.sections.length!==0&&(this.renderNav(),this.setupScrollSpy(),this.bindClickEvents(),this.bindLanguageSelector(),this.config.hideOnScrollDown&&this.setupScrollHide())}destroy(){this.observer?.disconnect(),window.removeEventListener("scroll",this.updateHeaderVisibility)}renderSkeleton(){const t=document.getElementById(this.config.mountId);if(!t){console.error(`[Header] Mount element not found: #${this.config.mountId}`);return}t.innerHTML=`
      <header id="main-header" class="header">
        <div class="header-inner">
          <div class="logo">민시우 - 디지털 전환 개발자</div>

          <nav class="header-nav">
            <ul id="${this.config.navListId}"></ul>
          </nav>

          <div class="header-lang">
            <!-- 네이티브 언어 셀렉트 (option 안에 국기 표시) -->
            <select id="lang-select" aria-label="Language selector">
              ${T.languages.map(i=>`<option value="${i.code}" data-flag="${i.code}">
                      ${i.label}
                    </option>`).join("")}
            </select>
          </div>
        </div>
      </header>
    `,this.headerEl=document.getElementById("main-header"),this.navListEl=document.getElementById(this.config.navListId)}loadSections(){try{const t=M;this.sections=t.sections??[]}catch(t){console.error("[Header] Failed to load sections",t),this.sections=[]}}renderNav(){this.navListEl&&(this.navListEl.innerHTML=this.sections.map(t=>`
        <li>
          <a href="#${t.id}"
             class="${this.config.linkClass}"
             data-section="${t.id}">
            ${t.icon?`<i class="${t.icon}"></i>`:""}
            <span>${t.label}</span>
          </a>
        </li>
      `).join(""),this.links=[...this.navListEl.querySelectorAll("a")])}bindClickEvents(){this.links.forEach(t=>{t.addEventListener("click",i=>{i.preventDefault();const n=t.dataset.section;if(!n)return;const o=document.getElementById(n);if(!o)return;const s=this.headerEl?.offsetHeight||72,r=o.offsetTop-s;window.scrollTo({top:r,behavior:"smooth"})})})}bindLanguageSelector(){const t=document.getElementById("lang-select");t&&(t.value=T.default,t.addEventListener("change",()=>{const i=t.value;let n=0;const o=setInterval(()=>{const s=document.querySelector("select.goog-te-combo");s&&(s.value=i,s.dispatchEvent(new Event("change")),clearInterval(o)),n++,n>20&&(console.warn("[Header] Google Translate select not ready"),clearInterval(o))},200)}))}setupScrollSpy(){const t=document.querySelectorAll("section[id]");t.length&&(this.observer?.disconnect(),this.observer=new IntersectionObserver(i=>{i.forEach(n=>{n.isIntersecting&&this.setActive(n.target.id)})},{threshold:this.config.spyThreshold,rootMargin:"-20% 0px -60% 0px"}),t.forEach(i=>this.observer.observe(i)))}setActive(t){this.links.forEach(i=>{i.classList.toggle(this.config.activeClass,i.dataset.section===t)})}setupScrollHide(){this.headerEl&&(this.headerEl.classList.add("header--visible"),window.addEventListener("scroll",()=>{const t=window.scrollY;if(t<=0){this.headerEl.classList.remove("header--hidden"),this.headerEl.classList.add("header--visible"),this.lastScrollY=t;return}t>this.lastScrollY?(this.headerEl.classList.add("header--hidden"),this.headerEl.classList.remove("header--visible")):(this.headerEl.classList.remove("header--hidden"),this.headerEl.classList.add("header--visible")),this.lastScrollY=t},{passive:!0}))}updateHeaderVisibility(){}}let y=null;function te(e){return y||(y=new ee(e),y.init()),y}const ie={mountId:"layout-nav",activeClass:"active",scrollBehavior:"smooth",observerThreshold:.5};class oe{config;sections=[];navListEl=null;mobileNavListEl=null;links=[];mobileLinks=[];observer=null;constructor(t={}){this.config={...ie,...t}}init(){if(console.log("[AnchorNav] Initializing..."),this.renderSkeleton(),this.loadSections(),console.log("[AnchorNav] Loaded sections:",this.sections),this.sections.length===0){console.warn("[AnchorNav] sections.json empty");return}this.renderNav(),this.bindClickEvents(),this.setupScrollSpy(),console.log("[AnchorNav] Initialization complete")}destroy(){this.observer?.disconnect(),this.observer=null,this.links=[],this.mobileLinks=[],this.sections=[]}renderSkeleton(){const t=document.getElementById(this.config.mountId);if(!t){console.error(`[AnchorNav] Mount element not found: #${this.config.mountId}`);return}t.innerHTML=`
      <!-- PC 사이드 네비게이션 (화면 우측 고정) -->
      <nav id="side-nav" class="side-nav">
        <ul id="side-nav-list"></ul>
      </nav>
      
      <!-- 모바일 하단 네비게이션 (화면 하단 고정) -->
      <nav id="mobile-nav" class="mobile-nav">
        <ul id="mobile-nav-list"></ul>
      </nav>
    `,this.navListEl=document.getElementById("side-nav-list"),this.mobileNavListEl=document.getElementById("mobile-nav-list")}loadSections(){try{const t=M;this.sections=t.sections??[]}catch(t){console.error("[AnchorNav] Failed to load sections",t),this.sections=[]}}renderNav(){this.navListEl&&(this.navListEl.innerHTML=this.sections.map(t=>`
          <li>
            <a href="#${t.id}"
               class="side-nav-link"
               data-section="${t.id}"
               aria-label="${t.label}"
               title="${t.label}">
              <i class="${t.icon}"></i>
            </a>
          </li>
        `).join(""),this.links=[...this.navListEl.querySelectorAll("a")]),this.mobileNavListEl&&(this.mobileNavListEl.innerHTML=this.sections.map(t=>`
          <li>
            <a href="#${t.id}"
               class="mobile-nav-link"
               data-section="${t.id}"
               aria-label="${t.label}">
              <i class="${t.icon}"></i>
            </a>
          </li>
        `).join(""),this.mobileLinks=[...this.mobileNavListEl.querySelectorAll("a")])}bindClickEvents(){[...this.links,...this.mobileLinks].forEach(i=>{i.addEventListener("click",n=>{n.preventDefault();const o=i.dataset.section;if(!o)return;const s=document.getElementById(o);if(!s){console.warn(`[AnchorNav] Section not found: #${o}`);return}window.scrollTo({top:s.offsetTop,behavior:this.config.scrollBehavior})})})}setupScrollSpy(){const t=document.querySelectorAll("section[id]");if(!t.length){console.warn("[AnchorNav] No sections found for scroll spy");return}this.observer?.disconnect(),this.observer=new IntersectionObserver(i=>{i.forEach(n=>{if(n.isIntersecting){const o=n.target.id;this.setActive(o)}})},{threshold:this.config.observerThreshold,rootMargin:"-80px 0px -40% 0px"}),t.forEach(i=>this.observer.observe(i))}setActive(t){[...this.links,...this.mobileLinks].forEach(n=>{const o=n.dataset.section===t;n.classList.toggle(this.config.activeClass,o)})}}let _=null;function ne(e){return _||(_=new oe(e),_.init()),_}const se=[{platform:"GitHub",url:"https://github.com/artiordex",icon:"ri-github-fill"},{platform:"Gmail",url:"mailto:artiordex@gmail.com",icon:"ri-mail-fill"},{platform:"LinkedIn",url:"https://www.linkedin.com/in/shiwoo-min-a493aa263/",icon:"ri-linkedin-fill"},{platform:"Instagram",url:"https://instagram.com/artiordex",icon:"ri-instagram-line"},{platform:"Threads",url:"https://www.threads.net/@artiordex",icon:"ri-threads-fill"},{platform:"Strava",url:"https://www.strava.com/athletes/artiordex",icon:"ri-run-line"},{platform:"YouTube",url:"https://youtube.com/@artiordex",icon:"ri-youtube-fill"},{platform:"Slack",url:"https://slack.com/artiordex-invite",icon:"ri-slack-fill"},{platform:"Discord",url:"https://discord.gg/artiordex",icon:"ri-discord-fill"}],B={socialLinks:se},ae={mountId:"layout-footer",copyrightText:"SHIWOO MIN"},re=B;class le{config;constructor(t={}){this.config={...ae,...t}}init(){this.render()}render(){const t=document.getElementById(this.config.mountId);if(!t)return;const i=new Date().getFullYear(),n=re.socialLinks||[];t.innerHTML=`
      <footer class="footer">
        <div class="footer-inner">
          <p class="footer-copy">
            © ${i} ${this.config.copyrightText}. All rights reserved.
          </p>

          <div class="footer-social">
            ${n.map(o=>`
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
    `}}function ce(e){const t=new le(e);return t.init(),t}function de(){const e=document.getElementById("backToTop");if(!e)return;const t=()=>{window.scrollY>window.innerHeight?e.classList.add("visible"):e.classList.remove("visible")};window.addEventListener("scroll",t),t(),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function A(){const e=document.querySelectorAll("section[id]");let t="";e.forEach(i=>{const n=i.getBoundingClientRect();n.top<=150&&n.bottom>=150&&(t=i.id)}),document.querySelectorAll(".side-nav-link, .mobile-nav-link, .header-link").forEach(i=>{const n=i.dataset.target||i.dataset.section;i.classList.toggle("active",n===t)})}function ue(){A(),window.addEventListener("scroll",A)}document.addEventListener("DOMContentLoaded",ue);const C="active";let E=null,$=null,D=null;function me(){E=document.getElementById("modal"),$=document.getElementById("modal-overlay"),D=document.getElementById("modal-close"),(!E||!$)&&console.warn("modal 요소를 찾을 수 없습니다.")}function w(){E?.classList.remove(C),$?.classList.remove(C),document.body.style.overflow=""}function pe(){document.addEventListener("keydown",e=>{e.key==="Escape"&&w()}),$?.addEventListener("click",()=>w()),D?.addEventListener("click",()=>w())}document.addEventListener("DOMContentLoaded",()=>{me(),pe()});const he=[{id:"slide-1",type:"profile_strengths",profile:{name:"Shiwoo Min",title:"Full-Stack · DevOps · AI Agent Engineer",description:["AI와 자동화를 중심으로 디지털 전환을 선도하는 풀스택·AI 에이전트 엔지니어입니다."],profileImage:"/assets/images/sample.png",backgroundImage:"/assets/images/hero-bg.jpg"},keywords:["Java","TypeScript","Node.js","Python","PostgreSQL","React","Azure","Docker","CI/CD","RAG","AI Agent"],strengths:[{title:"일하는 방식",description:["문제를 구조화해 본질을 정의하고, PoC부터 MVP까지 문서·자동화 기반으로 밀도 있게 실행합니다."]},{title:"문제 해결 방식",description:["증상과 원인을 분리해 재현 가능한 문제로 정의합니다.","데이터와 실험으로 검증하고, 가장 비용 효율적인 해법부터 적용합니다."]},{title:"협업 스타일",description:["용어·범위·성공기준을 먼저 합의해 불필요한 오해를 줄입니다.","결정과 기준을 문서로 남겨 팀의 자산으로 만듭니다."]}]},{id:"slide-2",type:"timeline_portrait",title:"주요 연혁",portraitImage:"/assets/images/sw.png",timeline:[{year:"- 2025",title:"컴퓨터공학 기반 강화",description:["CS 기초(자료구조/알고리즘/OS/DB)를 중심으로 개발 역량을 체계화했습니다."]},{year:"2026",title:"웹·자동화 프로젝트 시작",description:["React·Node 기반의 서비스 개발과 스크립트 자동화로 생산성 개선 경험을 축적했습니다."]},{year:"2027",title:"스타트업/실무형 프로젝트 경험",description:["실사용자 요구를 기준으로 MVP를 만들고 운영 피드백을 반영하는 흐름을 익혔습니다."]},{year:"2028",title:"풀스택·DX 실전 적용",description:["업무 시스템 구축, 레거시 커스터마이징, 배포/운영 체계 개선을 수행했습니다."]},{year:"2029",title:"리딩 및 고도화 중심",description:["설계 표준화, 코드 품질, 자동화 파이프라인 구축으로 팀 생산성을 끌어올렸습니다."]},{year:"2030",title:"AI Agent 기반 확장",description:["RAG·워크플로우·에이전트 오케스트레이션을 결합해 업무/서비스 자동화를 고도화 중입니다."]}]},{id:"slide-3",type:"core_competency",title:"핵심역량",competencies:[{name:"문제 해결 및 분석 능력",summary:"복잡한 시스템 이슈를 재현→원인분리→실험검증 흐름으로 해결합니다.",evidence:["레거시 병목 지점 식별을 위한 로그/지표 기반 분석","DB 인덱싱·쿼리 튜닝·캐시 적용으로 응답시간 개선","프로파일링 기반 리팩토링으로 안정성 강화"],result:"→ 장애/지연 원인을 구조적으로 제거하고 운영 비용을 절감합니다."},{name:"DX·자동화 설계 역량",summary:"반복 업무를 시스템으로 바꿔 사람의 시간을 되찾게 만듭니다.",evidence:["업무 프로세스 분석 및 자동화 후보/ROI 도출","스크립트·RPA·워크플로우 기반 자동 실행 체계 구축","문서/지식 아카이빙으로 운영 표준화"],result:"→ 반복 업무 시간을 크게 줄이고 핵심 업무 집중도를 높입니다."},{name:"풀스택 구현력",summary:"FE·BE·DB·배포까지 한 흐름으로 설계하고 끝까지 완성합니다.",evidence:["React/TS 기반 UI 개발 및 상태/라우팅 구조 설계","Node/Nest/FastAPI 기반 API 설계와 인증·권한 구현","PostgreSQL 중심 데이터 모델링 및 마이그레이션 운영"],result:"→ PoC에서 MVP까지 빠르게 연결되는 구현 속도를 제공합니다."},{name:"DevOps & 운영 최적화",summary:"배포와 운영을 자동화해 안정성과 속도를 동시에 확보합니다.",evidence:["CI/CD 파이프라인 구축 및 배포 자동화","컨테이너 기반 환경 통일(Docker) 및 IaC(Terraform) 적용","모니터링/알림/장애 대응 루프 정착"],result:"→ 배포 리스크를 줄이고 운영 신뢰도를 끌어올립니다."}],summaryKeywords:["문제해결","자동화","DX","풀스택","운영최적화","문서화","실험검증","아키텍처"],brandingQuote:{lines:["기술과 비즈니스를 연결해, 반복을 자동화하고 성장을 가속하는"],highlight:"빌더형 엔지니어"}},{id:"slide-4",type:"education_certifications",title:"학력 · 자격",education:[{degree:"컴퓨터공학",school:"대학교/기관명 입력",period:"— 2025"},{degree:"추가 과정/부전공",school:"지식재산학 / 경영학 / 데이터통계학",period:"—"}],certifications:[{name:"AWS Solutions Architect – Associate",issuer:"Amazon Web Services",year:2023},{name:"Google Cloud Professional Cloud Architect",issuer:"Google Cloud",year:2023},{name:"Certified Kubernetes Administrator (CKA)",issuer:"Linux Foundation",year:2022},{name:"Docker Certified Associate (DCA)",issuer:"Docker, Inc.",year:2022},{name:"Terraform Associate",issuer:"HashiCorp",year:2023},{name:"AWS Cloud Practitioner",issuer:"Amazon Web Services",year:2021},{name:"Google IT Automation with Python",issuer:"Google",year:2021},{name:"Linux Essentials",issuer:"Linux Professional Institute (LPI)",year:2020}]},{id:"slide-5",type:"persona",title:"My Persona",header:{name:"민시우 (Shiwoo Min)",bio:"DX·자동화·풀스택 기반으로 문제를 구조화하고 빠르게 해결하는 빌더형 창업자입니다. PoC→MVP 실행력이 강하며, 시스템 설계·지식 아카이브·과몰입 학습이 강점입니다."},badges:[{label:"FE 35%",key:"fe"},{label:"BE 30%",key:"be"},{label:"AI 25%",key:"ai"},{label:"DevOps 10%",key:"devops"}],tools:["ri-notion-fill","ri-github-fill","ri-terminal-line","ri-cloud-line","ri-code-s-slash-line"],table:[{k:"Name",v:"민시우 (Shiwoo Min)"},{k:"Gender",v:"여성"},{k:"Age Group",v:"20대 후반 ~ 30대 초반"},{k:"Location",v:"경기도 광명시"},{k:"Income",v:"연 3,000만 ~ 5,000만 원"},{k:"Position",v:"Founder / CTO / Lead Developer"},{k:"Occupation",v:"시스템SW 엔지니어링 (IT Solution / DX)"},{k:"Affiliation",v:"아티올덱스 (Artioldex, 1인 창업 기업)"},{k:"Department",v:"DX혁신개발팀"},{k:"Role",v:"전략적 기술 설계 · 자동화 · 풀스택 개발 · 시스템 구축"},{k:"Years of Experience",v:"7년"},{k:"Major",v:"컴퓨터공학 / 지식재산학 / 경영학 / 데이터통계학"},{k:"Languages",v:"한국어, 영어, 일본어, 독일어"},{k:"Hobbies",v:"코딩, 자격증, 강의 청강, 독서·논문 탐독, 라이딩·하이킹"},{k:"Learning Style",v:"과몰입형 학습, 심야·새벽 집중, 실험·문서 기반 학습"},{k:"Work Style",v:"혼자도 구조 전체 설계 가능, 몰입 시간을 성과로 전환"},{k:"Knowledge Management",v:"Notion 70% / GitHub 30% 아카이브"},{k:"Favorite Tools",v:"OpenAI, Vercel, Supabase, GitHub, JetBrains, Figma, Notion, AWS, GCP"}],cards:[{title:"Goals & Needs",icon:"ri-target-line",items:["DX 기반 서비스·솔루션 구축","빠른 실험/검증","T-Shaped 확장","SaaS 포트폴리오 구축"]},{title:"Pain Points",icon:"ri-emotion-unhappy-line",items:["1인 창업 과부하","완벽주의 압박","병렬 작업 피로","맡길 인재 부족"]},{title:"Ideal Experience",icon:"ri-heart-line",items:["PoC→MVP가 빠른 구조","반복 업무 자동화 환경","지식이 자산으로 누적되는 시스템","운영이 예측 가능한 파이프라인"]},{title:"Ideal Team Culture",icon:"ri-team-line",items:["실행 중심","방해 없는 깊은 집중","기술·전략 동반 성장","문서화·기준이 살아있는 팀"]}]},{id:"slide-6",type:"summary",title:"자기소개서",sections:[{title:"나는 어떤 사람인가?",text:"문제를 구조로 정의하고, 실행 가능한 시스템으로 완성하는 엔지니어입니다. 빠르게 움직이되, 판단의 근거와 결과를 반드시 남기는 방식으로 일합니다."},{title:"왜 개발자인가?",text:"생각을 가장 빠르고 정확하게 현실로 옮길 수 있는 수단이 코드이기 때문입니다."},{title:"나는 이렇게 일한다?",text:"애자일하게 PoC→MVP를 빠르게 반복하되, 결정·가설·결과를 문서로 축적합니다. 자동화와 기록을 통해 팀의 실행 속도를 누적적으로 가속합니다."},{title:"내가 원하는 회사!",text:"빠른 실행과 명확한 기록이 공존하는 스타트업을 원합니다. 역할보다 문제에 책임지고, 문서와 코드가 함께 자산이 되는 팀에서 가장 큰 가치를 만듭니다."}]}],ve={slides:he},x=ve,P=B;function be(){const e=document.getElementById("about");if(!e)return;const t=Array.isArray(x.slides)?x.slides:[],i=Array.isArray(P.socialLinks)?P.socialLinks:[];if(t.length===0){e.innerHTML="";return}e.innerHTML=`
    <section class="section hero-carousel" id="about-carousel">
      <div class="carousel-container" id="carousel-container">
        ${t.map((n,o)=>fe(n,o,i)).join("")}
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
        ${t.map((n,o)=>`<div class="indicator ${o===0?"active":""}" data-slide="${o}" role="button" aria-label="슬라이드 ${o+1}"></div>`).join("")}
      </div>
    </section>
  `,Ae(),Ee(),Ie()}function fe(e,t,i){const n=t===0?e?.profile?.backgroundImage??e?.backgroundImage??"":"",o=t===0&&n?`style="background-image:url('${h(n)}')"`:"";return`
    <div class="carousel-slide ${t===0?"first-slide":""}" data-slide-id="${h(e.id)}" ${o}>
      <div class="hero-inner">
        ${ge(e,i)}
      </div>
    </div>
  `}function ge(e,t){switch(e.type){case"profile_strengths":return ye(e,t);case"timeline_portrait":return _e(e);case"core_competency":return $e(e);case"education_certifications":return ke(e);case"persona":return we(e);case"summary":return Le(e);default:return'<div style="grid-column:1/-1;">Unsupported slide type</div>'}}function ye(e,t){const i=e.profile??{},n=Array.isArray(e.keywords)?e.keywords:[],o=Array.isArray(e.strengths)?e.strengths:[],s=Array.isArray(i.description)?i.description:typeof i.description=="string"?[i.description]:[],r=["hero-tag--red","hero-tag--orange","hero-tag--yellow","hero-tag--green","hero-tag--blue","hero-tag--purple"],u=t.map(l=>{const a=String(l.url??""),d=/^https?:\/\//i.test(a)?'target="_blank" rel="noopener noreferrer"':'rel="noopener noreferrer"';return`
        <a href="${h(a)}"
          ${d}
          aria-label="${h(l.platform??"")}"
          title="${h(l.platform??"")}">
          <i class="${h(l.icon??"")}"></i>
        </a>
      `}).join("");return`
    <!-- 좌: 프로필 / 우: 강점 -->
    <div id="profile-section">
      <div class="hero-avatar">
        <img
          src="${h(i.profileImage??"")}"
          alt="${h(i.name??"프로필")} 사진"
          class="hero-avatar__image"
        />
      </div>

      <h1 class="hero-title">${c(i.name??"")}</h1>
      <p class="hero-subtitle">${c(i.title??"")}</p>

      <div class="hero-description">
        ${s.map(l=>`<p>${c(l)}</p>`).join("")}
      </div>

      <div class="hero-tags" id="profile-highlights">
        ${n.map(l=>`<span class="hero-tag ${r[Math.floor(Math.random()*r.length)]}">${c(l)}</span>`).join("")}
      </div>
      <div class="hero-socials" id="social-links">
        ${u}
      </div>
    </div>
    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">실행 원칙</h3>
      <div class="strengths-list">
        ${o.map(l=>`
            <div class="strength-item" style="margin-bottom:1.25rem;">
              <div style="font-weight:700; margin-bottom:0.5rem;">${c(l.title??"")}</div>
              <div style="color:inherit; line-height:1.7;">
                ${(Array.isArray(l.description)?l.description:[]).map(a=>`<div>${c(a)}</div>`).join("")}
              </div>
            </div>
          `).join("")}
      </div>
    </div>
  `}function _e(e){const t=e.title??"주요 연혁",i=e.portraitImage??"",n=Array.isArray(e.timeline)?e.timeline:[];return`
    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">${c(t)}</h3>
      <div class="timeline-accordion">
        ${n.map((o,s)=>`
            <div class="accordion-item ${s===0?"active":""}">
              <button class="accordion-header" type="button" aria-expanded="${s===0?"true":"false"}">
                <span class="accordion-year">${c(o.year??"")}</span>
                <span class="accordion-title">${c(o.title??"")}</span>
                <i class="ri-arrow-down-s-line accordion-icon"></i>
              </button>
              <div class="accordion-content" ${s===0?'style="max-height: 500px;"':""}>
                <div class="accordion-body">
                  ${(Array.isArray(o.description)?o.description:[]).map(r=>`<div>${c(r)}</div>`).join("")}
                </div>
              </div>
            </div>
          `).join("")}
      </div>
    </div>
    <div class="timeline-portrait-wrapper">
      <img
        src="${h(i)}"
        alt="${h(String(t))} 인물 이미지"
        class="timeline-portrait-image"
      />
    </div>
  `}function $e(e){const t=e.title??"자기소개서 핵심역량",i=Array.isArray(e.competencies)?e.competencies:[],n=Array.isArray(e.summaryKeywords)?e.summaryKeywords:[],o=e.brandingQuote??null;return`
    <div class="hero-skills-card" style="grid-column:1/-1;">
      <h3 class="hero-skills-card__title">${c(t)}</h3>

      <!-- 탭 헤더 -->
      <div class="competency-tabs">
        ${i.map((s,r)=>`
            <button 
              class="competency-tab ${r===0?"active":""}" 
              type="button"
              data-tab="${r}"
            >
              ${c(s.name??"")}
            </button>
          `).join("")}
      </div>

      <!-- 탭 콘텐츠 -->
      <div class="competency-tab-contents">
        ${i.map((s,r)=>`
            <div class="competency-tab-content ${r===0?"active":""}" data-tab-content="${r}">
              <div class="competency-summary">${c(s.summary??"")}</div>
              <div class="competency-evidence">
                ${(Array.isArray(s.evidence)?s.evidence:[]).map(u=>`<div>• ${c(u)}</div>`).join("")}
              </div>
              <div class="competency-result">${c(s.result??"")}</div>
            </div>
          `).join("")}
      </div>

      ${n.length?`
        <div class="competency-keywords">
          <div class="competency-keywords__title">핵심 키워드</div>
          <div class="competency-keywords__list">
            ${n.map(s=>`<span class="hero-tag hero-tag--primary">${c(s)}</span>`).join("")}
          </div>
        </div>
      `:""}

      ${o?`
        <div class="competency-quote">
          <span class="competency-quote__line">${c(Array.isArray(o.lines)?o.lines.join(" "):o.lines??"")}</span>
          <span class="competency-quote__highlight">${c(o.highlight??"")}</span>
        </div>
      `:""}
    </div>
  `}function ke(e){const t=Array.isArray(e.education)?e.education:[],i=Array.isArray(e.certifications)?e.certifications:[],n=a=>{if(!a||a==="—"||a==="-")return"—";const m=a.match(/(\d{4})\s*$/);if(m)return m[1];const d=a.match(/^(\d{4})/);return d?d[1]:"—"},o=t.reduce((a,m)=>{const d=String(m.year??n(m.period));return a[d]||(a[d]=[]),a[d].push(m),a},{}),s=i.reduce((a,m)=>{const d=String(m.year??"—");return a[d]||(a[d]=[]),a[d].push(m),a},{}),r=a=>a.sort((m,d)=>{const b=parseInt(m,10),k=parseInt(d,10);return isNaN(b)&&isNaN(k)?0:isNaN(b)?1:isNaN(k)?-1:k-b}),u=r(Object.keys(o)),l=r(Object.keys(s));return`
    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">학력</h3>
      <div class="edu-cert-timeline">
        ${u.map(a=>`
            <div class="edu-cert-year-group">
              <div class="edu-cert-year">${c(a)}</div>
              <div class="edu-cert-items">
                ${o[a].map(m=>`
                    <div class="edu-cert-item">
                      <div class="edu-cert-item__title">${c(m.degree??"")}</div>
                      <div class="edu-cert-item__sub">${c(m.school??"")}</div>
                    </div>
                  `).join("")}
              </div>
            </div>
          `).join("")}
      </div>
    </div>

    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">자격</h3>
      <div class="edu-cert-timeline">
        ${l.map(a=>`
            <div class="edu-cert-year-group">
              <div class="edu-cert-year">${c(a)}</div>
              <div class="edu-cert-items">
                ${s[a].map(m=>`
                    <div class="edu-cert-item">
                      <i class="ri-award-line edu-cert-item__icon"></i>
                      <div>
                        <div class="edu-cert-item__title">${c(m.name??"")}</div>
                        <div class="edu-cert-item__sub">${c(m.issuer??"")}</div>
                      </div>
                    </div>
                  `).join("")}
              </div>
            </div>
          `).join("")}
      </div>
    </div>
  `}function we(e){const t=e.header??{},i=Array.isArray(e.badges)?e.badges:[],n=Array.isArray(e.table)?e.table:[],o=Array.isArray(e.cards)?e.cards:[];return`
    <div class="hero-skills-card persona-card" style="grid-column:1/-1;">
      <!-- 헤더 섹션 -->
      <div class="persona-header">
        <div class="persona-header__info">
          <h3 class="persona-header__name">${c(t.name??"")}</h3>
          <p class="persona-header__bio">${c(t.bio??"")}</p>
          <div class="persona-badges">
            ${i.map(s=>`<span class="persona-badge">${c(s.label??"")}</span>`).join("")}
          </div>
        </div>
      </div>

      <!-- 프로필 테이블 (2열) -->
      <div class="persona-table-wrapper">
        <table class="persona-table">
          ${n.map((s,r)=>`
              <tr>
                <td class="persona-table__key">${c(s.k??"")}</td>
                <td class="persona-table__value">${c(s.v??"")}</td>
              </tr>
            `).join("")}
        </table>
      </div>

      <!-- 카드 그리드 (4열) -->
      ${o.length?`
        <div class="persona-cards">
          ${o.map(s=>`
              <div class="persona-mini-card">
                <div class="persona-mini-card__header">
                  <i class="${h(s.icon??"")}"></i>
                  <span>${c(s.title??"")}</span>
                </div>
                <ul class="persona-mini-card__list">
                  ${(Array.isArray(s.items)?s.items:[]).map(r=>`<li>${c(r)}</li>`).join("")}
                </ul>
              </div>
            `).join("")}
        </div>
      `:""}
    </div>
  `}function Le(e){const t=Array.isArray(e.sections)?e.sections:[];return`
    <div class="hero-skills-card" style="grid-column:1/-1;">
      <h3 class="hero-skills-card__title">${c(e.title??"자기소개서 요약")}</h3>

      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        ${t.map(i=>`
            <div>
              <div style="font-weight:900; margin-bottom:0.35rem;">${c(i.title??"")}</div>
              <div style="line-height:1.8; opacity:0.9;">${c(i.text??"")}</div>
            </div>
          `).join("")}
      </div>
    </div>
  `}function Ae(){const e=document.getElementById("about-carousel");if(!e)return;const t=e.querySelector("#carousel-container"),i=Array.from(e.querySelectorAll(".carousel-slide")),n=Array.from(e.querySelectorAll(".indicator")),o=e.querySelector("#prev-btn"),s=e.querySelector("#next-btn");if(!t||i.length===0||!o||!s)return;let r=0;const u=()=>{t.style.transform=`translateX(${-r*100}%)`,n.forEach((d,b)=>d.classList.toggle("active",b===r))},l=d=>{r=Math.max(0,Math.min(d,i.length-1)),u()},a=()=>l((r+1)%i.length),m=()=>l((r-1+i.length)%i.length);s.addEventListener("click",a),o.addEventListener("click",m),n.forEach((d,b)=>{d.addEventListener("click",()=>l(b))}),document.addEventListener("keydown",d=>{d.key==="ArrowLeft"&&m(),d.key==="ArrowRight"&&a()}),u()}function Ee(){const e=document.querySelectorAll(".accordion-item");e.forEach(t=>{const i=t.querySelector(".accordion-header"),n=t.querySelector(".accordion-content");!i||!n||i.addEventListener("click",()=>{const o=t.classList.contains("active");e.forEach(s=>{s.classList.remove("active");const r=s.querySelector(".accordion-content"),u=s.querySelector(".accordion-header");r&&(r.style.maxHeight="0"),u&&u.setAttribute("aria-expanded","false")}),o||(t.classList.add("active"),n.style.maxHeight=n.scrollHeight+"px",i.setAttribute("aria-expanded","true"))})})}function Ie(){const e=document.querySelectorAll(".competency-tab"),t=document.querySelectorAll(".competency-tab-content");e.forEach(i=>{i.addEventListener("click",()=>{const n=i.dataset.tab;e.forEach(s=>s.classList.remove("active")),t.forEach(s=>s.classList.remove("active")),i.classList.add("active");const o=document.querySelector(`.competency-tab-content[data-tab-content="${n}"]`);o&&o.classList.add("active")})})}function c(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function h(e){return c(e).replaceAll(`
`," ").replaceAll("\r"," ")}const Se={title:"포트폴리오",subtitle:"성공적인 프로젝트를 통해 입증된 우리의 전문성과 창의성을 확인해보세요",icon:"ri-briefcase-4-line"},Te=[{id:"all",label:"전체"},{id:"web",label:"웹 개발"},{id:"mobile",label:"모바일 앱"},{id:"ai",label:"AI/ML"},{id:"iot",label:"IoT"},{id:"fintech",label:"핀테크"}],Ce=[{id:"proj001",category:"web",title:"스마트 이커머스 플랫폼",summary:"AI 기반 상품 추천 시스템을 도입한 차세대 온라인 쇼핑몰",thumbnail:"https://readdy.ai/api/search-image?query=modern%20e-commerce%20platform%20interface%20with%20clean%20design%20shopping%20cart%20and%20product%20displays%20on%20white%20background%20minimalist%20style&width=400&height=300&seq=proj001&orientation=landscape",icon:"ri-shopping-cart-line",tags:["React","Node.js","MongoDB"],badges:[{label:"혁신적",color:"blue"},{label:"사용자 친화적",color:"green"}],modalImage:"https://readdy.ai/api/search-image?query=modern%20e-commerce%20platform%20interface&width=800&height=600&seq=proj001",description:"AI 기반 상품 추천 알고리즘과 개인화된 쇼핑 경험을 제공하는 차세대 이커머스 플랫폼입니다.",features:["AI 상품 추천","실시간 재고 관리","다국어 지원","반응형 디자인"],techStack:["React","Node.js","MongoDB","Redis","AWS"]},{id:"proj002",category:"mobile",title:"디지털 뱅킹 솔루션",summary:"생체인증과 블록체인 기술을 활용한 안전한 모바일 뱅킹 앱",thumbnail:"https://readdy.ai/api/search-image?query=mobile%20banking%20application%20interface%20with%20financial%20charts%20and%20secure%20payment%20features%20clean%20modern%20design%20white%20background&width=400&height=300&seq=proj002&orientation=landscape",icon:"ri-bank-line",tags:["Flutter","Blockchain","Firebase"],badges:[{label:"보안 중심",color:"red"},{label:"신뢰성",color:"blue"}],modalImage:"https://readdy.ai/api/search-image?query=mobile%20banking%20application%20interface&width=800&height=600&seq=proj002",description:"생체인증과 블록체인 기술을 결합한 차세대 모바일 뱅킹 솔루션입니다.",features:["생체인증 로그인","블록체인 거래","실시간 알림","다중 계좌 관리"],techStack:["Flutter","Dart","Firebase","Blockchain","Biometric API"]},{id:"proj003",category:"web",title:"의료진 관리 시스템",summary:"병원 내 환자 정보와 진료 일정을 통합 관리하는 클라우드 시스템",thumbnail:"https://readdy.ai/api/search-image?query=healthcare%20management%20system%20dashboard%20with%20patient%20data%20medical%20charts%20and%20appointment%20scheduling%20clean%20white%20interface&width=400&height=300&seq=proj003&orientation=landscape",icon:"ri-hospital-line",tags:["Vue.js","Python","PostgreSQL"],badges:[{label:"효율적",color:"green"},{label:"전문적",color:"purple"}],modalImage:"https://readdy.ai/api/search-image?query=healthcare%20management%20system%20dashboard&width=800&height=600&seq=proj003",description:"병원 운영 효율을 극대화하는 통합 의료 관리 시스템입니다.",features:["환자 정보 관리","진료 일정 관리","전자 처방전","통계 대시보드"],techStack:["Vue.js","Python","Django","PostgreSQL","Docker"]},{id:"proj004",category:"ai",title:"온라인 학습 플랫폼",summary:"개인 맞춤형 학습 경로를 제공하는 AI 기반 교육 솔루션",thumbnail:"https://readdy.ai/api/search-image?query=educational%20learning%20platform%20with%20interactive%20courses%20video%20lessons%20and%20progress%20tracking%20modern%20interface%20white%20background&width=400&height=300&seq=proj004&orientation=landscape",icon:"ri-graduation-cap-line",tags:["Angular","Machine Learning","AWS"],badges:[{label:"창의적",color:"yellow"},{label:"맞춤형",color:"green"}],modalImage:"https://readdy.ai/api/search-image?query=educational%20learning%20platform&width=800&height=600&seq=proj004",description:"AI가 학습자의 수준과 성향을 분석하여 최적의 학습 경로를 제시합니다.",features:["AI 학습 추천","실시간 진도 추적","인터랙티브 퀴즈","화상 강의"],techStack:["Angular","TensorFlow","Python","AWS","WebRTC"]},{id:"proj005",category:"iot",title:"스마트 물류 관리",summary:"IoT 센서와 GPS를 활용한 실시간 배송 추적 시스템",thumbnail:"https://readdy.ai/api/search-image?query=logistics%20tracking%20system%20with%20delivery%20routes%20warehouse%20management%20and%20real-time%20monitoring%20dashboard%20clean%20interface&width=400&height=300&seq=proj005&orientation=landscape",icon:"ri-truck-line",tags:["IoT","Spring Boot","Redis"],badges:[{label:"실시간",color:"blue"},{label:"정확성",color:"orange"}],modalImage:"https://readdy.ai/api/search-image?query=logistics%20tracking%20system&width=800&height=600&seq=proj005",description:"IoT 기술을 활용한 실시간 물류 추적 및 최적화 시스템입니다.",features:["실시간 GPS 추적","창고 관리","배송 최적화","알림 시스템"],techStack:["Spring Boot","Redis","MQTT","React","Google Maps API"]},{id:"proj006",category:"web",title:"소셜 미디어 관리 도구",summary:"다중 플랫폼 콘텐츠 관리와 분석을 위한 통합 솔루션",thumbnail:"https://readdy.ai/api/search-image?query=social%20media%20management%20dashboard%20with%20analytics%20engagement%20metrics%20and%20content%20scheduling%20tools%20modern%20clean%20interface&width=400&height=300&seq=proj006&orientation=landscape",icon:"ri-share-line",tags:["React Native","GraphQL","Docker"],badges:[{label:"트렌디",color:"pink"},{label:"통합적",color:"blue"}],modalImage:"https://readdy.ai/api/search-image?query=social%20media%20management%20dashboard&width=800&height=600&seq=proj006",description:"여러 소셜 미디어 플랫폼을 한 곳에서 관리하는 통합 솔루션입니다.",features:["다중 플랫폼 관리","콘텐츠 예약","분석 대시보드","팀 협업"],techStack:["React Native","GraphQL","Node.js","Docker","PostgreSQL"]}],xe={title:"프로젝트를 함께 시작하세요",subtitle:"귀하의 비전을 현실로 만들어드립니다",primaryButton:{label:"상담 신청",link:"#contact"},secondaryButton:{label:"더 많은 프로젝트",link:"#portfolio"}},Pe={hero:Se,filters:Te,projects:Ce,cta:xe},je=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add("visible","revealed")})},{threshold:.15});function f(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(e=>je.observe(e))}const Me=Pe;let v=null,q=null,I=null,H=null,N=null,R=null,j=null;const Be={blue:"bg-blue-100 text-blue-700",green:"bg-green-100 text-green-700",red:"bg-red-100 text-red-700",yellow:"bg-yellow-100 text-yellow-700",purple:"bg-purple-100 text-purple-700",pink:"bg-pink-100 text-pink-700",orange:"bg-orange-100 text-orange-700"};function De(){const e=document.getElementById("portfolio");if(!e)return;const{hero:t,filters:i=[],projects:n=[],cta:o}=Me;e.innerHTML=`
    <!-- Hero Section -->
    ${qe(t)}

    <!-- Portfolio Grid Section -->
    <div class="section section--white">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">프로젝트</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">
            다양한 산업 분야에서 수행한 프로젝트들을 통해 우리의 역량을 확인해보세요
          </p>
        </header>

        <div id="portfolio-filter-buttons" class="filter-buttons animate-fade-in animate-delay-2"></div>
        <div id="portfolio-grid"></div>
      </div>
    </div>

    <!-- CTA Section -->
    ${o?He(o):""}

    <!-- Modal -->
    ${Oe()}
  `,Ne(i,n),F("all",n),Ve(),f()}function qe(e){return e?`
    <div class="portfolio-hero">
      <div class="portfolio-hero__content">
        ${e.icon?`<div class="portfolio-hero__icon animate-fade-in"><i class="${e.icon}"></i></div>`:""}
        <h1 class="portfolio-hero__title animate-fade-in">${e.title}</h1>
        <p class="portfolio-hero__subtitle animate-fade-in animate-delay-1">${e.subtitle}</p>
        <button class="portfolio-hero__btn animate-fade-in animate-delay-2" 
                onclick="document.getElementById('portfolio-grid').scrollIntoView({ behavior: 'smooth' })">
          프로젝트 둘러보기
        </button>
      </div>
    </div>
  `:""}function He(e){return e?`
    <div class="portfolio-cta">
      <div class="portfolio-cta__inner">
        <h2 class="portfolio-cta__title animate-fade-in">${e.title}</h2>
        <p class="portfolio-cta__subtitle animate-fade-in animate-delay-1">${e.subtitle}</p>
        <div class="portfolio-cta__buttons animate-fade-in animate-delay-2">
          <a href="${e.primaryButton.link}" class="portfolio-cta__btn portfolio-cta__btn--primary">
            ${e.primaryButton.label}
          </a>
          <a href="${e.secondaryButton.link}" class="portfolio-cta__btn portfolio-cta__btn--secondary">
            ${e.secondaryButton.label}
          </a>
        </div>
      </div>
    </div>
  `:""}function Ne(e,t){const i=document.getElementById("portfolio-filter-buttons");i&&(i.innerHTML="",e.forEach(n=>{const o=document.createElement("button");o.type="button",o.className="filter-btn",o.textContent=n.label,o.dataset.filter=n.id,n.id==="all"&&o.classList.add("active"),o.addEventListener("click",()=>{i.querySelectorAll(".filter-btn").forEach(s=>s.classList.remove("active")),o.classList.add("active"),F(n.id,t)}),i.appendChild(o)}))}function F(e,t){const i=document.getElementById("portfolio-grid");if(!i)return;const n=["primary","secondary","purple","green"];i.innerHTML="",(e==="all"?t:t.filter(s=>s.category===e)).forEach((s,r)=>{const u=document.createElement("article");u.className=`portfolio-item animate-scale-in animate-delay-${r%6+1}`,u.innerHTML=`
      <div class="portfolio-item__image" style="background-image:url('${s.thumbnail}')"></div>

      <div class="portfolio-item__body">
        <div class="portfolio-item__header">
          <span class="portfolio-item__category">${Fe(e,s.category)}</span>
          ${s.icon?`<i class="${s.icon} portfolio-item__icon"></i>`:""}
        </div>

        <h3 class="portfolio-item__title">${s.title}</h3>
        <p class="portfolio-item__desc">${s.summary}</p>

        <div class="portfolio-item__tags">
          ${(s.tags||[]).map((l,a)=>`<span class="portfolio-item__tag portfolio-item__tag--${n[a%n.length]}">${l}</span>`).join("")}
        </div>

        ${s.badges?Re(s.badges):""}

        <button type="button" class="portfolio-item__link">
          자세히 보기 →
        </button>
      </div>
    `,u.querySelector(".portfolio-item__link")?.addEventListener("click",()=>Ge(s)),i.appendChild(u)}),f()}function Re(e){return`
    <div class="portfolio-item__badges">
      ${e.map(t=>`
        <span class="portfolio-item__badge ${Be[t.color]||"bg-gray-100 text-gray-700"}">
          ${t.label}
        </span>
      `).join("")}
    </div>
  `}function Fe(e,t){return{web:"웹 개발",mobile:"모바일 앱",ai:"AI/ML",iot:"IoT",fintech:"핀테크"}[t]||t}function Oe(){return`
    <div id="modal" class="modal" aria-hidden="true">
      <div class="modal-content" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h2 id="modal-title" class="modal-title"></h2>
          <button id="modal-close" class="modal-close" type="button" aria-label="닫기">
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
  `}function Ve(){v=document.getElementById("modal"),q=document.getElementById("modal-title"),I=document.getElementById("modal-image"),H=document.getElementById("modal-description"),N=document.getElementById("modal-features"),R=document.getElementById("modal-techstack"),j=document.getElementById("modal-close"),j?.addEventListener("click",L),v?.addEventListener("click",e=>{e.target===v&&L()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&v?.classList.contains("active")&&L()})}function Ge(e){v&&(q.textContent=e.title,I.src=e.modalImage||e.thumbnail,I.alt=e.title,H.textContent=e.description||"",N.innerHTML=(e.features||[]).map(t=>`<li><i class="ri-check-line"></i> ${t}</li>`).join(""),R.innerHTML=(e.techStack||[]).map(t=>`<span class="modal-tech-tag">${t}</span>`).join(""),v.classList.add("active"),v.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden")}function L(){v&&(v.classList.remove("active"),v.setAttribute("aria-hidden","true"),document.body.style.overflow="")}const Ke={title:"컨설팅",subtitle:"기술로 만드는 차별화된 비즈니스 경험",description:"혁신적인 개발 에이전시부터 전문 기술 컨설팅, 실무 중심 교육까지 귀하의 디지털 전환을 성공적으로 이끌어갑니다.",icon:"ri-lightbulb-flash-line"},We=[{icon:"ri-repeat-2-line",problem:"반복 업무로 인한 생산성 저하와 인력 낭비",outcome:"자동화를 통한 80% 업무시간 단축과 핵심업무 집중"},{icon:"ri-links-line",problem:"부서간 데이터 단절로 인한 의사결정 지연",outcome:"통합 데이터 플랫폼으로 실시간 협업체계 구축"},{icon:"ri-file-paper-line",problem:"수작업 보고서 작성으로 인한 오류와 지연",outcome:"자동 리포팅 시스템으로 정확하고 신속한 보고체계"},{icon:"ri-bug-line",problem:"품질 관리 부재로 인한 고객 불만과 재작업",outcome:"체계적 QA 프로세스로 품질 향상과 비용 절감"},{icon:"ri-settings-3-line",problem:"레거시 시스템 커스터마이징의 높은 난이도와 리스크",outcome:"단계적 모던화를 통한 안전하고 효율적인 시스템 전환"},{icon:"ri-rocket-line",problem:"배포 및 운영 불안정으로 인한 서비스 중단 위험",outcome:"DevOps 체계 구축으로 99.9% 안정성과 빠른 배포"}],Je=[{icon:"ri-robot-line",title:"DX 프로세스 분석 & 자동화 설계",description:"업무 프로세스를 분석하여 RPA, 스크립트, AI를 활용한 최적의 자동화 솔루션을 설계하고 구현합니다.",deliverables:["현재 업무 프로세스 분석 보고서","자동화 가능 영역 식별 및 ROI 분석","RPA/스크립트 설계서 및 구현","AI 적용 방안 및 PoC 개발","자동화 운영 가이드 및 교육"]},{icon:"ri-dashboard-line",title:"업무 시스템 구축",description:"업무 효율성 향상을 위한 맞춤형 웹 시스템, 내부 도구, 실시간 대시보드를 구축합니다.",deliverables:["요구사항 정의서 및 시스템 설계","사용자 인터페이스(UI/UX) 설계","웹 애플리케이션 개발 및 구축","실시간 모니터링 대시보드","시스템 운영 매뉴얼 및 교육"]},{icon:"ri-bar-chart-line",title:"데이터 파이프라인 & 지표화",description:"데이터 수집부터 분석까지 전 과정을 자동화하고 핵심 KPI를 실시간으로 모니터링할 수 있는 체계를 구축합니다.",deliverables:["데이터 아키텍처 설계 및 구축","ETL 파이프라인 개발","KPI 정의 및 지표 설계","자동화된 리포팅 시스템","데이터 거버넌스 가이드"]},{icon:"ri-settings-4-line",title:"ERP/레거시 커스터마이징",description:"기존 ERP 및 레거시 시스템의 요구사항을 분석하여 안전하고 효율적인 커스터마이징을 진행합니다.",deliverables:["현행 시스템 분석 및 진단","커스터마이징 요구사항 정의","시스템 설계 및 개발 계획","단계별 구현 및 테스트","마이그레이션 및 운영 이관"]},{icon:"ri-cloud-line",title:"DevOps/배포 운영 체계 구축",description:"CI/CD 파이프라인 구축부터 모니터링, 장애 대응까지 안정적인 운영 체계를 완성합니다.",deliverables:["DevOps 전략 및 로드맵 수립","CI/CD 파이프라인 구축","인프라 자동화 및 IaC 구현","모니터링 및 알람 시스템","장애 대응 프로세스 및 교육"]},{icon:"ri-brain-line",title:"AI 도입 컨설팅",description:"사내 GPT 활용부터 AI 에이전트 개발까지 기업 맞춤형 AI 솔루션 도입을 지원합니다.",deliverables:["AI 도입 전략 및 로드맵","사내 GPT 구축 및 Fine-tuning","AI 에이전트 PoC 개발","지식베이스 구축 및 연동","AI 거버넌스 및 운영 가이드"]}],Ye=[{title:"킥오프",icon:"ri-rocket-2-line",description:"프로젝트 팀 구성, 목표 공유, 커뮤니케이션 채널 및 일정을 확정합니다.",duration:"1-3일",deliverables:["프로젝트 헌장","팀 구성 및 역할 정의","커뮤니케이션 계획","마일스톤 일정"]},{title:"컨설팅",icon:"ri-chat-voice-line",description:"현황 진단, 요구사항 수집, 이해관계자 인터뷰를 통해 핵심 과제를 도출합니다.",duration:"1-2주",deliverables:["현황 진단 보고서","요구사항 정의서","이해관계자 분석","핵심 과제 도출"]},{title:"디스커버리",icon:"ri-search-eye-line",description:"현황 파악, 비즈니스 목표 정의, 제약사항 분석을 통해 프로젝트의 방향성을 설정합니다.",duration:"1-2주",deliverables:["현황 분석 보고서","비즈니스 목표 정의서","제약사항 및 리스크 분석","이해관계자 맵핑"]},{title:"진단 및 설계",icon:"ri-draft-line",description:"As-Is/To-Be 분석, 우선순위 설정, 기술 아키텍처 설계를 진행합니다.",duration:"1-2주",deliverables:["As-Is/To-Be 분석서","기술 아키텍처 설계","우선순위 매트릭스","프로젝트 로드맵"]},{title:"PoC/빠른 실험",icon:"ri-flask-line",description:"2-10일 단위의 빠른 실험을 통해 핵심 가설을 검증하고 리스크를 최소화합니다.",duration:"2-10일",deliverables:["PoC 프로토타입","검증 결과 보고서","기술적 실현 가능성 검토","성능 테스트 결과"]},{title:"구현/MVP",icon:"ri-code-box-line",description:"핵심 기능 우선으로 MVP를 구현하며 운영 관점을 고려한 개발을 진행합니다.",duration:"4-12주",deliverables:["MVP 시스템 구축","핵심 기능 구현","사용자 테스트 결과","운영 매뉴얼"]},{title:"운영/고도화",icon:"ri-line-chart-line",description:"지속적 모니터링, 개선 루프 운영, 문서화를 통해 시스템을 안정적으로 운영합니다.",duration:"지속적",deliverables:["모니터링 대시보드","운영 프로세스 문서","개선 계획서","기술 지원 체계"]}],Qe={hero:Ke,problems:We,services:Je,process:Ye},Xe=Qe;function ze(){console.group("[renderConsulting] start");const e=document.getElementById("consulting");if(!e){console.warn("❌ #consulting section not found. render aborted."),console.groupEnd();return}const t=Xe;if(!t?.hero){console.error("❌ data.hero is missing"),console.groupEnd();return}const i=l=>Array.isArray(l)?l:[],n=i(t.problems),o=i(t.services),s=i(t.process),r=`
    <section class="hero-section animate-fade-in">
      <div class="container">
        <div class="hero-card animate-scale-in">
          ${`<div class="hero-icon"><i class="${t.hero.icon}"></i></div>`}
          <h1 class="hero-title">${t.hero.title}</h1>
          <p class="hero-subtitle">${t.hero.subtitle}</p>
          ${`<p class="hero-description">${t.hero.description}</p>`}
        </div>
      </div>
    </section>
  `,u=`
    <section class="section consulting-tabs-section">
      <div class="container">

        <!-- Tabs -->
        <div class="consulting-tabs">
          <button class="consulting-tab active" type="button" data-tab="problems">
            <i class="ri-lightbulb-line"></i>
            <span>무엇을 해결하는가</span>
          </button>
          <button class="consulting-tab" type="button" data-tab="services">
            <i class="ri-service-line"></i>
            <span>서비스 라인업</span>
          </button>
          <button class="consulting-tab" type="button" data-tab="process">
            <i class="ri-flow-chart"></i>
            <span>진행 프로세스</span>
          </button>
        </div>

        <div class="consulting-tab-contents">

          <!-- Problems -->
          <div class="consulting-tab-content active" data-tab-content="problems">
            <div class="problems-grid">
              ${n.map((l,a)=>`
                  <div class="problem-card animate-scale-in" style="animation-delay:${a*.1}s">
                    <div class="problem-icon">
                      <i class="${l.icon}"></i>
                    </div>
                    <div class="problem-content">
                      <div class="problem-title">${l.problem}</div>
                      <div class="outcome-divider">→</div>
                      <div class="outcome-title">${l.outcome}</div>
                    </div>
                  </div>
                `).join("")}
            </div>
          </div>

          <!-- Services -->
          <div class="consulting-tab-content" data-tab-content="services">
            <div class="consulting-grid">
              ${o.map((l,a)=>`
                  <div class="consulting-card animate-scale-in" style="animation-delay:${a*.1}s">
                    <div class="consulting-card__icon">
                      <i class="${l.icon}"></i>
                    </div>
                    <h3 class="consulting-card__title">${l.title}</h3>
                    <p class="consulting-card__desc">${l.description}</p>
                    <ul class="consulting-card__list">
                      ${(l.deliverables??[]).map(m=>`<li><i class="ri-check-line"></i>${m}</li>`).join("")}
                    </ul>
                  </div>
                `).join("")}
            </div>
          </div>

          <!-- Process -->
          <div class="consulting-tab-content" data-tab-content="process">
            <div class="process-card">

              <!-- Row 1: 1-4 단계 -->
              <div class="process-row">
                ${s.slice(0,4).map((l,a)=>`
                    <div class="process-step">
                      <div class="process-step__icon process-step__icon--${a+1}">
                        <i class="${l.icon??"ri-checkbox-circle-line"}"></i>
                      </div>
                      <div class="process-step__title">${l.title}</div>
                      <div class="process-step__desc">${l.description}</div>
                    </div>
                    ${a<3?'<div class="process-arrow">→</div>':""}
                  `).join("")}
              </div>

              <!-- Down Arrow -->
              <div class="process-arrow process-arrow--down">↓</div>

              <!-- Row 2: 5-7 단계 (reverse) -->
              <div class="process-row process-row--reverse">
                ${s.slice(4).reverse().map((l,a)=>`
                    <div class="process-step">
                      <div class="process-step__icon process-step__icon--${7-a}">
                        <i class="${l.icon??"ri-checkbox-circle-line"}"></i>
                      </div>
                      <div class="process-step__title">${l.title}</div>
                      <div class="process-step__desc">${l.description}</div>
                    </div>
                    ${a<2?'<div class="process-arrow">←</div>':""}
                  `).join("")}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  `;e.innerHTML=r+u,Ue(),f(),console.log("consulting section rendered"),console.groupEnd()}function Ue(){const e=document.querySelectorAll(".consulting-tab"),t=document.querySelectorAll(".consulting-tab-content");e.forEach(i=>{i.addEventListener("click",()=>{const n=i.dataset.tab;e.forEach(o=>o.classList.remove("active")),t.forEach(o=>o.classList.remove("active")),i.classList.add("active"),document.querySelector(`.consulting-tab-content[data-tab-content="${n}"]`)?.classList.add("active")})})}const Ze={title:"디지털 전환을 설계하는 개발 파트너",subtitle:"Artiordex는 지속 가능한 구조와 사람 중심의 기술로 비즈니스의 성장을 함께합니다",icon:"ri-building-4-line",cta:{label:"문의하기",link:"#contact",icon:"ri-mail-send-line"}},et={title:"What We Do",subtitle:"세 가지 핵심 영역을 통해 클라이언트의 디지털 전환을 지원합니다",items:[{id:"development",title:"Artiordex Development Agency",description:"단순한 개발을 넘어서, 비즈니스 목표와 일치하는 기술 솔루션을 제공합니다.",icon:"ri-code-line",color:"blue",features:["웹 플랫폼 및 애플리케이션 개발","MVP 구축 및 프로토타입 개발","내부 시스템 자동화 솔루션","기술 기반 문제 해결 컨설팅"]},{id:"consulting",title:"Consulting & Education",description:"이론과 실무를 결합한 실질적인 컨설팅과 교육을 통해 조직의 역량을 강화합니다.",icon:"ri-lightbulb-line",color:"green",features:["디지털 전환 전략 컨설팅","조직 및 프로세스 개선 자문","개발 및 기술 실무 강의","맞춤형 교육 프로그램 설계"]},{id:"solutions",title:"Artiordex Solutions",description:"검증된 솔루션과 혁신적인 연구를 통해 미래 지향적인 서비스를 제공합니다.",icon:"ri-rocket-line",color:"purple",features:[{name:"ArtiForge",desc:"솔루션 기반 플랫폼 서비스"},{name:"ArtiLabs",desc:"실험적 기술 연구 및 R&D"},{name:"ArtiFlow",desc:"워크플로우 자동화 및 운영 최적화"}]}]},tt={title:"Our Solutions",subtitle:"Artiordex의 4가지 핵심 솔루션 라인업",items:[{id:"artiordex",name:"Artiordex",tagline:"Core Platform",description:"Artiordex의 핵심 개발 플랫폼으로, 모든 솔루션의 기반이 되는 통합 시스템입니다.",icon:"ri-building-4-line",color:"blue",features:["통합 개발 환경","프로젝트 관리","클라이언트 포털","실시간 협업"]},{id:"artiforge",name:"ArtiForge",tagline:"Platform Service",description:"솔루션 기반 플랫폼 서비스로, 검증된 템플릿과 모듈을 활용한 빠른 구축을 지원합니다.",icon:"ri-hammer-line",color:"orange",features:["템플릿 라이브러리","모듈식 아키텍처","빠른 배포","커스터마이징"]},{id:"artilabs",name:"ArtiLabs",tagline:"R&D Innovation",description:"실험적 기술 연구 및 R&D를 통해 미래 기술을 선도하는 혁신 연구소입니다.",icon:"ri-flask-line",color:"purple",features:["AI/ML 연구","신기술 실험","프로토타입 개발","기술 리서치"]},{id:"artiflow",name:"ArtiFlow",tagline:"Workflow Automation",description:"워크플로우 자동화 및 운영 최적화를 통해 업무 효율을 극대화합니다.",icon:"ri-flow-chart",color:"green",features:["프로세스 자동화","업무 최적화","데이터 파이프라인","모니터링"]}]},it={title:"Timeline",subtitle:"아티올덱스의 성장 여정과 주요 마일스톤",items:[{year:"2022",color:"blue",description:"개인 프로젝트로 시작된 아이디어가 구체화되기 시작했습니다. 다양한 기술 실험과 프로토타입 개발을 통해 핵심 철학을 정립했습니다."},{year:"2023",color:"green",description:"아티올덱스 브랜드를 공식 론칭하고, 개발 에이전시로서의 첫 번째 클라이언트 프로젝트를 성공적으로 완료했습니다."},{year:"2024",color:"orange",description:"컨설팅과 교육 영역으로 사업을 확장하며, 솔루션 라인업의 기초를 구축했습니다. 다양한 산업 분야의 파트너십을 체결했습니다."},{year:"2025",color:"red",description:"ArtiForge, ArtiLabs, ArtiFlow 솔루션을 고도화하고, 글로벌 시장 진출을 위한 기반을 마련할 계획입니다."}]},ot={title:"Vision & Philosophy",subtitle:"우리가 중요하게 생각하는 가치와 철학",items:[{id:"sustainable",title:"지속 가능한 구조",description:"빠른 개발보다는 장기적으로 유지보수가 가능하고 확장 가능한 구조를 설계합니다. 오늘의 편의가 내일의 기술 부채가 되지 않도록 합니다.",icon:"ri-building-line",color:"blue"},{id:"human",title:"사람 중심 사고",description:"기술은 사람을 위해 존재합니다. 사용자의 경험과 개발자의 생산성, 그리고 비즈니스 목표가 조화롭게 균형을 이루는 솔루션을 추구합니다.",icon:"ri-user-heart-line",color:"green"},{id:"flow",title:"흐름과 시스템",description:"개별 기능의 완성도보다는 전체 시스템의 흐름과 연결성을 중시합니다. 부분의 합이 전체보다 큰 시너지를 만들어냅니다.",icon:"ri-flow-chart",color:"purple"}]},nt={hero:Ze,services:et,solutions:tt,timeline:it,vision:ot},st=nt;function at(){const e=document.getElementById("company");if(!e)return;e.className="";const{hero:t,services:i,solutions:n,timeline:o,vision:s}=st;e.innerHTML=`
    <!-- 히어로 CTA -->
    ${t?rt(t):""}

    <!-- 서비스 섹션 -->
    ${i?lt(i):""}

    <!-- 솔루션 섹션 -->
    ${n?dt(n):""}

    <!-- 타임라인 섹션 -->
    ${o?mt(o):""}

    <!-- 비전 섹션 -->
    ${s?ht(s):""}
  `,f()}function rt(e){return e?`
    <div class="company-hero">
      <div class="company-hero__bg"></div>
      <div class="company-hero__content">
        <div class="company-hero__icon animate-fade-in">
          <i class="${e.icon||"ri-building-4-line"}"></i>
        </div>
        <h1 class="company-hero__title animate-fade-in animate-delay-1">${e.title}</h1>
        <p class="company-hero__subtitle animate-fade-in animate-delay-2">${e.subtitle}</p>
        ${e.cta?`
          <a href="${e.cta.link}" class="company-hero__btn animate-fade-in animate-delay-3">
            ${e.cta.icon?`<i class="${e.cta.icon}"></i>`:""}
            ${e.cta.label}
          </a>
        `:""}
      </div>
    </div>
  `:""}function lt(e){return e?`
    <div class="section section--light">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">${e.title}</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">${e.subtitle}</p>
        </header>

        <div class="company-services">
          ${e.items.map((t,i)=>ct(t,i)).join("")}
        </div>
      </div>
    </div>
  `:""}function ct(e,t){const i=n=>typeof n=="object"&&n.name;return`
    <div class="company-service-card animate-fade-in animate-delay-${t+1}">
      <div class="company-service-card__icon company-service-card__icon--${e.color}">
        <i class="${e.icon}"></i>
      </div>
      <h3 class="company-service-card__title">${e.title}</h3>
      <ul class="company-service-card__list">
        ${e.features.map(n=>`
          <li>
            <span class="company-service-card__bullet company-service-card__bullet--${e.color}"></span>
            ${i(n)?`<strong>${n.name}:</strong> ${n.desc}`:n}
          </li>
        `).join("")}
      </ul>
      <p class="company-service-card__desc">${e.description}</p>
    </div>
  `}function dt(e){return e?`
    <div class="section section--white">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">${e.title}</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">${e.subtitle}</p>
        </header>

        <div class="company-solutions">
          ${e.items.map((t,i)=>ut(t,i)).join("")}
        </div>
      </div>
    </div>
  `:""}function ut(e,t){return`
    <div class="company-solution-card animate-fade-in animate-delay-${t+1}">
      <div class="company-solution-card__header">
        <div class="company-solution-card__icon company-solution-card__icon--${e.color}">
          <i class="${e.icon}"></i>
        </div>
        <div class="company-solution-card__info">
          <h3 class="company-solution-card__name">${e.name}</h3>
          <span class="company-solution-card__tagline">${e.tagline}</span>
        </div>
      </div>
      <p class="company-solution-card__desc">${e.description}</p>
      <div class="company-solution-card__features">
        ${e.features.map(i=>`
          <span class="company-solution-card__feature">${i}</span>
        `).join("")}
      </div>
    </div>
  `}function mt(e){return e?`
    <div class="section section--light">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">${e.title}</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">${e.subtitle}</p>
        </header>

        <div class="company-timeline">
          <div class="company-timeline__line"></div>
          <div class="company-timeline__items">
            ${e.items.map((t,i)=>pt(t,i)).join("")}
          </div>
        </div>
      </div>
    </div>
  `:""}function pt(e,t){return`
    <div class="company-timeline-item animate-fade-in animate-delay-${t+1}">
      <div class="company-timeline-item__marker company-timeline-item__marker--${e.color}">
        <span>${e.year.slice(-2)}</span>
      </div>
      <div class="company-timeline-item__card">
        <h3 class="company-timeline-item__year">${e.year}</h3>
        <p class="company-timeline-item__desc">${e.description}</p>
      </div>
    </div>
  `}function ht(e){return e?`
    <div class="section section--white">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">${e.title}</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">${e.subtitle}</p>
        </header>

        <div class="company-vision">
          ${e.items.map((t,i)=>vt(t,i)).join("")}
        </div>
      </div>
    </div>
  `:""}function vt(e,t){return`
    <div class="company-vision-card animate-fade-in animate-delay-${t+1}">
      <div class="company-vision-card__icon company-vision-card__icon--${e.color}">
        <i class="${e.icon}"></i>
      </div>
      <h3 class="company-vision-card__title">${e.title}</h3>
      <p class="company-vision-card__desc">${e.description}</p>
    </div>
  `}const bt={title:"링크 허브",subtitle:"Life · Work · Notes 모든 것을 기록하다",icon:"ri-links-line"},ft=[{id:"artiordex",title:"My Work @Artiordex",icon:"ri-building-line",links:[{label:"Artiordex Home",description:"WordPress 공식 홈페이지",url:"https://www.artiordex.com/",icon:"ri-building-line",color:"#667eea"},{label:"GitHub Pages",description:"개발 포트폴리오",url:"https://www.artiordex.github.io/",icon:"ri-github-fill",color:"#333333"},{label:"Naver Blog",description:"기술 블로그",url:"https://blog.naver.com/artiordex",icon:"ri-book-line",color:"#03C75A"},{label:"Smart Store",description:"네이버 스마트스토어",url:"https://smartstore.naver.com/artiordex",icon:"ri-store-2-line",color:"#03C75A"},{label:"Official Notion",description:"공식 노션 페이지",url:"https://www.notion.so/artiordex/Artiordex-Official-Notion-20892a86c03b80acb32bccc3be49bc64",icon:"ri-notion-fill",color:"#000000"},{label:"Consulting",description:"컨설팅 서비스",url:"https://www.notion.so/artiordex/Artiordex-Consulting-22792a86c03b808786d5dcbc1054e508",icon:"ri-lightbulb-line",color:"#f59e0b"},{label:"Tech Insights",description:"기술 인사이트",url:"https://www.notion.so/artiordex/Artiordex-Tech-Insights-22792a86c03b80d68445e2a7ba53fefb",icon:"ri-magic-line",color:"#8b5cf6"},{label:"Project Space",description:"프로젝트 공간",url:"https://www.notion.so/artiordex/Artiordex-Project-20692a86c03b80e290e7f570db3f8024",icon:"ri-apps-line",color:"#3b82f6"}]},{id:"notes",title:"Life & Work Notes",icon:"ri-file-text-line",links:[{label:"Reference",description:"참고 자료 모음",url:"https://www.notion.so/Reference-23392a86c03b803b97d3c95409c5093c",icon:"ri-bookmark-line",color:"#ef4444"},{label:"Dev & Worklog",description:"개발 및 업무 기록",url:"https://www.notion.so/Dev-Worklog-22792a86c03b8031b989c3639c91dae7",icon:"ri-code-s-slash-line",color:"#3b82f6"},{label:"Study & Reading",description:"학습 및 독서 기록",url:"https://www.notion.so/Study-Reading-Log-22792a86c03b8078bcffdf1d39055072",icon:"ri-book-open-line",color:"#10b981"},{label:"Insights Log",description:"인사이트 기록",url:"https://www.notion.so/Insights-Log-20892a86c03b8002bef6fbdfdb74e626",icon:"ri-lightbulb-flash-line",color:"#f59e0b"},{label:"Creative Log",description:"창작 기록",url:"https://www.notion.so/Creative-Log-22792a86c03b80d38f2fedb73a1cc421",icon:"ri-brush-line",color:"#ec4899"},{label:"Life Journal",description:"일상 기록",url:"https://www.notion.so/Life-Journal-Log-20892a86c03b803ead65c1c2b281eeb6",icon:"ri-emotion-happy-line",color:"#8b5cf6"},{label:"Archive",description:"아카이브",url:"https://www.notion.so/Archive-Log-23192a86c03b807e9185da0b5d57e2d9",icon:"ri-archive-line",color:"#6b7280"}]}],gt={hero:bt,categories:ft},yt=gt;function _t(){const e=document.getElementById("links");if(!e)return;e.className="";const{hero:t,intro:i,categories:n,cta:o}=yt,s=t||i;e.innerHTML=`
    <!-- 히어로 CTA -->
    ${s?$t(s):""}

    <!-- 노트북 섹션 -->
    <div class="section section--white">
      <div class="section__inner">
        <div class="links-notebook animate-fade-in">
          <!-- 노트북 스파인 -->
          <div class="notebook-spine"></div>
          
          <!-- 노트북 링 -->
          <div class="notebook-rings">
            ${Array(8).fill('<div class="notebook-ring"></div>').join("")}
          </div>

          <!-- 2열 페이지 -->
          <div class="notebook-pages">
            ${n.map((r,u)=>kt(r,u)).join("")}
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 CTA -->
    ${o?Lt(o):""}
  `,f()}function $t(e){return e?`
    <div class="links-hero">
      <div class="links-hero__bg"></div>
      <div class="links-hero__content">
        <div class="links-hero__icon animate-fade-in">
          <i class="${e.icon||"ri-links-line"}"></i>
        </div>
        <h1 class="links-hero__title animate-fade-in animate-delay-1">${e.title}</h1>
        <p class="links-hero__subtitle animate-fade-in animate-delay-2">${e.subtitle}</p>
        <div class="links-hero__scroll animate-fade-in animate-delay-3">
          <i class="ri-arrow-down-line"></i>
        </div>
      </div>
    </div>
  `:""}function kt(e,t){return`
    <div class="notebook-page ${t%2===0?"notebook-page--left":"notebook-page--right"}">
      <!-- 페이지 헤더 -->
      <div class="notebook-page__header">
        <div class="notebook-page__icon" style="background: ${At(t)}">
          <i class="${e.icon||"ri-folder-line"}"></i>
        </div>
        <div class="notebook-page__info">
          <h3 class="notebook-page__title">${e.title}</h3>
          <span class="notebook-page__count">${e.links.length} links</span>
        </div>
      </div>

      <!-- 구분선 -->
      <div class="notebook-page__divider"></div>

      <!-- 링크 목록 -->
      <ul class="notebook-page__links">
        ${e.links.map((n,o)=>wt(n)).join("")}
      </ul>

      <!-- 페이지 번호 -->
      <div class="notebook-page__number">${String(t+1).padStart(2,"0")}</div>
    </div>
  `}function wt(e,t){return`
    <li class="notebook-link">
      <a href="${e.url}" target="_blank" rel="noopener noreferrer">
        <span class="notebook-link__bullet" style="background: ${e.color}"></span>
        <span class="notebook-link__icon" style="color: ${e.color}">
          <i class="${e.icon}"></i>
        </span>
        <span class="notebook-link__text">
          <span class="notebook-link__label">${e.label}</span>
          ${e.description?`<span class="notebook-link__desc">${e.description}</span>`:""}
        </span>
        <i class="ri-external-link-line notebook-link__external"></i>
      </a>
    </li>
  `}function Lt(e){return e?`
    <div class="links-cta">
      <div class="links-cta__inner">
        <div class="links-cta__icon">
          <i class="ri-chat-smile-3-line"></i>
        </div>
        <h2 class="links-cta__title">${e.title}</h2>
        <p class="links-cta__subtitle">${e.subtitle}</p>
        <a href="${e.button.link}" class="links-cta__btn">
          ${e.button.icon?`<i class="${e.button.icon}"></i>`:""}
          ${e.button.label}
        </a>
      </div>
    </div>
  `:""}function At(e){const t=["linear-gradient(135deg, #667eea 0%, #764ba2 100%)","linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"];return t[e%t.length]}const Et={title:"함께 이야기해요",subtitle:"프로젝트 문의, 협업 제안, 컨설팅 요청 등 어떤 내용이든 편하게 연락해주세요",icon:"ri-chat-smile-3-line"},It={email:{label:"이메일",value:"artiordex@gmail.com",icon:"ri-mail-line"},phone:{label:"전화번호",value:"+82-10-2589-3152",icon:"ri-phone-line"},location:{label:"위치",value:"Gwangmyeong-si, Gyeonggi-do, South Korea",icon:"ri-map-pin-line"},hours:{label:"업무 시간",value:"월-토 · 09:00 - 22:00",icon:"ri-time-line"}},St=[{platform:"Slack",url:"https://slack.com/artiordex",icon:"ri-slack-fill"},{platform:"KaKaoTalk",url:"https://kakao.com/artiordex",icon:"ri-kakao-talk-fill"},{platform:"Discord",url:"https://discord.com/artiordex",icon:"ri-discord-line"}],Tt={title:"메시지 보내기",description:"아래 양식을 작성해주시면 빠르게 회신드리겠습니다.",fields:[{id:"name",label:"이름",placeholder:"이름을 입력하세요",type:"text",required:!0},{id:"email",label:"이메일",placeholder:"메일 주소를 입력하세요",type:"email",required:!0},{id:"subject",label:"제목",placeholder:"문의 제목을 입력하세요",type:"text",required:!0},{id:"message",label:"내용",placeholder:"문의 내용을 상세히 작성해주세요",type:"textarea",required:!0}],submit:{label:"문의 보내기",icon:"ri-send-plane-2-line"}},Ct={hero:Et,contactInfo:It,socialLinks:St,form:Tt};class g{constructor(t=0,i="Network Error"){this.status=t,this.text=i}}const xt=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},p={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:xt()},S=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},Pt=(e,t="https://api.emailjs.com")=>{if(!e)return;const i=S(e);p.publicKey=i.publicKey,p.blockHeadless=i.blockHeadless,p.storageProvider=i.storageProvider,p.blockList=i.blockList,p.limitRate=i.limitRate,p.origin=i.origin||t},O=async(e,t,i={})=>{const n=await fetch(p.origin+e,{method:"POST",headers:i,body:t}),o=await n.text(),s=new g(n.status,o);if(n.ok)return s;throw s},V=(e,t,i)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!i||typeof i!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},jt=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},G=e=>e.webdriver||!e.languages||e.languages.length===0,K=()=>new g(451,"Unavailable For Headless Browser"),Mt=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},Bt=e=>!e.list?.length||!e.watchVariable,Dt=(e,t)=>e instanceof FormData?e.get(t):e[t],W=(e,t)=>{if(Bt(e))return!1;Mt(e.list,e.watchVariable);const i=Dt(t,e.watchVariable);return typeof i!="string"?!1:e.list.includes(i)},J=()=>new g(403,"Forbidden"),qt=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a non-empty string"},Ht=async(e,t,i)=>{const n=Number(await i.get(e)||0);return t-Date.now()+n},Y=async(e,t,i)=>{if(!t.throttle||!i)return!1;qt(t.throttle,t.id);const n=t.id||e;return await Ht(n,t.throttle,i)>0?!0:(await i.set(n,Date.now().toString()),!1)},Q=()=>new g(429,"Too Many Requests"),Nt=async(e,t,i,n)=>{const o=S(n),s=o.publicKey||p.publicKey,r=o.blockHeadless||p.blockHeadless,u=o.storageProvider||p.storageProvider,l={...p.blockList,...o.blockList},a={...p.limitRate,...o.limitRate};return r&&G(navigator)?Promise.reject(K()):(V(s,e,t),jt(i),i&&W(l,i)?Promise.reject(J()):await Y(location.pathname,a,u)?Promise.reject(Q()):O("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:s,service_id:e,template_id:t,template_params:i}),{"Content-type":"application/json"}))},Rt=e=>{if(!e||e.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},Ft=e=>typeof e=="string"?document.querySelector(e):e,Ot=async(e,t,i,n)=>{const o=S(n),s=o.publicKey||p.publicKey,r=o.blockHeadless||p.blockHeadless,u=p.storageProvider||o.storageProvider,l={...p.blockList,...o.blockList},a={...p.limitRate,...o.limitRate};if(r&&G(navigator))return Promise.reject(K());const m=Ft(i);V(s,e,t),Rt(m);const d=new FormData(m);return W(l,d)?Promise.reject(J()):await Y(location.pathname,a,u)?Promise.reject(Q()):(d.append("lib_version","4.4.1"),d.append("service_id",e),d.append("template_id",t),d.append("user_id",s),O("/api/v1.0/email/send-form",d))},X={init:Pt,send:Nt,sendForm:Ot,EmailJSResponseStatus:g},Vt=void 0,Gt=void 0,Kt=void 0;X.init(Vt);const Wt=Ct;function Jt(){const e=document.getElementById("contact");if(!e)return;e.className="";const{hero:t,intro:i,contactInfo:n,socialLinks:o,form:s}=Wt,r=t||i,u={email:"primary",phone:"secondary",location:"purple",hours:"green"},l=Object.entries(n).map(([a,m])=>({...m,color:u[a]}));e.innerHTML=`
    <!-- CTA 히어로 -->
    ${r?Yt(r):""}

    <!-- 메인 콘텐츠 (흰색 배경) -->
    <div class="section section--white">
      <div class="section__inner">
        <div class="contact-container">
          
          <!-- 왼쪽: 연락처 정보 -->
          <div class="contact-info-panel animate-fade-in">
            <div class="contact-info-card">
              <h3 class="contact-info-card__title">연락처 정보</h3>
              
              <div class="contact-info-list">
                ${l.map(a=>`
                  <div class="contact-info-item">
                    <div class="contact-info-item__icon contact-info-item__icon--${a.color}">
                      <i class="${a.icon}"></i>
                    </div>
                    <div class="contact-info-item__content">
                      <span class="contact-info-item__label">${a.label}</span>
                      <span class="contact-info-item__value">${a.value}</span>
                    </div>
                  </div>
                `).join("")}
              </div>

              ${o?`
                <div class="contact-social">
                  <h4 class="contact-social__title">소셜 미디어</h4>
                  <div class="contact-social__links">
                    ${o.map(a=>`
                      <a href="${a.url}" target="_blank" rel="noopener noreferrer" 
                          class="contact-social__link" title="${a.platform}">
                        <i class="${a.icon}"></i>
                      </a>
                    `).join("")}
                  </div>
                </div>
              `:""}
            </div>
          </div>

          <!-- 오른쪽: 문의 폼 -->
          <div class="contact-form-panel animate-fade-in animate-delay-1">
            <div class="contact-form-card">
              <div class="contact-form-card__header">
                <h3 class="contact-form-card__title">${s.title}</h3>
                <p class="contact-form-card__desc">${s.description}</p>
              </div>

              <form id="contact-form" class="contact-form">
                <div class="contact-form__grid">
                  ${s.fields.map(a=>Qt(a)).join("")}
                </div>

                <button type="submit" class="contact-form__submit">
                  <span>${s.submit.label}</span>
                  <i class="${s.submit.icon}"></i>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,Xt(),f()}function Yt(e){return e?`
    <div class="contact-hero">
      <div class="contact-hero__bg"></div>
      <div class="contact-hero__content">
        <div class="contact-hero__icon animate-fade-in">
          <i class="${e.icon||"ri-chat-3-line"}"></i>
        </div>
        <h1 class="contact-hero__title animate-fade-in animate-delay-1">${e.title}</h1>
        <p class="contact-hero__subtitle animate-fade-in animate-delay-2">${e.subtitle}</p>
      </div>
    </div>
  `:""}function Qt(e){const t=e.type==="textarea";return`
    <div class="contact-form__group ${t?"contact-form__group--full":""}">
      <label for="${e.id}" class="contact-form__label">
        ${e.label}
        ${e.required?'<span class="contact-form__required">*</span>':""}
      </label>
      ${t?`
        <textarea
          id="${e.id}"
          class="contact-form__textarea"
          placeholder="${e.placeholder}"
          rows="5"
          ${e.required?"required":""}
        ></textarea>
      `:`
        <input
          id="${e.id}"
          type="${e.type}"
          class="contact-form__input"
          placeholder="${e.placeholder}"
          ${e.required?"required":""}
        />
      `}
      <div id="${e.id}-error" class="contact-form__error"></div>
    </div>
  `}function Xt(){const e=document.getElementById("contact-form");if(!e)return;const t=Array.from(e.querySelectorAll("input, textarea"));function i(n){const o=n.id,s=n.value.trim(),r=document.getElementById(`${o}-error`);return r&&(r.textContent="",r.classList.remove("show")),n.required&&!s?(r&&(r.textContent="필수 입력 항목입니다.",r.classList.add("show")),!1):o==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)?(r&&(r.textContent="올바른 이메일 형식을 입력해주세요.",r.classList.add("show")),!1):!0}t.forEach(n=>{n.addEventListener("blur",()=>i(n))}),e.addEventListener("submit",async n=>{if(n.preventDefault(),!t.every(i))return;const o=e.querySelector(".contact-form__submit"),s=o.innerHTML;o.disabled=!0,o.innerHTML='<i class="ri-loader-4-line spin"></i> 전송 중...';const r={name:document.getElementById("name").value,email:document.getElementById("email").value,subject:document.getElementById("subject")?.value||"",message:document.getElementById("message").value,time:zt()};try{await X.send(Gt,Kt,r),e.reset(),o.innerHTML='<i class="ri-check-line"></i> 전송 완료!',o.classList.add("success"),setTimeout(()=>{o.disabled=!1,o.innerHTML=s,o.classList.remove("success")},3e3)}catch(u){console.error("메일 전송 실패",u),o.innerHTML='<i class="ri-error-warning-line"></i> 전송 실패',o.classList.add("error"),setTimeout(()=>{o.disabled=!1,o.innerHTML=s,o.classList.remove("error")},3e3)}})}function zt(){return new Date().toLocaleString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})}const Ut=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add("visible","revealed")})},{threshold:.15});function Zt(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(e=>Ut.observe(e))}document.addEventListener("DOMContentLoaded",()=>{te(),ne(),ce(),be(),De(),at(),ze(),_t(),Jt(),Zt(),A(),de()});
