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
        <TouchableOpacity onPress={goBack} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.receiptCard}>
          {/* Top: Bank info + QNB Logo */}
          <View style={styles.topHeader}>
            <View style={styles.bankInfo}>
              <Text style={styles.bankName}>Türk Ekonomi Bankası A.Ş.</Text>
              <Text style={styles.bankDetail}>Büyük Mükellefler Vergi Dairesi</Text>
              <Text style={styles.bankDetail}>Vergi No: 388 002 3340</Text>
            </View>
            <View style={styles.logoArea}>
              <Text style={styles.logoIcon}>◆</Text>
              <Text style={styles.logoText}>TEB</Text>
            </View>
          </View>

          {/* DEKONT Title */}
          <View style={styles.dekontTitleRow}>
            <View style={styles.line} />
            <Text style={styles.dekontTitle}>DEKONT</Text>
            <View style={styles.line} />
          </View>

          {/* Two Column Info */}
          <View style={styles.twoCol}>
            <View style={[styles.colBox, styles.colLeft]}>
              <Text style={styles.colBold}>{senderName}</Text>
              <Text style={styles.colSmall}>Devrim Mah. 3771/1 Sok. No:6 D:7</Text>
              <Text style={styles.colSmall}>Karabağlar İzmir</Text>
              <Text style={styles.colSmall}>İZMİR KARABAĞLAR</Text>
            </View>
            <View style={styles.colBox}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Müşteri No</Text>
                <Text style={styles.infoVal}>208675902</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>MKN / TCKN</Text>
                <Text style={styles.infoVal}>
                  {hideInfo ? '************' : '4439546****'}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Vergi Dairesi</Text>
                <Text style={styles.infoVal}> </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>İşlem Yeri</Text>
                <Text style={styles.infoVal}>MOBİL BANKACILIK</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>İşlem Tarih</Text>
                <Text style={styles.infoVal}>{trxDate}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}> </Text>
                <Text style={styles.infoVal}>{trxTime}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>GİN</Text>
                <Text style={styles.infoVal}> </Text>
              </View>
            </View>
          </View>

          {/* Description sentence */}
          <View style={styles.descBox}>
            <Text style={styles.descText}>
              Aşağıdaki hesap/kredi kartınızda karşılarında gösterilen hareketler gerçekleştirilmiştir
            </Text>
          </View>

          {/* Transaction Table */}
          <View style={styles.trxTable}>
            <View style={styles.trxHeader}>
              <Text style={[styles.trxH, { flex: 1.6 }]}>Hesap/K.Kart No</Text>
              <Text style={[styles.trxH, { flex: 1.8 }]}>IBAN</Text>
              <Text style={[styles.trxH, { flex: 2.2 }]}>Açıklama</Text>
              <Text style={[styles.trxH, { flex: 0.5 }]}>B/A</Text>
              <Text style={[styles.trxH, { flex: 0.8 }]}>Para Cinsi</Text>
              <Text style={[styles.trxH, { flex: 0.9, textAlign: 'right' }]}>TUTAR</Text>
            </View>
            <View style={styles.trxRow}>
              <Text style={[styles.trxCell, { flex: 1.6 }]} numberOfLines={1}>
                {senderAccount}
              </Text>
              <Text style={[styles.trxCell, { flex: 1.8 }]} numberOfLines={1}>
                {senderAccount}
              </Text>
              <Text style={[styles.trxCell, { flex: 2.2 }]} numberOfLines={2}>
                Alıcı: {receiverName} Türkiye Vakıflar Bankası
              </Text>
              <Text style={[styles.trxCell, { flex: 0.5 }]}>B</Text>
              <Text style={[styles.trxCell, { flex: 0.8 }]}>
                {receipt.currency === 'TRY' ? 'TL' : receipt.currency}
              </Text>
              <Text style={[styles.trxCell, { flex: 0.9, textAlign: 'right' }]}>
                {formatCurrency(receipt.amount, receipt.currency)}
              </Text>
            </View>
            <View style={styles.trxRow}>
              <Text style={[styles.trxCell, { flex: 1.6 }]}> </Text>
              <Text style={[styles.trxCell, { flex: 1.8 }]}> </Text>
              <Text style={[styles.trxCell, { flex: 2.2 }]}>3.3.1 EFT Ücreti</Text>
              <Text style={[styles.trxCell, { flex: 0.5 }]}>B</Text>
              <Text style={[styles.trxCell, { flex: 0.8 }]}>TL</Text>
              <Text style={[styles.trxCell, { flex: 0.9, textAlign: 'right' }]}>7.97</Text>
            </View>
            <View style={styles.trxRow}>
              <Text style={[styles.trxCell, { flex: 1.6 }]}> </Text>
              <Text style={[styles.trxCell, { flex: 1.8 }]}> </Text>
              <Text style={[styles.trxCell, { flex: 2.2 }]}>BSMV Tahsilatı</Text>
              <Text style={[styles.trxCell, { flex: 0.5 }]}>B</Text>
              <Text style={[styles.trxCell, { flex: 0.8 }]}>TL</Text>
              <Text style={[styles.trxCell, { flex: 0.9, textAlign: 'right' }]}>0.38</Text>
            </View>
          </View>

          {/* Detail Block */}
          <View style={styles.detailBlock}>
            <Text style={styles.detailBold}>GİDEN FAST EFT GİDEN FAST EFT</Text>
            <Text style={styles.detailLine}>
              ALICI UNVANI: {receiverName} ALICI IBAN: {receiverAccount}
            </Text>
            <Text style={styles.detailLine}>
              KATILIMCI: Türkiye Vakıflar Bankası T.A.O.
            </Text>
            <Text style={styles.detailLine}>
              EFT TUTARI : {formatCurrency(receipt.amount, receipt.currency)} 3.3.1 EFT ÜCRETİ(BSMV DAHİL) : 8.35 TL SORGU NO: {receipt.referenceNumber}
            </Text>
            <Text style={styles.detailLine}>
              MÜŞTERİ UNVANI: {senderName} IBAN: {senderAccount}
            </Text>
            <Text style={styles.detailLine}>
              GÖNDEREN: {senderName}  AÇIKLAMA:{receipt.description}
            </Text>
          </View>

          {/* Bottom Row */}
          <View style={styles.bottomInfo}>
            <View style={styles.bottomRow}>
              <Text style={styles.bottomLabel}>Sıra No</Text>
              <Text style={styles.bottomVal}>00484-685132</Text>
              <Text style={styles.bottomLabel}>İşlemi Yapan</Text>
              <Text style={styles.bottomVal}>T99148 /T99148</Text>
              <Text style={styles.bottomLabel}>Fiş No:</Text>
              <Text style={styles.bottomVal}>202606045068190</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerInfo}>
            <Text style={styles.footerLine}>TEB Telefon Bankacılığı : 0850 200 0 666</Text>
            <Text style={styles.footerLine}>TEB İnternet Bankacılığı : www.teb.com.tr</Text>
            <Text style={styles.footerLine}>TEB Telefon Bankacılığına yurtdışından ulaşmak istediğinizde</Text>
            <Text style={styles.footerLine}>numaranın soluna Türkiye alan kodunu (90) eklemeniz gerekmektedir.</Text>
            <Text style={styles.footerLine}>Müşterinin yaptığı işlemlere ilişkin dekont asıllarının bir örneğidir.</Text>
          </View>

          {/* Branch Info */}
          <View style={styles.branchBox}>
            <Text style={styles.branchTitle}>Türk Ekonomi Bankası A.Ş.</Text>
            <Text style={styles.branchSub}>CEPTETEB ŞUBESİ</Text>
            <Text style={styles.branchAddr}>
              Merkez: Esentepe Mah. Büyükdere Cad. Kristal Kule No:215 Şişli-İstanbul
            </Text>
            <Text style={styles.branchAddr}>
              Ticaret Sicil Numarası : 237525  Mersis No : 0388-0023-3340-0576
            </Text>
          </View>
        </View>

        {/* Hide Info Toggle */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>Adres ve kimlik bilgilerimi gizle</Text>
          <Switch
            value={hideInfo}
            onValueChange={setHideInfo}
            trackColor={{ false: '#D0D0D0', true: '#009C4E' }}
            thumbColor="#fff"
          />
        </View>
      </ScrollView>

      <View style={styles.footerBtnWrap}>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Paylaş</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backArrow: {
    fontSize: 24,
    color: '#009C4E',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    letterSpacing: 1,
  },
  closeBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  closeText: {
    fontSize: 20,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  receiptCard: {
    backgroundColor: '#fff',
    margin: 12,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 2,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0',
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
  },
  bankDetail: {
    fontSize: 9,
    color: '#333',
    lineHeight: 13,
  },
  logoArea: {
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 18,
    color: '#333',
  },
  logoText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#333',
    letterSpacing: 2,
  },
  dekontTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#B0B0B0',
    marginHorizontal: 10,
  },
  dekontTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    letterSpacing: 2,
  },
  twoCol: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#B0B0B0',
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0',
  },
  colBox: {
    flex: 1,
    padding: 8,
  },
  colLeft: {
    borderRightWidth: 1,
    borderRightColor: '#B0B0B0',
  },
  colBold: {
    fontSize: 10,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  colSmall: {
    fontSize: 9,
    color: '#333',
    lineHeight: 13,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  infoLabel: {
    fontSize: 9,
    color: '#333',
    flex: 1,
  },
  infoVal: {
    fontSize: 9,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  descBox: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0',
  },
  descText: {
    fontSize: 9,
    color: '#333',
    lineHeight: 13,
  },
  trxTable: {
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0',
  },
  trxHeader: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0',
    paddingVertical: 3,
    paddingHorizontal: 4,
  },
  trxH: {
    fontSize: 8,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 2,
  },
  trxRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  trxCell: {
    fontSize: 8,
    color: '#333',
    paddingHorizontal: 2,
  },
  detailBlock: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0',
  },
  detailBold: {
    fontSize: 9,
    fontWeight: '700',
    color: '#333',
    lineHeight: 13,
    marginBottom: 2,
  },
  detailLine: {
    fontSize: 9,
    color: '#333',
    lineHeight: 13,
  },
  bottomInfo: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0',
  },
  bottomRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  bottomLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#333',
    marginRight: 4,
  },
  bottomVal: {
    fontSize: 9,
    color: '#333',
    marginRight: 10,
  },
  footerInfo: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0',
  },
  footerLine: {
    fontSize: 8,
    color: '#333',
    lineHeight: 12,
  },
  branchBox: {
    padding: 8,
    alignItems: 'flex-end',
  },
  branchTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#333',
  },
  branchSub: {
    fontSize: 10,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  branchAddr: {
    fontSize: 8,
    color: '#333',
    lineHeight: 12,
    textAlign: 'right',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 4,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  toggleText: {
    fontSize: 13,
    color: '#555',
    flex: 1,
    marginRight: 12,
  },
  footerBtnWrap: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  shareButton: {
    backgroundColor: '#009C4E',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#888',
  },
});

export default ReceiptScreenSimple;
