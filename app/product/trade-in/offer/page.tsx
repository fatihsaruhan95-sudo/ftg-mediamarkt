"use client";

export const dynamic = 'force-dynamic';

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight, Check, Info } from "lucide-react";
import PDPContent from "@/components/PDPContent";
import { MODELS } from "../model/models";
import { BRANDS } from "../brand/brands";

const CHECKS = [
  "Eski cihazınız ücretsiz kurye ile kapınızdan teslim alınır.",
  "Operasyon merkezimizde uzman ekip tarafından incelenir.",
  "Son teklif tarafınıza iletilir, onayınızla IBAN'ınıza ödenir.",
  "3.000 ₺'nin altında değerlendirilen cihazlara ödeme yapılmayacaktır.",
];

const TARGET_PRICE = 48999;
const LOADING_STEPS = [
  "Cihaz bilgileri alınıyor...",
  "Piyasa değeri hesaplanıyor...",
  "Ön teklif hazırlanıyor...",
];

function OfferContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const brandId = searchParams.get("brand") ?? "apple";
  const modelId = searchParams.get("model") ?? "";
  const brandName = BRANDS.find((b) => b.id === brandId)?.name ?? "Apple";
  const modelName = MODELS.find((m) => m.id === modelId)?.name ?? "";

  const [loadingStep, setLoadingStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [displayedPrice, setDisplayedPrice] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setLoadingStep(1), 700);
    const t2 = setTimeout(() => setLoadingStep(2), 1400);
    const t3 = setTimeout(() => setRevealed(true), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (!revealed) return;
    const duration = 1000;
    const steps = 60;
    const increment = TARGET_PRICE / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= TARGET_PRICE) {
        setDisplayedPrice(TARGET_PRICE);
        clearInterval(interval);
      } else {
        setDisplayedPrice(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [revealed]);

  return (
    <>
      <PDPContent />

      {/* Dim overlay */}
      <div className="absolute inset-0 z-30 bg-black/60" />

      {/* Sheet */}
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
              href={`/product?resume=true&brand=${brandId}&model=${modelId}&step=offer`}
              aria-label="Kapat"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e9e9eb] text-[#6b6b6b]"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Stepper — step 1 and step 2 full */}
        <div className="flex shrink-0 items-center gap-[4px] px-[20px] py-[4px]">
          <div className="h-[3px] flex-1 bg-[#DF0000]" />
          <div className="h-[3px] flex-1 bg-[#DF0000]" />
          {[3, 4, 5].map((s) => (
            <div key={s} className="h-[3px] flex-1 bg-[#cdd0d5]" />
          ))}
        </div>

        {/* Title */}
        <div className="flex shrink-0 flex-col gap-[4px] px-[20px] py-[12px]">
          <p className="text-[14px] leading-[18px] text-mm-gray">Adım 2 / 5</p>
          <p className="text-[16px] font-semibold leading-[20px] text-mm-black">Ön Teklif</p>
          <div className="flex items-center gap-[8px]">
            <Link
              href={`/product/trade-in/brand?brand=${brandId}`}
              className="text-[14px] font-semibold text-[#DF0000] underline"
            >
              {brandName}
            </Link>
            {modelName && (
              <Link
                href={`/product/trade-in/model?brand=${brandId}&model=${modelId}`}
                className="text-[14px] font-semibold text-[#DF0000] underline"
              >
                {modelName}
              </Link>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-[20px]">
          {/* Loading state */}
          {!revealed ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-[32px]">
              {/* Spinner */}
              <div className="h-[64px] w-[64px] animate-spin rounded-full border-[5px] border-[#e2e4e9] border-t-[#DF0000]" />
              {/* Steps */}
              <div className="flex flex-col items-center gap-[14px]">
                {LOADING_STEPS.map((label, i) => (
                  <div key={i} className={`flex items-center gap-[10px] transition-all duration-500 ${i <= loadingStep ? "opacity-100" : "opacity-20"}`}>
                    <div className={`h-[10px] w-[10px] rounded-full transition-colors duration-300 ${i < loadingStep ? "bg-[#DF0000]" : i === loadingStep ? "bg-[#DF0000] animate-pulse" : "bg-[#cdd0d5]"}`} />
                    <p className={`text-[18px] font-semibold transition-colors duration-300 ${i <= loadingStep ? "text-mm-black" : "text-[#cdd0d5]"}`}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
          {/* Offer card */}
          <div className="relative overflow-hidden rounded-[4px] bg-[#DF0000] px-[20px] py-[24px] animate-[fadeSlideUp_0.5s_ease_both]">
            <p className="text-center text-[18px] font-normal leading-[28px] tracking-[-0.43px] text-white">
              Toplam Ön Teklif Tutarı
            </p>
            <div className="relative my-[8px] flex items-center justify-center">
              <div className="absolute h-[42px] w-[162px] rounded-[2px] bg-mm-black" />
              <p className="relative text-center text-[36px] font-black italic leading-[40px] tracking-[-0.43px] text-white">
                ₺{displayedPrice.toLocaleString("tr-TR")}
              </p>
            </div>
            <p className="text-center text-[12px] font-normal leading-[28px] tracking-[-0.43px] text-white">
              {brandName} {modelName} için geri alım değeri
            </p>
          </div>

          {/* Info note */}
          <div className="mt-[8px] flex items-center gap-[8px] rounded-[6px] bg-[#f6f8fa] p-[8px]">
            <Info className="h-[14px] w-[14px] shrink-0 text-mm-black" strokeWidth={2} />
            <p className="text-[12px] leading-[normal] text-black">
              Ön teklif tutarı cihaz durumuyla ilgili soruları yanıtladığınızda güncellenebilir.
            </p>
          </div>
            </>
          )}

          {/* Check list — only shown after reveal */}
          {revealed && (
            <div className="mt-[16px] flex flex-col gap-[4px]">
              <p className="mb-[8px] text-[16px] font-semibold leading-[20px] text-mm-black">Süreç nasıl ilerleyecek?</p>
              {CHECKS.map((text, i) => (
                <div key={i} className="flex items-start gap-[4px]">
                  <div className="mt-[2px] flex h-[20px] w-[20px] shrink-0 items-center justify-center">
                    <Check className="h-[16px] w-[16px] text-[#DF0000]" strokeWidth={2.5} />
                  </div>
                  <p className="text-[13px] leading-[24px] tracking-[-0.43px] text-mm-black">{text}</p>
                </div>
              ))}
            </div>
          )}

          <div className="h-[16px]" />
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-mm-border bg-white px-[20px] pt-[12px]" style={{ paddingBottom: "8px" }}>
          <div className="flex items-center gap-[12px]">
            <Link
              href={`/product/trade-in/model?brand=${brandId}&model=${modelId}`}
              aria-label="Geri"
              className="flex h-[48px] w-[56px] items-center justify-center rounded-[6px] border border-[#cdd0d5] bg-white"
            >
              <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.2} />
            </Link>
            <button
              onClick={() => router.push(`/product/trade-in/questions?brand=${brandId}&model=${modelId}`)}
              className="flex h-[48px] flex-1 items-center justify-center gap-[4px] rounded-[6px] bg-black text-white active:scale-[0.99]"
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

export default function OfferPage() {
  return <Suspense fallback={null}><OfferContent /></Suspense>;
}
