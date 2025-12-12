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

// 타입 정의

export type EventCallback = (e: Event) => void;
export type AnyFn = (...args: any[]) => any;

export interface ScrollToOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

// DOM 헬퍼

export const $ = (selector: string, parent: Document | Element = document): HTMLElement | null =>
  parent.querySelector<HTMLElement>(selector);

export const $$ = (
  selector: string,
  parent: Document | Element = document
): HTMLElement[] => Array.from(parent.querySelectorAll<HTMLElement>(selector));

export const $id = (id: string): HTMLElement | null => document.getElementById(id);

export const addClass = (el: HTMLElement | null, ...cls: string[]) => el?.classList.add(...cls);
export const removeClass = (el: HTMLElement | null, ...cls: string[]) => el?.classList.remove(...cls);
export const toggleClass = (el: HTMLElement | null, cls: string, force?: boolean) =>
  el?.classList.toggle(cls, force);

export const show = (el: HTMLElement | null, display = "block") => {
  if (el) el.style.display = display;
};

export const hide = (el: HTMLElement | null) => {
  if (el) el.style.display = "none";
};

// 스크롤 관련

export function scrollTo(target: HTMLElement | string | number, options: ScrollToOptions = {}): void {
  const { offset = 0, behavior = "smooth" } = options;

  let top = 0;

  if (typeof target === "number") {
    top = target;
  } else if (typeof target === "string") {
    const el = $(target);
    if (!el) return;
    top = el.offsetTop - offset;
  } else {
    top = target.offsetTop - offset;
  }

  window.scrollTo({ top, behavior });
}

// 이벤트 헬퍼

export const on = (
  el: HTMLElement | Document | Window | null,
  event: string,
  handler: EventCallback
): void => {
  el?.addEventListener(event, handler as EventListener);
};

export const off = (
  el: HTMLElement | Document | Window | null,
  event: string,
  handler: EventCallback
): void => {
  el?.removeEventListener(event, handler as EventListener);
};

export const once = (
  el: HTMLElement | Document | Window | null,
  event: string,
  handler: EventCallback
): void => {
  el?.addEventListener(event, handler as EventListener, { once: true });
};

export function delegate(
  parent: HTMLElement | Document,
  selector: string,
  event: string,
  callback: (e: Event, target: HTMLElement) => void
): void {
  parent.addEventListener(event, (e) => {
    const target = (e.target as HTMLElement).closest(selector);
    if (target) callback(e, target as HTMLElement);
  });
}

// 디바운스 & 쓰로틀
export function debounce<T extends AnyFn>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends AnyFn>(func: T, limit: number): (...args: Parameters<T>) => void {
  let waiting = false;

  return (...args: Parameters<T>) => {
    if (!waiting) {
      func(...args);
      waiting = true;
      setTimeout(() => (waiting = false), limit);
    }
  };
}

// 문자열 & 숫자
export const truncate = (str: string, len: number, suffix = "...") =>
  str.length <= len ? str : str.slice(0, len - suffix.length) + suffix;

export const formatNumber = (num: number) => num.toLocaleString("ko-KR");
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// 날짜 유틸
export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

// 저장소

export const setStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getStorage = <T>(key: string, fallback: T | null = null): T | null => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const removeStorage = (key: string) => localStorage.removeItem(key);

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
