/**
 * data.types.ts
 * 모든 JSON 데이터 타입 정의
 */

// ============================================
// 1. ABOUT.JSON (Revised)
// ============================================

export interface AboutMeta {
  lang: string;
  version: number;
  updatedAt: string; // "YYYY-MM-DD"
}

// --------------------
// Common
// --------------------
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface KvRow {
  k: string;
  v: string;
}

// --------------------
// Profile (slide-1)
// --------------------
export interface AboutProfile {
  name: string;
  title: string;

  /** 슬라이드처럼 문단 배열을 지원합니다. */
  description: string[];

  profileImage: string;
  backgroundImage?: string;

  /** profile_strengths의 keywords와 매칭됩니다. */
  keywords?: string[];

  /** 필요하면 profile 내부 하이라이트/소셜을 둡니다. */
  highlights?: string[];
  socialLinks?: SocialLink[];
}

export interface AboutStrengthBlock {
  title: string;
  description: string[];
}

// --------------------
// Timeline (slide-2)
// --------------------
export interface AboutTimelineItem {
  year: string; // "2019"
  title: string;
  description: string[];
}

export interface AboutTimelinePortrait {
  title: string;
  portraitImage: string;
  timeline: AboutTimelineItem[];
}

// --------------------
// Competency (slide-3)
// --------------------
export interface AboutCompetency {
  name: string;
  summary: string;
  evidence: string[];
  result: string;
}

export interface BrandingQuote {
  lines: string[];
  highlight: string;
}

export interface AboutCoreCompetencySection {
  title: string;
  competencies: AboutCompetency[];
  summaryKeywords?: string[];
  brandingQuote?: BrandingQuote;
}

// --------------------
// Education & Certifications (slide-4)
// --------------------
export interface AboutEducation {
  degree: string;
  school: string;
  period: string;
}

export interface AboutCertification {
  name: string;
  issuer: string;
  year: number;
}

export interface AboutEducationCertificationsSection {
  title: string;
  education: AboutEducation[];
  certifications: AboutCertification[];
}

// --------------------
// Persona (slide-5)
// --------------------
export interface AboutPersonaHeader {
  name: string;
  bio: string;
}

export interface AboutPersonaBadge {
  label: string; // "FE 35%"
  key: string;   // "fe"
}

export interface AboutPersonaCard {
  title: string;
  icon: string;
  items: string[];
}

export interface AboutPersonaSection {
  title: string;
  header: AboutPersonaHeader;
  badges: AboutPersonaBadge[];
  tools?: string[];
  table: KvRow[];
  cards: AboutPersonaCard[];
}

// --------------------
// Summary (slide-6)
// --------------------
export interface AboutSummarySectionItem {
  title: string;
  text: string;
}

export interface AboutSummarySection {
  title: string;
  sections: AboutSummarySectionItem[];
}

// --------------------
// Skills (기존 유지 + 확장 가능)
// --------------------
export interface AboutSkillsCore {
  name: string;
  level: number; // 0~100 권장입니다.
}

export interface AboutSkills {
  core: AboutSkillsCore[];

  techStack: {
    frontend: string[];
    backend: string[];
    ai: string[];
    cloud: string[];
    tools: string[];
  };

  /** slide-5 배지(비중)를 그대로 쓰고 싶을 때 옵션입니다. */
  distribution?: AboutPersonaBadge[];
}

// --------------------
// Root
// --------------------
export interface AboutData {
  meta: AboutMeta;

  // slide-1
  profile: AboutProfile;
  strengths?: AboutStrengthBlock[];

  // slide-2
  timelinePortrait?: AboutTimelinePortrait;

  // slide-3
  coreCompetency?: AboutCoreCompetencySection;

  // slide-4
  educationCertifications?: AboutEducationCertificationsSection;

  // slide-5
  persona?: AboutPersonaSection;

  // slide-6
  summary?: AboutSummarySection;

  // 기존 about.json 호환용
  highlights?: string[];

  // 기존 Skills/Certifications를 루트에 두는 구조도 유지
  skills?: AboutSkills;
  certifications?: AboutCertification[];
}


// ============================================
// 2. PORTFOLIO.JSON (포트폴리오 프로젝트)
// ============================================

export interface PortfolioBadge {
  label: string;
  color: string;  // "blue" | "green" | "red" | "yellow" | "purple" | "pink" | "orange"
}

export interface PortfolioFilter {
  id: string;
  label: string;
}

export interface PortfolioProject {
  id: string;
  category: string;
  title: string;
  summary: string;
  thumbnail: string;
  icon?: string;
  tags: string[];
  badges?: PortfolioBadge[];
  modalImage?: string;
  description?: string;
  features?: string[];
  techStack?: string[];
}

export interface PortfolioCTA {
  title: string;
  subtitle: string;
  primaryButton: {
    label: string;
    link: string;
  };
  secondaryButton: {
    label: string;
    link: string;
  };
}

export interface PortfolioData {
  pageTitle: string;
  intro: {
    title: string;
    subtitle: string;
  };
  filters: PortfolioFilter[];
  projects: PortfolioProject[];
  cta?: PortfolioCTA;
}

