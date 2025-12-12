/**
 * data.types.ts
 * 모든 JSON 데이터 타입 정의
 */
// ============================================
// 타입 가드 함수
// ============================================
export function isPortfolioProject(obj) {
    return (typeof obj === 'object' &&
        obj !== null &&
        'id' in obj &&
        'title' in obj &&
        'category' in obj);
}
export function hasIntro(obj) {
    return (typeof obj === 'object' &&
        obj !== null &&
        'intro' in obj &&
        typeof obj.intro === 'object');
}
