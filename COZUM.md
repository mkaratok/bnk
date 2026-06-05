# "Failed to Download Remote Update" Hatası Çözümü

## Bu Hatanın Nedenleri

1. **Expo Go uygulaması eski versiyon**
2. **Telefon ve PC farklı WiFi ağlarında**
3. **Güvenlik duvarı/antivirüs Expo'yu engelliyor**
4. **Expo Go cache'i bozuk**

## ADIM ADIM ÇÖZÜM

### 1. Expo Go'yu Güncelleyin (ÖNEMLİ!)
- Android: Play Store → "Expo Go" ara → GÜNCELLE
- iOS: App Store → "Expo Go" ara → GÜNCELLE
- En az versiyon 2.30.0 veya üzeri olmalı

### 2. Expo Go Cache'ini Temizleyin
- Expo Go uygulamasını açın
- Sağ alttaki profil ikonuna tıklayın
- Settings → Clear cache
- Uygulamayı tamamen kapatıp tekrar açın

### 3. Aynı WiFi Ağında Olduğunuzdan Emin Olun
- Telefon: Ayarlar → WiFi → Bağlı ağ adını kontrol edin
- PC: WiFi simgesine tıklayın → Ağ adını kontrol edin
- İKİSİ DE AYNI AĞA BAĞLI OLMALI!

### 4. Windows Güvenlik Duvarını Kontrol Edin
```powershell
# PowerShell'i yönetici olarak açın ve çalıştırın:
New-NetFirewallRule -DisplayName "Expo" -Direction Inbound -Program "C:\Program Files\nodejs\node.exe" -Action Allow
```

### 5. Modem/Router'ı Yeniden Başlatın
- Modemi kapatın, 30 saniye bekleyin, açın
- Hem telefon hem PC'yi WiFi'den çıkarıp tekrar bağlayın

### 6. Farklı Port Deneyin
Terminal'de:
```bash
cd d:/laravelProje/banka/mobile-app
npx expo start --port 19000
```

### 7. USB ile Bağlayın (Android için)
```bash
# USB debugging açık olmalı
npx expo start
# Terminal'de 'a' tuşuna basın
```

## HIZLI TEST

Basit bir test için terminal'de:
```bash
cd d:/laravelProje/banka/mobile-app
npx expo start --clear
```

QR kodu tarayın. Eğer hala hata alıyorsanız:

**SORUN EXPO GO'DA DEĞİL, AĞ BAĞLANTISINDA!**

## Son Çare: Development Build

Expo Go çalışmıyorsa, development build kullanın:
```bash
npx expo run:android
# veya
npx expo run:ios
```

Bu, uygulamayı doğrudan telefonunuza yükler (Expo Go'ya ihtiyaç yok).
