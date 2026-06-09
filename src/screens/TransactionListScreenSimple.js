import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  StatusBar, SafeAreaView
} from 'react-native';
import { useData } from '../context/DataContext';

const TransactionListScreenSimple = ({ navigate, goBack, account }) => {
  const { transactions } = useData();
  const [filterAll, setFilterAll] = useState('Hepsi');
  const [filterPeriod, setFilterPeriod] = useState('1 Ay');

  const accountTransactions = transactions[account?.id] || [];

  const formatCurrency = (amount, currency) => {
    let cur = currency === 'TRY' ? 'TL' : currency;
    let formatted = new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));
    return `${formatted} ${cur}`;
  };

  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.getDate().toString();
  };

  const formatDayName = (dateStr) => {
    const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    const months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const grouped = useMemo(() => {
    const groups = [];
    let currentMonth = '';
    accountTransactions.forEach(t => {
      const my = formatMonthYear(t.date);
      if (my !== currentMonth) {
        currentMonth = my;
        groups.push({ type: 'month', label: my });
      }
      groups.push({ type: 'tx', data: t });
    });
    return groups;
  }, [accountTransactions]);

  const renderItem = ({ item }) => {
    if (item.type === 'month') {
      return (
        <View style={styles.monthRow}>
          <Text style={styles.monthText}>{item.label}</Text>
        </View>
      );
    }
    const tx = item.data;
    const isPositive = tx.amount > 0;
    return (
      <View style={styles.txRow}>
        <View style={styles.txDayCol}>
          <Text style={styles.txDayNum}>{formatDay(tx.date)}</Text>
          <Text style={styles.txDayName}>{formatDayName(tx.date)}</Text>
          <Text style={styles.txTime}>{formatTime(tx.date)}</Text>
        </View>
        <View style={styles.txBody}>
          <View style={styles.txTopRow}>
            <Text style={styles.txDesc} numberOfLines={2}>{tx.description.toUpperCase()}</Text>
            <Text style={[styles.txAmount, isPositive ? styles.positive : styles.negative]}>
              {isPositive ? '' : '-'}{formatCurrency(tx.amount, account?.currency)}
            </Text>
          </View>
          <View style={styles.txActions}>
            {isPositive ? null : (
              <>
                <TouchableOpacity>
                  <Text style={styles.txActionText}>Tekrarla</Text>
                </TouchableOpacity>
                <Text style={styles.txActionSep}>|</Text>
              </>
            )}
            <TouchableOpacity
              onPress={() => navigate('receipt', { receiptNumber: tx.receiptNumber })}
            >
              <Text style={styles.txActionText}>Dekont</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.txBalance}>Bakiye: <Text style={styles.txBalanceVal}>{formatCurrency(tx.balance, account?.currency)}</Text></Text>
        </View>
      </View>
    );
  };

  if (!account) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hesap bulunamadı</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

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
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity style={styles.tabBtn} onPress={() => navigate('accountDetail', { account })}>
          <Text style={styles.tabText}>DETAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabBtn, styles.tabBtnActive]}>
          <Text style={[styles.tabText, styles.tabTextActive]}>HESAP HAREKETLERİ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterBtnText}>{filterAll}</Text>
          <Text style={styles.filterChevron}>▼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterBtnText}>{filterPeriod}</Text>
          <Text style={styles.filterChevron}>▼</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={grouped}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

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
    color: '#00874c',
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
    color: '#00874c',
    marginLeft: 6,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 1,
  },
  searchBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
    color: '#00874c',
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
    borderBottomColor: '#00874c',
  },
  tabText: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#00874c',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: '#F0F0F0',
  },
  filterBtnText: {
    fontSize: 14,
    color: '#333',
    marginRight: 4,
  },
  filterChevron: {
    fontSize: 10,
    color: '#00874c',
  },
  listContent: {
    paddingBottom: 20,
  },
  monthRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FAFAFA',
  },
  monthText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  txRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  txDayCol: {
    width: 40,
    alignItems: 'center',
  },
  txDayNum: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  txDayName: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  txTime: {
    fontSize: 10,
    color: '#aaa',
    marginTop: 2,
  },
  txBody: {
    flex: 1,
    paddingLeft: 10,
  },
  txTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  txDesc: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
    lineHeight: 18,
    flex: 1,
    marginRight: 8,
    textTransform: 'uppercase',
  },
  txActions: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  txActionText: {
    fontSize: 12,
    color: '#00874c',
    fontWeight: '600',
  },
  txActionSep: {
    fontSize: 12,
    color: '#ccc',
    marginHorizontal: 6,
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  positive: {
    color: '#00874c',
  },
  negative: {
    color: '#333',
  },
  txBalance: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
    textAlign: 'right',
  },
  txBalanceVal: {
    fontWeight: '700',
    color: '#333',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00874c',
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
});

export default TransactionListScreenSimple;
