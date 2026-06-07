# MediaMarkt — Mobile Web Prototype

iPhone 17 boyutunda (402×874) müşteri deneyimi prototipi. Vercel'de yayınlanır; masaüstünde telefon çerçevesi içinde, gerçek mobil cihazda tam ekran görünür.

## Geliştirme

```bash
npm install
npm run dev
```

→ http://localhost:3000

## Yapı

```
app/
  layout.tsx          # PhoneFrame ile root layout
  page.tsx            # Ana ekran (akış girişleri)
  buyback/page.tsx    # Trade-in akışı
  product/page.tsx    # Ürün detay
  globals.css         # Tailwind v4 + MediaMarkt teması
components/
  PhoneFrame.tsx      # Masaüstünde iPhone çerçevesi, mobilde fullscreen
public/assets/        # Logolar, ürün görselleri
```

## Yeni ekran ekleme

1. `app/<route>/page.tsx` oluştur
2. İçerik tam genişlikte yazılır (PhoneFrame 402px ekranı zaten sarıyor)
3. Üst kısma `pt-[60px]` koy — status bar + dynamic island bölgesi

## Vercel deploy

```bash
vercel
```

veya GitHub'a push edip Vercel projesine bağla. Build komutu otomatik algılanır.
