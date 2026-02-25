/**
 * 토스 미니앱과 통신하기 위한 유틸리티 함수 모음입니다.
 * 실제 토스 앱 내부 웹뷰에서 실행될 때, window.TossApp 브리지를 통해 Native 기능을 호출합니다.
 */

export const isTossApp = () => {
    if (typeof window === "undefined") return false;
    return /TossApp/i.test(navigator.userAgent) || window.hasOwnProperty('TossApp');
};

export const hapticFeedback = (type: 'success' | 'warning' | 'error' | 'light' | 'medium' | 'heavy' = 'light') => {
    if (!isTossApp()) return;

    try {
        // 토스 앱 브리지 규격에 맞게 메시지 전송 (임의 규격 예시, 실제 토스 개발자 문서 참조 필요)
        if ((window as any).TossApp && (window as any).TossApp.postMessage) {
            (window as any).TossApp.postMessage(JSON.stringify({
                method: 'haptic',
                params: { type }
            }));
        } else if ((window as any).webkit?.messageHandlers?.TossApp) {
            (window as any).webkit.messageHandlers.TossApp.postMessage(JSON.stringify({
                method: 'haptic',
                params: { type }
            }));
        }
    } catch (e) {
        console.error("Toss app haptic failed:", e);
    }
};

export const shareToToss = (url: string, title?: string, description?: string) => {
    if (!isTossApp()) return;

    try {
        const payload = JSON.stringify({
            method: 'share',
            params: { url, title, description }
        });

        if ((window as any).TossApp && (window as any).TossApp.postMessage) {
            (window as any).TossApp.postMessage(payload);
        } else if ((window as any).webkit?.messageHandlers?.TossApp) {
            (window as any).webkit.messageHandlers.TossApp.postMessage(payload);
        }
    } catch (e) {
        console.error("Toss app share failed:", e);
    }
};
