import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  SafeAreaView, ScrollView
} from 'react-native';
import { useData } from '../context/DataContext';

const AccountListScreenSimple = ({ navigate }) => {
  const { accounts, cards } = useData();
  const [activeTab, setActiveTab] = useState('Ana Sayfa');

  const formatCurrency = (amount, currency) => {
    let cur = currency === 'TRY' ? 'TL' : currency;
    let formatted = new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));
    return `${formatted} ${cur}`;
  };

  const account = accounts[0];
  const card = cards[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7f6" />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sizeOzelRow}>
          <Text style={styles.starIcon}>☆</Text>
          <Text style={styles.sizeOzelText}>Size Özel</Text>
        </View>

        <View style={styles.bannerCard}>
          <View style={styles.bannerTextWrap}>
            <Text style={styles.bannerTitle}>
              Size özel indirim ve bonus fırsatlarını keşfedin.
            </Text>
            <TouchableOpacity>
              <Text style={styles.bannerLink}>Kampanyaları Gör</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerImageWrap}>
            <Text style={styles.bannerImageText}>🛍</Text>
          </View>
        </View>

        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>📅</Text>
          </TouchableOpacity>
          <View style={styles.actionRight}>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionIcon}>👁</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionIcon}>🔔</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionIcon}>💳</Text>
            <Text style={styles.sectionTitle}>Hesaplar</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>TÜMÜNÜ GÖR</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.whiteCard}
          onPress={() => navigate('accountDetail', { account })}
          activeOpacity={0.9}
        >
          <View style={styles.cardTopRow}>
            <Text style={styles.cardName}>{account.accountName}</Text>
            <Text style={styles.cardBalance}>{formatCurrency(account.balance, account.currency)}</Text>
          </View>
          <Text style={styles.cardNumber}>{account.accountNumber}</Text>
          <View style={styles.cardBottomRow}>
            <Text style={styles.cardLabel}>Kullanılabilir Bakiye</Text>
            <Text style={styles.cardBalanceSmall}>{formatCurrency(account.balance, account.currency)}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.sectionRow}>
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionIcon}>💳</Text>
            <Text style={styles.sectionTitle}>Kartlar</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>TÜMÜNÜ GÖR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.whiteCard}>
          <Text style={styles.cardNameUpper}>{card.cardName}</Text>
          <Text style={styles.cardNumber}>{card.cardNumber}</Text>
          <View style={styles.cardBottomRow}>
            <Text style={styles.cardLabel}>Ana Hesap Bakiyesi</Text>
            <Text style={styles.cardBalanceSmall}>{formatCurrency(card.balance, card.currency)}</Text>
          </View>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.listSectionIcon}>📊</Text>
          <Text style={styles.listSectionText}>Yatırımlar</Text>
        </View>
        <View style={styles.listSection}>
          <Text style={styles.listSectionIcon}>💰</Text>
          <Text style={styles.listSectionText}>Krediler</Text>
        </View>
        <View style={styles.listSection}>
          <Text style={styles.listSectionIcon}>⏱</Text>
          <Text style={styles.listSectionText}>Talimat İşlemleri</Text>
        </View>
        <View style={styles.listSection}>
          <Text style={styles.listSectionIcon}>📝</Text>
          <Text style={styles.listSectionText}>Başvurular</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>☰</Text>
      </TouchableOpacity>

      <View style={styles.tabBar}>
        {[
          { label: 'Al Sat', icon: '📈' },
          { label: 'Para Transferi', icon: '✈' },
          { label: 'Ödemeler', icon: '�' },
          { label: 'Cüzdan', icon: '👛' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab.label)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[
              styles.tabLabel,
              activeTab === tab.label && styles.tabLabelActive
            ]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7f6' },
  content: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  topHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4, backgroundColor: '#f5f7f6',
  },
  iconBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  iconText: { fontSize: 24, color: '#008a45' },
  logoWrap: {
    width: 44, height: 44, borderRadius: 8, backgroundColor: '#008a45',
    justifyContent: 'center', alignItems: 'center',
  },
  logoText: { color: '#fff', fontSize: 22 },
  sizeOzelRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, marginTop: 12, marginBottom: 8,
  },
  starIcon: { fontSize: 22, color: '#008a45', marginRight: 8 },
  sizeOzelText: { fontSize: 18, color: '#333', fontWeight: '500' },
  bannerCard: {
    backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 16, padding: 20,
    flexDirection: 'row', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
    borderWidth: 1, borderColor: '#eee',
  },
  bannerTextWrap: { flex: 1 },
  bannerTitle: { fontSize: 14, color: '#555', lineHeight: 20, marginBottom: 8 },
  bannerLink: { fontSize: 14, color: '#008a45', fontWeight: '700' },
  bannerImageWrap: {
    width: 80, height: 80, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#E8F5E9', borderRadius: 12, marginLeft: 12,
    borderWidth: 3, borderColor: '#008a45',
  },
  bannerImageText: { fontSize: 32 },
  dotsRow: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    marginTop: 12, marginBottom: 8,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#ccc', marginHorizontal: 4,
  },
  dotActive: { backgroundColor: '#555' },
  actionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 10, marginBottom: 8,
  },
  actionRight: { flexDirection: 'row', gap: 16 },
  actionBtn: { padding: 4 },
  actionIcon: { fontSize: 22, color: '#008a45' },
  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, marginTop: 16, marginBottom: 8,
  },
  sectionLeft: { flexDirection: 'row', alignItems: 'center' },
  sectionIcon: { fontSize: 20, color: '#888', marginRight: 10 },
  sectionTitle: { fontSize: 16, color: '#555', fontWeight: '500' },
  sectionLink: { fontSize: 12, color: '#008a45', fontWeight: '700' },
  whiteCard: {
    backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 16, padding: 16,
    marginBottom: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
    borderWidth: 1, borderColor: '#eee',
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardName: { fontSize: 16, color: '#333', fontWeight: '500' },
  cardNameUpper: { fontSize: 16, color: '#333', fontWeight: '600' },
  cardBalance: { fontSize: 18, color: '#333', fontWeight: '600' },
  cardNumber: { fontSize: 13, color: '#999', marginVertical: 4 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  cardLabel: { fontSize: 13, color: '#888' },
  cardBalanceSmall: { fontSize: 14, color: '#333', fontWeight: '600' },
  listSection: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#eee',
    backgroundColor: '#fff', marginHorizontal: 16,
  },
  listSectionIcon: { fontSize: 20, color: '#888', marginRight: 12 },
  listSectionText: { fontSize: 16, color: '#555', fontWeight: '500' },
  fab: {
    position: 'absolute', left: '50%', bottom: 70,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#008a45',
    justifyContent: 'center', alignItems: 'center',
    marginLeft: -28,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 6,
  },
  fabIcon: { fontSize: 24, color: '#fff' },
  tabBar: {
    flexDirection: 'row', backgroundColor: '#008a45',
    paddingBottom: 8, paddingTop: 10,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabIcon: { fontSize: 18, color: '#fff', marginBottom: 3 },
  tabLabel: { fontSize: 10, color: '#fff' },
  tabLabelActive: { fontWeight: '700' },
});

export default AccountListScreenSimple;
