import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight, Info } from "lucide-react";
import PDPContent from "@/components/PDPContent";
import BottomSheet from "@/components/BottomSheet";

const STEPS = [
  {
    n: 1,
    title: "Eski cihazınızın değerini öğrenin",
    body: "Marka ve modeli seçin, tahmini değerinizi 30 saniyede görelim.",
  },
  {
    n: 2,
    title: "Cihazınızı gönderin",
    body: "Ücretsiz kurye kapınıza gelir, eski cihazınızı teslim alır. Hiç uğraşmayın",
  },
  {
    n: 3,
    title: "Ve fark hesabınıza yatar",
    body: "Cihazınız incelendikten sonra kesin tutar hesabınıza aktarılır.",
  },
];

export default function TradeInIntro() {
  return (
    <>
      <PDPContent />
      <BottomSheet
        title="Eskiyi Getir, Yeniyi Götür"
        closeHref="/product"
        footer={
          <Link
            href="/product/trade-in/brand"
            className="flex h-[48px] w-full items-center justify-center gap-[4px] rounded-[6px] bg-black text-white active:scale-[0.99]"
          >
            <span className="text-[14px] font-semibold">Değerini hesapla</span>
            <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </Link>
        }
      >
        <div className="pb-[12px]">
          {/* Hero band — edge-to-edge red */}
          <div className="bg-[#DF0000] px-[20px] pt-[24px] pb-[64px] text-white">
            <h2 className="text-[36px] font-black italic leading-[40px]">
              Eski telefonunu hızlıca değerlendir!
            </h2>
            <p className="mt-[8px] text-[16px] leading-[24px]">
              <span className="underline">Samsung Galaxy S26 Ultra</span>{" "}
              alırken eski telefonunu değerlendir.
            </p>
          </div>

          {/* Price comparison card — overlaps red/white boundary, padded from sheet edges */}
          <div className="mx-[20px] -mt-[40px] flex items-center gap-[20px] rounded-[6px] bg-white p-[20px] shadow-[0_24px_56px_-4px_rgba(88,92,95,0.16)]">
            <div className="relative h-[56px] w-[56px] shrink-0">
              <Image
                src="/assets/s25-product.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <p className="text-[12px] font-medium tracking-[-0.4px] text-mm-black">
                  Mevcut Fiyat
                </p>
                <p className="text-[16px] font-black italic text-mm-black">
                  ₺ 134.999
                </p>
              </div>
              <ArrowRight className="h-[20px] w-[20px] text-[#DF0000]" />
              <div className="text-right">
                <p className="text-[12px] font-medium tracking-[-0.4px] text-mm-black">
                  Tahmini Yeni Fiyat
                </p>
                <p className="whitespace-nowrap text-[22px] font-black italic text-mm-black">
                  ₺ 46.499
                </p>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="px-[20px] pt-[20px]">
            <h3 className="text-[16px] font-semibold leading-[20px] text-mm-black">
              Nasıl Çalışır?
            </h3>
            <div className="mt-[12px] flex flex-col gap-[14px]">
              {STEPS.map((s) => (
                <div key={s.n} className="flex items-start gap-[12px]">
                  <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[4px] bg-[#DF0101]">
                    <span className="text-[16px] font-semibold leading-[20px] text-white">
                      {s.n}.
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold leading-[18px] text-mm-black">
                      {s.title}
                    </p>
                    <p className="text-[13px] leading-[18px] text-[#31353f] opacity-90">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="mx-[20px] mt-[16px] flex items-center gap-[8px] rounded-[6px] bg-[#f6f8fa] p-[8px]">
            <Info className="h-[14px] w-[14px] shrink-0 text-mm-black" strokeWidth={2} />
            <p className="text-[12px] leading-[16px] text-black">
              Gösterilen fiyat ön tekliftir, cihaz incelemesi sonrası kesin
              fiyat tarafınıza iletilir.
            </p>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
