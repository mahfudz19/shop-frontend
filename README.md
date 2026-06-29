# Shop Frontend

Aplikasi frontend toko online berbasis [Next.js](https://nextjs.org) 16 dengan dukungan internasionalisasi (i18n) melalui [`next-intl`](https://next-intl-docs.vercel.app/). Project ini menyediakan halaman publik (home, produk, pencarian, cart, magazine, profile) serta halaman admin console.

## Prasyarat

- [Node.js](https://nodejs.org/) 22+ (untuk development tanpa Docker)
- [Docker](https://www.docker.com/) (untuk menjalankan via container)
- Container backend yang sudah berjalan:
  - `shop-api` di port `8080`
  - `tokopedia-scraper` di port `8000` dan VNC di port `6080`
  - `qdrant` di port `6333`

## Menjalankan dengan Docker

Project ini menyediakan [`Dockerfile`](Dockerfile:1) multi-stage untuk build image production. Semua environment variable `NEXT_PUBLIC_*` di-embed saat build time, sedangkan `INTERNAL_API_URL` digunakan oleh server-side rewrite Next.js.

### 1. Build image

```bash
docker build \
  --build-arg NEXT_PUBLIC_APP_NAME="Scrap Store" \
  --build-arg NEXT_PUBLIC_SHOW_QUICK_LOGIN=true \
  --build-arg NEXT_PUBLIC_SCRAPER_API_URL=http://localhost:8000 \
  --build-arg NEXT_PUBLIC_VNC_HOST=localhost:6080 \
  --build-arg INTERNAL_API_URL=http://host.docker.internal:8080 \
  --build-arg NEXT_IMAGES_HOSTNAME=https://d1fho2dhsghybb.cloudfront.net \
  -t shop-frontend:latest .
```

> **Catatan:** `INTERNAL_API_URL` menggunakan `host.docker.internal` agar container frontend dapat mengakses `shop-api` yang berjalan di host (macOS/Windows Docker Desktop mendukung ini secara default). Jika kamu menggunakan Docker di Linux, pastikan opsi `--add-host=host.docker.internal:host-gateway` ditambahkan saat `docker run`.

### 2. Jalankan container

```bash
docker run -d \
  --name shop-frontend \
  -p 3000:3000 \
  --add-host=host.docker.internal:host-gateway \
  shop-frontend:latest
```

### 3. Akses aplikasi

Buka browser ke [http://localhost:3000](http://localhost:3000).

### 4. Lihat log

```bash
docker logs -f shop-frontend
```

### 5. Hentikan dan hapus container

```bash
docker stop shop-frontend
docker rm shop-frontend
```

## Environment Variables

| Variable                       | Keterangan                                         | Contoh                                  |
| ------------------------------ | -------------------------------------------------- | --------------------------------------- |
| `NEXT_PUBLIC_APP_NAME`         | Nama aplikasi yang tampil di UI                    | `Scrap Store`                           |
| `NEXT_PUBLIC_SHOW_QUICK_LOGIN` | Menampilkan quick login button                     | `true`                                  |
| `NEXT_PUBLIC_SCRAPER_API_URL`  | URL scraper API (diakses dari browser)             | `http://localhost:8000`                 |
| `NEXT_PUBLIC_VNC_HOST`         | Host VNC untuk live preview (diakses dari browser) | `localhost:6080`                        |
| `INTERNAL_API_URL`             | URL backend utama untuk server-side rewrite        | `http://host.docker.internal:8080`      |
| `NEXT_IMAGES_HOSTNAME`         | Hostname CDN gambar produk                         | `https://d1fho2dhsghybb.cloudfront.net` |

## Menjalankan secara Lokal (Development)

```bash
# Install dependencies
yarn install

# Jalankan dev server
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Struktur Project

- `src/app/[locale]/` — routing aplikasi dengan locale (`id`, `en`).
- `src/app/[locale]/console/` — halaman admin console.
- `src/components/` — komponen reusable.
- `src/lib/` — utility, API client, dan auth helper.
- `src/i18n/` — konfigurasi routing dan request i18n.
- `messages/` — file terjemahan.

## Deployment

Image Docker yang dihasilkan menggunakan output `standalone` dari Next.js, sehingga cukup dijalankan dengan `node server.js` tanpa perlu menyertakan seluruh `node_modules` development. Untuk deploy ke platform lain, silakan sesuaikan environment variables sesuai infrastruktur target.
