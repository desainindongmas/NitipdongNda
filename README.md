# NitipdongNda!

Jasa titip beli per event & bazaar. Pelanggan lihat katalog foto per event, pilih barang, checkout, bayar QRIS, konfirmasi via WhatsApp.

## Struktur

- `index.html` — website toko (katalog, cart, checkout QRIS, konfirmasi WA)
- `cms.html` — halaman admin (password `nda2026`) untuk kelola event & item
- `catalog.js` — data event, produk, kode promo, ongkir
- `Code.gs` — backend Google Apps Script untuk sinkronisasi CMS antar device
- `img/` — foto produk & QRIS
- `robots.txt` — blokir indexing halaman admin

## Deploy

Static site — upload folder ini ke GitHub Pages / Cloudflare Pages.

CMS data: localStorage (per device) atau remote via Google Apps Script (`window.NITIP_API` di index.html & cms.html).
