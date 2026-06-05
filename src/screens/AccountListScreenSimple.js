import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useData } from '../context/DataContext';
import MenuModal from './MenuModal';

const AccountListScreenSimple = ({ navigate }) => {
  const { accounts } = useData();
  const [menuVisible, setMenuVisible] = useState(false);

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const renderAccount = ({ item }) => (
    <TouchableOpacity
      style={styles.accountCard}
      onPress={() => navigate('transactions', { account: item })}
    >
      <View style={styles.accountHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>💳</Text>
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountName}>{item.accountName}</Text>
          <Text style={styles.accountNumber}>{item.accountNumber}</Text>
          <Text style={styles.accountType}>{item.type}</Text>
        </View>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Bakiye</Text>
        <Text style={styles.balanceAmount}>
          {formatCurrency(item.balance, item.currency)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hesaplarım</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={accounts}
        renderItem={renderAccount}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <MenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigate={navigate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1a237e',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  accountCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  accountHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1a237e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  accountType: {
    fontSize: 11,
    color: '#999',
  },
  balanceContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  iconText: {
    fontSize: 24,
    color: '#fff',
  },
  menuIcon: {
    fontSize: 28,
    color: '#fff',
  },
});

export default AccountListScreenSimple;
