/**
 * helper.ts
 * 가벼운 유틸리티 모음
 * - DOM 조작
 * - 이벤트 헬퍼
 * - 스크롤 이동
 * - 디바운스/쓰로틀
 * - 문자열/숫자 헬퍼
 * - 날짜/스토리지 최소 기능
 */
// DOM 헬퍼
export const $ = (selector, parent = document) => parent.querySelector(selector);
export const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
export const $id = (id) => document.getElementById(id);
export const addClass = (el, ...cls) => el?.classList.add(...cls);
export const removeClass = (el, ...cls) => el?.classList.remove(...cls);
export const toggleClass = (el, cls, force) => el?.classList.toggle(cls, force);
export const show = (el, display = "block") => {
    if (el)
        el.style.display = display;
};
export const hide = (el) => {
    if (el)
        el.style.display = "none";
};
// 스크롤 관련
export function scrollTo(target, options = {}) {
    const { offset = 0, behavior = "smooth" } = options;
    let top = 0;
    if (typeof target === "number") {
        top = target;
    }
    else if (typeof target === "string") {
        const el = $(target);
        if (!el)
            return;
        top = el.offsetTop - offset;
    }
    else {
        top = target.offsetTop - offset;
    }
    window.scrollTo({ top, behavior });
}
// 이벤트 헬퍼
export const on = (el, event, handler) => {
    el?.addEventListener(event, handler);
};
export const off = (el, event, handler) => {
    el?.removeEventListener(event, handler);
};
export const once = (el, event, handler) => {
    el?.addEventListener(event, handler, { once: true });
};
export function delegate(parent, selector, event, callback) {
    parent.addEventListener(event, (e) => {
        const target = e.target.closest(selector);
        if (target)
            callback(e, target);
    });
}
// 디바운스 & 쓰로틀
export function debounce(func, wait) {
    let timeout = null;
    return (...args) => {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
export function throttle(func, limit) {
    let waiting = false;
    return (...args) => {
        if (!waiting) {
            func(...args);
            waiting = true;
            setTimeout(() => (waiting = false), limit);
        }
    };
}
// 문자열 & 숫자
export const truncate = (str, len, suffix = "...") => str.length <= len ? str : str.slice(0, len - suffix.length) + suffix;
export const formatNumber = (num) => num.toLocaleString("ko-KR");
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
// 날짜 유틸
export function formatDate(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
// 저장소
export const setStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const getStorage = (key, fallback = null) => {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    }
    catch {
        return fallback;
    }
};
export const removeStorage = (key) => localStorage.removeItem(key);
// Export default 묶음
export default {
    $, $$, $id,
    addClass, removeClass, toggleClass,
    show, hide,
    scrollTo,
    on, off, once, delegate,
    debounce, throttle,
    truncate, formatNumber, clamp,
    formatDate,
    setStorage, getStorage, removeStorage
};
