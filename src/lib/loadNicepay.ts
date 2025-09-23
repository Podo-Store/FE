// 스크립트 로더 유틸
let loadingPromise: Promise<typeof window.AUTHNICE> | null = null;

export function loadNicepay(): Promise<typeof window.AUTHNICE> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Window not available"));
  }
  if (window.AUTHNICE) {
    return Promise.resolve(window.AUTHNICE);
  }
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    const src = import.meta.env.VITE_NICEPAY_SDK_URL as string;
    if (!src) {
      reject(new Error("VITE_NICEPAY_SDK_URL is not set"));
      return;
    }

    // 이미 붙어있나 체크
    if ([...document.scripts].some((s) => s.src === src)) {
      const check = () => {
        if (window.AUTHNICE) resolve(window.AUTHNICE);
        else setTimeout(check, 50);
      };
      check();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true; // 동적 로드에 적합
    script.onload = () => {
      if (window.AUTHNICE) resolve(window.AUTHNICE);
      else reject(new Error("AUTHNICE not found after load"));
    };
    script.onerror = () => reject(new Error("Failed to load NICEPAY SDK"));
    document.head.appendChild(script);
  });

  return loadingPromise;
}

declare global {
  interface Window {
    AUTHNICE?: {
      requestPay(opts: Record<string, any>): void;
    };
  }
}
