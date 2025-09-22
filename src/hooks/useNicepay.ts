import { useEffect, useState, useCallback } from "react";
import { loadNicepay } from "@/lib/loadNicepay";

export function useNicepay() {
  const [ready, setReady] = useState(false);
  const [err, setErr] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    loadNicepay()
      .then(() => mounted && setReady(true))
      .catch((e) => mounted && setErr(e));
    return () => {
      mounted = false;
    };
  }, []);

  const requestPay = useCallback((opts: Record<string, any>) => {
    if (!window.AUTHNICE) throw new Error("NICEPAY not loaded");
    window.AUTHNICE.requestPay(opts);
  }, []);

  return { ready, error: err, requestPay };
}
