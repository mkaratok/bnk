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
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Row */}
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconText}>⚙</Text>
          </TouchableOpacity>
          <View style={styles.logoWrap}>
            <Text style={styles.logoText}>TEB</Text>
          </View>
          <View style={styles.iconBtn}>
            <Text style={styles.iconText}>☆</Text>
          </View>
        </View>

        {/* Size Ozel Section */}
        <View style={styles.sizeOzelRow}>
          <Text style={styles.starIcon}>☆</Text>
          <Text style={styles.sizeOzelText}>Size Özel</Text>
        </View>

        {/* Campaign Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerTextWrap}>
            <Text style={styles.bannerTitle}>
              Size özel indirim ve bonus fırsatlarını keşfedin.
            </Text>
            <Text style={styles.bannerLink}>Kampanyaları Gör</Text>
          </View>
          <View style={styles.bannerImageWrap}>
            <Text style={styles.bannerImageText}>🛍</Text>
          </View>
        </View>

        {/* Page Indicator */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Calendar / Eye / Bell Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>📅</Text>
          </TouchableOpacity>
          <View style={styles.actionRight}>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionIcon}>�</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionIcon}>🔔</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hesaplar Section */}
        <View style={styles.sectionRow}>
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionIcon}>💳</Text>
            <Text style={styles.sectionTitle}>Hesaplar</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>TÜMÜNÜ GÖR</Text>
          </TouchableOpacity>
        </View>

        {/* Account Card */}
        <TouchableOpacity
          style={styles.accountCard}
          onPress={() => navigate('accountDetail', { account })}
          activeOpacity={0.9}
        >
          <View style={styles.accRow}>
            <Text style={styles.accName}>{account.accountName}</Text>
            <Text style={styles.accBalance}>{formatCurrency(account.balance, account.currency)}</Text>
          </View>
          <Text style={styles.accNumber}>{account.accountNumber}</Text>
          <View style={styles.accRow}>
            <Text style={styles.accLabel}>Kullanılabilir Bakiye</Text>
            <Text style={styles.accBalance}>{formatCurrency(account.balance, account.currency)}</Text>
          </View>
        </TouchableOpacity>

        {/* Kartlar Section */}
        <View style={styles.sectionRow}>
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionIcon}>💳</Text>
            <Text style={styles.sectionTitle}>Kartlar</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>TÜMÜNÜ GÖR</Text>
          </TouchableOpacity>
        </View>

        {/* Card Card */}
        <View style={styles.cardCard}>
          <Text style={styles.cardName}>{card.cardName}</Text>
          <Text style={styles.cardNumber}>{card.cardNumber}</Text>
          <View style={styles.accRow}>
            <Text style={styles.accLabel}>Ana Hesap Bakiyesi</Text>
            <Text style={styles.accBalance}>{formatCurrency(card.balance, card.currency)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {[
          { label: 'Al Sat', icon: '📈' },
          { label: 'Para Transferi', icon: '✈' },
          { label: 'Ödemeler', icon: '📄' },
          { label: 'Cüzdan', icon: '💳' },
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  iconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 22,
    color: '#009C4E',
  },
  logoWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#009C4E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  sizeOzelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  starIcon: {
    fontSize: 18,
    color: '#009C4E',
    marginRight: 6,
  },
  sizeOzelText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  banner: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  bannerLink: {
    fontSize: 13,
    color: '#009C4E',
    fontWeight: '600',
    marginTop: 4,
  },
  bannerImageWrap: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    marginLeft: 10,
  },
  bannerImageText: {
    fontSize: 28,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#555',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  actionRight: {
    flexDirection: 'row',
  },
  actionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionIcon: {
    fontSize: 20,
    color: '#009C4E',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 6,
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    fontSize: 18,
    color: '#666',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  sectionLink: {
    fontSize: 13,
    color: '#009C4E',
    fontWeight: '600',
  },
  accountCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 14,
    marginBottom: 8,
  },
  accRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accName: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  accNumber: {
    fontSize: 13,
    color: '#666',
    marginVertical: 4,
  },
  accLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  accBalance: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  cardCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 14,
    marginBottom: 12,
  },
  cardName: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  cardNumber: {
    fontSize: 13,
    color: '#666',
    marginVertical: 4,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#009C4E',
    paddingBottom: 8,
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 10,
    color: '#fff',
  },
  tabLabelActive: {
    fontWeight: '600',
  },
});

export default AccountListScreenSimple;
