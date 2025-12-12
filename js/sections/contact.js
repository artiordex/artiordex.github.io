/**
 * contact.ts
 * Contact(연락처 및 문의 폼) 섹션 렌더링 모듈
 */
import contactJson from "@/data/contact.json";
import { attachRevealObserver } from "@/ts/utils/reveal";
/* JSON 타입 캐스팅 */
const contactData = contactJson;
/**
 * Contact 섹션 렌더링
 */
export function renderContact() {
    const data = contactData;
    const el = document.getElementById("contact");
    if (!el)
        return;
    /* contactInfo 객체 → 배열로 정리 */
    const contactItems = [];
    const colorMap = {
        email: "primary",
        phone: "secondary",
        location: "purple",
        hours: "green",
    };
    if (data.contactInfo) {
        Object.entries(data.contactInfo).forEach(([key, item]) => {
            contactItems.push({
                icon: item.icon,
                label: item.label,
                value: item.value,
                color: colorMap[key] || "primary",
            });
        });
    }
    /* Contact 레이아웃 템플릿 */
    el.innerHTML = `
    <div class="section__header">
      <h1 class="section__title animate-fade-in">${data.intro?.title || data.pageTitle}</h1>
      <p class="section__subtitle animate-fade-in animate-delay-1">
        ${data.intro?.subtitle || ""}
      </p>
    </div>

    <div class="contact-grid"></div>
  `;
    const grid = el.querySelector(".contact-grid");
    if (!grid)
        return;
    /* 왼쪽: 연락 정보 */
    const info = document.createElement("div");
    info.className = "contact-info animate-slide-up animate-delay-1";
    info.innerHTML = `
    <h3 class="contact-info__title">연락 정보</h3>
    <div class="contact-list">
      ${contactItems
        .map((item) => `
        <div class="contact-item">
          <div class="contact-item__icon contact-item__icon--${item.color}">
            <i class="${item.icon}"></i>
          </div>
          <div>
            <div class="contact-item__label">${item.label}</div>
            <div class="contact-item__value">${item.value}</div>
          </div>
        </div>
        `)
        .join("")}
    </div>
  `;
    /* 오른쪽: Contact Form */
    const formBox = document.createElement("div");
    formBox.className = "contact-form animate-slide-up animate-delay-2";
    const formConfig = data.form;
    if (formConfig) {
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
                  <textarea id="${field.id}" placeholder="${field.placeholder}" ${field.required ? "required" : ""}></textarea>
                </div>
              `;
            }
            return `
              <div class="form-group">
                <label for="${field.id}">${field.label}</label>
                <input id="${field.id}" type="${field.type}" placeholder="${field.placeholder}" ${field.required ? "required" : ""} />
              </div>
            `;
        })
            .join("")}
        
        <button type="submit" class="btn-submit">
          <i class="${formConfig.submit.icon}"></i>
          ${formConfig.submit.label}
        </button>
      </form>
    `;
    }
    grid.appendChild(info);
    grid.appendChild(formBox);
    setupContactForm();
    attachRevealObserver();
}
/**
 * Contact 폼 제출 이벤트 설정
 */
function setupContactForm() {
    const form = document.getElementById("contact-form");
    if (!form)
        return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name")?.value;
        const email = document.getElementById("email")?.value;
        const message = document.getElementById("message")?.value;
        if (!name || !email || !message) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }
        console.log("Form submitted:", { name, email, message });
        alert(contactData.form?.successMessage || "문의가 성공적으로 제출되었습니다.");
        form.reset();
    });
}
