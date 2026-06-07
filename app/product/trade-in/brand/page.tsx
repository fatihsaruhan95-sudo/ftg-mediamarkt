"use client";

export const dynamic = 'force-dynamic';

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { X, Search, ChevronLeft, ChevronRight, Info } from "lucide-react";
import PDPContent from "@/components/PDPContent";
import { BRANDS } from "./brands";

function BrandContent() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string | null>(searchParams.get("brand"));
  const [query, setQuery] = useState("");
  const router = useRouter();
  const filtered = BRANDS.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase())
  );
  const canContinue = selected !== null;

  return (
    <>
      <PDPContent />

      {/* Dim overlay */}
      <div className="absolute inset-0 z-30 bg-black/60" />

      {/* Full-screen sheet */}
      <div className="absolute inset-x-0 bottom-0 z-40 flex flex-col rounded-tl-[38px] rounded-tr-[38px] bg-white shadow-[0_15px_37.5px_rgba(0,0,0,0.18)]" style={{ height: "min(818px, 92dvh)", maxHeight: "92dvh" }}>
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
              href={`/product?resume=true&brand=${selected ?? ""}&step=brand`}
              aria-label="Kapat"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e9e9eb] text-[#6b6b6b]"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex shrink-0 items-center gap-[4px] px-[20px] py-[4px]">
          <div className="h-[3px] flex-1 overflow-hidden bg-[#cdd0d5]">
            <div className="h-full w-1/2 bg-[#DF0000]" />
          </div>
          {[2, 3, 4, 5].map((s) => (
            <div key={s} className="h-[3px] flex-1 bg-[#cdd0d5]" />
          ))}
        </div>

        {/* Title */}
        <div className="flex shrink-0 flex-col gap-[2px] px-[20px] py-[12px]">
          <p className="text-[14px] leading-[18px] text-mm-gray">Adım 1 / 5</p>
          <p className="text-[16px] font-semibold leading-[20px] text-mm-black">
            Eski Cihaz Bilgisi
          </p>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-[20px]">
          {/* Search */}
          <div className="flex h-[44px] items-center gap-[8px] rounded-[8px] bg-[#f5f5f5] px-[12px]">
            <Search className="h-[18px] w-[18px] text-[#868c98]" strokeWidth={2} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Marka ara"
              className="flex-1 bg-transparent text-[14px] text-mm-black outline-none placeholder:text-[#868c98]"
            />
          </div>

          {/* Brand grid */}
          <div className="mt-[16px] grid grid-cols-3 gap-[10px]">
            {filtered.map((b, i) => {
              const active = selected === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelected(selected === b.id ? null : b.id)}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className={`model-row-enter flex h-[100px] flex-col items-center justify-center gap-[6px] rounded-[8px] border bg-white transition-colors ${
                    active
                      ? "border-[#DF0000] border-2"
                      : "border-[#e2e4e9]"
                  }`}
                >
                  <div className="relative h-[36px] w-[70px]">
                    <Image
                      src={b.logo}
                      alt={b.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span
                    className={`text-[13px] font-medium ${
                      active ? "text-mm-black" : "text-[#868c98]"
                    }`}
                  >
                    {b.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Info banner */}
          <div className="mt-[16px] flex items-center gap-[8px] rounded-[6px] bg-[#f6f8fa] p-[10px]">
            <Info className="h-[14px] w-[14px] shrink-0 text-mm-black" strokeWidth={2} />
            <p className="text-[12px] leading-[16px] text-black">
              Listede markanızı bulamadıysanız, cihazınız bu kampanya kapsamında
              değerlendirilemeyebilir.
            </p>
          </div>

          <div className="h-[16px]" />
        </div>

        {/* Footer with 32px bottom padding */}
        <div className="shrink-0 border-t border-mm-border bg-white px-[20px] pt-[12px]" style={{ paddingBottom: "8px" }}>
          <div className="flex items-center gap-[12px]">
            <Link
              href="/product/trade-in"
              aria-label="Geri"
              className="flex h-[48px] w-[56px] items-center justify-center rounded-[6px] border border-[#cdd0d5] bg-white"
            >
              <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.2} />
            </Link>
            <button
              disabled={!canContinue}
              onClick={() =>
                canContinue && router.push(`/product/trade-in/model?brand=${selected}`)
              }
              className={`flex h-[48px] flex-1 items-center justify-center gap-[4px] rounded-[6px] transition-colors ${
                canContinue
                  ? "bg-black text-white active:scale-[0.99]"
                  : "bg-[#e2e4e9] text-[#868c98] cursor-not-allowed"
              }`}
            >
              <span className="text-[14px] font-semibold">Devam et</span>
              <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function BrandSelectionPage() {
  return <Suspense fallback={null}><BrandContent /></Suspense>;
}
