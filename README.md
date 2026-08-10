<p align="center">
  <img src="client/public/logos/logo.png" alt="Fixera Logo" width="300" />
</p>

# Fixera - Auto Workshop SaaS

Fixera, otomotiv atölyeleri için geliştirilmiş, süreçlerin dijitalleşmesini ve tek bir ekrandan yönetilmesini sağlayan premium bir B2B SaaS (Software as a Service) çözümüdür. Atölye iş emirleri, müşteri takibi, stok (envanter) yönetimi ve finansal kayıtlar gibi tüm süreçleri tek bir merkezde toplar.

## Temel Özellikler
- **İş Yönetimi (Jobs):** Müşteri araçları için iş emri oluşturma, durum takibi (bekliyor, işlemde, tamamlandı) ve müşteri bilgilendirmesi.
- **Stok Yönetimi (Inventory):** Parça stok takibi, kritik stok uyarıları ve iş emri sırasında stoktan otomatik parça düşümü.
- **Müşteri Yönetimi (Customers):** Müşteri veri tabanı, araç bilgileri ve geçmiş servis kayıtları.
- **Finans Analizi (Finance):** Ödeme kayıtları, gelir/gider özeti ve finansal durum takibi.

## Proje Yapısı

Proje modern bir monorepo mimarisine sahiptir ve iki ana klasörden oluşmaktadır:

- **client**: Next.js (App Router) ile geliştirilmiş ön yüz projesi. React 19, Tailwind CSS v4, Framer Motion (Animasyonlar) ve React Three Fiber (3D Grafikler) kullanılmaktadır.
- **server**: NestJS v11 ile geliştirilmiş arka yüz projesi. PostgreSQL veritabanı, Passport JWT ile kimlik doğrulama, SWC derleyicisi ve Socket.io (Events) içermektedir.

## Teknolojiler

### Frontend (Client)
- Next.js (App Router)
- React 19
- Tailwind CSS v4
- Framer Motion
- React Three Fiber / Drei
- React Query (TanStack)
- TypeScript

### Backend (Server)
- NestJS v11
- PostgreSQL (pg Pool)
- SWC (Speedy Web Compiler)
- Passport JWT & Bcrypt
- Socket.io (WebSocket)
- Swagger (API Dokümantasyonu)
- TypeScript

## Kurulum ve Çalıştırma

Projenin her iki kısmını da çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

### 1. Backend (Server) Kurulumu

Terminal üzerinden `server` dizinine geçiş yapın ve bağımlılıkları yükleyin:

```bash
cd server
npm install
```

Gerekli ortam değişkenlerini ayarlamak için `server/.env` dosyasını kontrol edin. Varsayılan ayarlar şu şekildedir:

```env
PORT=3500
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=fixera_db
DATABASE_URL=postgres://postgres:postgres@localhost:5432/fixera_db
JWT_SECRET=gizliAnahtariniz
JWT_EXPIRES_IN=1d
```

Veritabanınızın çalıştığından emin olduktan sonra arka yüzü geliştirme modunda başlatın (Uygulama SWC sayesinde anında derlenecektir):

```bash
npm run start:dev
```

Arka yüz başarıyla çalıştığında API dokümantasyonuna `http://localhost:3500/api-docs` adresinden erişebilirsiniz.

### 2. Frontend (Client) Kurulumu

Yeni bir terminal açıp `client` dizinine geçiş yapın ve bağımlılıkları yükleyin:

```bash
cd client
npm install
```

Ön yüz ortam değişkenleri için `client/.env` dosyasını kontrol edin. Arka yüze sorunsuz bağlanabilmesi için aşağıdaki gibi olmalıdır:

```env
PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:3500
```

Ön yüzü geliştirme modunda başlatın:

```bash
npm run dev
```

Uygulamanın ön yüzü `http://localhost:3000` adresinde çalışmaya başlayacaktır.

## API Dokümantasyonu

Backend projesi (server) Swagger ile entegredir. Sunucuyu ayağa kaldırdıktan sonra tarayıcınızdan `/api-docs` yoluna giderek (örneğin `http://localhost:3500/api-docs`) kullanılabilir tüm API uçlarını görebilir ve doğrudan tarayıcı üzerinden test edebilirsiniz.
