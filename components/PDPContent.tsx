import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Search,
  User,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Share2,
  Star,
  Info,
  Coins,
} from "lucide-react";
import StatusBar from "./StatusBar";

/**
 * The Product Detail screen. Rendered on its own at /product, and rendered
 * behind a dim overlay + bottom sheet on the trade-in flow screens.
 */
export default function PDPContent({
  tradeInHref = "/product/trade-in",
}: {
  tradeInHref?: string;
}) {
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      {/* Fixed header — only nav row */}
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

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Search bar — scrolls with content */}
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

      {/* Container: breadcrumb / badges / brand / title / rating */}
      <div className="flex w-full flex-col gap-[8px] pt-[12px]">
        <div className="flex w-full items-center justify-between pl-[16px] pr-[20px]">
          <div className="flex items-center gap-[3px]">
            <ChevronLeft className="h-[24px] w-[24px]" strokeWidth={2} />
            <span className="text-[14px] font-medium text-mm-black underline">
              Galaxy S
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <Share2 className="h-[20px] w-[20px]" strokeWidth={2} />
            <Heart className="h-[20px] w-[20px]" strokeWidth={2} />
          </div>
        </div>

        <div className="flex items-center gap-[5px] px-[20px]">
          {["Web'e Özel", "Birlikte Al"].map((t) => (
            <span
              key={t}
              className="flex h-[20px] items-center justify-center rounded-full border border-[#DF0000] px-[8px] text-[12px] font-medium text-mm-black"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-[4px] px-[20px] text-[14px]">
          <span className="font-medium text-mm-black underline">SAMSUNG</span>
          <span className="text-[#525866]">|</span>
          <span className="text-[#525866]">Ürün no: 1245636</span>
        </div>

        <div className="px-[20px]">
          <p className="text-[16px] font-semibold text-mm-black">
            SAMSUNG Galaxy S26 Ultra 5G 16GB/1TB Akıllı Telefon Kobalt Siyah
          </p>
        </div>

        <div className="flex items-center gap-[4px] px-[20px]">
          <div className="flex items-center gap-[4px]">
            <span className="text-[14px] font-black italic text-mm-black">
              4.7
            </span>
            <Star
              className="h-[16px] w-[16px] fill-[#DF0000] text-[#DF0000]"
              strokeWidth={0}
            />
          </div>
          <span className="text-[14px] text-[#525866]">|</span>
          <span className="text-[14px] text-[#525866]">(27 Yorumlar)</span>
        </div>
      </div>

      {/* Device image */}
      <div className="flex flex-col items-start">
        <div className="flex w-full items-center justify-between px-[20px] pt-[24px] pb-[12px]">
          <button className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#0a0d14]">
            <ChevronLeft className="h-[24px] w-[24px] text-white" strokeWidth={2} />
          </button>
          <div className="relative h-[150px] w-[200px]">
            <Image
              src="/assets/s25-product.png"
              alt="Samsung Galaxy S26 Ultra"
              fill
              className="object-contain"
            />
          </div>
          <button className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#0a0d14]">
            <ChevronRight className="h-[24px] w-[24px] text-white" strokeWidth={2} />
          </button>
        </div>
        <div className="flex w-full items-center justify-center px-[20px]">
          <span className="text-[14px] font-medium text-[#868c98]">2 / 6</span>
        </div>
      </div>

      {/* Thumbnails / badges */}
      <div className="flex items-end gap-[6px] px-[20px] pt-[8px]">
        <div className="relative h-[32px] w-[35px]">
          <Image src="/assets/ai-badge.png" alt="AI" fill className="object-contain" />
        </div>
        <div className="relative h-[24px] w-[37px]">
          <Image src="/assets/5g-badge.png" alt="5G" fill className="object-contain" />
        </div>
      </div>

      {/* Trade-in banner */}
      <div className="px-[20px] pt-[16px] pb-[8px]">
        <Link
          href={tradeInHref}
          className="flex w-full items-center gap-[8px] rounded-[4px] bg-[#DF0000] pl-[8px] pr-[8px] py-[8px]"
        >
          <div className="relative h-[48px] w-[48px] shrink-0">
            <Image
              src="/assets/tradein-phone.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <p className="flex-1 text-[12px] leading-[1.3] text-white">
            Eski cihazınızı{" "}
            <span className="rounded-[2px] bg-black px-[4px] py-[1px] font-black">
              ₺88.500'e
            </span>{" "}
            varan kazançla hemen yenileyin
          </p>
          <div className="flex items-center gap-[2px] rounded-[4px] bg-black pl-[12px] pr-[4px] py-[8px]">
            <span className="text-[14px] font-semibold text-white">Başla</span>
            <ChevronRight className="h-[20px] w-[20px] text-white" strokeWidth={2} />
          </div>
        </Link>
      </div>

      {/* Price */}
      <div className="flex flex-col items-end px-[20px] py-[12px] text-right">
        <p className="w-full text-[24px] font-black italic text-black">
          ₺ 68.749
        </p>
        <p className="w-full text-[12px] font-medium text-mm-black underline">
          KDV dahil ücretsiz kargo
        </p>
      </div>

      {/* Points */}
      <div className="flex items-center justify-between px-[20px]">
        <div className="flex items-center gap-[6px]">
          <Coins className="h-[20px] w-[20px] text-[#868c98]" strokeWidth={2} />
          <span className="text-[12px] text-[#868c98]">
            MediaMarkt CLUB Puanları
          </span>
          <Info className="h-[14px] w-[14px] text-[#868c98]" strokeWidth={2} />
        </div>
        <span className="text-[14px] text-[#525866]">+6.875 P</span>
      </div>

      {/* Compare */}
      <div className="px-[20px] py-[8px]">
        <div className="flex items-center justify-between rounded-[4px] border border-[#e2e4e9] bg-[#f5f5f5] p-[20px]">
          <div className="flex items-center gap-[6px]">
            <span className="block h-[16px] w-[16px] rounded-[3px] border border-[#cdd0d5] bg-white" />
            <span className="text-[14px] text-[#525866]">Karşılaştır</span>
          </div>
          <span className="text-[16px] font-medium text-mm-black underline">
            Karşılaştırmaya git
          </span>
        </div>
      </div>

      <div className="h-[100px]" />
      </div>
      {/* /Scrollable content */}

      {/* Sticky footer */}
      <div className="shrink-0 flex items-center gap-[12px] border-t border-[#eef0f3] bg-white px-[20px] pt-[12px] pb-[24px]">
        <div className="flex-1">
          <p className="text-[16px] font-black italic text-mm-black">₺ 134.999</p>
          <p className="text-[10px] font-medium text-mm-black underline">
            KDV dahil ücretsiz kargo
          </p>
        </div>
        <button className="flex h-[44px] flex-1 items-center justify-center gap-[6px] rounded-[4px] bg-[#DF0000] px-[12px] text-white">
          <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={2.2} />
          <span className="text-[14px] font-semibold">Sepete ekle</span>
        </button>
      </div>
    </div>
  );
}
