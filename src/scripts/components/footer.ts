/**
 * footer.ts
 * Footer 렌더링 (social.json 기반)
 */

import socialDataJson from "@/data/social.json";
import type { SocialLink } from "@/scripts/data.types";

export interface FooterConfig {
  mountId: string;
  copyrightText: string;
}

const DEFAULT_CONFIG: FooterConfig = {
  mountId: "layout-footer",
  copyrightText: "민시우"
};

const socialData = socialDataJson as { socialLinks: SocialLink[] };

class Footer {
  private config: FooterConfig;

  constructor(config: Partial<FooterConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  public init(): void {
    this.render();
  }

  private render(): void {
    const mount = document.getElementById(this.config.mountId);
    if (!mount) return;

    const year = new Date().getFullYear();
    const socials = socialData.socialLinks || [];

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

/* =========================
   초기화 헬퍼
========================= */
export function initFooter(config?: Partial<FooterConfig>): Footer {
  const footer = new Footer(config);
  footer.init();
  return footer;
}
