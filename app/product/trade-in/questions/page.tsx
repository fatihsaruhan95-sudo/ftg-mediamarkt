"use client";

export const dynamic = 'force-dynamic';

import { Suspense, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PDPContent from "@/components/PDPContent";
import { BRANDS } from "../brand/brands";
import { MODELS } from "../model/models";

const QUESTIONS = [
  "Ürünün kasasında eziklik, çatlak veya kırık var mı?",
  "Ürünün kasasında çizik, boya soyulması ya da aşınma var mı?",
  "Ürün ekranında çizik veya deformasyon var mı?",
  "Ürünün parmak izi okumada veya yüz tanımada problemi var mı?",
  "Ürün ekranında kırık, eksik piksel, ekran yanığı ya da gölgelenme var mı?",
  "Ürünün ön kamerasında problem var mı?",
  "Ürünün arka kamerasında problem var mı?",
  "Ürünün açılmasında problem var mı?",
  "Ürünün pil sağlığı %85'ten düşük mü?",
  "Ürünün Wi-Fi veya Bluetooth bağlantısında problem var mı?",
];

function QuestionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const brandId = searchParams.get("brand") ?? "apple";
  const modelId = searchParams.get("model") ?? "";
  const brandName = BRANDS.find((b) => b.id === brandId)?.name ?? "Apple";
  const modelName = MODELS.find((m) => m.id === modelId)?.name ?? "";

  const BASE_PRICE = 48999;
  const [answers, setAnswers] = useState<Record<number, "evet" | "hayir">>({});
  const answeredCount = Object.keys(answers).length;
  const canContinue = answeredCount === QUESTIONS.length;
  const evetCount = Object.values(answers).filter((a) => a === "evet").length;
  const targetPrice = BASE_PRICE - evetCount * 2000;
  const [displayedPrice, setDisplayedPrice] = useState(BASE_PRICE);

  useEffect(() => {
    if (displayedPrice === targetPrice) return;
    const diff = targetPrice - displayedPrice;
    const step = diff < 0 ? -200 : 200;
    const timer = setTimeout(() => {
      setDisplayedPrice((prev) => {
        const next = prev + step;
        if (diff < 0 && next <= targetPrice) return targetPrice;
        if (diff > 0 && next >= targetPrice) return targetPrice;
        return next;
      });
    }, 20);
    return () => clearTimeout(timer);
  }, [displayedPrice, targetPrice]);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const answer = (index: number, value: "evet" | "hayir") => {
    setAnswers((prev) => {
      const next = { ...prev, [index]: value };
      const nextUnanswered = QUESTIONS.findIndex((_, i) => i > index && next[i] === undefined);
      if (nextUnanswered !== -1 && index >= 3) {
        setTimeout(() => {
          const container = scrollContainerRef.current;
          const target = questionRefs.current[nextUnanswered];
          if (container && target) {
            const containerRect = container.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const scrollAmount = targetRect.bottom - containerRect.bottom + 12;
            container.scrollBy({ top: scrollAmount, behavior: "smooth" });
          }
        }, 50);
      }
      return next;
    });
  };

  const params = `brand=${brandId}&model=${modelId}`;

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
              href={`/product?resume=true&brand=${brandId}&model=${modelId}&step=questions`}
              aria-label="Kapat"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e9e9eb] text-[#6b6b6b]"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Stepper — step 1 full, step 2 full, step 3 in-progress */}
        <div className="flex shrink-0 items-center gap-[4px] px-[20px] py-[4px]">
          <div className="h-[3px] flex-1 bg-[#DF0000]" />
          <div className="h-[3px] flex-1 bg-[#DF0000]" />
          <div className="h-[3px] flex-1 overflow-hidden bg-[#cdd0d5]">
            <div
              className="h-full bg-[#DF0000] transition-all duration-300"
              style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
            />
          </div>
          <div className="h-[3px] flex-1 bg-[#cdd0d5]" />
          <div className="h-[3px] flex-1 bg-[#cdd0d5]" />
        </div>

        {/* Title */}
        <div className="flex shrink-0 flex-col gap-[4px] px-[20px] py-[12px]">
          <p className="text-[14px] leading-[18px] text-mm-gray">Adım 3 / 5</p>
          <div className="flex items-start justify-between">
            <p className="text-[16px] font-semibold leading-[20px] text-mm-black">
              Cihaz Değerlendirme
            </p>
            <p className="text-[14px] text-mm-black">
              <span className="font-medium">Ön teklif: </span>
              <span className="text-[16px] font-black italic">
                ₺{displayedPrice.toLocaleString("tr-TR")}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-[8px]">
            <Link
              href={`/product/trade-in/brand?brand=${brandId}`}
              className="text-[14px] font-semibold text-[#DF0000] underline"
            >
              {brandName}
            </Link>
            {modelName && (
              <Link
                href={`/product/trade-in/model?${params}`}
                className="text-[14px] font-semibold text-[#DF0000] underline"
              >
                {modelName}
              </Link>
            )}
          </div>
        </div>

        {/* Questions list */}
        <div ref={scrollContainerRef} className="min-h-0 flex-1 overflow-y-auto px-[20px]">
          <div className="flex flex-col gap-[12px] pb-[16px]">
            {QUESTIONS.map((q, i) => {
              const ans = answers[i];
              return (
                <div
                  key={i}
                  ref={(el) => { questionRefs.current[i] = el; }}
                  className="flex flex-col gap-[12px] rounded-[12px] border border-[#e2e4e9] bg-white px-[12px] py-[16px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]"
                >
                  <p className="text-[13px] font-medium leading-[20px] text-mm-black">
                    {q}
                  </p>
                  <div className="flex gap-[8px]">
                    <button
                      onClick={() => answer(i, "evet")}
                      className={`flex h-[40px] flex-1 items-center justify-center rounded-[6px] border text-[14px] font-semibold transition-colors ${
                        ans === "evet"
                          ? "border-mm-black bg-mm-black text-white"
                          : "border-[#cdd0d5] bg-white text-mm-black"
                      }`}
                    >
                      Evet
                    </button>
                    <button
                      onClick={() => answer(i, "hayir")}
                      className={`flex h-[40px] flex-1 items-center justify-center rounded-[6px] border text-[14px] font-semibold transition-colors ${
                        ans === "hayir"
                          ? "border-mm-red bg-mm-red text-white"
                          : "border-[#cdd0d5] bg-white text-mm-black"
                      }`}
                    >
                      Hayır
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-mm-border bg-white px-[20px] pt-[12px]" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 20px)" }}>
          <div className="flex items-center gap-[12px]">
            <Link
              href={`/product/trade-in/offer?${params}`}
              aria-label="Geri"
              className="flex h-[48px] w-[56px] items-center justify-center rounded-[6px] border border-[#cdd0d5] bg-white"
            >
              <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.2} />
            </Link>
            <button
              disabled={!canContinue}
              onClick={() => canContinue && router.push(`/product/trade-in/delivery?${params}`)}
              className={`flex h-[48px] flex-1 items-center justify-center gap-[4px] rounded-[6px] transition-colors ${
                canContinue
                  ? "bg-black text-white active:scale-[0.99]"
                  : "cursor-not-allowed bg-[#e2e4e9] text-[#868c98]"
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

export default function QuestionsPage() {
  return <Suspense fallback={null}><QuestionsContent /></Suspense>;
}
