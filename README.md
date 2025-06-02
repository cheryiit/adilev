# Adilev - Adil Kira Hesaplama Platformu

Türkiye'deki ev kiralarının gerçek değerini hesaplayan modern web uygulaması.

## 🏠 Özellikler

- **Kapsamlı Hesaplama**: 25+ farklı parametre ile detaylı kira hesaplama
- **Modern UI**: Tailwind CSS ile tasarlanmış responsive arayüz
- **Gerçek Zamanlı**: Anında sonuç görüntüleme
- **Türkçe Desteği**: Tam Türkçe arayüz ve içerik

## 📊 Hesaplama Parametreleri

### Temel Özellikler
- Net metrekare (40m² üzeri her m² için +400₺)
- Oda sayısı (her oda için +1.000₺)
- Balkon alanı (her m² için +50₺)
- Teras alanı (her m² için +150₺)
- Bina yaşı (her yıl için -1.000₺)

### Konum Faktörleri
- Denize yakınlık (1.5km altı için +20.000₺)
- Deniz manzarası (90° için +5.000₺, 180° için +20.000₺)
- Metro mesafesi (her km için -1.000₺)
- Otobüs durağı sayısı (350m içinde, her durak +500₺)
- Market mesafesi (500m üzeri için -10.000₺)

### Bina Özellikleri
- Isıtma sistemi (yerden ısıtma +5.000₺, ısıtma yok -20.000₺)
- Yalıtım (+2.000₺)
- Deprem yönetmeliği (uygun değil -20.000₺)
- Cephe durumu (-5.000₺ ile +5.000₺ arası)
- Kat pozisyonu (ideal kattan uzaklık cezası)

### Ek Özellikler
- Otopark (yok ise -3.000₺)
- Fiber internet (+2.000₺, yok ise -1.000₺)
- Amerikan mutfak (-5.000₺)
- Eşyalı (+3.000₺)
- Gürültü durumu (-10.000₺ ile +5.000₺ arası)
- Özel kat cezaları (bahçe katı, giriş katı vb.)

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Yerel Geliştirme

1. Projeyi klonlayın:
```bash
git clone https://github.com/yourusername/adilev.git
cd adilev
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda `http://localhost:3000` adresini açın.

## 📱 Kullanım

1. **Temel Bilgiler**: Evinizin net metrekaresi, oda sayısı, kat bilgileri
2. **Konum**: Denize, metroya, markete mesafe bilgileri
3. **Özellikler**: Bina yaşı, ısıtma sistemi, cephe durumu
4. **Ek Özellikler**: Checkbox'lar ile ek özellikleri seçin
5. **Hesapla**: Butona tıklayarak adil kira tutarını görün

## 🔧 Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel Ready

## 📈 Deployment

### Vercel'e Deploy

1. GitHub'a push edin
2. Vercel hesabınızla GitHub'ı bağlayın
3. Projeyi import edin
4. Otomatik deploy başlayacak

### Manuel Build

```bash
npm run build
npm start
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- Website: [adilev.vercel.app](https://adilev.vercel.app)
- GitHub: [github.com/yourusername/adilev](https://github.com/yourusername/adilev)

## 🎯 Gelecek Özellikler

- [ ] Şehir bazlı katsayılar
- [ ] Geçmiş hesaplama kayıtları
- [ ] PDF rapor indirme
- [ ] API entegrasyonu
- [ ] Mobil uygulama 