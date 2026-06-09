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
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <Text style={styles.profileName}>UĞUR AYHAN</Text>
          <Text style={styles.profileSub}>Size Özel</Text>
        </View>

        {/* Campaign Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerBadge}>
            <Text style={styles.bannerBadgeText}>1</Text>
          </View>
          <View style={styles.bannerTextWrap}>
            <Text style={styles.bannerTitle}>CEPTETEB KAMPANYA</Text>
            <Text style={styles.bannerSub}>
              Size özel indirim ve bonus fırsatlarını keşfedin.
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.bannerLink}>Kampanyaları Gör →</Text>
          </TouchableOpacity>
        </View>

        {/* Page Indicator */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Quick Actions */}
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
          { label: 'Ana Sayfa', icon: '🏠' },
          { label: 'Para Transferi', icon: '✈' },
          { label: 'Ödeme', icon: '💵' },
          { label: 'Yatırım', icon: '�' },
          { label: 'Diğer', icon: '☰' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab.label)}
          >
            <Text style={[
              styles.tabIcon,
              activeTab === tab.label && styles.tabIconActive
            ]}>{tab.icon}</Text>
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
  profileHeader: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#009C4E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  profileSub: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  banner: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E53E3E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bannerBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13,
    color: '#009C4E',
    fontWeight: '700',
    marginBottom: 2,
  },
  bannerSub: {
    fontSize: 12,
    color: '#555',
    lineHeight: 17,
  },
  bannerLink: {
    fontSize: 12,
    color: '#009C4E',
    fontWeight: '600',
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
    backgroundColor: '#009C4E',
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
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
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
    color: '#888',
    marginBottom: 3,
  },
  tabIconActive: {
    color: '#009C4E',
  },
  tabLabel: {
    fontSize: 10,
    color: '#888',
  },
  tabLabelActive: {
    color: '#009C4E',
    fontWeight: '600',
  },
});

export default AccountListScreenSimple;
