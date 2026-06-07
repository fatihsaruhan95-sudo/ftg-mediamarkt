"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import PDPContent from "@/components/PDPContent";
import { BRANDS } from "./trade-in/brand/brands";
import { MODELS } from "./trade-in/model/models";

const STEP_LABELS: Record<string, string> = {
  brand: "Marka seçiminden devam edin",
  model: "Model seçiminden devam edin",
  offer: "Ön teklifinizi görüntüleyin",
  questions: "Cihaz değerlendirmesine devam edin",
  delivery: "Teslimat bilgilerini tamamlayın",
  summary: "Kişisel bilgilerinizi girin",
  confirmation: "İşlem özetini inceleyin",
};

const STEP_HREFS: Record<string, (brand: string, model: string) => string> = {
  brand: (b) => `/product/trade-in/brand?brand=${b}`,
  model: (b, m) => `/product/trade-in/model?brand=${b}&model=${m}`,
  offer: (b, m) => `/product/trade-in/offer?brand=${b}&model=${m}`,
  questions: (b, m) => `/product/trade-in/questions?brand=${b}&model=${m}`,
  delivery: (b, m) => `/product/trade-in/delivery?brand=${b}&model=${m}`,
  summary: (b, m) => `/product/trade-in/summary?brand=${b}&model=${m}`,
  confirmation: (b, m) => `/product/trade-in/confirmation?brand=${b}&model=${m}`,
};

function ResumeWidget() {
  const searchParams = useSearchParams();
  const resume = searchParams.get("resume") === "true";
  const brandId = searchParams.get("brand") ?? "";
  const modelId = searchParams.get("model") ?? "";
  const step = searchParams.get("step") ?? "brand";
  const [dismissed, setDismissed] = useState(false);

  if (!resume || dismissed) return null;

  const brandName = BRANDS.find((b) => b.id === brandId)?.name ?? "";
  const modelName = MODELS.find((m) => m.id === modelId)?.name ?? "";
  const resumeHref = STEP_HREFS[step]?.(brandId, modelId) ?? "/product/trade-in";
  const stepLabel = STEP_LABELS[step] ?? "Kaldığınız yerden devam edin";

  return (
    <div className="absolute inset-x-0 bottom-[88px] z-20 px-[16px]">
      <div className="relative flex items-center gap-[12px] rounded-[16px] bg-mm-black px-[16px] py-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.28)]">
          <button
            onClick={() => setDismissed(true)}
            className="absolute -top-[8px] -right-[8px] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#444] shadow"
          >
            <X className="h-[12px] w-[12px] text-white" strokeWidth={2.5} />
          </button>
        <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <p className="text-[11px] font-medium leading-[14px] text-white/60">
            {brandName && modelName ? `${brandName} ${modelName}` : "Eskiyi Getir, Yeniyi Götür"}
          </p>
          <p className="text-[13px] font-semibold leading-[18px] text-white">{stepLabel}</p>
          <div className="mt-[2px] flex items-center gap-[4px]">
            <span className="rounded-[3px] bg-[#DF0000] px-[6px] py-[1px] text-[11px] font-black italic text-white">
              ₺48.999
            </span>
            <span className="text-[11px] text-white/50">ön teklif</span>
          </div>
        </div>
        <Link
          href={resumeHref}
          className="flex h-[40px] shrink-0 items-center gap-[4px] rounded-[10px] bg-[#DF0000] px-[14px]"
        >
          <span className="text-[13px] font-bold text-white">Devam et</span>
          <ChevronRight className="h-[16px] w-[16px] text-white" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <div className="relative h-full w-full">
      <PDPContent />
      <Suspense fallback={null}>
        <ResumeWidget />
      </Suspense>
    </div>
  );
}
