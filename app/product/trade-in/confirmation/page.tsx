"use client";

export const dynamic = 'force-dynamic';

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X, ChevronLeft, Check } from "lucide-react";
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

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const brandId = searchParams.get("brand") ?? "apple";
  const modelId = searchParams.get("model") ?? "";
  const brandName = BRANDS.find((b) => b.id === brandId)?.name ?? "Apple";
  const modelName = MODELS.find((m) => m.id === modelId)?.name ?? "";

  const params = `brand=${brandId}&model=${modelId}`;

  return (
    <>
      <PDPContent />
      <div className="absolute inset-0 z-30 bg-black/60" />

      <div className="absolute inset-x-0 bottom-0 z-40 flex h-[818px] max-h-[818px] flex-col rounded-tl-[38px] rounded-tr-[38px] bg-white shadow-[0_15px_37.5px_rgba(0,0,0,0.18)]">
        {/* Toolbar */}
        <div className="flex shrink-0 flex-col items-center gap-[4px] pt-[5px] pb-[10px]">
          <div className="h-[5px] w-[36px] rounded-full bg-[#ccc]" />
          <div className="relative flex h-[45px] w-full items-center justify-between px-[16px]">
            <span className="w-[32px]" />
            <span />
            <Link
              href={`/product?resume=true&brand=${brandId}&model=${modelId}&step=confirmation`}
              aria-label="Kapat"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e9e9eb] text-[#6b6b6b]"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* Title */}
          <p className="px-[20px] pt-[8px] pb-[12px] text-[24px] font-bold leading-[30px] tracking-[-0.5px] text-mm-black">
            İşlem Özeti
          </p>

          {/* Offer card */}
          <div className="px-[20px] pb-[16px]">
            <div className="relative overflow-hidden rounded-[4px] bg-[#DF0000] px-[20px] py-[24px]">
              <p className="text-center text-[18px] font-normal leading-[28px] tracking-[-0.43px] text-white">
                Eski Cihaz Ön Teklif Tutarı
              </p>
              <div className="relative my-[8px] flex items-center justify-center">
                <div className="absolute h-[42px] w-[162px] rounded-[2px] bg-mm-black" />
                <p className="relative text-center text-[36px] font-black italic leading-[40px] tracking-[-0.43px] text-white">
                  ₺48.999
                </p>
              </div>
              <p className="text-center text-[12px] font-normal leading-[28px] tracking-[-0.43px] text-white">
                {brandName} {modelName}
              </p>
            </div>
          </div>

          {/* Old device */}
          <div className="flex items-center gap-[8px] px-[20px] py-[10px]">
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">
              <Image src="/assets/eski-cihaz.png" alt="Eski Cihaz" width={40} height={40} className="h-[40px] w-[40px] object-contain" />
            </div>
            <div className="flex flex-col">
              <p className="text-[12px] font-medium leading-[20px] tracking-[-0.43px] text-[#525866]">Eski Cihaz</p>
              <p className="text-[16px] font-semibold leading-[18px] text-mm-black">
                {brandName} {modelName}
              </p>
            </div>
          </div>

          {/* New device */}
          <div className="flex items-center gap-[8px] px-[20px] py-[10px]">
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">
              <Image src="/assets/yeni-cihaz.png" alt="Yeni Cihaz" width={40} height={40} className="h-[40px] w-[40px] object-contain" />
            </div>
            <div className="flex flex-col">
              <p className="text-[12px] font-medium leading-[20px] tracking-[-0.43px] text-[#525866]">Yeni Cihaz</p>
              <p className="text-[16px] font-semibold leading-[18px] text-mm-black">
                Samsung Galaxy S26 Ultra 512 GB
              </p>
            </div>
          </div>

          {/* Ürün Bilgisi */}
          <div className="flex flex-col gap-[12px] p-[20px]">
            <p className="text-[16px] font-semibold leading-[18px] text-mm-black">Ürün Bilgisi</p>
            <div className="flex gap-[8px] overflow-x-auto pb-[4px]">
              {QUESTIONS.map((q, i) => (
                <div
                  key={i}
                  className="flex w-[180px] shrink-0 flex-col gap-[4px] rounded-[6px] bg-[#f6f8fa] p-[8px]"
                >
                  <p className="line-clamp-2 text-[11px] font-medium leading-[14px] text-mm-black">{q}</p>
                  <p className="text-[12px] font-semibold leading-[18px] text-[#DF0000]">Hayır</p>
                </div>
              ))}
            </div>
          </div>

          {/* Teslimat seçeneği */}
          <div className="flex flex-col gap-[12px] px-[20px] pb-[20px]">
            <p className="text-[16px] font-semibold leading-[18px] text-mm-black">Teslimat seçeneği</p>
            <div className="flex items-center gap-[8px]">
              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[6px] bg-[#f5f5f5]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 3L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[13px] font-semibold leading-[20px] text-mm-black">Kurye ile teslimat</p>
                <p className="text-[12px] leading-[16px] text-[#525866]">
                  Seçilen adrese ücretsiz kurye gelerek eski cihazınızı teslim alır.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-mm-border bg-white px-[20px] pt-[12px] pb-[48px]">
          <div className="flex items-center gap-[12px]">
            <Link
              href={`/product/trade-in/summary?${params}`}
              aria-label="Geri"
              className="flex h-[48px] w-[56px] items-center justify-center rounded-[6px] border border-[#cdd0d5] bg-white"
            >
              <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.2} />
            </Link>
            <Link
              href={`/product/cart?brand=${brandId}&model=${modelId}`}
              className="flex h-[48px] flex-1 items-center justify-center gap-[4px] rounded-[6px] bg-black text-white active:scale-[0.99]"
            >
              <span className="text-[14px] font-semibold">Sepete ekle ve devam et</span>
              <Check className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ConfirmationPage() {
  return <Suspense fallback={null}><ConfirmationContent /></Suspense>;
}
