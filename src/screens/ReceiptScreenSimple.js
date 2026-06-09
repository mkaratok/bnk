import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, SafeAreaView, Switch
} from 'react-native';
import { useData } from '../context/DataContext';

const ReceiptScreenSimple = ({ goBack, receiptNumber }) => {
  const { receipts } = useData();
  const receipt = receipts[receiptNumber];
  const [hideInfo, setHideInfo] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const h = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    return `${h}:${min}:${s}`;
  };

  const formatCurrency = (amount, currency) => {
    let cur = currency === 'TRY' ? 'TL' : currency;
    let formatted = new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));
    return cur === 'XAU' ? `${formatted} gr` : `${formatted} ${cur}`;
  };

  if (!receipt) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DEKONT</Text>
          <TouchableOpacity onPress={goBack} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Dekont bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  const masked = (val) => (hideInfo ? '************' : val);
  const maskedAccount = (val) => (hideInfo ? '********************' : val);

  const senderName = masked(receipt.senderName);
  const receiverName = masked(receipt.receiverName);
  const senderAccount = maskedAccount(receipt.senderAccount);
  const receiverAccount = maskedAccount(receipt.receiverAccount);

  const trxDate = formatDate(receipt.date);
  const trxTime = formatTime(receipt.date);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DEKONT</Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Text style={styles.shareIcon}>↗</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.receiptWrap}>
          {/* Bank Header */}
          <View style={styles.bankHeader}>
            <Text style={styles.logoText}>◆ TEB</Text>
            <View style={styles.bankInfo}>
              <Text style={styles.bankLine}>Türk Ekonomi Bankası A.Ş.</Text>
              <Text style={styles.bankLine}>Ticaret Sicil: 189356 Mersis: 0876004342000105</Text>
              <Text style={styles.bankLine}>Büyük Mükellefler V.D: 8760043420</Text>
              <Text style={styles.bankLine}>İnkılap Mah. Sokullu Cad. No: 7A Ümraniye 34768 / İSTANBUL | www.teb.com.tr</Text>
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleBox}>
            <Text style={styles.titleText}>BANKALARARASI PARA TRANSFER DEKONTU</Text>
          </View>

          {/* Meta */}
          <View style={styles.metaBox}>
            <Text style={styles.metaText}>Tarih-Saat: {trxDate} {trxTime}</Text>
            <Text style={styles.metaText}>İşlem No: {receipt.referenceNumber}</Text>
          </View>

          {/* Receipt Table */}
          <View style={styles.table}>
            {/* Sender Info */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableText}>Müşteri Numarası: 15978363</Text>
                <Text style={styles.tableText}>Hesap Numarası: 146551068-TL</Text>
                <Text style={styles.tableText}>IBAN: {senderAccount}</Text>
                <Text style={styles.tableText}>FAST No: 495345743</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableText}>Hesap Sahibi: {senderName}</Text>
                <Text style={styles.tableText}>Hesap Şubesi: CEPTETEB-928</Text>
              </View>
            </View>

            {/* Transaction Detail */}
            <View style={styles.tableDetail}>
              <View style={styles.detailTopRow}>
                <Text style={styles.detailBold}>YAPI VE KREDİ BANKASI A.Ş.</Text>
                <Text style={styles.detailAmount}>TL {formatCurrency(receipt.amount, receipt.currency)}-</Text>
              </View>
              <Text style={styles.tableText}>
                Hesaptan toplam TL {formatCurrency(receipt.amount, receipt.currency)}- ödenmiştir.
              </Text>
              <View style={styles.detailBox}>
                <Text style={styles.tableText}>Alacaklı Adı: {receiverName}</Text>
                <Text style={styles.tableText}>Alacaklı Hesabı: {receiverAccount}</Text>
                <Text style={styles.tableText}>Alacaklı Bankası: YAPI VE KREDİ BANKASI A.Ş.</Text>
              </View>
            </View>

            {/* Footer Grid */}
            <View style={styles.footerGrid}>
              <View style={styles.footerGridColLeft}>
                <Text style={styles.tableText}>Sayın {senderName}</Text>
              </View>
              <View style={styles.footerGridColRight}>
                <Text style={styles.tableText}>Açıklama: {receipt.description}</Text>
                <View style={styles.footerMeta}>
                  <Text style={styles.tableText}>İşlem Tipi: Bireysel Ödeme</Text>
                  <Text style={styles.tableText}>İşlem Yeri: CEPTETEB Mobil Bankacılık</Text>
                  <Text style={styles.tableText}>Uygulaması</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>Elektronik olarak onaylanmıştır.</Text>
            <Text style={styles.disclaimerText}>Detaylı bilgi için İletişim numarası: 0850 200 0 666</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBtnWrap}>
        <TouchableOpacity style={styles.tamamBtn} onPress={goBack}>
          <Text style={styles.tamamBtnText}>TAMAM</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 12, paddingTop: 8, paddingBottom: 12,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  backArrow: { fontSize: 24, color: '#008f45' },
  headerTitle: { fontSize: 16, fontWeight: '500', color: '#666', letterSpacing: 2 },
  shareBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-end' },
  shareIcon: { fontSize: 20, color: '#008f45' },
  content: { flex: 1 },
  receiptWrap: { backgroundColor: '#fff', margin: 12, padding: 16, borderRadius: 4, borderWidth: 1, borderColor: '#ddd' },
  bankHeader: { marginBottom: 16 },
  logoText: { fontSize: 22, color: '#008f45', fontWeight: '700', marginBottom: 8 },
  bankInfo: {},
  bankLine: { fontSize: 10, color: '#555', lineHeight: 14 },
  titleBox: { alignItems: 'center', marginBottom: 12 },
  titleText: { fontSize: 11, fontWeight: '700', color: '#333' },
  metaBox: { alignItems: 'flex-end', marginBottom: 12 },
  metaText: { fontSize: 10, color: '#555', lineHeight: 14 },
  table: { borderWidth: 1, borderColor: '#999' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#999' },
  tableCol: { flex: 1, padding: 8 },
  tableText: { fontSize: 10, color: '#333', lineHeight: 14, fontFamily: 'monospace' },
  tableDetail: { borderBottomWidth: 1, borderBottomColor: '#999', padding: 8, minHeight: 80 },
  detailTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  detailBold: { fontSize: 10, fontWeight: '700', color: '#333', fontFamily: 'monospace' },
  detailAmount: { fontSize: 10, color: '#333', fontFamily: 'monospace' },
  detailBox: { marginTop: 16 },
  footerGrid: { flexDirection: 'row' },
  footerGridColLeft: { flex: 1, padding: 8, borderRightWidth: 1, borderRightColor: '#999', minHeight: 60 },
  footerGridColRight: { flex: 1, padding: 8 },
  footerMeta: { marginTop: 12 },
  disclaimer: { marginTop: 12 },
  disclaimerText: { fontSize: 9, color: '#888', lineHeight: 13, fontStyle: 'italic' },
  bottomBtnWrap: {
    backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 20,
    borderTopWidth: 1, borderTopColor: '#E8E8E8',
  },
  tamamBtn: {
    backgroundColor: '#008f45', borderRadius: 2, paddingVertical: 14, alignItems: 'center',
  },
  tamamBtnText: { fontSize: 16, color: '#fff', fontWeight: '700', letterSpacing: 2 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 15, color: '#888' },
});

export default ReceiptScreenSimple;
