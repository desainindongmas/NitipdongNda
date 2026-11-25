// ============================================================
// KATALOG NITIPDONGNDA!
// Cara pakai:
//  - Tiap event punya id, judul, tanggal, status, dan daftar items.
//  - Ganti "img" dengan file foto di folder img/products/ (nama file persis).
//  - Kalau foto belum ada, hapus field "img" — sistem pakai placeholder.
//  - Harga dalam Rupiah (angka, tanpa titik/koma). stock = -1 artinya stok tak terbatas.
// ============================================================

const EVENTS = [
  {
    id: "hsi-tableware",
    title: "HSI Tableware Export Quality",
    dates: "21–29 November 2026",
    status: "live", // live | closed
    blurb: "Peralatan makan export quality, harga event. Lagi berlangsung, buruan pilih sebelum tutup.",
    items: [
      { id: "hsi-01", name: "Set Lunch Box 3 Tier", variant: "Mutiara / Sage", price: 189000, stock: -1, img: "hsi-01.svg" },
      { id: "hsi-02", name: "Glass Jar 500ml", variant: "Bening / Frosted", price: 59000, stock: -1, img: "hsi-02.svg" },
      { id: "hsi-03", name: "Ceramic Bowl Set 4 pcs", variant: "Cream", price: 145000, stock: -1, img: "hsi-03.svg" },
      { id: "hsi-04", name: "Cutting Board Bamboo", variant: "Natural", price: 75000, stock: -1, img: "hsi-04.svg" },
      { id: "hsi-05", name: "Dinner Plate 26cm", variant: "Putih / Navy", price: 68000, stock: -1, img: "hsi-05.svg" },
      { id: "hsi-06", name: "Serving Bowl Large", variant: "Sand", price: 92000, stock: -1, img: "hsi-06.svg" },
      { id: "hsi-07", name: "Mug Ceramic 350ml", variant: "Kuning / Pink", price: 49000, stock: -1, img: "hsi-07.svg" },
      { id: "hsi-08", name: "Glass Storage 1.2L", variant: "Kaca bening", price: 65000, stock: -1, img: "hsi-08.svg" },
    ]
  },
  {
    id: "skincarevaganza",
    title: "Skincarevaganza",
    dates: "Event skincare (sudah closed)",
    status: "closed",
    blurb: "Sudah tutup, tapi produk skincare event kadang masih restock. Chat aja kalau ada yang nyari.",
    items: [
      { id: "sv-01", name: "Serum Vitamin C 20%", variant: "30ml", price: 79000, stock: -1, img: "sv-01.svg" },
      { id: "sv-02", name: "Sunscreen SPF 50 PA++++", variant: "30g", price: 55000, stock: -1, img: "sv-02.svg" },
      { id: "sv-03", name: "Cleanser Gentle Foam", variant: "100ml", price: 45000, stock: -1, img: "sv-03.svg" },
    ]
  },
  {
    id: "philips-diskon",
    title: "Philips Diskon Lagi",
    dates: "Promo elektronik (sudah closed)",
    status: "closed",
    blurb: "Batch diskon Philips sudah lewat. Kalau ada batch baru, event ini aku update lagi.",
    items: [
      { id: "ph-01", name: "Philips Blender HR3752", variant: "2L", price: 549000, stock: -1, img: "ph-01.svg" },
      { id: "ph-02", name: "Philips Rice Cooker HD3031", variant: "1.8L", price: 689000, stock: -1, img: "ph-02.svg" },
      { id: "ph-03", name: "Philips Hand Blender", variant: "300W", price: 299000, stock: -1, img: "ph-03.svg" },
    ]
  }
];

// Kode promo / voucher. Tambah sesuka kamu, mis. { code: "NANDA10", type: "percent", value: 10 }
// type: "percent" (value = persen) atau "flat" (value = rupiah). Maksimal 1 kode per order.
const PROMO_CODES = [
  // { code: "NANDA10", type: "percent", value: 10 },
];

// Ongkir estimasi per provinsi (Paxel). Angka ini estimasi awal;
// final dikonfirmasi via WhatsApp karena ongkir asli tergantung kota/kab & berat.
const SHIPPING = {
  default: 25000,
  provinces: {
    "DKI Jakarta": 15000, "Jawa Barat": 18000, "Jawa Tengah": 20000, "DI Yogyakarta": 20000,
    "Jawa Timur": 22000, "Banten": 18000, "Bali": 35000,
    "Sumatera Utara": 35000, "Sumatera Barat": 35000, "Riau": 38000, "Jambi": 38000,
    "Sumatera Selatan": 35000, "Lampung": 35000, "Bangka Belitung": 40000, "Bengkulu": 40000,
    "Kepulauan Riau": 42000, "Aceh": 45000,
    "Kalimantan Barat": 42000, "Kalimantan Tengah": 42000, "Kalimantan Selatan": 42000,
    "Kalimantan Timur": 45000, "Kalimantan Utara": 48000,
    "Sulawesi Utara": 48000, "Sulawesi Tengah": 50000, "Sulawesi Selatan": 50000,
    "Sulawesi Tenggara": 50000, "Gorontalo": 52000, "Sulawesi Barat": 52000,
    "Nusa Tenggara Barat": 45000, "Nusa Tenggara Timur": 48000, "Bali": 35000,
    "Maluku": 60000, "Maluku Utara": 65000,
    "Papua": 75000, "Papua Barat": 78000, "Papua Selatan": 80000, "Papua Tengah": 80000,
    "Papua Pegunungan": 80000
  }
};
