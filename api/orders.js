async function sendSms(phone, message) {
  const { ESKIZ_EMAIL, ESKIZ_PASSWORD, SMS_FROM } = process.env;
  if (!ESKIZ_EMAIL || !ESKIZ_PASSWORD || !SMS_FROM) throw new Error('SMS sozlamalari to‘liq emas');
  const auth = await fetch('https://notify.eskiz.uz/api/auth/login', {
    method:'POST', headers:{Accept:'application/json'}, body:new URLSearchParams({email:ESKIZ_EMAIL,password:ESKIZ_PASSWORD})
  });
  if (!auth.ok) throw new Error('SMS autentifikatsiyasi bajarilmadi');
  const authData = await auth.json();
  const token = authData?.data?.token;
  if (!token) throw new Error('SMS token topilmadi');
  const response = await fetch('https://notify.eskiz.uz/api/message/sms/send', {
    method:'POST', headers:{Authorization:`Bearer ${token}`,Accept:'application/json','Content-Type':'application/json'},
    body:JSON.stringify({mobile_phone:String(phone).replace(/\D/g,'').replace(/^998/,''), message, from:SMS_FROM})
  });
  if (!response.ok) throw new Error('SMS yuborish muvaffaqiyatsiz');
  return response.json();
}

const CATALOG = {
  tandir: { name: 'Tandir go‘shti', price: 120000 },
  shashlik: { name: 'Shashlik', price: 80000 },
  osh: { name: 'Surxon oshi', price: 50000 },
  qiyma: { name: 'Qiyma kabob', price: 65000 },
  grill: { name: 'Gril go‘sht', price: 95000 },
  salat: { name: 'Yangi salat', price: 25000 },
  achichuk: { name: 'Achchiq-chuchuk', price: 18000 },
  shakarob: { name: 'Shakarob salati', price: 20000 },
  cola: { name: 'Coca-Cola', price: 15000 },
  fanta: { name: 'Fanta', price: 15000 },
  suv: { name: 'Mineral suv', price: 7000 },
  choy: { name: 'Ko‘k choy', price: 12000 }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Faqat POST so‘rovi qabul qilinadi'});
  const {name,phone,items,type,address,note} = req.body || {};
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 60) return res.status(400).json({error:'Ism noto‘g‘ri'});
  if (typeof phone !== 'string' || !/^\+?[0-9 ()-]{7,20}$/.test(phone.trim())) return res.status(400).json({error:'Telefon raqami noto‘g‘ri'});
  if (!Array.isArray(items) || !items.length || items.length > 30) return res.status(400).json({error:'Buyurtma tarkibi noto‘g‘ri'});
  if (!['delivery','pickup'].includes(type)) return res.status(400).json({error:'Buyurtma turi noto‘g‘ri'});
  if (type === 'delivery' && (typeof address !== 'string' || !address.trim() || address.trim().length > 200)) return res.status(400).json({error:'Yetkazib berish manzili kerak'});
  if (note != null && (typeof note !== 'string' || note.length > 500)) return res.status(400).json({error:'Izoh juda uzun'});

  // Never trust client-provided product names, prices, or totals.
  let total = 0;
  const verifiedItems = [];
  for (const item of items) {
    const product = item && CATALOG[item.id];
    if (!product || !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 99) {
      return res.status(400).json({error:'Buyurtma tarkibida noto‘g‘ri mahsulot yoki miqdor bor'});
    }
    total += product.price * item.qty;
    verifiedItems.push({ ...product, id: item.id, qty: item.qty });
  }
  if (!Number.isSafeInteger(total) || total <= 0) return res.status(400).json({error:'Buyurtma summasi noto‘g‘ri'});
  if (!process.env.ADMIN_PHONE) return res.status(503).json({error:'ADMIN_PHONE muhit o‘zgaruvchisi sozlanmagan'});
  const money = new Intl.NumberFormat('uz-UZ').format(total);
  const products = verifiedItems.map(x=>`${x.name} x${x.qty}`).join(', ');
  const adminMessage = `Jarqo‘rg‘on Tandir. Buyurtmachi: ${name.trim()}. Tel: ${phone.trim()}. ${type === 'delivery' ? 'Yetkazish' : 'Olib ketish'}. Manzil: ${type === 'delivery' ? address.trim() : '-'}. ${products}. Jami: ${money} so‘m. Izoh: ${note?.trim() || '-'}`.slice(0,900);
  try {
    await sendSms(process.env.ADMIN_PHONE, adminMessage);
    if (process.env.SMS_CUSTOMER_CONFIRMATION === 'true') {
      await sendSms(phone, `Jarqo‘rg‘on Tandir: buyurtmangiz qabul qilindi. Jami ${money} so‘m. Tez orada bog‘lanamiz.`);
    }
    return res.status(200).json({ok:true, total});
  } catch (error) {
    console.error('Order SMS error:', error.message);
    return res.status(502).json({error:'SMS yuborilmadi. SMS provayder sozlamalarini tekshiring.'});
  }
}
