/**
 * data.types.ts
 * 모든 JSON 데이터 타입 정의
 */

// ============================================
// 1. ABOUT.JSON
// ============================================

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface AboutProfile {
  name: string;
  title: string;
  description: string;
  profileImage: string;
  backgroundImage?: string;
  highlights?: string[];      // profile 내부에 있을 수도 있음
  socialLinks?: SocialLink[];  // profile 내부에 있을 수도 있음
}

export interface AboutSkillsCore {
  name: string;
  level: number;
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
}

export interface AboutCertification {
  name: string;
  issuer: string;
  year: number;
}

export interface AboutData {
  profile: AboutProfile;
  highlights: string[];
  skills: AboutSkills;
  certifications: AboutCertification[];
}

// ============================================
// 2. PORTFOLIO.JSON (컨설팅 서비스)
// ============================================

export interface PortfolioService {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  delay?: number;
  features: string[];
}

export interface PortfolioProcessStep {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
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
  tags: string[];
  modalImage?: string;
  description?: string;
  features?: string[];
  techStack?: string[];
}

export interface PortfolioData {
  pageTitle: string;
  intro: {
    title: string;
    subtitle: string;
  };
  services: PortfolioService[];
  process: {
    title: string;
    steps: PortfolioProcessStep[];
  };
  // 필터와 프로젝트가 있을 경우 (company.json 스타일)
  filters?: PortfolioFilter[];
  projects?: PortfolioProject[];
}

// ============================================
// 3. COMPANY.JSON (회사 포트폴리오)
// ============================================

export interface CompanyFilter {
  id: string;
  label: string;
}

export interface CompanyProject {
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

export interface CompanyData {
  pageTitle: string;
  intro: {
    title: string;
    subtitle: string;
  };
  filters: CompanyFilter[];
  projects: CompanyProject[];
}

// ============================================
// 4. CONSULTING.JSON (창업가 신념)
// ============================================
export interface ConsultingServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: "primary" | "secondary" | "purple" | "green";
  delay?: number;
  items: string[];
}

export interface ConsultingProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

export interface ConsultingProcess {
  title: string;
  steps: ConsultingProcessStep[];
}

export interface VisionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  delay?: number;
}

export interface PrincipleItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface PrinciplesBlock {
  title: string;
  items: PrincipleItem[];
}

export interface ConsultingData {
  pageTitle: string;
  intro: {
    title: string;
    subtitle: string;
  };
  serviceCategories: ConsultingServiceCategory[];
  process: ConsultingProcess;                    
  visionCards: VisionCard[];
  principles: PrinciplesBlock;
}

// ============================================
// 5. CONTACT.JSON
// ============================================

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
  intro: {
    title: string;
    subtitle: string;
  };
  contactInfo: ContactInfoBlock;
  socialLinks: ContactSocialLink[];
  form: ContactFormConfig;
  // 레거시 호환 (기존 코드용)
  title?: string;
  subtitle?: string;
  items?: {
    icon: string;
    label: string;
    value: string;
    color: string;
  }[];
}

// ============================================
// 6. LINKS.JSON
// ============================================

export interface LinksIntro {
  title: string;
  subtitle: string;
}

export interface LinkItem {
  label: string;
  url: string;
  icon: string;
  color: string;
  description?: string;
}

export interface LinksCategory {
  id: string | number;
  title: string;
  links: LinkItem[];
}

export interface LinksData {
  intro?: LinksIntro;
  categories: LinksCategory[];
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