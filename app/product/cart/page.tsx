"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search, User, Heart, ShoppingCart, Menu,
  Minus, Plus, Trash2, AlertTriangle, ShoppingCart as CartIcon,
  X, ChevronRight, Check,
} from "lucide-react";
import StatusBar from "@/components/StatusBar";
import { BRANDS } from "../trade-in/brand/brands";
import { MODELS } from "../trade-in/model/models";

function CartContent() {
  const searchParams = useSearchParams();
  const brandId = searchParams.get("brand") ?? "apple";
  const modelId = searchParams.get("model") ?? "";
  const brandName = BRANDS.find((b) => b.id === brandId)?.name ?? "Apple";
  const modelName = MODELS.find((m) => m.id === modelId)?.name ?? "";

  const [qty, setQty] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [insurance2y, setInsurance2y] = useState(false);
  const [insurance1y, setInsurance1y] = useState(false);

  const basePrice = 134999;
  const insurancePrice = 21999;
  const total = basePrice + (insurance2y ? insurancePrice : 0) + (insurance1y ? insurancePrice : 0);

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      {/* Fixed header */}
      <div className="shrink-0 bg-[#DF0000]">
        <StatusBar variant="light" />
        <div className="status-bar-pt flex w-full items-center justify-between px-[20px] pt-[54px] pb-[12px]">
          <div className="flex items-center gap-[8px]">
            <Menu className="h-[24px] w-[24px] text-white" strokeWidth={2.2} />
            <div className="relative h-[56px] w-[56px]">
              <Image src="/assets/mm-logo.png" alt="MediaMarkt" fill className="object-contain" />
            </div>
          </div>
          <div className="flex items-center gap-[6px]">
            {[User, Heart, ShoppingCart].map((Icon, i) => (
              <div key={i} className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white">
                <Icon className="h-[20px] w-[20px]" strokeWidth={2} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto pb-[120px]">
        {/* Search — scrolls */}
        <div className="bg-[#DF0000] px-[20px] pb-[16px]">
          <div className="flex h-[48px] w-full items-center gap-[12px] rounded-[8px] bg-white px-[12px]">
            <Search className="h-[24px] w-[24px]" strokeWidth={2} />
            <span className="text-[14px] text-mm-black">Ne arıyorsunuz?</span>
          </div>
        </div>

        {/* Marketing band */}
        <div className="flex w-full items-center gap-[24px] bg-[#0a0d14] px-[20px] py-[8px] text-[12px] font-medium text-white">
          <span>Hemen MediaMarkt Uygulamasını İndirin!</span>
          <span>Çekilişe Katıl, Kazan</span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-[2px] px-[20px] pt-[12px] pb-[8px]">
          <p className="text-[16px] font-semibold text-mm-black">Sepete ekle</p>
          <p className="text-[12px] text-[#525866]">Alışveriş sepetinde kalan ürünler rezerve edilmez</p>
        </div>

        {/* CLUB Points card */}
        <div className="px-[20px] pb-[8px]">
          <div className="flex items-center justify-between rounded-[12px] border border-dashed border-[#cdd0d5] bg-[#f5f5f5] p-[16px]">
            <div className="flex items-center gap-[8px]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#DF0000]">
                <span className="text-[16px] font-black italic text-white">P</span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-semibold leading-[18px] text-mm-black">
                  MediaMarkt satıcılı ürünlerden kazanılan puanlar
                </p>
                <p className="text-[12px] text-[#525866]">Sadece CLUB üyelerine özel</p>
              </div>
            </div>
            <p className="shrink-0 text-[14px] font-bold text-mm-black">+8.300</p>
          </div>
        </div>

        {/* Product card */}
        <div className="px-[20px] pb-[20px]">
          <div className="flex flex-col gap-[20px] rounded-[12px] border border-[#d1d1d1] px-[20px] py-[12px]">

            {/* Product title + trash */}
            <div className="flex items-start justify-between gap-[8px]">
              <div className="flex flex-col">
                <p className="text-[14px] font-semibold leading-[18px] text-mm-black">
                  Samsung Galaxy S26 Ultra 512 GB
                </p>
                <p className="text-[14px] font-semibold leading-[18px] text-mm-black">
                  Akıllı Telefon MYH8729292
                </p>
              </div>
              <button className="shrink-0 text-[#525866]">
                <Trash2 className="h-[20px] w-[20px]" strokeWidth={1.8} />
              </button>
            </div>

            {/* Image + price + quantity */}
            <div className="flex gap-[16px]">
              <div className="relative h-[64px] w-[64px] shrink-0">
                <Image src="/assets/yeni-cihaz.png" alt="Samsung S26" fill className="object-contain" />
              </div>
              <div className="flex flex-1 flex-col gap-[12px]">
                {/* Price + badge */}
                <div className="flex items-center gap-[8px]">
                  <p className="text-[20px] font-black italic text-mm-black">₺134.999</p>
                  <div className="flex items-center gap-[2px] rounded-full bg-[#fadb82] px-[6px] py-[1px]">
                    <AlertTriangle className="h-[10px] w-[10px] text-[#892b00]" strokeWidth={2} />
                    <p className="text-[10px] font-semibold text-[#892b00]">Hızlı tükeniyor</p>
                  </div>
                </div>
                {/* Stock + qty */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px]">
                    <div className="h-[6px] w-[6px] rounded-full bg-[#008600]" />
                    <p className="text-[12px] font-semibold text-mm-black">Stokta var</p>
                  </div>
                  <div className="flex items-center gap-[10px] rounded-[6px] border border-mm-black p-[6px]">
                    <button onClick={() => setQty(Math.max(1, qty - 1))}>
                      <Minus className="h-[14px] w-[14px]" strokeWidth={2.5} />
                    </button>
                    <p className="text-[12px] font-semibold text-mm-black">{qty}</p>
                    <button onClick={() => setQty(qty + 1)}>
                      <Plus className="h-[14px] w-[14px]" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Trade-in banner */}
            <button
              onClick={() => setShowDetail(true)}
              className="flex w-full items-center gap-[8px] rounded-[4px] bg-[#DF0000] pl-[8px] pr-[12px] py-[8px] text-left"
            >
              <div className="relative h-[32px] w-[32px] shrink-0">
                <Image src="/assets/eski-cihaz.png" alt="" fill className="object-contain" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[12px] font-medium leading-[16px] text-white">
                  <span className="relative inline-block px-[4px] font-black">
                    <span className="absolute inset-0 rounded-[2px] bg-black" />
                    <span className="relative">₺48.999</span>
                  </span>
                  {" "}teklifli Eski Getir
                </p>
                <p className="text-[12px] font-medium leading-[16px] text-white">
                  Yeniyi Götür başvurun alındı
                </p>
              </div>
              <p className="shrink-0 text-[12px] font-medium text-white">Detayı Gör</p>
            </button>

            {/* Insurance checkboxes */}
            <div className="flex flex-col gap-[12px]">
              <label className="flex cursor-pointer items-center justify-between gap-[8px]">
                <div className="flex min-w-0 items-center gap-[8px]">
                  <input
                    type="checkbox"
                    checked={insurance2y}
                    onChange={(e) => { setInsurance2y(e.target.checked); if (e.target.checked) setInsurance1y(false); }}
                    className="h-[16px] w-[16px] shrink-0 cursor-pointer accent-black"
                  />
                  <p className="truncate text-[12px] text-mm-black">2 Yıl Sigorta Ekle</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[12px] font-semibold text-mm-black">+₺21.999</p>
                  <p className="text-[12px] font-semibold text-mm-black">Tek seferlik</p>
                </div>
              </label>
              <label className="flex cursor-pointer items-center justify-between gap-[8px]">
                <div className="flex min-w-0 items-center gap-[8px]">
                  <input
                    type="checkbox"
                    checked={insurance1y}
                    onChange={(e) => { setInsurance1y(e.target.checked); if (e.target.checked) setInsurance2y(false); }}
                    className="h-[16px] w-[16px] shrink-0 cursor-pointer accent-black"
                  />
                  <p className="truncate text-[12px] text-mm-black">1 Yıl Sigorta + 1 Yıl Uzatılmış Garanti</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[12px] font-semibold text-mm-black">+₺21.999</p>
                  <p className="text-[12px] font-semibold text-mm-black">Tek seferlik</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[8px] border-t border-[#eef0f3] bg-white px-[20px] pt-[12px]" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] font-medium text-mm-black">Toplam</p>
            <p className="text-[12px] text-[#525866]">KDV dahil</p>
          </div>
          <p className="text-[16px] font-black italic text-mm-black">
            ₺ {total.toLocaleString("tr-TR")}
          </p>
        </div>
        <button className="flex h-[48px] w-full items-center justify-center gap-[6px] rounded-[4px] bg-[#DF0000] text-white">
          <CartIcon className="h-[20px] w-[20px]" strokeWidth={2} />
          <span className="text-[14px] font-semibold">Ödeme işlemine geçin</span>
        </button>
      </div>

      {/* Detail bottom sheet overlay */}
      {showDetail && (
        <>
          <div
            className="absolute inset-0 z-30 bg-black/60"
            onClick={() => setShowDetail(false)}
          />
          <div className="absolute inset-x-0 bottom-0 z-40 flex flex-col rounded-tl-[38px] rounded-tr-[38px] bg-white shadow-[0_15px_37.5px_rgba(0,0,0,0.18)]">
            {/* Handle + toolbar */}
            <div className="flex shrink-0 flex-col items-center gap-[4px] pt-[5px] pb-[10px]">
              <div className="h-[5px] w-[36px] rounded-full bg-[#ccc]" />
              <div className="relative flex h-[45px] w-full items-center justify-between px-[16px]">
                <span className="w-[32px]" />
                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] font-semibold tracking-[-0.43px] text-mm-black">
                  İşlem Özeti
                </p>
                <button
                  onClick={() => setShowDetail(false)}
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e9e9eb] text-[#6b6b6b]"
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Sheet body */}
            <div className="flex flex-col px-[20px] pt-[8px] pb-[4px]">
              {/* Offer card */}
              <div className="relative overflow-hidden rounded-[4px] bg-[#DF0000] px-[20px] py-[24px]">
                <p className="text-center text-[18px] font-normal leading-[28px] text-white">Eski Cihaz Ön Teklif Tutarı</p>
                <div className="relative my-[8px] flex items-center justify-center">
                  <div className="absolute h-[42px] w-[162px] rounded-[2px] bg-mm-black" />
                  <p className="relative text-center text-[36px] font-black italic leading-[40px] text-white">₺48.999</p>
                </div>
                <p className="text-center text-[12px] text-white">{brandName} {modelName}</p>
              </div>

              {/* Old device */}
              <div className="flex items-center gap-[12px] py-[16px]">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center">
                  <Image src="/assets/eski-cihaz.png" alt="Eski Cihaz" width={48} height={48} className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[12px] font-medium text-[#525866]">Eski Cihaz</p>
                  <p className="text-[16px] font-semibold text-mm-black">{brandName} {modelName}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#eef0f3]" />

              {/* New device */}
              <div className="flex items-center gap-[12px] py-[16px]">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center">
                  <Image src="/assets/yeni-cihaz.png" alt="Yeni Cihaz" width={48} height={48} className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[12px] font-medium text-[#525866]">Yeni Cihaz</p>
                  <p className="text-[16px] font-semibold text-mm-black">Samsung Galaxy S26 Ultra 512 GB</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#eef0f3]" />

              {/* Check list */}
              <div className="flex flex-col gap-[4px] py-[20px]">
                {[
                  "Eski cihazınız ücretsiz kurye ile kapınızdan teslim alınır.",
                  "Operasyon merkezimizde uzman ekip tarafından incelenir.",
                  "Son teklif tarafınıza iletilir, onayınızla IBAN'ınıza ödenir.",
                  "3.000 ₺'nin altında değerlendirilen cihazlara ödeme yapılmayacaktır.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-[4px] py-[4px]">
                    <div className="mt-[2px] flex h-[20px] w-[20px] shrink-0 items-center justify-center">
                      <Check className="h-[16px] w-[16px] text-[#DF0000]" strokeWidth={2.5} />
                    </div>
                    <p className="line-clamp-1 text-[12px] leading-[18px] text-mm-black">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sheet footer */}
            <div className="shrink-0 border-t border-mm-border bg-white px-[20px] pt-[12px]" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 20px)" }}>
              <button
                onClick={() => setShowDetail(false)}
                className="flex h-[48px] w-full items-center justify-center gap-[4px] rounded-[6px] bg-black text-white"
              >
                <span className="text-[14px] font-semibold">Kapat</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={null}>
      <CartContent />
    </Suspense>
  );
}
