import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  SafeAreaView, ScrollView
} from 'react-native';

const AccountDetailScreen = ({ navigate, goBack, account }) => {
  const [activeTab, setActiveTab] = useState('DETAY');

  const formatCurrency = (amount, currency) => {
    let cur = currency === 'TRY' ? 'TL' : currency;
    let formatted = new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));
    return `${formatted} ${cur}`;
  };

  if (!account) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hata</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Hesap bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.headerTitle}>{account.accountName}</Text>
            <Text style={styles.headerStar}>☆</Text>
          </View>
          <Text style={styles.headerSubtitle}>{account.accountNumber}</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn}>
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'DETAY' && styles.tabBtnActive]}
          onPress={() => setActiveTab('DETAY')}
        >
          <Text style={[styles.tabText, activeTab === 'DETAY' && styles.tabTextActive]}>DETAY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'HESAP HAREKETLERİ' && styles.tabBtnActive]}
          onPress={() => {
            setActiveTab('HESAP HAREKETLERİ');
            navigate('transactions', { account });
          }}
        >
          <Text style={[styles.tabText, activeTab === 'HESAP HAREKETLERİ' && styles.tabTextActive]}>HESAP HAREKETLERİ</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Detail Rows */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Hesap Sahibi</Text>
          <Text style={styles.rowValue}>{account.ownerName || 'UĞUR AYHAN'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Bakiye</Text>
          <Text style={styles.rowValue}>{formatCurrency(account.balance, account.currency)}</Text>
        </View>

        <View style={styles.ibanRow}>
          <Text style={styles.ibanText}>{account.iban}</Text>
          <View style={styles.ibanActions}>
            <TouchableOpacity style={styles.iconAction}>
              <Text style={styles.iconActionText}>📋</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconAction}>
              <Text style={styles.iconActionText}>🔗</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Hesap TR Karekod</Text>
          <View style={styles.rowRight}>
            <Text style={styles.rowLink}>Görüntüle</Text>
            <Text style={styles.rowLinkIcon}>⊞</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Açılış Tarihi</Text>
          <Text style={styles.rowValue}>{account.openDate || '17/11/2025'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Kullanılabilir Bakiye</Text>
          <Text style={styles.rowValue}>{formatCurrency(account.balance, account.currency)}</Text>
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>☰</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  headerStar: {
    fontSize: 16,
    color: '#009C4E',
    marginLeft: 6,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 1,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
    color: '#009C4E',
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#009C4E',
  },
  tabText: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#009C4E',
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rowLabel: {
    fontSize: 14,
    color: '#666',
  },
  rowValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLink: {
    fontSize: 14,
    color: '#009C4E',
    fontWeight: '500',
    marginRight: 6,
  },
  rowLinkIcon: {
    fontSize: 16,
    color: '#009C4E',
  },
  ibanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  ibanText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
    flex: 1,
  },
  ibanActions: {
    flexDirection: 'row',
  },
  iconAction: {
    paddingHorizontal: 8,
  },
  iconActionText: {
    fontSize: 18,
    color: '#009C4E',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#009C4E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: 22,
    color: '#fff',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#888',
  },
});

export default AccountDetailScreen;
