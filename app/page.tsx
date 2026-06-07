import Link from "next/link";
import StatusBar from "@/components/StatusBar";

export default function Home() {
  return (
    <div className="relative h-full w-full bg-white">
      <StatusBar variant="dark" />
      <main className="flex h-full flex-col px-[24px] pt-[80px] pb-[40px]">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-[24px] text-[44px] font-black leading-none text-[#DF0000]">
            MediaMarkt
          </div>
          <h1 className="mb-[12px] text-[20px] font-bold text-mm-black">
            Mobile Prototype
          </h1>
          <p className="mb-[40px] max-w-[280px] text-[14px] leading-relaxed text-mm-gray">
            Müşteri deneyimi prototipi. Akışı başlatmak için aşağıdaki butona dokun.
          </p>

          <div className="flex w-full max-w-[300px] flex-col gap-[12px]">
            <Link
              href="/product"
              className="rounded-full bg-[#DF0000] py-[14px] text-[14px] font-semibold text-white shadow-sm active:scale-[0.98] transition-transform"
            >
              Ürün detayı (Galaxy S26 Ultra)
            </Link>
            <Link
              href="/product/trade-in"
              className="rounded-full border border-mm-border bg-white py-[14px] text-[14px] font-semibold text-mm-black active:scale-[0.98] transition-transform"
            >
              Trade-in akışı
            </Link>
          </div>
        </div>

        <p className="mt-[24px] text-center text-[11px] text-mm-gray">
          iPhone 17 · 402×874
        </p>
      </main>
    </div>
  );
}
