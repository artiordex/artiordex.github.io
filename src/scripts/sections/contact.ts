/**
 * contact.ts
 * Contact(연락처 및 문의 폼) 섹션 렌더링 + 폼 검증 통합 모듈
 */
import contactJson from "@/data/contact.json";
import type { ContactPageData, ContactInfoBlock } from "@/scripts/data.types";
import { attachRevealObserver } from "@/scripts/utils/reveal";

const contactData = contactJson as ContactPageData;
export function renderContact(): void {
  const data = contactData;
  const el = document.getElementById("contact");
  if (!el) return;

  /* contactInfo → 배열화 */
  const contactItems: { icon: string; label: string; value: string; color: string }[] = [];
  const colorMap: Record<keyof ContactInfoBlock, string> = {
    email: "primary",
    phone: "secondary",
    location: "purple",
    hours: "green",
  };

  if (data.contactInfo) {
    Object.entries(data.contactInfo).forEach(([key, item]) => {
      const typedKey = key as keyof ContactInfoBlock;

      contactItems.push({
        icon: item.icon,
        label: item.label,
        value: item.value,
        color: colorMap[typedKey],
      });
    });
  }

  /* Contact 섹션 템플릿 */
  el.innerHTML = `
    <div class="section__header">
      <h1 class="section__title animate-fade-in">${data.intro?.title || data.pageTitle}</h1>
      <p class="section__subtitle animate-fade-in animate-delay-1">
        ${data.intro?.subtitle || ""}
      </p>
    </div>

    <div class="contact-grid"></div>

    <!-- Toast -->
    <div id="toast" class="toast">
      <i class="ri-check-line"></i>
      <span>${data.form?.successMessage || "성공적으로 제출되었습니다!"}</span>
    </div>
  `;

  const grid = el.querySelector(".contact-grid");
  if (!grid) return;

  /* 왼쪽: 연락처 카드 */
  const info = document.createElement("div");
  info.className = "contact-info animate-slide-up animate-delay-1";
  info.innerHTML = `
    <h3 class="contact-info__title">연락 정보</h3>
    <div class="contact-list">
      ${contactItems
        .map(
          (item) => `
        <div class="contact-item">
          <div class="contact-item__icon contact-item__icon--${item.color}">
            <i class="${item.icon}"></i>
          </div>
          <div>
            <div class="contact-item__label">${item.label}</div>
            <div class="contact-item__value">${item.value}</div>
          </div>
        </div>`
        )
        .join("")}
    </div>
  `;

  /* 오른쪽: 문의 폼 */
  const formBox = document.createElement("div");
  formBox.className = "contact-form animate-slide-up animate-delay-2";

  const formConfig = data.form;
  formBox.innerHTML = `
    <h3 class="contact-form__title">${formConfig.title}</h3>
    <p class="contact-form__desc">${formConfig.description}</p>

    <form id="contact-form">
      ${formConfig.fields
        .map((field) => {
          if (field.type === "textarea") {
            return `
            <div class="form-group">
              <label for="${field.id}">${field.label}</label>
              <textarea id="${field.id}" placeholder="${field.placeholder}" ${
              field.required ? "required" : ""
            }></textarea>
              <div id="${field.id}-error" class="error-message"></div>
            </div>`;
          }

          return `
          <div class="form-group">
            <label for="${field.id}">${field.label}</label>
            <input id="${field.id}" type="${field.type}" placeholder="${field.placeholder}" ${
            field.required ? "required" : ""
          } />
            <div id="${field.id}-error" class="error-message"></div>
          </div>`;
        })
        .join("")}

      <button type="submit" class="btn-submit">
        <i class="${formConfig.submit.icon}"></i>
        ${formConfig.submit.label}
      </button>
    </form>
  `;

  grid.appendChild(info);
  grid.appendChild(formBox);

  setupContactForm();
  attachRevealObserver();
}

/* 폼 유효성 검사 + Toast */
function setupContactForm(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  const toast = document.getElementById("toast") as HTMLElement | null;
  if (!form || !toast) return;

  const fields = Array.from(form.querySelectorAll("input, textarea")) as (HTMLInputElement | HTMLTextAreaElement)[];

  function showError(id: string, message: string): void {
    const el = document.getElementById(`${id}-error`);
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
  }

  function hideError(id: string): void {
    const el = document.getElementById(`${id}-error`);
    if (!el) return;
    el.classList.remove("show");
  }

  function validateField(input: HTMLInputElement | HTMLTextAreaElement): boolean {
    const id = input.id;
    const value = input.value.trim();

    hideError(id);

    if (input.required && !value) {
      showError(id, "필수 입력 항목입니다.");
      return false;
    }

    if (id === "email") {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value)) {
        showError(id, "올바른 이메일 형식을 입력해주세요.");
        return false;
      }
    }

    return true;
  }

  /* blur 이벤트마다 검증 */
  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
  });

  /* 제출 이벤트 */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    fields.forEach((f) => {
      if (!validateField(f)) valid = false;
    });

    if (!valid) return;

    // 성공 처리
    form.reset();

    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  });
}
