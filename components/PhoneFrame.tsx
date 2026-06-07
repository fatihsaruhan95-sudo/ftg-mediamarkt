"use client";

import { useEffect, useState } from "react";

const SCREEN_WIDTH = 402;
const SCREEN_HEIGHT = 874;

/**
 * On desktop: renders children inside an iPhone 17 bezel.
 *   - outer chassis radius 72px, inner screen radius 68px
 *   - dynamic island is the only OS chrome the frame paints
 *     (pages paint their own 9:41 status bar so it can be light or dark)
 *
 * On phones (<=480px): drops the frame and lets children fill the viewport.
 */
export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 480px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMobile) {
    return <div className="relative h-[100dvh] w-screen overflow-hidden bg-white">{children}</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-10">
      <div className="relative shrink-0">
        <div
          className="relative rounded-[76px] p-[14px]"
          style={{
            background:
              "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 40%, #0f0f0f 100%)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08) inset, 0 30px 80px rgba(0,0,0,0.55), 0 8px 20px rgba(0,0,0,0.4)",
          }}
        >
          <span className="absolute -left-[3px] top-[120px] h-[34px] w-[3px] rounded-l bg-[#0a0a0a]" />
          <span className="absolute -left-[3px] top-[180px] h-[60px] w-[3px] rounded-l bg-[#0a0a0a]" />
          <span className="absolute -left-[3px] top-[260px] h-[60px] w-[3px] rounded-l bg-[#0a0a0a]" />
          <span className="absolute -right-[3px] top-[160px] h-[100px] w-[3px] rounded-r bg-[#0a0a0a]" />

          <div
            className="phone-screen relative overflow-hidden rounded-[68px] bg-white"
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
          >
            {/* Dynamic Island (hardware) */}
            <div className="pointer-events-none absolute left-1/2 top-[11px] z-[60] h-[36px] w-[124px] -translate-x-1/2 rounded-[18px] bg-black" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
