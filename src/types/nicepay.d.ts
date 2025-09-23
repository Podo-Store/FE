export {};

declare global {
  interface Window {
    AUTHNICE?: NicepaySDK;
  }
}

type NicepaySDK = {
  requestPay: (opts: Record<string, any>) => void;
};