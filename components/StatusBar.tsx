/**
 * iPhone status bar: paints 9:41, cellular, wifi, battery.
 * Sits absolute at top of the phone screen with z-50 (above page content,
 * below the dynamic island painted by PhoneFrame).
 */
export default function StatusBar({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const fg = variant === "light" ? "#ffffff" : "#000000";
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-50 hidden h-[54px] items-center justify-between px-[28px] pt-[14px] sm:flex">
      <span
        className="text-[17px] font-semibold tracking-[-0.4px]"
        style={{ color: fg, fontFamily: "SF Pro Text, system-ui" }}
      >
        9:41
      </span>
      <span className="flex items-center gap-[6px]">
        {/* Cellular */}
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill={fg} />
          <rect x="5" y="5" width="3" height="6" rx="0.5" fill={fg} />
          <rect x="10" y="2.5" width="3" height="8.5" rx="0.5" fill={fg} />
          <rect x="15" y="0" width="3" height="11" rx="0.5" fill={fg} />
        </svg>
        {/* Wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path
            d="M8 2.2c2.4 0 4.6 0.9 6.3 2.3l1.2-1.4C13.4 1.3 10.8 0.2 8 0.2S2.6 1.3 0.5 3.1l1.2 1.4C3.4 3.1 5.6 2.2 8 2.2zM8 5.4c1.5 0 2.9 0.6 4 1.5l1.2-1.4C11.8 4.3 10 3.6 8 3.6s-3.8 0.7-5.2 1.9l1.2 1.4c1.1-0.9 2.5-1.5 4-1.5zM8 8.6c0.7 0 1.4 0.3 1.9 0.7l-1.9 2.2-1.9-2.2c0.5-0.4 1.2-0.7 1.9-0.7z"
            fill={fg}
          />
        </svg>
        {/* Battery */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="12"
            rx="3"
            stroke={fg}
            strokeOpacity="0.4"
            fill="none"
          />
          <rect x="2" y="2" width="19" height="9" rx="1.5" fill={fg} />
          <rect x="24" y="4.5" width="1.5" height="4" rx="0.5" fill={fg} opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}
