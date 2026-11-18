import { useEffect, useState } from "react";

/** Tracks the browser online/offline status. */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState<boolean>(() =>
    // SSR has no meaningful navigator.onLine; assume online to avoid a flash.
    typeof navigator === "undefined" || navigator.onLine !== false,
  );

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return online;
}