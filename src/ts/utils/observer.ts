/**
 * observer.ts
 * IntersectionObserver 공용 유틸
 * - 특정 요소를 관찰해 콜백 실행
 * - 한 번만 실행되는 observeOnce
 * - 여러 섹션을 감지하는 observeSections
 */

// 기본 Observer 옵션 타입
export interface ObserverOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * 개별 요소 관찰 (여러 번 콜백 실행)
 */
export function observe(
  selector: string,
  callback: (el: HTMLElement) => void,
  options: ObserverOptions = {}
): IntersectionObserver | null {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (elements.length === 0) return null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target as HTMLElement);
      }
    });
  }, options);

  elements.forEach((el) => observer.observe(el));

  return observer;
}

/**
 * 한 번만 실행되는 Observer
 */
export function observeOnce(
  selector: string,
  callback: (el: HTMLElement) => void,
  options: ObserverOptions = {}
): IntersectionObserver | null {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (elements.length === 0) return null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        callback(el);
        observer.unobserve(el); // 한 번 실행 후 중지
      }
    });
  }, options);

  elements.forEach((el) => observer.observe(el));

  return observer;
}

/**
 * 섹션 스크롤 스파이 (header.ts, anchorNav.ts 등에서 재사용 가능)
 */
export function observeSections(
  selector: string,
  callback: (id: string, el: HTMLElement) => void,
  options: ObserverOptions = { threshold: 0.5 }
): IntersectionObserver | null {
  const sections = document.querySelectorAll<HTMLElement>(selector);
  if (sections.length === 0) return null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target as HTMLElement;
      const id = el.id;

      callback(id, el);
    });
  }, options);

  sections.forEach((sec) => observer.observe(sec));

  return observer;
}
