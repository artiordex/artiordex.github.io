(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}})();const z=[{id:"about",label:"자기소개",icon:"ri-user-line"},{id:"portfolio",label:"포트폴리오",icon:"ri-briefcase-line"},{id:"consulting",label:"컨설팅",icon:"ri-lightbulb-line"},{id:"company",label:"회사소개",icon:"ri-building-line"},{id:"links",label:"링크",icon:"ri-links-line"},{id:"contact",label:"연락처",icon:"ri-mail-line"}],q={sections:z},U=[{code:"ko",label:"KR",name:"한국어"},{code:"en",label:"EN",name:"English"},{code:"ja",label:"JP",name:"日本語"},{code:"vi",label:"VN",name:"Tiếng Việt"},{code:"de",label:"DE",name:"Deutsch"},{code:"es",label:"ES",name:"Español"},{code:"zh",label:"ZH",name:"中文"}],E={default:"ko",languages:U},Y={mountId:"layout-header",navListId:"header-nav-list",activeClass:"active",linkClass:"header-link",spyThreshold:.5,hideOnScrollDown:!0,scrollThreshold:100};class Z{config;sections=[];navListEl=null;headerEl=null;links=[];observer=null;lastScrollY=0;constructor(i={}){this.config={...Y,...i}}init(){this.renderSkeleton(),this.loadSections(),this.sections.length!==0&&(this.renderNav(),this.setupScrollSpy(),this.bindClickEvents(),this.bindLanguageSelector(),this.config.hideOnScrollDown&&this.setupScrollHide())}destroy(){this.observer?.disconnect(),window.removeEventListener("scroll",this.updateHeaderVisibility)}renderSkeleton(){const i=document.getElementById(this.config.mountId);if(!i){console.error(`[Header] Mount element not found: #${this.config.mountId}`);return}i.innerHTML=`
      <header id="main-header" class="header">
        <div class="header-inner">
          <div class="logo">민시우 - 디지털 전환 개발자</div>

          <nav class="header-nav">
            <ul id="${this.config.navListId}"></ul>
          </nav>

          <div class="header-lang">
            <!-- 네이티브 언어 셀렉트 (option 안에 국기 표시) -->
            <select id="lang-select" aria-label="Language selector">
              ${E.languages.map(t=>`<option value="${t.code}" data-flag="${t.code}">
                      ${t.label}
                    </option>`).join("")}
            </select>
          </div>
        </div>
      </header>
    `,this.headerEl=document.getElementById("main-header"),this.navListEl=document.getElementById(this.config.navListId)}loadSections(){try{const i=q;this.sections=i.sections??[]}catch(i){console.error("[Header] Failed to load sections",i),this.sections=[]}}renderNav(){this.navListEl&&(this.navListEl.innerHTML=this.sections.map(i=>`
        <li>
          <a href="#${i.id}"
             class="${this.config.linkClass}"
             data-section="${i.id}">
            ${i.icon?`<i class="${i.icon}"></i>`:""}
            <span>${i.label}</span>
          </a>
        </li>
      `).join(""),this.links=[...this.navListEl.querySelectorAll("a")])}bindClickEvents(){this.links.forEach(i=>{i.addEventListener("click",t=>{t.preventDefault();const o=i.dataset.section;if(!o)return;const a=document.getElementById(o);if(!a)return;const n=this.headerEl?.offsetHeight||72,s=a.offsetTop-n;window.scrollTo({top:s,behavior:"smooth"})})})}bindLanguageSelector(){const i=document.getElementById("lang-select");i&&(i.value=E.default,i.addEventListener("change",()=>{const t=i.value;let o=0;const a=setInterval(()=>{const n=document.querySelector("select.goog-te-combo");n&&(n.value=t,n.dispatchEvent(new Event("change")),clearInterval(a)),o++,o>20&&(console.warn("[Header] Google Translate select not ready"),clearInterval(a))},200)}))}setupScrollSpy(){const i=document.querySelectorAll("section[id]");i.length&&(this.observer?.disconnect(),this.observer=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&this.setActive(o.target.id)})},{threshold:this.config.spyThreshold,rootMargin:"-20% 0px -60% 0px"}),i.forEach(t=>this.observer.observe(t)))}setActive(i){this.links.forEach(t=>{t.classList.toggle(this.config.activeClass,t.dataset.section===i)})}setupScrollHide(){this.headerEl&&(this.headerEl.classList.add("header--visible"),window.addEventListener("scroll",()=>{const i=window.scrollY;if(i<=0){this.headerEl.classList.remove("header--hidden"),this.headerEl.classList.add("header--visible"),this.lastScrollY=i;return}i>this.lastScrollY?(this.headerEl.classList.add("header--hidden"),this.headerEl.classList.remove("header--visible")):(this.headerEl.classList.remove("header--hidden"),this.headerEl.classList.add("header--visible")),this.lastScrollY=i},{passive:!0}))}updateHeaderVisibility(){}}let y=null;function ee(e){return y||(y=new Z(e),y.init()),y}const ie={mountId:"layout-nav",activeClass:"active",scrollBehavior:"smooth",observerThreshold:.5};class te{config;sections=[];navListEl=null;mobileNavListEl=null;links=[];mobileLinks=[];observer=null;constructor(i={}){this.config={...ie,...i}}init(){if(console.log("[AnchorNav] Initializing..."),this.renderSkeleton(),this.loadSections(),console.log("[AnchorNav] Loaded sections:",this.sections),this.sections.length===0){console.warn("[AnchorNav] sections.json empty");return}this.renderNav(),this.bindClickEvents(),this.setupScrollSpy(),console.log("[AnchorNav] Initialization complete")}destroy(){this.observer?.disconnect(),this.observer=null,this.links=[],this.mobileLinks=[],this.sections=[]}renderSkeleton(){const i=document.getElementById(this.config.mountId);if(!i){console.error(`[AnchorNav] Mount element not found: #${this.config.mountId}`);return}i.innerHTML=`
      <!-- PC 사이드 네비게이션 (화면 우측 고정) -->
      <nav id="side-nav" class="side-nav">
        <ul id="side-nav-list"></ul>
      </nav>
      
      <!-- 모바일 하단 네비게이션 (화면 하단 고정) -->
      <nav id="mobile-nav" class="mobile-nav">
        <ul id="mobile-nav-list"></ul>
      </nav>
    `,this.navListEl=document.getElementById("side-nav-list"),this.mobileNavListEl=document.getElementById("mobile-nav-list")}loadSections(){try{const i=q;this.sections=i.sections??[]}catch(i){console.error("[AnchorNav] Failed to load sections",i),this.sections=[]}}renderNav(){this.navListEl&&(this.navListEl.innerHTML=this.sections.map(i=>`
          <li>
            <a href="#${i.id}"
               class="side-nav-link"
               data-section="${i.id}"
               aria-label="${i.label}"
               title="${i.label}">
              <i class="${i.icon}"></i>
            </a>
          </li>
        `).join(""),this.links=[...this.navListEl.querySelectorAll("a")]),this.mobileNavListEl&&(this.mobileNavListEl.innerHTML=this.sections.map(i=>`
          <li>
            <a href="#${i.id}"
               class="mobile-nav-link"
               data-section="${i.id}"
               aria-label="${i.label}">
              <i class="${i.icon}"></i>
            </a>
          </li>
        `).join(""),this.mobileLinks=[...this.mobileNavListEl.querySelectorAll("a")])}bindClickEvents(){[...this.links,...this.mobileLinks].forEach(t=>{t.addEventListener("click",o=>{o.preventDefault();const a=t.dataset.section;if(!a)return;const n=document.getElementById(a);if(!n){console.warn(`[AnchorNav] Section not found: #${a}`);return}window.scrollTo({top:n.offsetTop,behavior:this.config.scrollBehavior})})})}setupScrollSpy(){const i=document.querySelectorAll("section[id]");if(!i.length){console.warn("[AnchorNav] No sections found for scroll spy");return}this.observer?.disconnect(),this.observer=new IntersectionObserver(t=>{t.forEach(o=>{if(o.isIntersecting){const a=o.target.id;this.setActive(a)}})},{threshold:this.config.observerThreshold,rootMargin:"-80px 0px -40% 0px"}),i.forEach(t=>this.observer.observe(t))}setActive(i){[...this.links,...this.mobileLinks].forEach(o=>{const a=o.dataset.section===i;o.classList.toggle(this.config.activeClass,a)})}}let _=null;function ae(e){return _||(_=new te(e),_.init()),_}const oe=[{platform:"GitHub",url:"https://github.com/artiordex",icon:"ri-github-fill"},{platform:"Gmail",url:"mailto:artiordex@gmail.com",icon:"ri-mail-fill"},{platform:"LinkedIn",url:"https://www.linkedin.com/in/shiwoo-min-a493aa263/",icon:"ri-linkedin-fill"},{platform:"Instagram",url:"https://instagram.com/artiordex",icon:"ri-instagram-line"},{platform:"Threads",url:"https://www.threads.net/@artiordex",icon:"ri-threads-fill"},{platform:"Strava",url:"https://www.strava.com/athletes/artiordex",icon:"ri-run-line"},{platform:"YouTube",url:"https://youtube.com/@artiordex",icon:"ri-youtube-fill"},{platform:"Slack",url:"https://slack.com/artiordex-invite",icon:"ri-slack-fill"},{platform:"Discord",url:"https://discord.gg/artiordex",icon:"ri-discord-fill"}],C={socialLinks:oe},ne={mountId:"layout-footer",copyrightText:"SHIWOO MIN"},se=C;class re{config;constructor(i={}){this.config={...ne,...i}}init(){this.render()}render(){const i=document.getElementById(this.config.mountId);if(!i)return;const t=new Date().getFullYear(),o=se.socialLinks||[];i.innerHTML=`
      <footer class="footer">
        <div class="footer-inner">
          <p class="footer-copy">
            © ${t} ${this.config.copyrightText}. All rights reserved.
          </p>

          <div class="footer-social">
            ${o.map(a=>`
                <a href="${a.url}"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="${a.platform}"
                  title="${a.platform}"
                  class="social-link">
                  <i class="${a.icon}"></i>
                </a>
              `).join("")}
          </div>
        </div>
      </footer>
    `}}function le(e){const i=new re(e);return i.init(),i}function ce(){const e=document.getElementById("backToTop");if(!e)return;const i=()=>{window.scrollY>window.innerHeight?e.classList.add("visible"):e.classList.remove("visible")};window.addEventListener("scroll",i),i(),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function A(){const e=document.querySelectorAll("section[id]");let i="";e.forEach(t=>{const o=t.getBoundingClientRect();o.top<=150&&o.bottom>=150&&(i=t.id)}),document.querySelectorAll(".side-nav-link, .mobile-nav-link, .header-link").forEach(t=>{const o=t.dataset.target||t.dataset.section;t.classList.toggle("active",o===i)})}function de(){A(),window.addEventListener("scroll",A)}document.addEventListener("DOMContentLoaded",de);const j="active";let L=null,k=null,D=null;function me(){L=document.getElementById("modal"),k=document.getElementById("modal-overlay"),D=document.getElementById("modal-close"),(!L||!k)&&console.warn("modal 요소를 찾을 수 없습니다.")}function w(){L?.classList.remove(j),k?.classList.remove(j),document.body.style.overflow=""}function pe(){document.addEventListener("keydown",e=>{e.key==="Escape"&&w()}),k?.addEventListener("click",()=>w()),D?.addEventListener("click",()=>w())}document.addEventListener("DOMContentLoaded",()=>{me(),pe()});const ue=[{id:"slide-1",type:"profile_strengths",profile:{name:"민시우",title:"Full-Stack · DevOps · AI Agent Engineer",description:["AI와 자동화를 중심으로 디지털 전환을 선도하는 풀스택·AI 에이전트 엔지니어입니다.","비즈니스 목표에 맞춘 기술 전략, 안정적인 시스템 구축, 자동화 기반 운영 최적화를 통해 기업의 성장을 돕습니다."],profileImage:"/assets/images/profile.jpg",backgroundImage:"/assets/images/hero-bg.jpg"},keywords:["React","TypeScript","Node.js","Python","PostgreSQL","AWS","Docker","CI/CD","RAG","AI Agent"],strengths:[{title:"일하는 방식",description:["문제를 구조화하고 우선순위를 잡아 PoC→MVP까지 빠르게 실행합니다.","문서화·체크리스트·자동화로 반복 비용을 줄이는 방식으로 일합니다."]},{title:"문제 해결 방식",description:["현상(증상)과 원인(구조)을 분리해서 재현 가능한 형태로 정의합니다.","데이터·로그·실험으로 가설을 검증하고, 가장 저렴한 해결부터 적용합니다."]},{title:"협업 스타일",description:["기획/디자인/현업과 언어를 맞추기 위해 용어·범위·성공기준을 먼저 합의합니다.","결정사항을 문서로 남기고, 코드리뷰·리팩토링 기준을 팀의 자산으로 만듭니다."]}]},{id:"slide-2",type:"timeline_portrait",title:"주요 연혁",portraitImage:"/assets/images/portrait.jpg",timeline:[{year:"2019",title:"컴퓨터공학 기반 강화",description:["CS 기초(자료구조/알고리즘/OS/DB)를 중심으로 개발 역량을 체계화했습니다."]},{year:"2021",title:"웹·자동화 프로젝트 시작",description:["React·Node 기반의 서비스 개발과 스크립트 자동화로 생산성 개선 경험을 축적했습니다."]},{year:"2022",title:"스타트업/실무형 프로젝트 경험",description:["실사용자 요구를 기준으로 MVP를 만들고 운영 피드백을 반영하는 흐름을 익혔습니다."]},{year:"2023",title:"풀스택·DX 실전 적용",description:["업무 시스템 구축, 레거시 커스터마이징, 배포/운영 체계 개선을 수행했습니다."]},{year:"2024",title:"리딩 및 고도화 중심",description:["설계 표준화, 코드 품질, 자동화 파이프라인 구축으로 팀 생산성을 끌어올렸습니다."]},{year:"2025",title:"AI Agent 기반 확장",description:["RAG·워크플로우·에이전트 오케스트레이션을 결합해 업무/서비스 자동화를 고도화 중입니다."]}]},{id:"slide-3",type:"core_competency",title:"자기소개서 핵심역량",competencies:[{name:"문제 해결 및 분석 능력",summary:"복잡한 시스템 이슈를 재현→원인분리→실험검증 흐름으로 해결합니다.",evidence:["레거시 병목 지점 식별을 위한 로그/지표 기반 분석","DB 인덱싱·쿼리 튜닝·캐시 적용으로 응답시간 개선","프로파일링 기반 리팩토링으로 안정성 강화"],result:"→ 장애/지연 원인을 구조적으로 제거하고 운영 비용을 절감합니다."},{name:"DX·자동화 설계 역량",summary:"반복 업무를 시스템으로 바꿔 사람의 시간을 되찾게 만듭니다.",evidence:["업무 프로세스 분석 및 자동화 후보/ROI 도출","스크립트·RPA·워크플로우 기반 자동 실행 체계 구축","문서/지식 아카이빙으로 운영 표준화"],result:"→ 반복 업무 시간을 크게 줄이고 핵심 업무 집중도를 높입니다."},{name:"풀스택 구현력",summary:"FE·BE·DB·배포까지 한 흐름으로 설계하고 끝까지 완성합니다.",evidence:["React/TS 기반 UI 개발 및 상태/라우팅 구조 설계","Node/Nest/FastAPI 기반 API 설계와 인증·권한 구현","PostgreSQL 중심 데이터 모델링 및 마이그레이션 운영"],result:"→ PoC에서 MVP까지 빠르게 연결되는 구현 속도를 제공합니다."},{name:"DevOps & 운영 최적화",summary:"배포와 운영을 자동화해 안정성과 속도를 동시에 확보합니다.",evidence:["CI/CD 파이프라인 구축 및 배포 자동화","컨테이너 기반 환경 통일(Docker) 및 IaC(Terraform) 적용","모니터링/알림/장애 대응 루프 정착"],result:"→ 배포 리스크를 줄이고 운영 신뢰도를 끌어올립니다."}],summaryKeywords:["문제해결","자동화","DX","풀스택","운영최적화","문서화","실험검증","아키텍처"],brandingQuote:{lines:["기술과 비즈니스를 연결해","반복을 자동화하고 성장을 가속하는"],highlight:"빌더형 엔지니어"}},{id:"slide-4",type:"education_certifications",title:"학력 · 자격",education:[{degree:"컴퓨터공학",school:"대학교/기관명 입력",period:"2019-2023"},{degree:"추가 과정/부전공",school:"지식재산학 / 경영학 / 데이터통계학",period:"—"}],certifications:[{name:"AWS Solutions Architect – Associate",issuer:"Amazon Web Services",year:2023},{name:"Google Cloud Professional Cloud Architect",issuer:"Google Cloud",year:2023},{name:"Certified Kubernetes Administrator (CKA)",issuer:"Linux Foundation",year:2022},{name:"Docker Certified Associate (DCA)",issuer:"Docker, Inc.",year:2022},{name:"Terraform Associate",issuer:"HashiCorp",year:2023},{name:"AWS Cloud Practitioner",issuer:"Amazon Web Services",year:2021},{name:"Google IT Automation with Python",issuer:"Google",year:2021},{name:"Linux Essentials",issuer:"Linux Professional Institute (LPI)",year:2020}]},{id:"slide-5",type:"persona",title:"My Persona",header:{name:"민시우 (Shiwoo Min)",bio:"DX·자동화·풀스택 기반으로 문제를 구조화하고 빠르게 해결하는 빌더형 창업자입니다. PoC→MVP 실행력이 강하며, 시스템 설계·지식 아카이브·과몰입 학습이 강점입니다."},badges:[{label:"FE 35%",key:"fe"},{label:"BE 30%",key:"be"},{label:"AI 25%",key:"ai"},{label:"DevOps 10%",key:"devops"}],tools:["ri-notion-fill","ri-github-fill","ri-terminal-line","ri-cloud-line","ri-code-s-slash-line"],table:[{k:"Name",v:"민시우 (Shiwoo Min)"},{k:"Gender",v:"여성"},{k:"Age Group",v:"20대 후반 ~ 30대 초반"},{k:"Location",v:"경기도 광명시"},{k:"Income",v:"연 3,000만 ~ 5,000만 원"},{k:"Position",v:"Founder / CTO / Lead Developer"},{k:"Occupation",v:"시스템SW 엔지니어링 (IT Solution / DX)"},{k:"Affiliation",v:"아티올덱스 (Artioldex, 1인 창업 기업)"},{k:"Department",v:"DX혁신개발팀"},{k:"Role",v:"전략적 기술 설계 · 자동화 · 풀스택 개발 · 시스템 구축"},{k:"Years of Experience",v:"7년"},{k:"Major",v:"컴퓨터공학 / 지식재산학 / 경영학 / 데이터통계학"},{k:"Languages",v:"한국어, 영어, 일본어, 독일어"},{k:"Hobbies",v:"코딩, 자격증, 강의 청강, 독서·논문 탐독, 라이딩·하이킹"},{k:"Learning Style",v:"과몰입형 학습, 심야·새벽 집중, 실험·문서 기반 학습"},{k:"Work Style",v:"혼자도 구조 전체 설계 가능, 몰입 시간을 성과로 전환"},{k:"Knowledge Management",v:"Notion 70% / GitHub 30% 아카이브"},{k:"Favorite Tools",v:"OpenAI, Vercel, Supabase, GitHub, JetBrains, Figma, Notion, AWS, GCP"}],cards:[{title:"Goals & Needs",icon:"ri-target-line",items:["DX 기반 서비스·솔루션 구축","빠른 실험/검증","T-Shaped 확장","SaaS 포트폴리오 구축"]},{title:"Pain Points",icon:"ri-emotion-unhappy-line",items:["1인 창업 과부하","완벽주의 압박","병렬 작업 피로","맡길 인재 부족"]},{title:"Ideal Experience",icon:"ri-heart-line",items:["PoC→MVP가 빠른 구조","반복 업무 자동화 환경","지식이 자산으로 누적되는 시스템","운영이 예측 가능한 파이프라인"]},{title:"Ideal Team Culture",icon:"ri-team-line",items:["실행 중심","방해 없는 깊은 집중","기술·전략 동반 성장","문서화·기준이 살아있는 팀"]}]},{id:"slide-6",type:"summary",title:"자기소개서 요약",sections:[{title:"나는 어떤 사람인가",text:"DX와 자동화를 중심으로 문제를 구조화하고 빠르게 실행하는 엔지니어입니다. 실험과 문서를 기반으로 학습 속도가 빠르고, 만든 것을 운영 가능한 시스템으로 완성하는 데 강점이 있습니다."},{title:"어떤 문제를 해결하는가",text:"반복 업무, 데이터 단절, 운영 불안정 같은 조직의 마찰 비용을 줄입니다. 업무 흐름을 시스템화하고 지표를 만들며, 배포/운영을 자동화해 안정적으로 성장하는 구조를 설계합니다."},{title:"어떤 방식으로 실행하는가",text:"가설을 세우고 빠르게 PoC로 검증한 뒤 MVP를 구현합니다. 코드 품질과 운영 관점(모니터링·알림·문서화·자동화)을 함께 가져가며, 개선 루프를 통해 고도화합니다."}]}],he={slides:ue},T=he,P=C;function ge(){const e=document.getElementById("about");if(!e)return;const i=Array.isArray(T.slides)?T.slides:[],t=Array.isArray(P.socialLinks)?P.socialLinks:[];if(i.length===0){e.innerHTML="";return}e.innerHTML=`
    <section class="section hero-carousel" id="about-carousel">
      <div class="carousel-container" id="carousel-container">
        ${i.map((o,a)=>ve(o,a,t)).join("")}
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
        ${i.map((o,a)=>`<div class="indicator ${a===0?"active":""}" data-slide="${a}" role="button" aria-label="슬라이드 ${a+1}"></div>`).join("")}
      </div>
    </section>
  `,Ae()}function ve(e,i,t){const o=i===0?e?.profile?.backgroundImage??e?.backgroundImage??"":"",a=i===0&&o?`style="background-image:url('${h(o)}')"`:"";return`
    <div class="carousel-slide ${i===0?"first-slide":""}" data-slide-id="${h(e.id)}" ${a}>
      <div class="hero-inner">
        ${be(e,t)}
      </div>
    </div>
  `}function be(e,i){switch(e.type){case"profile_strengths":return fe(e,i);case"timeline_portrait":return ye(e);case"core_competency":return _e(e);case"education_certifications":return ke(e);case"persona":return we(e);case"summary":return $e(e);default:return'<div style="grid-column:1/-1;">Unsupported slide type</div>'}}function fe(e,i){const t=e.profile??{},o=Array.isArray(e.keywords)?e.keywords:[],a=Array.isArray(e.strengths)?e.strengths:[],n=Array.isArray(t.description)?t.description:typeof t.description=="string"?[t.description]:[],s=["hero-tag--primary","hero-tag--secondary","hero-tag--purple","hero-tag--green"],m=i.map(c=>{const l=String(c.url??""),d=/^https?:\/\//i.test(l)?'target="_blank" rel="noopener noreferrer"':'rel="noopener noreferrer"';return`
        <a href="${h(l)}"
           ${d}
           aria-label="${h(c.platform??"")}"
           title="${h(c.platform??"")}">
          <i class="${h(c.icon??"")}"></i>
        </a>
      `}).join("");return`
    <!-- 좌: 프로필 / 우: 강점 -->
    <div id="profile-section">
      <div class="hero-avatar">
        <img
          src="${h(t.profileImage??"")}"
          alt="${h(t.name??"프로필")} 사진"
          class="hero-avatar__image"
        />
      </div>

      <h1 class="hero-title">${r(t.name??"")}</h1>
      <p class="hero-subtitle">${r(t.title??"")}</p>

      <div class="hero-description">
        ${n.map(c=>`<p>${r(c)}</p>`).join("")}
      </div>

      <div class="hero-tags" id="profile-highlights">
        ${o.map((c,l)=>`<span class="hero-tag ${s[l%4]}">${r(c)}</span>`).join("")}
      </div>

      <div class="hero-socials" id="social-links">
        ${m}
      </div>
    </div>

    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">성격 & 강점</h3>

      <!-- strengths는 기존 progress-bar 대신 텍스트 카드로 표시 -->
      <div class="strengths-list">
        ${a.map(c=>`
            <div class="strength-item" style="margin-bottom:1.25rem;">
              <div style="font-weight:700; margin-bottom:0.5rem;">${r(c.title??"")}</div>
              <div style="color:inherit; line-height:1.7;">
                ${(Array.isArray(c.description)?c.description:[]).map(l=>`<div>• ${r(l)}</div>`).join("")}
              </div>
            </div>
          `).join("")}
      </div>
    </div>
  `}function ye(e){const i=e.title??"주요 연혁",t=e.portraitImage??"",o=Array.isArray(e.timeline)?e.timeline:[];return`
    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">${r(i)}</h3>

      <div class="timeline-list" style="display:flex; flex-direction:column; gap:1rem;">
        ${o.map(a=>`
            <div class="timeline-item" style="padding:0.75rem 0; border-bottom:1px solid rgba(0,0,0,0.06);">
              <div style="font-weight:800; margin-bottom:0.25rem;">${r(a.year??"")}</div>
              <div style="font-weight:700; margin-bottom:0.4rem;">${r(a.title??"")}</div>
              <div style="line-height:1.7;">
                ${(Array.isArray(a.description)?a.description:[]).map(n=>`<div>${r(n)}</div>`).join("")}
              </div>
            </div>
          `).join("")}
      </div>
    </div>

    <div class="hero-skills-card" style="display:flex; align-items:center; justify-content:center;">
      <img
        src="${h(t)}"
        alt="${h(String(i))} 인물 이미지"
        style="width:100%; max-width:420px; border-radius:16px; display:block;"
      />
    </div>
  `}function _e(e){const i=e.title??"자기소개서 핵심역량",t=Array.isArray(e.competencies)?e.competencies:[],o=Array.isArray(e.summaryKeywords)?e.summaryKeywords:[],a=e.brandingQuote??null;return`
    <div class="hero-skills-card" style="grid-column:1/-1;">
      <h3 class="hero-skills-card__title">${r(i)}</h3>

      <div class="competency-list" style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
        ${t.map(n=>`
            <div class="competency-item" style="border:1px solid rgba(0,0,0,0.06); border-radius:16px; padding:1rem;">
              <div style="font-weight:800; margin-bottom:0.5rem;">${r(n.name??"")}</div>
              <div style="opacity:0.9; line-height:1.7; margin-bottom:0.75rem;">${r(n.summary??"")}</div>
              <div style="line-height:1.7; margin-bottom:0.75rem;">
                ${(Array.isArray(n.evidence)?n.evidence:[]).map(s=>`<div>• ${r(s)}</div>`).join("")}
              </div>
              <div style="font-weight:700;">${r(n.result??"")}</div>
            </div>
          `).join("")}
      </div>

      ${o.length?`
        <div style="margin-top:1.5rem;">
          <div style="font-weight:700; margin-bottom:0.75rem;">핵심 키워드</div>
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
            ${o.map(n=>`<span class="hero-tag hero-tag--primary">${r(n)}</span>`).join("")}
          </div>
        </div>
      `:""}

      ${a?`
        <div style="margin-top:1.5rem; padding-top:1.25rem; border-top:1px solid rgba(0,0,0,0.06);">
          <div style="line-height:1.8;">
            ${(Array.isArray(a.lines)?a.lines:[]).map(n=>`<div>${r(n)}</div>`).join("")}
            <div style="font-weight:900; margin-top:0.5rem;">${r(a.highlight??"")}</div>
          </div>
        </div>
      `:""}
    </div>
  `}function ke(e){const i=e.title??"학력 · 자격",t=Array.isArray(e.education)?e.education:[],o=Array.isArray(e.certifications)?e.certifications:[];return`
    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">${r(i)} - 학력</h3>

      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        ${t.map(a=>`
            <div style="padding:0.75rem 0; border-bottom:1px solid rgba(0,0,0,0.06);">
              <div style="font-weight:800;">${r(a.degree??"")}</div>
              <div style="opacity:0.9;">${r(a.school??"")}</div>
              <div style="opacity:0.7; font-size:0.9rem;">${r(a.period??"")}</div>
            </div>
          `).join("")}
      </div>
    </div>

    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">${r(i)} - 자격</h3>

      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        ${o.map(a=>`
            <div style="display:flex; gap:0.75rem; align-items:flex-start; padding:0.75rem 0; border-bottom:1px solid rgba(0,0,0,0.06);">
              <i class="ri-award-line" style="margin-top:2px;"></i>
              <div>
                <div style="font-weight:800;">${r(a.name??"")}</div>
                <div style="opacity:0.85;">${r(a.issuer??"")} · ${r(a.year??"")}</div>
              </div>
            </div>
          `).join("")}
      </div>
    </div>
  `}function we(e){const i=e.header??{},t=Array.isArray(e.badges)?e.badges:[],o=Array.isArray(e.tools)?e.tools:[],a=Array.isArray(e.table)?e.table:[],n=Array.isArray(e.cards)?e.cards:[];return`
    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">${r(e.title??"My Persona")}</h3>

      <div style="font-weight:900; font-size:1.4rem; margin-bottom:0.5rem;">
        ${r(i.name??"")}
      </div>
      <div style="line-height:1.8; opacity:0.9; margin-bottom:1rem;">
        ${r(i.bio??"")}
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
        ${t.map(s=>`<span class="hero-tag hero-tag--primary">${r(s.label??"")}</span>`).join("")}
      </div>

      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        ${o.map(s=>`<span title="${h(s)}"><i class="${h(s)}"></i></span>`).join("")}
      </div>
    </div>

    <div class="hero-skills-card">
      <h3 class="hero-skills-card__title">Profile Table</h3>

      <table style="width:100%; border-collapse:collapse;">
        ${a.map(s=>`
            <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
              <td style="padding:0.6rem 0; font-weight:800; width:34%;">${r(s.k??"")}</td>
              <td style="padding:0.6rem 0; opacity:0.9;">${r(s.v??"")}</td>
            </tr>
          `).join("")}
      </table>

      ${n.length?`
        <div style="margin-top:1.25rem; display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          ${n.map(s=>`
              <div style="border:1px solid rgba(0,0,0,0.06); border-radius:16px; padding:1rem;">
                <div style="display:flex; align-items:center; gap:0.5rem; font-weight:900; margin-bottom:0.5rem;">
                  <i class="${h(s.icon??"")}"></i>
                  <span>${r(s.title??"")}</span>
                </div>
                <div style="line-height:1.7;">
                  ${(Array.isArray(s.items)?s.items:[]).map(m=>`<div>• ${r(m)}</div>`).join("")}
                </div>
              </div>
            `).join("")}
        </div>
      `:""}
    </div>
  `}function $e(e){const i=Array.isArray(e.sections)?e.sections:[];return`
    <div class="hero-skills-card" style="grid-column:1/-1;">
      <h3 class="hero-skills-card__title">${r(e.title??"자기소개서 요약")}</h3>

      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        ${i.map(t=>`
            <div>
              <div style="font-weight:900; margin-bottom:0.35rem;">${r(t.title??"")}</div>
              <div style="line-height:1.8; opacity:0.9;">${r(t.text??"")}</div>
            </div>
          `).join("")}
      </div>
    </div>
  `}function Ae(){const e=document.getElementById("about-carousel");if(!e)return;const i=e.querySelector("#carousel-container"),t=Array.from(e.querySelectorAll(".carousel-slide")),o=Array.from(e.querySelectorAll(".indicator")),a=e.querySelector("#prev-btn"),n=e.querySelector("#next-btn");if(!i||t.length===0||!a||!n)return;let s=0;const m=()=>{i.style.transform=`translateX(${-s*100}%)`,o.forEach((d,b)=>d.classList.toggle("active",b===s))},c=d=>{s=Math.max(0,Math.min(d,t.length-1)),m()},l=()=>c((s+1)%t.length),p=()=>c((s-1+t.length)%t.length);n.addEventListener("click",l),a.addEventListener("click",p),o.forEach((d,b)=>{d.addEventListener("click",()=>c(b))}),document.addEventListener("keydown",d=>{d.key==="ArrowLeft"&&p(),d.key==="ArrowRight"&&l()}),m()}function r(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function h(e){return r(e).replaceAll(`
`," ").replaceAll("\r"," ")}const Le={title:"혁신적인 디지털 전환 포트폴리오",subtitle:"성공적인 프로젝트를 통해 입증된 우리의 전문성과 창의성을 확인해보세요"},Ie=[{id:"all",label:"전체"},{id:"web",label:"웹 개발"},{id:"mobile",label:"모바일 앱"},{id:"ai",label:"AI/ML"},{id:"iot",label:"IoT"},{id:"fintech",label:"핀테크"}],Se=[{id:"proj001",category:"web",title:"스마트 이커머스 플랫폼",summary:"AI 기반 상품 추천 시스템을 도입한 차세대 온라인 쇼핑몰",thumbnail:"https://readdy.ai/api/search-image?query=modern%20e-commerce%20platform%20interface%20with%20clean%20design%20shopping%20cart%20and%20product%20displays%20on%20white%20background%20minimalist%20style&width=400&height=300&seq=proj001&orientation=landscape",icon:"ri-shopping-cart-line",tags:["React","Node.js","MongoDB"],badges:[{label:"혁신적",color:"blue"},{label:"사용자 친화적",color:"green"}],modalImage:"https://readdy.ai/api/search-image?query=modern%20e-commerce%20platform%20interface&width=800&height=600&seq=proj001",description:"AI 기반 상품 추천 알고리즘과 개인화된 쇼핑 경험을 제공하는 차세대 이커머스 플랫폼입니다.",features:["AI 상품 추천","실시간 재고 관리","다국어 지원","반응형 디자인"],techStack:["React","Node.js","MongoDB","Redis","AWS"]},{id:"proj002",category:"mobile",title:"디지털 뱅킹 솔루션",summary:"생체인증과 블록체인 기술을 활용한 안전한 모바일 뱅킹 앱",thumbnail:"https://readdy.ai/api/search-image?query=mobile%20banking%20application%20interface%20with%20financial%20charts%20and%20secure%20payment%20features%20clean%20modern%20design%20white%20background&width=400&height=300&seq=proj002&orientation=landscape",icon:"ri-bank-line",tags:["Flutter","Blockchain","Firebase"],badges:[{label:"보안 중심",color:"red"},{label:"신뢰성",color:"blue"}],modalImage:"https://readdy.ai/api/search-image?query=mobile%20banking%20application%20interface&width=800&height=600&seq=proj002",description:"생체인증과 블록체인 기술을 결합한 차세대 모바일 뱅킹 솔루션입니다.",features:["생체인증 로그인","블록체인 거래","실시간 알림","다중 계좌 관리"],techStack:["Flutter","Dart","Firebase","Blockchain","Biometric API"]},{id:"proj003",category:"web",title:"의료진 관리 시스템",summary:"병원 내 환자 정보와 진료 일정을 통합 관리하는 클라우드 시스템",thumbnail:"https://readdy.ai/api/search-image?query=healthcare%20management%20system%20dashboard%20with%20patient%20data%20medical%20charts%20and%20appointment%20scheduling%20clean%20white%20interface&width=400&height=300&seq=proj003&orientation=landscape",icon:"ri-hospital-line",tags:["Vue.js","Python","PostgreSQL"],badges:[{label:"효율적",color:"green"},{label:"전문적",color:"purple"}],modalImage:"https://readdy.ai/api/search-image?query=healthcare%20management%20system%20dashboard&width=800&height=600&seq=proj003",description:"병원 운영 효율을 극대화하는 통합 의료 관리 시스템입니다.",features:["환자 정보 관리","진료 일정 관리","전자 처방전","통계 대시보드"],techStack:["Vue.js","Python","Django","PostgreSQL","Docker"]},{id:"proj004",category:"ai",title:"온라인 학습 플랫폼",summary:"개인 맞춤형 학습 경로를 제공하는 AI 기반 교육 솔루션",thumbnail:"https://readdy.ai/api/search-image?query=educational%20learning%20platform%20with%20interactive%20courses%20video%20lessons%20and%20progress%20tracking%20modern%20interface%20white%20background&width=400&height=300&seq=proj004&orientation=landscape",icon:"ri-graduation-cap-line",tags:["Angular","Machine Learning","AWS"],badges:[{label:"창의적",color:"yellow"},{label:"맞춤형",color:"green"}],modalImage:"https://readdy.ai/api/search-image?query=educational%20learning%20platform&width=800&height=600&seq=proj004",description:"AI가 학습자의 수준과 성향을 분석하여 최적의 학습 경로를 제시합니다.",features:["AI 학습 추천","실시간 진도 추적","인터랙티브 퀴즈","화상 강의"],techStack:["Angular","TensorFlow","Python","AWS","WebRTC"]},{id:"proj005",category:"iot",title:"스마트 물류 관리",summary:"IoT 센서와 GPS를 활용한 실시간 배송 추적 시스템",thumbnail:"https://readdy.ai/api/search-image?query=logistics%20tracking%20system%20with%20delivery%20routes%20warehouse%20management%20and%20real-time%20monitoring%20dashboard%20clean%20interface&width=400&height=300&seq=proj005&orientation=landscape",icon:"ri-truck-line",tags:["IoT","Spring Boot","Redis"],badges:[{label:"실시간",color:"blue"},{label:"정확성",color:"orange"}],modalImage:"https://readdy.ai/api/search-image?query=logistics%20tracking%20system&width=800&height=600&seq=proj005",description:"IoT 기술을 활용한 실시간 물류 추적 및 최적화 시스템입니다.",features:["실시간 GPS 추적","창고 관리","배송 최적화","알림 시스템"],techStack:["Spring Boot","Redis","MQTT","React","Google Maps API"]},{id:"proj006",category:"web",title:"소셜 미디어 관리 도구",summary:"다중 플랫폼 콘텐츠 관리와 분석을 위한 통합 솔루션",thumbnail:"https://readdy.ai/api/search-image?query=social%20media%20management%20dashboard%20with%20analytics%20engagement%20metrics%20and%20content%20scheduling%20tools%20modern%20clean%20interface&width=400&height=300&seq=proj006&orientation=landscape",icon:"ri-share-line",tags:["React Native","GraphQL","Docker"],badges:[{label:"트렌디",color:"pink"},{label:"통합적",color:"blue"}],modalImage:"https://readdy.ai/api/search-image?query=social%20media%20management%20dashboard&width=800&height=600&seq=proj006",description:"여러 소셜 미디어 플랫폼을 한 곳에서 관리하는 통합 솔루션입니다.",features:["다중 플랫폼 관리","콘텐츠 예약","분석 대시보드","팀 협업"],techStack:["React Native","GraphQL","Node.js","Docker","PostgreSQL"]},{id:"proj007",category:"web",title:"부동산 투자 플랫폼",summary:"VR 기술을 활용한 가상 부동산 투어와 투자 분석 서비스",thumbnail:"https://readdy.ai/api/search-image?query=real%20estate%20property%20management%20system%20with%20virtual%20tours%20property%20listings%20and%20investment%20analytics%20clean%20modern%20interface&width=400&height=300&seq=proj007&orientation=landscape",icon:"ri-building-line",tags:["VR/AR","Django","MySQL"],badges:[{label:"몰입감",color:"purple"},{label:"투자 지향",color:"green"}],modalImage:"https://readdy.ai/api/search-image?query=real%20estate%20property%20management%20system&width=800&height=600&seq=proj007",description:"VR 기술로 현장 방문 없이 부동산을 체험할 수 있는 혁신적인 플랫폼입니다.",features:["VR 부동산 투어","투자 분석","시장 동향","계약 관리"],techStack:["Three.js","Django","MySQL","WebXR","React"]},{id:"proj008",category:"mobile",title:"AI 피트니스 트레이너",summary:"개인별 운동 패턴 분석과 맞춤형 운동 계획을 제공하는 앱",thumbnail:"https://readdy.ai/api/search-image?query=fitness%20tracking%20application%20with%20workout%20plans%20health%20metrics%20and%20progress%20monitoring%20clean%20sports%20interface%20white%20background&width=400&height=300&seq=proj008&orientation=landscape",icon:"ri-heart-pulse-line",tags:["Swift","CoreML","HealthKit"],badges:[{label:"건강 중심",color:"green"},{label:"동기 부여",color:"orange"}],modalImage:"https://readdy.ai/api/search-image?query=fitness%20tracking%20application&width=800&height=600&seq=proj008",description:"AI가 사용자의 운동 패턴을 분석하여 최적의 운동 계획을 제시합니다.",features:["AI 운동 추천","건강 데이터 분석","운동 기록","목표 설정"],techStack:["Swift","CoreML","HealthKit","Firebase","TensorFlow Lite"]},{id:"proj009",category:"mobile",title:"스마트 푸드 딜리버리",summary:"AI 추천 알고리즘과 실시간 배송 최적화를 적용한 음식 배달 서비스",thumbnail:"https://readdy.ai/api/search-image?query=food%20delivery%20application%20with%20restaurant%20listings%20menu%20browsing%20and%20order%20tracking%20modern%20clean%20interface%20white%20background&width=400&height=300&seq=proj009&orientation=landscape",icon:"ri-restaurant-line",tags:["Kotlin","Microservices","Kafka"],badges:[{label:"편리함",color:"yellow"},{label:"신속함",color:"red"}],modalImage:"https://readdy.ai/api/search-image?query=food%20delivery%20application&width=800&height=600&seq=proj009",description:"AI 기반 음식 추천과 실시간 배송 추적이 가능한 푸드 딜리버리 앱입니다.",features:["AI 음식 추천","실시간 배송 추적","간편 결제","리뷰 시스템"],techStack:["Kotlin","Spring Boot","Kafka","Redis","PostgreSQL"]},{id:"proj010",category:"web",title:"통합 여행 예약 시스템",summary:"항공편, 숙박, 액티비티를 한 번에 예약할 수 있는 원스톱 여행 서비스",thumbnail:"https://readdy.ai/api/search-image?query=travel%20booking%20platform%20with%20destination%20search%20flight%20booking%20and%20hotel%20reservations%20clean%20modern%20interface%20white%20background&width=400&height=300&seq=proj010&orientation=landscape",icon:"ri-plane-line",tags:["Next.js","Stripe","Elasticsearch"],badges:[{label:"편의성",color:"blue"},{label:"통합적",color:"purple"}],modalImage:"https://readdy.ai/api/search-image?query=travel%20booking%20platform&width=800&height=600&seq=proj010",description:"항공, 숙박, 액티비티를 한 번에 예약하는 올인원 여행 플랫폼입니다.",features:["통합 검색","실시간 예약","여행 일정 관리","리뷰 시스템"],techStack:["Next.js","Stripe","Elasticsearch","PostgreSQL","Redis"]},{id:"proj011",category:"fintech",title:"암호화폐 거래소",summary:"고급 보안과 실시간 차트 분석을 제공하는 디지털 자산 거래 플랫폼",thumbnail:"https://readdy.ai/api/search-image?query=cryptocurrency%20trading%20platform%20with%20market%20charts%20portfolio%20management%20and%20secure%20wallet%20features%20modern%20financial%20interface&width=400&height=300&seq=proj011&orientation=landscape",icon:"ri-currency-line",tags:["WebSocket","Rust","Kubernetes"],badges:[{label:"보안성",color:"red"},{label:"고성능",color:"green"}],modalImage:"https://readdy.ai/api/search-image?query=cryptocurrency%20trading%20platform&width=800&height=600&seq=proj011",description:"고급 보안과 실시간 거래를 지원하는 암호화폐 거래 플랫폼입니다.",features:["실시간 거래","고급 차트","지갑 관리","2FA 보안"],techStack:["Rust","WebSocket","Kubernetes","Redis","PostgreSQL"]},{id:"proj012",category:"iot",title:"스마트 홈 컨트롤러",summary:"음성 인식과 AI 학습을 통한 지능형 가정 자동화 시스템",thumbnail:"https://readdy.ai/api/search-image?query=smart%20home%20automation%20system%20with%20device%20control%20energy%20monitoring%20and%20security%20features%20modern%20IoT%20interface%20white%20background&width=400&height=300&seq=proj012&orientation=landscape",icon:"ri-home-wifi-line",tags:["Raspberry Pi","MQTT","TensorFlow"],badges:[{label:"지능적",color:"blue"},{label:"에너지 절약",color:"green"}],modalImage:"https://readdy.ai/api/search-image?query=smart%20home%20automation%20system&width=800&height=600&seq=proj012",description:"AI가 생활 패턴을 학습하여 자동으로 가정 환경을 제어합니다.",features:["음성 제어","자동화 규칙","에너지 모니터링","보안 시스템"],techStack:["Raspberry Pi","MQTT","TensorFlow","React Native","Node.js"]},{id:"proj013",category:"web",title:"라이브 스트리밍 플랫폼",summary:"실시간 방송과 인터랙티브 기능을 제공하는 차세대 미디어 서비스",thumbnail:"https://readdy.ai/api/search-image?query=video%20streaming%20platform%20with%20live%20broadcasts%20content%20library%20and%20interactive%20features%20modern%20entertainment%20interface%20white%20background&width=400&height=300&seq=proj013&orientation=landscape",icon:"ri-live-line",tags:["WebRTC","FFmpeg","CDN"],badges:[{label:"실시간",color:"red"},{label:"인터랙티브",color:"purple"}],modalImage:"https://readdy.ai/api/search-image?query=video%20streaming%20platform&width=800&height=600&seq=proj013",description:"저지연 실시간 스트리밍과 채팅을 지원하는 미디어 플랫폼입니다.",features:["실시간 스트리밍","라이브 채팅","화질 선택","녹화 기능"],techStack:["WebRTC","FFmpeg","Node.js","Redis","CDN"]},{id:"proj014",category:"web",title:"프로젝트 관리 도구",summary:"팀 협업과 일정 관리를 위한 통합 워크스페이스 솔루션",thumbnail:"https://readdy.ai/api/search-image?query=project%20management%20dashboard%20with%20task%20tracking%20team%20collaboration%20and%20timeline%20visualization%20clean%20business%20interface%20white%20background&width=400&height=300&seq=proj014&orientation=landscape",icon:"ri-team-line",tags:["Svelte","Socket.io","MongoDB"],badges:[{label:"협업 중심",color:"blue"},{label:"생산성",color:"green"}],modalImage:"https://readdy.ai/api/search-image?query=project%20management%20dashboard&width=800&height=600&seq=proj014",description:"팀 협업을 위한 올인원 프로젝트 관리 솔루션입니다.",features:["칸반 보드","간트 차트","실시간 협업","타임 트래킹"],techStack:["Svelte","Socket.io","MongoDB","Node.js","Redis"]},{id:"proj015",category:"iot",title:"스마트 농업 모니터링",summary:"드론과 센서를 활용한 정밀 농업 관리 및 작물 분석 시스템",thumbnail:"https://readdy.ai/api/search-image?query=agriculture%20monitoring%20system%20with%20crop%20analysis%20weather%20data%20and%20farming%20automation%20tools%20clean%20agricultural%20interface%20white%20background&width=400&height=300&seq=proj015&orientation=landscape",icon:"ri-plant-line",tags:["Computer Vision","Drone API","Weather API"],badges:[{label:"지속가능",color:"green"},{label:"혁신적",color:"yellow"}],modalImage:"https://readdy.ai/api/search-image?query=agriculture%20monitoring%20system&width=800&height=600&seq=proj015",description:"IoT와 AI를 결합한 스마트 농업 관리 시스템입니다.",features:["드론 모니터링","토양 분석","날씨 예측","자동 관개"],techStack:["Python","TensorFlow","MQTT","React","PostgreSQL"]},{id:"proj016",category:"ai",title:"AI 음악 스트리밍",summary:"개인 취향 분석과 감정 기반 음악 추천을 제공하는 스마트 플레이어",thumbnail:"https://readdy.ai/api/search-image?query=music%20streaming%20application%20with%20playlist%20creation%20audio%20visualization%20and%20social%20sharing%20features%20modern%20entertainment%20interface%20white%20background&width=400&height=300&seq=proj016&orientation=landscape",icon:"ri-music-line",tags:["Web Audio API","Spotify API","ML.js"],badges:[{label:"감성적",color:"purple"},{label:"개인화",color:"pink"}],modalImage:"https://readdy.ai/api/search-image?query=music%20streaming%20application&width=800&height=600&seq=proj016",description:"AI가 감정과 상황에 맞는 음악을 추천하는 스트리밍 서비스입니다.",features:["AI 음악 추천","플레이리스트 생성","감정 분석","소셜 공유"],techStack:["React","Web Audio API","TensorFlow.js","Node.js","MongoDB"]},{id:"proj017",category:"web",title:"지능형 재고 관리",summary:"RFID와 바코드 스캔을 통한 실시간 재고 추적 및 예측 시스템",thumbnail:"https://readdy.ai/api/search-image?query=inventory%20management%20system%20with%20barcode%20scanning%20stock%20tracking%20and%20warehouse%20optimization%20clean%20business%20interface%20white%20background&width=400&height=300&seq=proj017&orientation=landscape",icon:"ri-archive-line",tags:["RFID","Barcode Scanner","Predictive Analytics"],badges:[{label:"정확성",color:"blue"},{label:"효율성",color:"green"}],modalImage:"https://readdy.ai/api/search-image?query=inventory%20management%20system&width=800&height=600&seq=proj017",description:"AI 기반 재고 예측과 자동 발주를 지원하는 재고 관리 시스템입니다.",features:["실시간 재고 추적","자동 발주","재고 예측","리포트 생성"],techStack:["React","Python","PostgreSQL","Redis","TensorFlow"]},{id:"proj018",category:"ai",title:"VR 직업 훈련 시뮬레이터",summary:"위험한 작업 환경을 안전하게 체험할 수 있는 가상현실 교육 플랫폼",thumbnail:"https://readdy.ai/api/search-image?query=virtual%20reality%20training%20simulation%20with%20immersive%20learning%20environments%20and%20skill%20assessment%20tools%20modern%20VR%20interface%20white%20background&width=400&height=300&seq=proj018&orientation=landscape",icon:"ri-vr-box-line",tags:["Unity 3D","Oculus SDK","Physics Engine"],badges:[{label:"몰입형",color:"purple"},{label:"안전성",color:"orange"}],modalImage:"https://readdy.ai/api/search-image?query=virtual%20reality%20training%20simulation&width=800&height=600&seq=proj018",description:"VR 기술을 활용한 안전한 직업 훈련 시뮬레이터입니다.",features:["VR 시뮬레이션","실시간 피드백","진행도 추적","멀티플레이어"],techStack:["Unity 3D","C#","Oculus SDK","Photon","Firebase"]},{id:"proj019",category:"ai",title:"지능형 고객 서비스 봇",summary:"자연어 처리와 감정 분석을 통한 24시간 고객 상담 AI 어시스턴트",thumbnail:"https://readdy.ai/api/search-image?query=customer%20service%20chatbot%20interface%20with%20AI%20conversation%20natural%20language%20processing%20and%20support%20ticket%20management%20clean%20interface%20white%20background&width=400&height=300&seq=proj019&orientation=landscape",icon:"ri-robot-line",tags:["NLP","Sentiment Analysis","GPT Integration"],badges:[{label:"지능적",color:"blue"},{label:"24시간",color:"green"}],modalImage:"https://readdy.ai/api/search-image?query=customer%20service%20chatbot%20interface&width=800&height=600&seq=proj019",description:"GPT 기반의 지능형 고객 상담 챗봇입니다.",features:["자연어 이해","감정 분석","다국어 지원","에스컬레이션"],techStack:["Python","OpenAI API","FastAPI","Redis","PostgreSQL"]},{id:"proj020",category:"fintech",title:"사이버 보안 모니터링",summary:"실시간 위협 탐지와 자동 대응을 제공하는 엔터프라이즈 보안 솔루션",thumbnail:"https://readdy.ai/api/search-image?query=cybersecurity%20monitoring%20dashboard%20with%20threat%20detection%20network%20analysis%20and%20security%20alerts%20modern%20security%20interface%20white%20background&width=400&height=300&seq=proj020&orientation=landscape",icon:"ri-shield-check-line",tags:["SIEM","Threat Intelligence","Incident Response"],badges:[{label:"고보안",color:"red"},{label:"자동화",color:"blue"}],modalImage:"https://readdy.ai/api/search-image?query=cybersecurity%20monitoring%20dashboard&width=800&height=600&seq=proj020",description:"AI 기반 실시간 위협 탐지 및 자동 대응 보안 시스템입니다.",features:["실시간 위협 탐지","자동 대응","로그 분석","보안 리포트"],techStack:["Python","Elasticsearch","Kafka","React","TensorFlow"]}],Ee={intro:Le,filters:Ie,projects:Se},je=new IntersectionObserver(e=>{e.forEach(i=>{i.isIntersecting&&i.target.classList.add("visible","revealed")})},{threshold:.15});function v(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(e=>je.observe(e))}const Te=Ee;let g=null,M=null,I=null,R=null,B=null,H=null,x=null;const Pe={blue:"bg-blue-100 text-blue-700",green:"bg-green-100 text-green-700",red:"bg-red-100 text-red-700",yellow:"bg-yellow-100 text-yellow-700",purple:"bg-purple-100 text-purple-700",pink:"bg-pink-100 text-pink-700",orange:"bg-orange-100 text-orange-700"};function xe(){const e=document.getElementById("portfolio");if(!e)return;const{intro:i,filters:t=[],projects:o=[],cta:a}=Te;e.innerHTML=`
    <!-- Hero Section -->
    ${qe(i)}

    <!-- Portfolio Grid Section -->
    <div class="section section--white">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">포트폴리오</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">
            다양한 산업 분야에서 수행한 프로젝트들을 통해 우리의 역량을 확인해보세요
          </p>
        </header>

        <div id="portfolio-filter-buttons" class="filter-buttons animate-fade-in animate-delay-2"></div>
        <div id="portfolio-grid"></div>
      </div>
    </div>

    <!-- CTA Section -->
    ${a?Ce(a):""}

    <!-- Modal -->
    ${Be()}
  `,De(t,o),N("all",o),He(),v()}function qe(e){return`
    <div class="portfolio-hero">
      <div class="portfolio-hero__overlay"></div>
      <div class="portfolio-hero__content">
        <h1 class="portfolio-hero__title animate-fade-in">${e.title}</h1>
        <p class="portfolio-hero__subtitle animate-fade-in animate-delay-1">${e.subtitle}</p>
        <button class="portfolio-hero__btn animate-fade-in animate-delay-2" 
                onclick="document.getElementById('portfolio-grid').scrollIntoView({ behavior: 'smooth' })">
          프로젝트 둘러보기
        </button>
      </div>
    </div>
  `}function Ce(e){return e?`
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
  `:""}function De(e,i){const t=document.getElementById("portfolio-filter-buttons");t&&(t.innerHTML="",e.forEach(o=>{const a=document.createElement("button");a.type="button",a.className="filter-btn",a.textContent=o.label,a.dataset.filter=o.id,o.id==="all"&&a.classList.add("active"),a.addEventListener("click",()=>{t.querySelectorAll(".filter-btn").forEach(n=>n.classList.remove("active")),a.classList.add("active"),N(o.id,i)}),t.appendChild(a)}))}function N(e,i){const t=document.getElementById("portfolio-grid");if(!t)return;const o=["primary","secondary","purple","green"];t.innerHTML="",(e==="all"?i:i.filter(n=>n.category===e)).forEach((n,s)=>{const m=document.createElement("article");m.className=`portfolio-item animate-scale-in animate-delay-${s%6+1}`,m.innerHTML=`
      <div class="portfolio-item__image" style="background-image:url('${n.thumbnail}')"></div>

      <div class="portfolio-item__body">
        <div class="portfolio-item__header">
          <span class="portfolio-item__category">${Re(e,n.category)}</span>
          ${n.icon?`<i class="${n.icon} portfolio-item__icon"></i>`:""}
        </div>

        <h3 class="portfolio-item__title">${n.title}</h3>
        <p class="portfolio-item__desc">${n.summary}</p>

        <div class="portfolio-item__tags">
          ${(n.tags||[]).map((c,l)=>`<span class="portfolio-item__tag portfolio-item__tag--${o[l%o.length]}">${c}</span>`).join("")}
        </div>

        ${n.badges?Me(n.badges):""}

        <button type="button" class="portfolio-item__link">
          자세히 보기 →
        </button>
      </div>
    `,m.querySelector(".portfolio-item__link")?.addEventListener("click",()=>Ne(n)),t.appendChild(m)}),v()}function Me(e){return`
    <div class="portfolio-item__badges">
      ${e.map(i=>`
        <span class="portfolio-item__badge ${Pe[i.color]||"bg-gray-100 text-gray-700"}">
          ${i.label}
        </span>
      `).join("")}
    </div>
  `}function Re(e,i){return{web:"웹 개발",mobile:"모바일 앱",ai:"AI/ML",iot:"IoT",fintech:"핀테크"}[i]||i}function Be(){return`
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
  `}function He(){g=document.getElementById("modal"),M=document.getElementById("modal-title"),I=document.getElementById("modal-image"),R=document.getElementById("modal-description"),B=document.getElementById("modal-features"),H=document.getElementById("modal-techstack"),x=document.getElementById("modal-close"),x?.addEventListener("click",$),g?.addEventListener("click",e=>{e.target===g&&$()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&g?.classList.contains("active")&&$()})}function Ne(e){g&&(M.textContent=e.title,I.src=e.modalImage||e.thumbnail,I.alt=e.title,R.textContent=e.description||"",B.innerHTML=(e.features||[]).map(i=>`<li><i class="ri-check-line"></i> ${i}</li>`).join(""),H.innerHTML=(e.techStack||[]).map(i=>`<span class="modal-tech-tag">${i}</span>`).join(""),g.classList.add("active"),g.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden")}function $(){g&&(g.classList.remove("active"),g.setAttribute("aria-hidden","true"),document.body.style.overflow="")}const Fe={title:"아티올덱스(Artioldex) 컨설팅 & 교육",slogan:"기술로 만드는 차별화된 비즈니스 경험",description:"혁신적인 개발 에이전시부터 전문 기술 컨설팅, 실무 중심 교육까지 원스톱으로 제공합니다. 검증된 전문성과 최신 기술 트렌드를 바탕으로 귀하의 디지털 전환을 성공적으로 이끌어갑니다."},Oe=[{icon:"ri-repeat-2-line",problem:"반복 업무로 인한 생산성 저하와 인력 낭비",outcome:"자동화를 통한 80% 업무시간 단축과 핵심업무 집중"},{icon:"ri-links-line",problem:"부서간 데이터 단절로 인한 의사결정 지연",outcome:"통합 데이터 플랫폼으로 실시간 협업체계 구축"},{icon:"ri-file-paper-line",problem:"수작업 보고서 작성으로 인한 오류와 지연",outcome:"자동 리포팅 시스템으로 정확하고 신속한 보고체계"},{icon:"ri-bug-line",problem:"품질 관리 부재로 인한 고객 불만과 재작업",outcome:"체계적 QA 프로세스로 품질 향상과 비용 절감"},{icon:"ri-settings-3-line",problem:"레거시 시스템 커스터마이징의 높은 난이도와 리스크",outcome:"단계적 모던화를 통한 안전하고 효율적인 시스템 전환"},{icon:"ri-rocket-line",problem:"배포 및 운영 불안정으로 인한 서비스 중단 위험",outcome:"DevOps 체계 구축으로 99.9% 안정성과 빠른 배포"}],Ve=[{icon:"ri-robot-line",title:"DX 프로세스 분석 & 자동화 설계",description:"업무 프로세스를 분석하여 RPA, 스크립트, AI를 활용한 최적의 자동화 솔루션을 설계하고 구현합니다.",deliverables:["현재 업무 프로세스 분석 보고서","자동화 가능 영역 식별 및 ROI 분석","RPA/스크립트 설계서 및 구현","AI 적용 방안 및 PoC 개발","자동화 운영 가이드 및 교육"]},{icon:"ri-dashboard-line",title:"업무 시스템 구축",description:"업무 효율성 향상을 위한 맞춤형 웹 시스템, 내부 도구, 실시간 대시보드를 구축합니다.",deliverables:["요구사항 정의서 및 시스템 설계","사용자 인터페이스(UI/UX) 설계","웹 애플리케이션 개발 및 구축","실시간 모니터링 대시보드","시스템 운영 매뉴얼 및 교육"]},{icon:"ri-bar-chart-line",title:"데이터 파이프라인 & 지표화",description:"데이터 수집부터 분석까지 전 과정을 자동화하고 핵심 KPI를 실시간으로 모니터링할 수 있는 체계를 구축합니다.",deliverables:["데이터 아키텍처 설계 및 구축","ETL 파이프라인 개발","KPI 정의 및 지표 설계","자동화된 리포팅 시스템","데이터 거버넌스 가이드"]},{icon:"ri-settings-4-line",title:"ERP/레거시 커스터마이징",description:"기존 ERP 및 레거시 시스템의 요구사항을 분석하여 안전하고 효율적인 커스터마이징을 진행합니다.",deliverables:["현행 시스템 분석 및 진단","커스터마이징 요구사항 정의","시스템 설계 및 개발 계획","단계별 구현 및 테스트","마이그레이션 및 운영 이관"]},{icon:"ri-cloud-line",title:"DevOps/배포 운영 체계 구축",description:"CI/CD 파이프라인 구축부터 모니터링, 장애 대응까지 안정적인 운영 체계를 완성합니다.",deliverables:["DevOps 전략 및 로드맵 수립","CI/CD 파이프라인 구축","인프라 자동화 및 IaC 구현","모니터링 및 알람 시스템","장애 대응 프로세스 및 교육"]},{icon:"ri-brain-line",title:"AI 도입 컨설팅",description:"사내 GPT 활용부터 AI 에이전트 개발까지 기업 맞춤형 AI 솔루션 도입을 지원합니다.",deliverables:["AI 도입 전략 및 로드맵","사내 GPT 구축 및 Fine-tuning","AI 에이전트 PoC 개발","지식베이스 구축 및 연동","AI 거버넌스 및 운영 가이드"]}],Ke=[{name:"React",icon:"ri-reactjs-line"},{name:"Node.js",icon:"ri-nodejs-line"},{name:"TypeScript",icon:"ri-code-line"},{name:"Python",icon:"ri-code-s-slash-line"},{name:"AWS",icon:"ri-cloud-line"},{name:"Docker",icon:"ri-container-line"},{name:"MongoDB",icon:"ri-database-2-line"},{name:"GraphQL",icon:"ri-share-line"}],We=[{title:"디스커버리",description:"현황 파악, 비즈니스 목표 정의, 제약사항 분석을 통해 프로젝트의 방향성을 설정합니다.",duration:"1-2주",deliverables:["현황 분석 보고서","비즈니스 목표 정의서","제약사항 및 리스크 분석","이해관계자 맵핑"]},{title:"진단 및 설계",description:"As-Is/To-Be 분석, 우선순위 설정, 기술 아키텍처 설계를 진행합니다.",duration:"1-2주",deliverables:["As-Is/To-Be 분석서","기술 아키텍처 설계","우선순위 매트릭스","프로젝트 로드맵"]},{title:"PoC/빠른 실험",description:"2-10일 단위의 빠른 실험을 통해 핵심 가설을 검증하고 리스크를 최소화합니다.",duration:"2-10일",deliverables:["PoC 프로토타입","검증 결과 보고서","기술적 실현 가능성 검토","성능 테스트 결과"]},{title:"구현/MVP",description:"핵심 기능 우선으로 MVP를 구현하며 운영 관점을 고려한 개발을 진행합니다.",duration:"4-12주",deliverables:["MVP 시스템 구축","핵심 기능 구현","사용자 테스트 결과","운영 매뉴얼"]},{title:"운영/고도화",description:"지속적 모니터링, 개선 루프 운영, 문서화를 통해 시스템을 안정적으로 운영합니다.",duration:"지속적",deliverables:["모니터링 대시보드","운영 프로세스 문서","개선 계획서","기술 지원 체계"]}],Ge={header:Fe,problems:Oe,services:Ve,techStack:Ke,process:We},Qe=Ge;function Je(){console.group("[renderConsulting] start");const e=document.getElementById("consulting");if(console.log("section#consulting:",e),!e){console.warn("❌ #consulting section not found. render aborted."),console.groupEnd();return}const i=Qe;if(console.log("consultingData:",i),!i?.header){console.error("❌ data.header is missing"),console.groupEnd();return}const t=(p,d)=>Array.isArray(p)?p:(console.warn(`⚠️ data.${d} is not an array. fallback to empty array.`),[]),o=t(i.problems,"problems"),a=t(i.services,"services"),n=t(i.process,"process"),s=`
    <section class="hero-section animate-fade-in">
      <div class="container">
        <div class="hero-card animate-scale-in">
          <div class="hero-content">
            <h1 class="hero-title">${i.header.title}</h1>
            <p class="hero-slogan">${i.header.slogan}</p>
            <p class="hero-description">${i.header.description}</p>
            <div class="hero-actions">
              <a href="#" class="btn btn-primary">
                <i class="ri-message-3-line"></i>
                상담 신청하기
              </a>
              <a href="#" class="btn btn-secondary" target="_blank">
                <i class="ri-file-text-line"></i>
                서비스 브로셔 보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,m=`
    <section class="section">
      <div class="container">
        <div class="section__header animate-slide-up">
          <h2 class="section__title">무엇을 해결하는가</h2>
          <p class="section__subtitle">
            기업이 직면한 핵심 문제들을 체계적으로 해결하여 비즈니스 성과를 극대화합니다
          </p>
        </div>
        <div class="problems-grid">
          ${o.map((p,d)=>`
              <div class="problem-card animate-scale-in" style="animation-delay:${d*.15}s">
                <div class="problem-icon">
                  <i class="${p.icon??""}"></i>
                </div>
                <div class="problem-content">
                  <div class="problem-title">${p.problem??""}</div>
                  <div class="outcome-divider">→</div>
                  <div class="outcome-title">${p.outcome??""}</div>
                </div>
              </div>
            `).join("")}
        </div>
      </div>
    </section>
  `,c=`
    <section class="section">
      <div class="container">
        <div class="section__header animate-slide-up">
          <h2 class="section__title">컨설팅 서비스 라인업</h2>
          <p class="section__subtitle">
            검증된 방법론과 최신 기술을 활용한 맞춤형 컨설팅 서비스를 제공합니다
          </p>
        </div>
        <div class="consulting-grid">
          ${a.map((p,d)=>`
              <div class="consulting-card animate-scale-in" style="animation-delay:${d*.2}s">
                <div class="consulting-card__icon consulting-card__icon--primary">
                  <i class="${p.icon??""}"></i>
                </div>
                <h3 class="consulting-card__title">${p.title??""}</h3>
                <p class="consulting-card__desc">${p.description??""}</p>
                <ul class="consulting-card__list">
                  ${(p.deliverables??[]).map(b=>`<li><i class="ri-check-line"></i>${b}</li>`).join("")}
                </ul>
              </div>
            `).join("")}
        </div>
      </div>
    </section>
  `,l=`
    <section class="section">
      <div class="container">
        <div class="process-card">
          <h2 class="process-card__title">컨설팅 진행 프로세스</h2>
          <div class="process-grid">
            ${n.map((p,d)=>`
                <div class="process-step animate-slide-up">
                  <div class="process-step__icon process-step__icon--${d+1}">
                    <i class="ri-number-${d+1}"></i>
                  </div>
                  <div class="process-step__title">${p.title??""}</div>
                  <div class="process-step__desc">${p.description??""}</div>
                </div>
              `).join("")}
          </div>
        </div>
      </div>
    </section>
  `;e.innerHTML=`
    ${s}
    ${m}
    ${c}
    ${l}
  `,v(),console.log("consulting section rendered"),console.groupEnd()}const Xe={title:"디지털 전환을 설계하는 개발 파트너",subtitle:"Artiordex는 지속 가능한 구조와 사람 중심의 기술로 비즈니스의 성장을 함께합니다",icon:"ri-building-4-line",cta:{label:"문의하기",link:"#contact",icon:"ri-mail-send-line"}},ze={title:"What We Do",subtitle:"세 가지 핵심 영역을 통해 클라이언트의 디지털 전환을 지원합니다",items:[{id:"development",title:"Artiordex Development Agency",description:"단순한 개발을 넘어서, 비즈니스 목표와 일치하는 기술 솔루션을 제공합니다.",icon:"ri-code-line",color:"blue",features:["웹 플랫폼 및 애플리케이션 개발","MVP 구축 및 프로토타입 개발","내부 시스템 자동화 솔루션","기술 기반 문제 해결 컨설팅"]},{id:"consulting",title:"Consulting & Education",description:"이론과 실무를 결합한 실질적인 컨설팅과 교육을 통해 조직의 역량을 강화합니다.",icon:"ri-lightbulb-line",color:"green",features:["디지털 전환 전략 컨설팅","조직 및 프로세스 개선 자문","개발 및 기술 실무 강의","맞춤형 교육 프로그램 설계"]},{id:"solutions",title:"Artiordex Solutions",description:"검증된 솔루션과 혁신적인 연구를 통해 미래 지향적인 서비스를 제공합니다.",icon:"ri-rocket-line",color:"purple",features:[{name:"ArtiForge",desc:"솔루션 기반 플랫폼 서비스"},{name:"ArtiLabs",desc:"실험적 기술 연구 및 R&D"},{name:"ArtiFlow",desc:"워크플로우 자동화 및 운영 최적화"}]}]},Ue={title:"Our Solutions",subtitle:"Artiordex의 4가지 핵심 솔루션 라인업",items:[{id:"artiordex",name:"Artiordex",tagline:"Core Platform",description:"Artiordex의 핵심 개발 플랫폼으로, 모든 솔루션의 기반이 되는 통합 시스템입니다.",icon:"ri-building-4-line",color:"blue",features:["통합 개발 환경","프로젝트 관리","클라이언트 포털","실시간 협업"]},{id:"artiforge",name:"ArtiForge",tagline:"Platform Service",description:"솔루션 기반 플랫폼 서비스로, 검증된 템플릿과 모듈을 활용한 빠른 구축을 지원합니다.",icon:"ri-hammer-line",color:"orange",features:["템플릿 라이브러리","모듈식 아키텍처","빠른 배포","커스터마이징"]},{id:"artilabs",name:"ArtiLabs",tagline:"R&D Innovation",description:"실험적 기술 연구 및 R&D를 통해 미래 기술을 선도하는 혁신 연구소입니다.",icon:"ri-flask-line",color:"purple",features:["AI/ML 연구","신기술 실험","프로토타입 개발","기술 리서치"]},{id:"artiflow",name:"ArtiFlow",tagline:"Workflow Automation",description:"워크플로우 자동화 및 운영 최적화를 통해 업무 효율을 극대화합니다.",icon:"ri-flow-chart",color:"green",features:["프로세스 자동화","업무 최적화","데이터 파이프라인","모니터링"]}]},Ye={title:"Timeline",subtitle:"아티올덱스의 성장 여정과 주요 마일스톤",items:[{year:"2022",color:"blue",description:"개인 프로젝트로 시작된 아이디어가 구체화되기 시작했습니다. 다양한 기술 실험과 프로토타입 개발을 통해 핵심 철학을 정립했습니다."},{year:"2023",color:"green",description:"아티올덱스 브랜드를 공식 론칭하고, 개발 에이전시로서의 첫 번째 클라이언트 프로젝트를 성공적으로 완료했습니다."},{year:"2024",color:"orange",description:"컨설팅과 교육 영역으로 사업을 확장하며, 솔루션 라인업의 기초를 구축했습니다. 다양한 산업 분야의 파트너십을 체결했습니다."},{year:"2025",color:"red",description:"ArtiForge, ArtiLabs, ArtiFlow 솔루션을 고도화하고, 글로벌 시장 진출을 위한 기반을 마련할 계획입니다."}]},Ze={title:"Vision & Philosophy",subtitle:"우리가 중요하게 생각하는 가치와 철학",items:[{id:"sustainable",title:"지속 가능한 구조",description:"빠른 개발보다는 장기적으로 유지보수가 가능하고 확장 가능한 구조를 설계합니다. 오늘의 편의가 내일의 기술 부채가 되지 않도록 합니다.",icon:"ri-building-line",color:"blue"},{id:"human",title:"사람 중심 사고",description:"기술은 사람을 위해 존재합니다. 사용자의 경험과 개발자의 생산성, 그리고 비즈니스 목표가 조화롭게 균형을 이루는 솔루션을 추구합니다.",icon:"ri-user-heart-line",color:"green"},{id:"flow",title:"흐름과 시스템",description:"개별 기능의 완성도보다는 전체 시스템의 흐름과 연결성을 중시합니다. 부분의 합이 전체보다 큰 시너지를 만들어냅니다.",icon:"ri-flow-chart",color:"purple"}]},ei={title:`우리는 프로젝트를 만들지 않습니다.
구조를 만듭니다.`,subtitle:"아티올덱스와 함께 지속 가능한 디지털 전환을 시작하세요. 단순한 개발 파트너가 아닌, 성장하는 비즈니스 파트너가 되겠습니다.",email:"contact@artiordex.com"},ii={hero:Xe,services:ze,solutions:Ue,timeline:Ye,vision:Ze,closing:ei},ti=ii;function ai(){const e=document.getElementById("company");if(!e)return;e.className="";const{hero:i,services:t,solutions:o,timeline:a,vision:n,closing:s}=ti;e.innerHTML=`
    <!-- 히어로 CTA -->
    ${i?oi(i):""}

    <!-- 서비스 섹션 -->
    ${t?ni(t):""}

    <!-- 솔루션 섹션 -->
    ${o?ri(o):""}

    <!-- 타임라인 섹션 -->
    ${a?ci(a):""}

    <!-- 비전 섹션 -->
    ${n?mi(n):""}

    <!-- 클로징 CTA -->
    ${s?ui(s):""}
  `,v()}function oi(e){return e?`
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
  `:""}function ni(e){return e?`
    <div class="section section--light">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">${e.title}</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">${e.subtitle}</p>
        </header>

        <div class="company-services">
          ${e.items.map((i,t)=>si(i,t)).join("")}
        </div>
      </div>
    </div>
  `:""}function si(e,i){const t=o=>typeof o=="object"&&o.name;return`
    <div class="company-service-card animate-fade-in animate-delay-${i+1}">
      <div class="company-service-card__icon company-service-card__icon--${e.color}">
        <i class="${e.icon}"></i>
      </div>
      <h3 class="company-service-card__title">${e.title}</h3>
      <ul class="company-service-card__list">
        ${e.features.map(o=>`
          <li>
            <span class="company-service-card__bullet company-service-card__bullet--${e.color}"></span>
            ${t(o)?`<strong>${o.name}:</strong> ${o.desc}`:o}
          </li>
        `).join("")}
      </ul>
      <p class="company-service-card__desc">${e.description}</p>
    </div>
  `}function ri(e){return e?`
    <div class="section section--white">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">${e.title}</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">${e.subtitle}</p>
        </header>

        <div class="company-solutions">
          ${e.items.map((i,t)=>li(i,t)).join("")}
        </div>
      </div>
    </div>
  `:""}function li(e,i){return`
    <div class="company-solution-card animate-fade-in animate-delay-${i+1}">
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
        ${e.features.map(t=>`
          <span class="company-solution-card__feature">${t}</span>
        `).join("")}
      </div>
    </div>
  `}function ci(e){return e?`
    <div class="section section--light">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">${e.title}</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">${e.subtitle}</p>
        </header>

        <div class="company-timeline">
          <div class="company-timeline__line"></div>
          <div class="company-timeline__items">
            ${e.items.map((i,t)=>di(i,t)).join("")}
          </div>
        </div>
      </div>
    </div>
  `:""}function di(e,i){return`
    <div class="company-timeline-item animate-fade-in animate-delay-${i+1}">
      <div class="company-timeline-item__marker company-timeline-item__marker--${e.color}">
        <span>${e.year.slice(-2)}</span>
      </div>
      <div class="company-timeline-item__card">
        <h3 class="company-timeline-item__year">${e.year}</h3>
        <p class="company-timeline-item__desc">${e.description}</p>
      </div>
    </div>
  `}function mi(e){return e?`
    <div class="section section--white">
      <div class="section__inner">
        <header class="section__header">
          <h2 class="section__title animate-fade-in">${e.title}</h2>
          <p class="section__subtitle animate-fade-in animate-delay-1">${e.subtitle}</p>
        </header>

        <div class="company-vision">
          ${e.items.map((i,t)=>pi(i,t)).join("")}
        </div>
      </div>
    </div>
  `:""}function pi(e,i){return`
    <div class="company-vision-card animate-fade-in animate-delay-${i+1}">
      <div class="company-vision-card__icon company-vision-card__icon--${e.color}">
        <i class="${e.icon}"></i>
      </div>
      <h3 class="company-vision-card__title">${e.title}</h3>
      <p class="company-vision-card__desc">${e.description}</p>
    </div>
  `}function ui(e){return e?`
    <div class="company-closing">
      <div class="company-closing__inner">
        <h2 class="company-closing__title animate-fade-in">
          ${e.title.split(`
`).map(t=>`<span>${t}</span>`).join("<br>")}
        </h2>
        <p class="company-closing__subtitle animate-fade-in animate-delay-1">${e.subtitle}</p>
        <a href="mailto:${e.email}" class="company-closing__email animate-fade-in animate-delay-2">
          ${e.email}
        </a>
      </div>
    </div>
  `:""}const hi={title:"링크 허브",subtitle:"Life · Work · Notes 모든 것을 기록하다",icon:"ri-links-line"},gi=[{id:"artiordex",title:"My Work @Artiordex",icon:"ri-building-line",links:[{label:"Artiordex Home",description:"WordPress 공식 홈페이지",url:"https://www.artiordex.com/",icon:"ri-building-line",color:"#667eea"},{label:"GitHub Pages",description:"개발 포트폴리오",url:"https://www.artiordex.github.io/",icon:"ri-github-fill",color:"#333333"},{label:"Naver Blog",description:"기술 블로그",url:"https://blog.naver.com/artiordex",icon:"ri-book-line",color:"#03C75A"},{label:"Smart Store",description:"네이버 스마트스토어",url:"https://smartstore.naver.com/artiordex",icon:"ri-store-2-line",color:"#03C75A"},{label:"Official Notion",description:"공식 노션 페이지",url:"https://www.notion.so/artiordex/Artiordex-Official-Notion-20892a86c03b80acb32bccc3be49bc64",icon:"ri-notion-fill",color:"#000000"},{label:"Consulting",description:"컨설팅 서비스",url:"https://www.notion.so/artiordex/Artiordex-Consulting-22792a86c03b808786d5dcbc1054e508",icon:"ri-lightbulb-line",color:"#f59e0b"},{label:"Tech Insights",description:"기술 인사이트",url:"https://www.notion.so/artiordex/Artiordex-Tech-Insights-22792a86c03b80d68445e2a7ba53fefb",icon:"ri-magic-line",color:"#8b5cf6"},{label:"Project Space",description:"프로젝트 공간",url:"https://www.notion.so/artiordex/Artiordex-Project-20692a86c03b80e290e7f570db3f8024",icon:"ri-apps-line",color:"#3b82f6"}]},{id:"notes",title:"Life & Work Notes",icon:"ri-file-text-line",links:[{label:"Reference",description:"참고 자료 모음",url:"https://www.notion.so/Reference-23392a86c03b803b97d3c95409c5093c",icon:"ri-bookmark-line",color:"#ef4444"},{label:"Dev & Worklog",description:"개발 및 업무 기록",url:"https://www.notion.so/Dev-Worklog-22792a86c03b8031b989c3639c91dae7",icon:"ri-code-s-slash-line",color:"#3b82f6"},{label:"Study & Reading",description:"학습 및 독서 기록",url:"https://www.notion.so/Study-Reading-Log-22792a86c03b8078bcffdf1d39055072",icon:"ri-book-open-line",color:"#10b981"},{label:"Insights Log",description:"인사이트 기록",url:"https://www.notion.so/Insights-Log-20892a86c03b8002bef6fbdfdb74e626",icon:"ri-lightbulb-flash-line",color:"#f59e0b"},{label:"Creative Log",description:"창작 기록",url:"https://www.notion.so/Creative-Log-22792a86c03b80d38f2fedb73a1cc421",icon:"ri-brush-line",color:"#ec4899"},{label:"Life Journal",description:"일상 기록",url:"https://www.notion.so/Life-Journal-Log-20892a86c03b803ead65c1c2b281eeb6",icon:"ri-emotion-happy-line",color:"#8b5cf6"},{label:"Archive",description:"아카이브",url:"https://www.notion.so/Archive-Log-23192a86c03b807e9185da0b5d57e2d9",icon:"ri-archive-line",color:"#6b7280"}]}],vi={hero:hi,categories:gi},bi=vi;function fi(){const e=document.getElementById("links");if(!e)return;e.className="";const{hero:i,intro:t,categories:o,cta:a}=bi,n=i||t;e.innerHTML=`
    <!-- 히어로 CTA -->
    ${n?yi(n):""}

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
            ${o.map((s,m)=>_i(s,m)).join("")}
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 CTA -->
    ${a?wi(a):""}
  `,v()}function yi(e){return e?`
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
  `:""}function _i(e,i){return`
    <div class="notebook-page ${i%2===0?"notebook-page--left":"notebook-page--right"}">
      <!-- 페이지 헤더 -->
      <div class="notebook-page__header">
        <div class="notebook-page__icon" style="background: ${$i(i)}">
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
        ${e.links.map((o,a)=>ki(o)).join("")}
      </ul>

      <!-- 페이지 번호 -->
      <div class="notebook-page__number">${String(i+1).padStart(2,"0")}</div>
    </div>
  `}function ki(e,i){return`
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
  `}function wi(e){return e?`
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
  `:""}function $i(e){const i=["linear-gradient(135deg, #667eea 0%, #764ba2 100%)","linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"];return i[e%i.length]}const Ai={title:"함께 이야기해요",subtitle:"프로젝트 문의, 협업 제안, 컨설팅 요청 등 어떤 내용이든 편하게 연락해주세요",icon:"ri-chat-smile-3-line"},Li={email:{label:"이메일",value:"artiordex@gmail.com",icon:"ri-mail-line"},phone:{label:"전화번호",value:"+82-10-2589-3152",icon:"ri-phone-line"},location:{label:"위치",value:"Gwangmyeong-si, Gyeonggi-do, South Korea",icon:"ri-map-pin-line"},hours:{label:"업무 시간",value:"월-토 · 09:00 - 22:00",icon:"ri-time-line"}},Ii=[{platform:"Slack",url:"https://slack.com/artiordex",icon:"ri-slack-fill"},{platform:"KaKaoTalk",url:"https://kakao.com/artiordex",icon:"ri-kakao-talk-fill"},{platform:"Discord",url:"https://discord.com/artiordex",icon:"ri-discord-line"}],Si={title:"메시지 보내기",description:"아래 양식을 작성해주시면 빠르게 회신드리겠습니다.",fields:[{id:"name",label:"이름",placeholder:"이름을 입력하세요",type:"text",required:!0},{id:"email",label:"이메일",placeholder:"메일 주소를 입력하세요",type:"email",required:!0},{id:"subject",label:"제목",placeholder:"문의 제목을 입력하세요",type:"text",required:!0},{id:"message",label:"내용",placeholder:"문의 내용을 상세히 작성해주세요",type:"textarea",required:!0}],submit:{label:"문의 보내기",icon:"ri-send-plane-2-line"}},Ei={hero:Ai,contactInfo:Li,socialLinks:Ii,form:Si};class f{constructor(i=0,t="Network Error"){this.status=i,this.text=t}}const ji=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,i)=>Promise.resolve(localStorage.setItem(e,i)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},u={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:ji()},S=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},Ti=(e,i="https://api.emailjs.com")=>{if(!e)return;const t=S(e);u.publicKey=t.publicKey,u.blockHeadless=t.blockHeadless,u.storageProvider=t.storageProvider,u.blockList=t.blockList,u.limitRate=t.limitRate,u.origin=t.origin||i},F=async(e,i,t={})=>{const o=await fetch(u.origin+e,{method:"POST",headers:t,body:i}),a=await o.text(),n=new f(o.status,a);if(o.ok)return n;throw n},O=(e,i,t)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!i||typeof i!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!t||typeof t!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},Pi=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},V=e=>e.webdriver||!e.languages||e.languages.length===0,K=()=>new f(451,"Unavailable For Headless Browser"),xi=(e,i)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof i!="string")throw"The BlockList watchVariable has to be a string"},qi=e=>!e.list?.length||!e.watchVariable,Ci=(e,i)=>e instanceof FormData?e.get(i):e[i],W=(e,i)=>{if(qi(e))return!1;xi(e.list,e.watchVariable);const t=Ci(i,e.watchVariable);return typeof t!="string"?!1:e.list.includes(t)},G=()=>new f(403,"Forbidden"),Di=(e,i)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(i&&typeof i!="string")throw"The LimitRate ID has to be a non-empty string"},Mi=async(e,i,t)=>{const o=Number(await t.get(e)||0);return i-Date.now()+o},Q=async(e,i,t)=>{if(!i.throttle||!t)return!1;Di(i.throttle,i.id);const o=i.id||e;return await Mi(o,i.throttle,t)>0?!0:(await t.set(o,Date.now().toString()),!1)},J=()=>new f(429,"Too Many Requests"),Ri=async(e,i,t,o)=>{const a=S(o),n=a.publicKey||u.publicKey,s=a.blockHeadless||u.blockHeadless,m=a.storageProvider||u.storageProvider,c={...u.blockList,...a.blockList},l={...u.limitRate,...a.limitRate};return s&&V(navigator)?Promise.reject(K()):(O(n,e,i),Pi(t),t&&W(c,t)?Promise.reject(G()):await Q(location.pathname,l,m)?Promise.reject(J()):F("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:n,service_id:e,template_id:i,template_params:t}),{"Content-type":"application/json"}))},Bi=e=>{if(!e||e.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},Hi=e=>typeof e=="string"?document.querySelector(e):e,Ni=async(e,i,t,o)=>{const a=S(o),n=a.publicKey||u.publicKey,s=a.blockHeadless||u.blockHeadless,m=u.storageProvider||a.storageProvider,c={...u.blockList,...a.blockList},l={...u.limitRate,...a.limitRate};if(s&&V(navigator))return Promise.reject(K());const p=Hi(t);O(n,e,i),Bi(p);const d=new FormData(p);return W(c,d)?Promise.reject(G()):await Q(location.pathname,l,m)?Promise.reject(J()):(d.append("lib_version","4.4.1"),d.append("service_id",e),d.append("template_id",i),d.append("user_id",n),F("/api/v1.0/email/send-form",d))},X={init:Ti,send:Ri,sendForm:Ni,EmailJSResponseStatus:f},Fi=void 0,Oi=void 0,Vi=void 0;X.init(Fi);const Ki=Ei;function Wi(){const e=document.getElementById("contact");if(!e)return;e.className="";const{hero:i,intro:t,contactInfo:o,socialLinks:a,form:n}=Ki,s=i||t,m={email:"primary",phone:"secondary",location:"purple",hours:"green"},c=Object.entries(o).map(([l,p])=>({...p,color:m[l]}));e.innerHTML=`
    <!-- CTA 히어로 -->
    ${s?Gi(s):""}

    <!-- 메인 콘텐츠 (흰색 배경) -->
    <div class="section section--white">
      <div class="section__inner">
        <div class="contact-container">
          
          <!-- 왼쪽: 연락처 정보 -->
          <div class="contact-info-panel animate-fade-in">
            <div class="contact-info-card">
              <h3 class="contact-info-card__title">연락처 정보</h3>
              
              <div class="contact-info-list">
                ${c.map(l=>`
                  <div class="contact-info-item">
                    <div class="contact-info-item__icon contact-info-item__icon--${l.color}">
                      <i class="${l.icon}"></i>
                    </div>
                    <div class="contact-info-item__content">
                      <span class="contact-info-item__label">${l.label}</span>
                      <span class="contact-info-item__value">${l.value}</span>
                    </div>
                  </div>
                `).join("")}
              </div>

              ${a?`
                <div class="contact-social">
                  <h4 class="contact-social__title">소셜 미디어</h4>
                  <div class="contact-social__links">
                    ${a.map(l=>`
                      <a href="${l.url}" target="_blank" rel="noopener noreferrer" 
                         class="contact-social__link" title="${l.platform}">
                        <i class="${l.icon}"></i>
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
                <h3 class="contact-form-card__title">${n.title}</h3>
                <p class="contact-form-card__desc">${n.description}</p>
              </div>

              <form id="contact-form" class="contact-form">
                <div class="contact-form__grid">
                  ${n.fields.map(l=>Qi(l)).join("")}
                </div>

                <button type="submit" class="contact-form__submit">
                  <span>${n.submit.label}</span>
                  <i class="${n.submit.icon}"></i>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,Ji(),v()}function Gi(e){return e?`
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
  `:""}function Qi(e){const i=e.type==="textarea";return`
    <div class="contact-form__group ${i?"contact-form__group--full":""}">
      <label for="${e.id}" class="contact-form__label">
        ${e.label}
        ${e.required?'<span class="contact-form__required">*</span>':""}
      </label>
      ${i?`
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
  `}function Ji(){const e=document.getElementById("contact-form");if(!e)return;const i=Array.from(e.querySelectorAll("input, textarea"));function t(o){const a=o.id,n=o.value.trim(),s=document.getElementById(`${a}-error`);return s&&(s.textContent="",s.classList.remove("show")),o.required&&!n?(s&&(s.textContent="필수 입력 항목입니다.",s.classList.add("show")),!1):a==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)?(s&&(s.textContent="올바른 이메일 형식을 입력해주세요.",s.classList.add("show")),!1):!0}i.forEach(o=>{o.addEventListener("blur",()=>t(o))}),e.addEventListener("submit",async o=>{if(o.preventDefault(),!i.every(t))return;const a=e.querySelector(".contact-form__submit"),n=a.innerHTML;a.disabled=!0,a.innerHTML='<i class="ri-loader-4-line spin"></i> 전송 중...';const s={name:document.getElementById("name").value,email:document.getElementById("email").value,subject:document.getElementById("subject")?.value||"",message:document.getElementById("message").value,time:Xi()};try{await X.send(Oi,Vi,s),e.reset(),a.innerHTML='<i class="ri-check-line"></i> 전송 완료!',a.classList.add("success"),setTimeout(()=>{a.disabled=!1,a.innerHTML=n,a.classList.remove("success")},3e3)}catch(m){console.error("메일 전송 실패",m),a.innerHTML='<i class="ri-error-warning-line"></i> 전송 실패',a.classList.add("error"),setTimeout(()=>{a.disabled=!1,a.innerHTML=n,a.classList.remove("error")},3e3)}})}function Xi(){return new Date().toLocaleString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})}const zi=new IntersectionObserver(e=>{e.forEach(i=>{i.isIntersecting&&i.target.classList.add("visible","revealed")})},{threshold:.15});function Ui(){document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-scale-in, .scroll-reveal").forEach(e=>zi.observe(e))}document.addEventListener("DOMContentLoaded",()=>{ee(),ae(),le(),ge(),xe(),ai(),Je(),fi(),Wi(),Ui(),A(),ce()});
