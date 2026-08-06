# Tıkır App

Tıkır App, Next.js tabanlı bir frontend (client) ve NestJS tabanlı bir backend (server) içeren full-stack web uygulamasıdır. Proje, atölye veya çok kiracılı (multi-tenant) sistemlere uygun bir yetkilendirme (JWT) ve kullanıcı yönetimi altyapısına sahiptir.

## Proje Yapısı

Proje iki ana klasörden oluşmaktadır:

- **client**: Next.js (App Router) ile geliştirilmiş ön yüz projesi. React 19 ve Tailwind CSS v4 kullanılmaktadır.
- **server**: NestJS ile geliştirilmiş arka yüz projesi. PostgreSQL veritabanı ve Passport JWT ile kimlik doğrulama mekanizmaları içerir.

## Teknolojiler

### Frontend (Client)
- Next.js
- React
- Tailwind CSS
- TypeScript

### Backend (Server)
- NestJS
- PostgreSQL
- Passport JWT
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
DATABASE_NAME=tikir_db
DATABASE_URL=postgres://postgres:postgres@localhost:5432/tikir_db
JWT_SECRET=gizliAnahtariniz
JWT_EXPIRES_IN=1d
```

Veritabanınızın çalıştığından emin olduktan sonra arka yüzü geliştirme modunda başlatın:

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

Backend projesi (server) Swagger ile entegredir. Sunucuyu ayağa kaldırdıktan sonra tarayıcınızdan `/api-docs` yoluna (örneğin `http://localhost:3500/api-docs`) giderek kullanılabilir tüm API uçlarını görebilir, doğrudan tarayıcı üzerinden test edebilirsiniz.
