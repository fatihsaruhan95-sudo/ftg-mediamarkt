"use client";

export const dynamic = 'force-dynamic';

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PDPContent from "@/components/PDPContent";
import { BRANDS } from "../brand/brands";
import { MODELS } from "../model/models";

const CITIES = [
  "Adana", "Ankara", "Antalya", "Bursa", "Eskişehir", "Gaziantep",
  "İstanbul", "İzmir", "Kayseri", "Konya", "Mersin", "Samsun",
];

const DISTRICTS: Record<string, string[]> = {
  "İstanbul": ["Kadıköy", "Beşiktaş", "Üsküdar", "Şişli", "Bakırköy", "Beyoğlu", "Fatih", "Maltepe", "Ataşehir", "Pendik"],
  "Ankara": ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut", "Sincan"],
  "İzmir": ["Konak", "Bornova", "Karşıyaka", "Buca", "Çiğli", "Menemen"],
  default: ["Merkez"],
};

function DeliveryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const brandId = searchParams.get("brand") ?? "apple";
  const modelId = searchParams.get("model") ?? "";
  const brandName = BRANDS.find((b) => b.id === brandId)?.name ?? "Apple";
  const modelName = MODELS.find((m) => m.id === modelId)?.name ?? "";

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [shipping, setShipping] = useState<"courier" | "cargo" | null>(null);

  const districts = city ? (DISTRICTS[city] ?? DISTRICTS["default"]) : [];
  const canContinue = city !== "" && district !== "" && address.trim() !== "" && shipping !== null;
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
              href={`/product?resume=true&brand=${brandId}&model=${modelId}&step=delivery`}
              aria-label="Kapat"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e9e9eb] text-[#6b6b6b]"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Stepper — step 1 partial, steps 2+3 full, step 4 partial, step 5 gray */}
        <div className="flex shrink-0 items-center gap-[4px] px-[20px] py-[4px]">
          <div className="h-[3px] flex-1 overflow-hidden bg-[#cdd0d5]">
            <div className="h-full w-[70px] bg-[#DF0000]" />
          </div>
          <div className="h-[3px] flex-1 bg-[#DF0000]" />
          <div className="h-[3px] flex-1 bg-[#DF0000]" />
          <div className="h-[3px] flex-1 overflow-hidden bg-[#cdd0d5]">
            <div className={`h-full bg-[#DF0000] transition-all duration-300 ${canContinue ? "w-[70px]" : "w-[36px]"}`} />
          </div>
          <div className="h-[3px] flex-1 bg-[#cdd0d5]" />
        </div>

        {/* Title */}
        <div className="flex shrink-0 flex-col gap-[4px] px-[20px] py-[12px]">
          <p className="text-[14px] leading-[18px] text-mm-gray">Adım 4 / 5</p>
          <div className="flex items-start justify-between">
            <p className="text-[16px] font-semibold leading-[20px] text-mm-black">
              Teslimat Bilgileri
            </p>
            <p className="text-[14px] text-mm-black">
              <span className="font-medium">Ön teklif: </span>
              <span className="text-[16px] font-black italic">₺48.999</span>
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

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-[20px]">
          {/* Address section */}
          <div className="flex flex-col gap-[12px] pt-[8px]">
            <p className="text-[16px] font-semibold leading-[18px] text-mm-black">
              Cihazınızı hangi adresten göndereceksiniz?
            </p>

            {/* İl + İlçe */}
            <div className="flex gap-[12px]">
              <div className="flex flex-1 flex-col gap-[4px]">
                <label className="text-[14px] font-medium text-[#525866]">İl</label>
                <select
                  value={city}
                  onChange={(e) => { setCity(e.target.value); setDistrict(""); }}
                  className="h-[48px] w-full rounded-[10px] border border-[#e2e4e9] bg-white px-[12px] text-[14px] font-semibold text-mm-black shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] outline-none appearance-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23525866' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
                >
                  <option value="">Seçin</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-1 flex-col gap-[4px]">
                <label className="text-[14px] font-medium text-[#525866]">İlçe</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!city}
                  className="h-[48px] w-full rounded-[10px] border border-[#e2e4e9] bg-white px-[12px] text-[14px] font-semibold text-mm-black shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] outline-none appearance-none disabled:opacity-50"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23525866' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
                >
                  <option value="">Seçin</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Adres */}
            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] font-medium text-[#525866]">Adres</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Adresinizi girin"
                rows={3}
                className="w-full rounded-[10px] border border-[#e2e4e9] bg-white px-[12px] py-[10px] text-[14px] font-semibold text-mm-black shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] outline-none resize-none placeholder:font-normal placeholder:text-[#868c98]"
              />
            </div>
          </div>

          {/* Shipping method section — only after district is selected */}
          {district && <div className="mt-[32px] flex flex-col gap-[12px] pb-[16px]">
            <p className="text-[16px] font-semibold leading-[18px] text-mm-black">
              Eski cihazınızı nasıl göndermek istersiniz?
            </p>

            {/* Courier option */}
            <button
              onClick={() => setShipping("courier")}
              className={`flex items-center gap-[8px] rounded-[12px] border-2 p-[12px] text-left transition-colors ${
                shipping === "courier" ? "border-mm-black" : "border-[#e2e4e9]"
              }`}
            >
              {/* Radio */}
              <span className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-2 ${
                shipping === "courier" ? "border-mm-black" : "border-[#cdd0d5]"
              }`}>
                {shipping === "courier" && (
                  <span className="h-[8px] w-[8px] rounded-full bg-mm-black" />
                )}
              </span>
              {/* Icon */}
              <div className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[6px] ${
                shipping === "courier" ? "bg-[#DF0000]" : "bg-[#f5f5f5]"
              }`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 3L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke={shipping === "courier" ? "white" : "#525866"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke={shipping === "courier" ? "white" : "#525866"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {/* Text */}
              <div className="flex flex-col gap-[2px]">
                <p className="text-[13px] font-semibold leading-[20px] text-mm-black">
                  Ücretsiz kurye evimden alsın
                </p>
                <p className="text-[12px] leading-[16px] text-[#525866]">
                  Belirlediğiniz adrese ücretsiz kurye gelerek eski cihazınızı teslim alır.
                </p>
              </div>
            </button>

            {/* Cargo option */}
            <button
              onClick={() => setShipping("cargo")}
              className={`flex items-center gap-[8px] rounded-[12px] border-2 p-[12px] text-left transition-colors ${
                shipping === "cargo" ? "border-mm-black" : "border-[#e2e4e9]"
              }`}
            >
              {/* Radio */}
              <span className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-2 ${
                shipping === "cargo" ? "border-mm-black" : "border-[#cdd0d5]"
              }`}>
                {shipping === "cargo" && (
                  <span className="h-[8px] w-[8px] rounded-full bg-mm-black" />
                )}
              </span>
              {/* Icon */}
              <div className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[6px] ${
                shipping === "cargo" ? "bg-[#DF0000]" : "bg-[#f5f5f5]"
              }`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="3" width="15" height="13" rx="1" stroke={shipping === "cargo" ? "white" : "#525866"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 8H19L23 12V16H16V8Z" stroke={shipping === "cargo" ? "white" : "#525866"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="5.5" cy="18.5" r="2.5" stroke={shipping === "cargo" ? "white" : "#525866"} strokeWidth="2"/>
                  <circle cx="18.5" cy="18.5" r="2.5" stroke={shipping === "cargo" ? "white" : "#525866"} strokeWidth="2"/>
                </svg>
              </div>
              {/* Text */}
              <div className="flex flex-col gap-[2px]">
                <p className="text-[13px] font-semibold leading-[20px] text-mm-black">
                  Kargo ile göndermek istiyorum
                </p>
                <p className="text-[12px] leading-[16px] text-[#525866]">
                  Anlaşmalı kargo ile ücretsiz gönderebilirsiniz. Kargo kodunuz sipariş sonrası iletilir.
                </p>
              </div>
            </button>
          </div>}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-mm-border bg-white px-[20px] pt-[12px]" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 20px)" }}>
          <div className="flex items-center gap-[12px]">
            <Link
              href={`/product/trade-in/questions?${params}`}
              aria-label="Geri"
              className="flex h-[48px] w-[56px] items-center justify-center rounded-[6px] border border-[#cdd0d5] bg-white"
            >
              <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.2} />
            </Link>
            <button
              disabled={!canContinue}
              onClick={() => canContinue && router.push(`/product/trade-in/summary?${params}`)}
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

export default function DeliveryPage() {
  return <Suspense fallback={null}><DeliveryContent /></Suspense>;
}