// ============================================
// 3. COMPANY.JSON (회사 소개)
// ============================================

export interface CompanyHero {
  title: string;
  subtitle: string;
  icon?: string;
  cta?: {
    label: string;
    link: string;
    icon?: string;
  };
}

export interface CompanyServiceFeature {
  name?: string;
  desc?: string;
}

export interface CompanyService {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: (string | CompanyServiceFeature)[];
}

export interface CompanyServicesSection {
  title: string;
  subtitle: string;
  items: CompanyService[];
}

export interface CompanySolution {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export interface CompanySolutionsSection {
  title: string;
  subtitle: string;
  items: CompanySolution[];
}

export interface CompanyTimelineItem {
  year: string;
  color: string;
  description: string;
}

export interface CompanyTimelineSection {
  title: string;
  subtitle: string;
  items: CompanyTimelineItem[];
}

export interface CompanyVisionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface CompanyVisionSection {
  title: string;
  subtitle: string;
  items: CompanyVisionItem[];
}

export interface CompanyClosing {
  title: string;
  subtitle: string;
  email: string;
}

export interface CompanyData {
  pageTitle: string;
  hero?: CompanyHero;
  services?: CompanyServicesSection;
  solutions?: CompanySolutionsSection;
  timeline?: CompanyTimelineSection;
  vision?: CompanyVisionSection;
  closing?: CompanyClosing;
}

// ============================================
// 4. CONSULTING.JSON (기술 컨설팅 서비스)
// ============================================

export interface ConsultingHeader {
  title: string;
  slogan: string;
  description: string;
}

export interface ConsultingProblem {
  icon: string;
  problem: string;
  outcome: string;
}

export interface ConsultingService {
  icon: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ConsultingTechItem {
  name: string;
  icon: string;
}

export interface ConsultingProcessStep {
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
}

export interface ConsultingData {
  header: ConsultingHeader;
  problems: ConsultingProblem[];
  services: ConsultingService[];
  techStack: ConsultingTechItem[];
  process: ConsultingProcessStep[];
}

// ============================================
// 5. CONTACT.JSON
// ============================================

export interface ContactHero {
  title: string;
  subtitle: string;
  icon?: string;
}

export interface ContactInfoItem {
  label: string;
  value: string;
  icon: string;
}

export interface ContactInfoBlock {
  email: ContactInfoItem;
  phone: ContactInfoItem;
  location: ContactInfoItem;
  hours: ContactInfoItem;
}

export interface ContactFormField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
}

export interface ContactFormConfig {
  title: string;
  description: string;
  fields: ContactFormField[];
  submit: {
    label: string;
    icon: string;
  };
  successMessage: string;
  errorMessage: string;
}

export interface ContactSocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactPageData {
  pageTitle: string;
  hero?: ContactHero;
  intro?: ContactHero;  // 하위 호환
  contactInfo: ContactInfoBlock;
  socialLinks?: ContactSocialLink[];
  form: ContactFormConfig;
}

// ============================================
// 6. LINKS.JSON
// ============================================

export interface LinksHero {
  title: string;
  subtitle: string;
  icon?: string;
}

export interface LinkItem {
  label: string;
  description?: string;
  url: string;
  icon: string;
  color: string;
}

export interface LinksCategory {
  id: string | number;
  title: string;
  icon?: string;
  links: LinkItem[];
}

export interface LinksCTA {
  title: string;
  subtitle: string;
  button: {
    label: string;
    link: string;
    icon?: string;
  };
}

export interface LinksData {
  hero?: LinksHero;
  intro?: LinksHero;  // 하위 호환
  categories: LinksCategory[];
  cta?: LinksCTA;
}

// ============================================
// 7. SECTION.JSON (헤더/네비게이션)
// ============================================

export interface HeaderSectionItem {
  id: string;
  label: string;
  icon?: string;
}

export interface HeaderSectionsData {
  sections: HeaderSectionItem[];
}

// ============================================
// 8. SOCIAL.JSON
// ============================================

export interface SimpleSocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface SimpleSocialList {
  socialLinks: SimpleSocialLink[];
}

// ============================================
// 공통 타입 (재사용)
// ============================================

/** 필터 버튼 공통 타입 */
export interface FilterButton {
  id: string;
  label: string;
}

/** 프로젝트 공통 타입 (Portfolio, Company 공용) */
export interface BaseProject {
  id: string;
  category: string;
  title: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  modalImage?: string;
  description?: string;
  features?: string[];
  techStack?: string[];
}

/** 소셜 링크 공통 타입 */
export interface BaseSocialLink {
  label?: string;
  platform?: string;
  url: string;
  icon: string;
}

/** 인트로 섹션 공통 타입 */
export interface IntroSection {
  title: string;
  subtitle: string;
}

/** 아이콘 + 컬러 공통 타입 */
export interface IconColorItem {
  icon: string;
  color: string;
}

// ============================================
// 타입 가드 함수
// ============================================

export function isPortfolioProject(obj: unknown): obj is PortfolioProject {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'category' in obj
  );
}

export function hasIntro(obj: unknown): obj is { intro: IntroSection } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'intro' in obj &&
    typeof (obj as any).intro === 'object'
  );
}