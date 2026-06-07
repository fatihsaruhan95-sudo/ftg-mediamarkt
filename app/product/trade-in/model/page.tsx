"use client";

export const dynamic = 'force-dynamic';

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import PDPContent from "@/components/PDPContent";
import { MODELS } from "./models";

function ModelContent() {
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand") ?? "apple";
  const [selected, setSelected] = useState<string | null>(searchParams.get("model"));
  const canContinue = selected !== null;
  const router = useRouter();

  return (
    <>
      <PDPContent />

      {/* Dim overlay */}
      <div className="absolute inset-0 z-30 bg-black/60" />

      {/* Full-screen sheet */}
      <div className="absolute inset-x-0 bottom-0 z-40 flex h-[818px] max-h-[818px] flex-col rounded-tl-[38px] rounded-tr-[38px] bg-white shadow-[0_15px_37.5px_rgba(0,0,0,0.18)]">
        {/* Toolbar */}
        <div className="flex shrink-0 flex-col items-center gap-[4px] pt-[5px] pb-[10px]">
          <div className="h-[5px] w-[36px] rounded-full bg-[#ccc]" />
          <div className="relative flex h-[45px] w-full items-center justify-between px-[16px]">
            <div className="absolute left-1/2 top-[2px] -translate-x-1/2 text-center">
              <p className="text-[11px] leading-[14px] text-mm-gray">Yeni cihaz</p>
              <p className="text-[16px] font-semibold leading-[20px] tracking-[-0.43px] text-mm-black">
                Samsung Galaxy S26 Ultra
              </p>
            </div>
            <span className="w-[32px]" />
            <Link
              href={`/product?resume=true&brand=${brand}&model=${selected ?? ""}&step=model`}
              aria-label="Kapat"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e9e9eb] text-[#6b6b6b]"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Stepper — step 1 still active */}
        <div className="flex shrink-0 items-center gap-[4px] px-[20px] py-[4px]">
          <div className="h-[3px] flex-1 overflow-hidden bg-[#cdd0d5]">
            <div className="h-full w-full bg-[#DF0000]" />
          </div>
          {[2, 3, 4, 5].map((s) => (
            <div key={s} className="h-[3px] flex-1 bg-[#cdd0d5]" />
          ))}
        </div>

        {/* Title + breadcrumb */}
        <div className="flex shrink-0 flex-col gap-[4px] px-[20px] py-[12px]">
          <p className="text-[14px] leading-[18px] text-mm-gray">Adım 1 / 5</p>
          <p className="text-[16px] font-semibold leading-[20px] text-mm-black">
            Eski Cihaz Bilgisi
          </p>
          <div className="flex items-center gap-[6px]">
            <Link
              href={`/product/trade-in/brand?brand=${brand}`}
              className="text-[14px] font-semibold text-[#DF0000] underline"
            >
              Apple
            </Link>
            {selected && (
              <span className="text-[14px] font-semibold text-[#DF0000] underline">
                {MODELS.find((m) => m.id === selected)?.name}
              </span>
            )}
          </div>
        </div>

        {/* Body — model list */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="px-[20px]">
            {MODELS.map((m, i) => {
              const active = selected === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className={`model-row-enter flex w-full items-center justify-between gap-[12px] py-[14px] ${
                    i > 0 ? "border-t border-[#eef0f3]" : ""
                  }`}
                >
                  <div className="flex items-center gap-[10px]">
                    <span
                      className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${
                        active ? "border-[#DF0000]" : "border-[#cdd0d5]"
                      }`}
                    >
                      {active && (
                        <span className="h-[8px] w-[8px] rounded-full bg-[#DF0000]" />
                      )}
                    </span>
                    <span
                      className={`text-[14px] ${
                        active
                          ? "font-semibold text-mm-black"
                          : "text-mm-black"
                      }`}
                    >
                      {m.name}
                    </span>
                  </div>
                  <span
                    className={`text-[13px] font-medium ${
                      active ? "text-[#DF0000]" : "text-[#525866]"
                    }`}
                  >
                    {m.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Info banner */}
          <div className="mx-[20px] mt-[12px] flex items-center gap-[8px] rounded-[6px] bg-[#f6f8fa] p-[10px]">
            <Info className="h-[14px] w-[14px] shrink-0 text-mm-black" strokeWidth={2} />
            <p className="text-[12px] leading-[16px] text-black">
              Listede modelinizi bulamadıysanız, cihazınız bu kampanya kapsamında
              değerlendirilemeyebilir.
            </p>
          </div>

          <div className="h-[16px]" />
        </div>

        {/* Footer with 32px bottom padding */}
        <div className="shrink-0 border-t border-mm-border bg-white px-[20px] pt-[12px] pb-[48px]">
          <div className="flex items-center gap-[12px]">
            <Link
              href={`/product/trade-in/brand?brand=${brand}`}
              aria-label="Geri"
              className="flex h-[48px] w-[56px] items-center justify-center rounded-[6px] border border-[#cdd0d5] bg-white"
            >
              <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.2} />
            </Link>
            <button
              disabled={!canContinue}
              onClick={() => canContinue && router.push(`/product/trade-in/offer?brand=${brand}&model=${selected}`)}
              className={`flex h-[48px] flex-1 items-center justify-center gap-[4px] rounded-[6px] transition-colors ${
                canContinue
                  ? "bg-black text-white active:scale-[0.99]"
                  : "bg-[#e2e4e9] text-[#868c98] cursor-not-allowed"
              }`}
            >
              <span className="text-[14px] font-semibold">Ön teklifi gör</span>
              <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ModelSelectionPage() {
  return <Suspense fallback={null}><ModelContent /></Suspense>;
}
