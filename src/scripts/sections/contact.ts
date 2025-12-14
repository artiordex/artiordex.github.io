/**
 * contact.ts
 * Contact 섹션 - CTA 히어로 + 폼 + 연락처 정보
 */

import contactJson from "@/data/contact.json";
import type { ContactPageData, ContactInfoBlock } from "@/scripts/data.types";
import { attachRevealObserver } from "@/scripts/utils/reveal";
import emailjs from "@emailjs/browser";

/* EmailJS ENV */
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactData = contactJson as ContactPageData;

export function renderContact(): void {
  const el = document.getElementById("contact");
  if (!el) return;

  el.className = "";  // 기본 섹션 클래스 제거

  const { hero, intro, contactInfo, socialLinks, form } = contactData;
  const heroData = hero || intro;

  /* 연락처 정보 배열화 */
  const colorMap: Record<keyof ContactInfoBlock, string> = {
    email: "primary",
    phone: "secondary",
    location: "purple",
    hours: "green",
  };

  const contactItems = Object.entries(contactInfo).map(([key, item]) => ({
    ...item,
    color: colorMap[key as keyof ContactInfoBlock],
  }));

  el.innerHTML = `
    <!-- CTA 히어로 -->
    ${heroData ? renderHero(heroData) : ''}

    <!-- 메인 콘텐츠 (흰색 배경) -->
    <div class="section section--white">
      <div class="section__inner">
        <div class="contact-container">
          
          <!-- 왼쪽: 연락처 정보 -->
          <div class="contact-info-panel animate-fade-in">
            <div class="contact-info-card">
              <h3 class="contact-info-card__title">연락처 정보</h3>
              
              <div class="contact-info-list">
                ${contactItems.map(item => `
                  <div class="contact-info-item">
                    <div class="contact-info-item__icon contact-info-item__icon--${item.color}">
                      <i class="${item.icon}"></i>
                    </div>
                    <div class="contact-info-item__content">
                      <span class="contact-info-item__label">${item.label}</span>
                      <span class="contact-info-item__value">${item.value}</span>
                    </div>
                  </div>
                `).join('')}
              </div>

              ${socialLinks ? `
                <div class="contact-social">
                  <h4 class="contact-social__title">소셜 미디어</h4>
                  <div class="contact-social__links">
                    ${socialLinks.map(link => `
                      <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
                         class="contact-social__link" title="${link.platform}">
                        <i class="${link.icon}"></i>
                      </a>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- 오른쪽: 문의 폼 -->
          <div class="contact-form-panel animate-fade-in animate-delay-1">
            <div class="contact-form-card">
              <div class="contact-form-card__header">
                <h3 class="contact-form-card__title">${form.title}</h3>
                <p class="contact-form-card__desc">${form.description}</p>
              </div>

              <form id="contact-form" class="contact-form">
                <div class="contact-form__grid">
                  ${form.fields.map(field => renderFormField(field)).join('')}
                </div>

                <button type="submit" class="contact-form__submit">
                  <span>${form.submit.label}</span>
                  <i class="${form.submit.icon}"></i>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  setupContactForm();
  attachRevealObserver();
}

/**
 * CTA 히어로 렌더링
 */
function renderHero(hero: ContactPageData['hero']): string {
  if (!hero) return '';

  return `
    <div class="contact-hero">
      <div class="contact-hero__bg"></div>
      <div class="contact-hero__content">
        <div class="contact-hero__icon animate-fade-in">
          <i class="${hero.icon || 'ri-chat-3-line'}"></i>
        </div>
        <h1 class="contact-hero__title animate-fade-in animate-delay-1">${hero.title}</h1>
        <p class="contact-hero__subtitle animate-fade-in animate-delay-2">${hero.subtitle}</p>
      </div>
    </div>
  `;
}

/**
 * 폼 필드 렌더링
 */
function renderFormField(field: ContactPageData['form']['fields'][0]): string {
  const isTextarea = field.type === 'textarea';
  const isFullWidth = isTextarea;

  return `
    <div class="contact-form__group ${isFullWidth ? 'contact-form__group--full' : ''}">
      <label for="${field.id}" class="contact-form__label">
        ${field.label}
        ${field.required ? '<span class="contact-form__required">*</span>' : ''}
      </label>
      ${isTextarea ? `
        <textarea
          id="${field.id}"
          class="contact-form__textarea"
          placeholder="${field.placeholder}"
          rows="5"
          ${field.required ? 'required' : ''}
        ></textarea>
      ` : `
        <input
          id="${field.id}"
          type="${field.type}"
          class="contact-form__input"
          placeholder="${field.placeholder}"
          ${field.required ? 'required' : ''}
        />
      `}
      <div id="${field.id}-error" class="contact-form__error"></div>
    </div>
  `;
}

/**
 * 폼 유효성 검사 + EmailJS 전송
 */
function setupContactForm(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  if (!form) return;

  const fields = Array.from(
    form.querySelectorAll("input, textarea")
  ) as (HTMLInputElement | HTMLTextAreaElement)[];

  function validateField(input: HTMLInputElement | HTMLTextAreaElement): boolean {
    const id = input.id;
    const value = input.value.trim();
    const errorEl = document.getElementById(`${id}-error`);

    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("show");
    }

    if (input.required && !value) {
      if (errorEl) {
        errorEl.textContent = "필수 입력 항목입니다.";
        errorEl.classList.add("show");
      }
      return false;
    }

    if (id === "email") {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value)) {
        if (errorEl) {
          errorEl.textContent = "올바른 이메일 형식을 입력해주세요.";
          errorEl.classList.add("show");
        }
        return false;
      }
    }

    return true;
  }

  // 실시간 유효성 검사
  fields.forEach(field => {
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!fields.every(validateField)) return;

    const submitBtn = form.querySelector(".contact-form__submit") as HTMLButtonElement;
    const originalText = submitBtn.innerHTML;
    
    // 로딩 상태
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="ri-loader-4-line spin"></i> 전송 중...';

    const params = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      subject: (document.getElementById("subject") as HTMLInputElement)?.value || "",
      message: (document.getElementById("message") as HTMLTextAreaElement).value,
      time: getFormattedTime(),
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);

      form.reset();
      submitBtn.innerHTML = '<i class="ri-check-line"></i> 전송 완료!';
      submitBtn.classList.add("success");

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove("success");
      }, 3000);

    } catch (err) {
      console.error("메일 전송 실패", err);
      submitBtn.innerHTML = '<i class="ri-error-warning-line"></i> 전송 실패';
      submitBtn.classList.add("error");

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove("error");
      }, 3000);
    }
  });
}

function getFormattedTime(): string {
  return new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}