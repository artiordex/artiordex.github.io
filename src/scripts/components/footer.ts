
// 소셜 링크 데이터(JSON) 로드
import socialDataJson from "@/data/social.json";

// 소셜 링크 타입 정의
import type { SocialLink } from "@/scripts/data.types";

// Footer 컴포넌트 설정 인터페이스
export interface FooterConfig {
  mountId: string;
  copyrightText: string;
}

// 기본 설정값
const DEFAULT_CONFIG: FooterConfig = {
  mountId: "layout-footer",
  copyrightText: "SHIWOO MIN"
};


// JSON 데이터를 타입 안정성을 위해 명시적으로 캐스팅
const socialData = socialDataJson as { socialLinks: SocialLink[] };


// Footer 렌더링을 담당하는 메인 클래스
class Footer {
  // 실제 적용될 설정값
  private config: FooterConfig;

  // 생성자
  // - 전달된 설정값과 기본 설정값을 병합
  constructor(config: Partial<FooterConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // 외부에서 호출되는 초기화 메서드
  // - 내부 render 로직을 캡슐화
  public init(): void {
    this.render();
  }

  // Footer DOM 생성 및 삽입
  private render(): void {
    // Footer가 마운트될 DOM 요소 탐색
    const mount = document.getElementById(this.config.mountId);
    if (!mount) return;

    // 현재 연도 자동 계산
    const year = new Date().getFullYear();

    // 소셜 링크 데이터 (없을 경우 빈 배열)
    const socials = socialData.socialLinks || [];

    // Footer HTML 렌더링
    // - 연도 및 저작권 문구 자동 출력
    // - social.json 기반 소셜 링크 반복 생성
    mount.innerHTML = `
      <footer class="footer">
        <div class="footer-inner">
          <p class="footer-copy">
            © ${year} ${this.config.copyrightText}. All rights reserved.
          </p>

          <div class="footer-social">
            ${socials
              .map(
                s => `
                <a href="${s.url}"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="${s.platform}"
                  title="${s.platform}"
                  class="social-link">
                  <i class="${s.icon}"></i>
                </a>
              `
              )
              .join("")}
          </div>
        </div>
      </footer>
    `;
  }
}

// 초기화 헬퍼 함수
export function initFooter(config?: Partial<FooterConfig>): Footer {
  const footer = new Footer(config);
  footer.init();
  return footer;
}
