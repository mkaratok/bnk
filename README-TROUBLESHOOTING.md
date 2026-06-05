# Sorun Giderme

## Fatal Error Alıyorsanız

### 1. Expo Go Sürümünü Kontrol Edin
- Play Store/App Store'dan Expo Go'nun en son sürümünü yükleyin
- Eski sürümler bazı paketlerle uyumsuz olabilir

### 2. Telefon ve Bilgisayar Aynı Ağda mı?
- Her ikisi de aynı WiFi ağına bağlı olmalı
- VPN kapalı olmalı
- Güvenlik duvarı Expo'yu engelliyor olabilir

### 3. Cache Temizleme
```bash
# Terminal'de sırayla çalıştırın:
cd d:/laravelProje/banka/mobile-app
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .expo
npm install
npx expo start --clear --reset-cache
```

### 4. Expo Go'da Cache Temizleme
- Expo Go uygulamasını açın
- Settings → Clear Cache
- Uygulamayı kapatıp tekrar açın

### 5. Yeni Proje Oluşturma (Son Çare)
```bash
cd d:/laravelProje/banka
npx create-expo-app banka-app-new
cd banka-app-new
npm start
```

Basit proje çalışıyorsa, dosyaları tek tek kopyalayın.

## Hata Mesajlarını Kontrol Etme

### Terminal'de:
- QR kodu taradıktan sonra terminal'i izleyin
- Kırmızı hata mesajları varsa not edin

### Expo Go'da:
- Telefonu sallayın → Dev Menu
- "Show Performance Monitor" veya "Debug Remote JS"
- Hata mesajını tam olarak okuyun

## Sık Karşılaşılan Hatalar

### "Unable to resolve module"
→ `npm install` tekrar çalıştırın

### "Network request failed"
→ Aynı WiFi ağında olduğunuzdan emin olun

### "Something went wrong"
→ app.json'daki asset referanslarını kontrol edin

### "Metro bundler error"
→ Port 8081 meşgul olabilir, başka port kullanın
