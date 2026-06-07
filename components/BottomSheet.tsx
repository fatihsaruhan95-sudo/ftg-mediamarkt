"use client";

import { X } from "lucide-react";
import Link from "next/link";

type Props = {
  title?: string;
  /** Where the X-close button should navigate to. */
  closeHref: string;
  /** Bottom sheet height in px (default fills most of the screen). */
  height?: number;
  children: React.ReactNode;
  /** Sticky footer content (action buttons). Wrapped with 32px bottom padding per project rule. */
  footer?: React.ReactNode;
};

export default function BottomSheet({
  title,
  closeHref,
  height,
  children,
  footer,
}: Props) {
  return (
    <>
      {/* Dim overlay over the underlying screen */}
      <div className="absolute inset-0 z-30 bg-black/60" />

      {/* Sheet */}
      <div
        className="absolute inset-x-0 bottom-0 z-40 flex flex-col rounded-tl-[38px] rounded-tr-[38px] bg-white shadow-[0_15px_37.5px_rgba(0,0,0,0.18)]"
        style={{ height: "min(818px, 92dvh)", maxHeight: "92dvh" }}
      >
        {/* Toolbar */}
        <div className="flex shrink-0 flex-col items-center pt-[5px]">
          <div className="h-[5px] w-[36px] rounded-full bg-[#ccc]" />
          <div className="relative mt-[6px] flex h-[32px] w-full items-center justify-end px-[16px]">
            {title && (
              <p className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold tracking-[-0.43px] text-mm-black">
                {title}
              </p>
            )}
            <Link
              href={closeHref}
              aria-label="Kapat"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e9e9eb] text-[#6b6b6b] active:bg-[#dcdce0]"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>

        {/* Footer with 32px bottom padding (project rule) */}
        {footer && (
          <div className="shrink-0 border-t border-mm-border bg-white px-[20px] pt-[12px]" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
