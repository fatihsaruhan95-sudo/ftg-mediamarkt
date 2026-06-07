"use client";

export const dynamic = 'force-dynamic';

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import PDPContent from "@/components/PDPContent";
import { BRANDS } from "../brand/brands";
import { MODELS } from "../model/models";

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus = false,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
  maxLength?: number;
}) {
  return (
    <div className="flex flex-col gap-[4px]">
      <label className="text-[14px] font-medium text-mm-black">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        maxLength={maxLength}
        className="h-[48px] w-full rounded-[10px] border border-[#e2e4e9] bg-white px-[12px] text-[14px] font-medium text-mm-black shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] outline-none placeholder:font-normal placeholder:text-[#868c98]"
      />
    </div>
  );
}

function SummaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const brandId = searchParams.get("brand") ?? "apple";
  const modelId = searchParams.get("model") ?? "";
  const brandName = BRANDS.find((b) => b.id === brandId)?.name ?? "Apple";
  const modelName = MODELS.find((m) => m.id === modelId)?.name ?? "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tcNo, setTcNo] = useState("");
  const [gsm, setGsm] = useState("+90 ");
  const handleGsmChange = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(2); // strip "90" country code
    const d = digits.slice(0, 10);
    let formatted = "+90 ";
    if (d.length > 0) formatted += "(" + d.slice(0, 3);
    if (d.length >= 3) formatted += ") " + d.slice(3, 6);
    if (d.length >= 6) formatted += " " + d.slice(6, 8);
    if (d.length >= 8) formatted += " " + d.slice(8, 10);
    setGsm(formatted);
  };
  const [email, setEmail] = useState("");
  const [iban, setIban] = useState("TR");
  const handleIbanChange = (v: string) => {
    const raw = v.toUpperCase().replace(/\s/g, "");
    if (!raw.startsWith("TR")) return;
    const digits = raw.slice(2).replace(/\D/g, "").slice(0, 24);
    const full = "TR" + digits;
    const grouped = full.match(/.{1,4}/g)?.join(" ") ?? full;
    setIban(grouped);
  };
  const [imei, setImei] = useState("");
  const [contractChecked, setContractChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const canContinue =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    tcNo.trim().length === 11 &&
    gsm.replace(/\D/g, "").length === 12 &&
    email.trim() !== "" &&
    iban.replace(/\s/g, "").length === 26 &&
    imei.length === 15 &&
    contractChecked &&
    privacyChecked;

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
            <div className="absolute left-1/2 top-[2px] -translate-x-1/2 text-center">
              <p className="text-[11px] leading-[14px] text-mm-gray">Yeni cihaz</p>
              <p className="text-[16px] font-semibold leading-[20px] tracking-[-0.43px] text-mm-black">
                Samsung Galaxy S26 Ultra
              </p>
            </div>
            <span className="w-[32px]" />
            <Link
              href={`/product?resume=true&brand=${brandId}&model=${modelId}&step=summary`}
              aria-label="Kapat"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e9e9eb] text-[#6b6b6b]"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Stepper — steps 1 partial, 2+3+4 full, 5 partial */}
        <div className="flex shrink-0 items-center gap-[4px] px-[20px] py-[4px]">
          <div className="h-[3px] flex-1 overflow-hidden bg-[#cdd0d5]">
            <div className="h-full w-[70px] bg-[#DF0000]" />
          </div>
          <div className="h-[3px] flex-1 bg-[#DF0000]" />
          <div className="h-[3px] flex-1 bg-[#DF0000]" />
          <div className="h-[3px] flex-1 bg-[#DF0000]" />
          <div className="h-[3px] flex-1 overflow-hidden bg-[#cdd0d5]">
            <div className="h-full w-[12px] bg-[#DF0000]" />
          </div>
        </div>

        {/* Title */}
        <div className="flex shrink-0 flex-col gap-[4px] px-[20px] py-[12px]">
          <p className="text-[14px] leading-[18px] text-mm-gray">Adım 5 / 5</p>
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
        <div className="min-h-0 flex-1 overflow-y-auto px-[20px] pt-[8px]">
          <div className="flex flex-col gap-[16px] pb-[16px]">
            {/* Ad + Soyad */}
            <div className="flex gap-[12px]">
              <div className="flex-1">
                <InputField label="Ad" value={firstName} onChange={setFirstName} placeholder="Deniz" autoFocus />
              </div>
              <div className="flex-1">
                <InputField label="Soyad" value={lastName} onChange={setLastName} placeholder="Başaran" />
              </div>
            </div>

            <InputField
              label="TC Kimlik No"
              value={tcNo}
              onChange={(v) => { if (/^\d{0,11}$/.test(v)) setTcNo(v); }}
              placeholder="12312312312"
              type="tel"
              maxLength={11}
            />

            <InputField
              label="GSM Numarası"
              value={gsm}
              onChange={handleGsmChange}
              placeholder="+90"
              type="tel"
            />

            <InputField
              label="E-Posta Adresi"
              value={email}
              onChange={setEmail}
              placeholder="hello@eposta.com"
              type="email"
            />

            {/* IBAN */}
            <div className="flex flex-col gap-[4px]">
              <InputField
                label="IBAN Numarası"
                value={iban}
                onChange={handleIbanChange}
                placeholder="TR"
              />
              <div className="flex items-start gap-[6px] py-[4px]">
                <Info className="mt-[1px] h-[12px] w-[12px] shrink-0 text-[#525866]" strokeWidth={2} />
                <p className="text-[10px] leading-[14px] text-[#525866]">
                  Kendinize ait IBAN bilgisi girdiğinizden emin olunuz. IBAN bilgisinin ad soyad, ve TC kimlik numarasını sağladığınız kişiye ait olması gerekmektedir.
                </p>
              </div>
            </div>

            {/* IMEI */}
            <div className="flex flex-col gap-[4px]">
              <InputField
                label="Eski Cihaz IMEI Numarası"
                value={imei}
                onChange={(v) => { if (/^\d{0,15}$/.test(v)) setImei(v); }}
                placeholder="IMEI numarasını giriniz"
                type="tel"
                maxLength={15}
              />
              <div className="flex items-start gap-[6px] py-[2px]">
                <Info className="mt-[1px] h-[12px] w-[12px] shrink-0 text-[#525866]" strokeWidth={2} />
                <p className="text-[10px] leading-[14px] text-[#525866]">
                  IMEI numarasını öğrenmek için telefonunuzdan *#06# tuşlayınız.
                </p>
              </div>
              <div className="flex items-start gap-[6px] py-[2px]">
                <Info className="mt-[1px] h-[12px] w-[12px] shrink-0 text-[#525866]" strokeWidth={2} />
                <p className="text-[10px] leading-[14px] text-[#525866]">
                  Yurt dışından alınan veya Türkiye&apos;de kayıtlı olmayan cihazlar değerlendirme kapsamı dışındadır.
                </p>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-[8px]">
              <label className="flex items-start gap-[10px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={contractChecked}
                  onChange={(e) => setContractChecked(e.target.checked)}
                  className="mt-[2px] h-[16px] w-[16px] shrink-0 cursor-pointer accent-black"
                />
                <span className="text-[13px] leading-[20px] text-mm-black">
                  <span className="font-semibold text-[#DF0000]">Geri Alım Sözleşmesini</span>
                  {" "}okudum ve onaylıyorum.
                </span>
              </label>

              <label className="flex items-start gap-[10px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyChecked}
                  onChange={(e) => setPrivacyChecked(e.target.checked)}
                  className="mt-[2px] h-[16px] w-[16px] shrink-0 cursor-pointer accent-black"
                />
                <span className="text-[13px] leading-[20px] text-mm-black">
                  <span className="font-semibold text-[#DF0000]">Cihaz aydınlatma metnini</span>
                  {" "}okudum ve onaylıyorum.
                </span>
              </label>

              <p className="text-[12px] leading-[16px] text-[#525866]">
                Kişisel verilerimin Fintegre Teknoloji A.Ş. tarafından cihaz geri alım süreci ve tanıtım amaçlı e-posta gönderimi kapsamında işlenmesine onay veriyorum.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-mm-border bg-white px-[20px] pt-[12px] pb-[48px]">
          <div className="flex items-center gap-[12px]">
            <Link
              href={`/product/trade-in/delivery?${params}`}
              aria-label="Geri"
              className="flex h-[48px] w-[56px] items-center justify-center rounded-[6px] border border-[#cdd0d5] bg-white"
            >
              <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.2} />
            </Link>
            <button
              disabled={!canContinue}
              onClick={() => canContinue && router.push(`/product/trade-in/confirmation?${params}`)}
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

export default function SummaryPage() {
  return <Suspense fallback={null}><SummaryContent /></Suspense>;
}
