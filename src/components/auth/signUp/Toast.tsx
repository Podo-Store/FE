import { useEffect } from "react";

type ToastProps = {
  message: string;
  duration?: number; // ms
  onClose: () => void;
};

export default function Toast({
  message,
  duration = 1000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="
        fixed left-1/2 top-40 -translate-x-1/2
        z-[9999]
        flex items-center gap-2
        rounded-full bg-[var(--grey2)] px-[52px] py-[14px]
        shadow-[0_2px_10px_rgba(0,0,0,0.25)]
        animate-toast-in-out
        h4-medium whitespace-pre-wrap"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M21.8437 11.0312H20.378C20.0593 11.0312 19.7562 11.1844 19.5687 11.4469L14.6562 18.2594L12.4312 15.1719C12.2437 14.9125 11.9437 14.7562 11.6218 14.7562H10.1562C9.95303 14.7562 9.83428 14.9875 9.95303 15.1531L13.8468 20.5531C13.9388 20.6815 14.06 20.7861 14.2005 20.8583C14.341 20.9305 14.4967 20.9681 14.6546 20.9681C14.8125 20.9681 14.9682 20.9305 15.1087 20.8583C15.2492 20.7861 15.3704 20.6815 15.4624 20.5531L22.0437 11.4281C22.1655 11.2625 22.0468 11.0312 21.8437 11.0312Z"
            fill="#6A39C0"
            stroke="#6A39C0"
          />
          <path
            d="M16 2C8.26875 2 2 8.26875 2 16C2 23.7313 8.26875 30 16 30C23.7313 30 30 23.7313 30 16C30 8.26875 23.7313 2 16 2ZM16 27.625C9.58125 27.625 4.375 22.4188 4.375 16C4.375 9.58125 9.58125 4.375 16 4.375C22.4188 4.375 27.625 9.58125 27.625 16C27.625 22.4188 22.4188 27.625 16 27.625Z"
            fill="#6A39C0"
            stroke="#6A39C0"
          />
        </svg>
      </span>
      <span className="whitespace-nowrap">{message}</span>
    </div>
  );
}
