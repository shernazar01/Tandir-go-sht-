# Jarqo‘rg‘on Tandir Go‘shti

React + Vite sayti. Qora-oltin vizual uslub, mobil moslashuv, UZ/RU/EN interfeys va menyu tavsiflari, kategoriya filtrlari, savat, buyurtma formasi, xarita va mijoz fikrlari formasi mavjud.

## Lokal ishga tushirish

```bash
npm install
npm run dev
```

Ishlab chiqarish buildini tekshirish:

```bash
npm run build
npm run preview
```

## Buyurtmalar va SMS

`api/orders.js` Vercel serverless funksiyasi sifatida ishlaydi. Buyurtma SMS orqali restoran egasiga yetib borishi uchun Eskiz.uz hisobi, faol balans va tasdiqlangan sender ID kerak. Vercel → Project → Settings → Environment Variables bo‘limiga quyidagilarni kiriting:

- `ESKIZ_EMAIL` — Eskiz hisob emaili
- `ESKIZ_PASSWORD` — Eskiz paroli
- `SMS_FROM` — provayder tasdiqlagan jo‘natuvchi ID
- `ADMIN_PHONE` — SMS qabul qiluvchi raqam, `998XXXXXXXXX` formatida
- `SMS_CUSTOMER_CONFIRMATION` — mijozga tasdiqlovchi SMS kerak bo‘lsa `true`

Maxfiy ma’lumotlarni frontendga yoki GitHub’ga yozmang. O‘zgaruvchilarni kiritgandan so‘ng loyihani qayta deploy qiling. Oddiy `npm run dev` Vercel serverless `/api/orders` funksiyasini ishga tushirmaydi; lokal API sinovi uchun Vercel CLI bilan `vercel dev` ishlatiladi.

Server mahsulot ID va narxlarini o‘zi tekshiradi va jami summani qayta hisoblaydi. Frontenddan yuborilgan narx va jami summaga ishonilmaydi.

## WhatsApp zaxira yo‘li

Agar API ishlamasa va buyurtmani WhatsApp orqali tayyorlash kerak bo‘lsa, `VITE_WHATSAPP_NUMBER` ni xalqaro raqamning faqat raqamlardan iborat ko‘rinishida belgilang, masalan `998901234567` (namuna raqami, haqiqiy restoran raqamini kiriting). Bu o‘zgaruvchi frontend build vaqtida qo‘llanadi.

## Restoran ma’lumotlarini to‘ldirish kerak

Quyidagilar hozircha egadan olinmagan, shuning uchun ataylab to‘qib chiqarilmadi:

- Haqiqiy telefon raqami
- Aniq manzil va Google Maps pini
- Rasmiy Instagram va Telegram havolalari
- Restoranning o‘z taomlaridan olingan fotosuratlar

Hozirgi xarita Jarqo‘rg‘on hududini ochadi, aniq restoran pini emas. Menyudagi rasmlar tashqi Unsplash manbalaridan olinadi. Ishga tushirishdan oldin ularni rasmiy suratlar bilan almashtirish tavsiya etiladi.

## Muhim cheklovlar

- Mijoz fikrlari hozircha faqat shu brauzerning `localStorage` xotirasida saqlanadi; ular barcha tashrif buyuruvchilar orasida ulashilmaydi. Umumiy sharhlar uchun server va ma’lumotlar bazasi kerak.
- Buyurtma SMS’ining haqiqiy ishlashi Eskiz hisob sozlamalari va deploy muhitiga bog‘liq.
- Sayt mobil, noutbuk va katta monitorlar uchun CSS orqali moslashtirildi. Turli brauzer va haqiqiy qurilmalarda yakuniy vizual tekshiruvni ham bajaring.
