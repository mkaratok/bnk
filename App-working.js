import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataProvider } from './src/context/DataContext';
import AccountListScreen from './src/screens/AccountListScreenSimple';
import TransactionListScreen from './src/screens/TransactionListScreenSimple';
import ReceiptScreen from './src/screens/ReceiptScreenSimple';
import ManageAccountsScreen from './src/screens/ManageAccountsScreen';
import ManageTransactionsScreen from './src/screens/ManageTransactionsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('accounts');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const navigate = (screen, params = {}) => {
    if (params.account) setSelectedAccount(params.account);
    if (params.receiptNumber) setSelectedReceipt(params.receiptNumber);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (currentScreen === 'receipt') {
      setCurrentScreen('transactions');
    } else if (currentScreen === 'transactions') {
      setCurrentScreen('accounts');
    } else if (currentScreen === 'manageAccounts' || currentScreen === 'manageTransactions') {
      setCurrentScreen('accounts');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'accounts':
        return <AccountListScreen navigate={navigate} />;
      case 'transactions':
        return <TransactionListScreen navigate={navigate} goBack={goBack} account={selectedAccount} />;
      case 'receipt':
        return <ReceiptScreen navigate={navigate} goBack={goBack} receiptNumber={selectedReceipt} />;
      case 'manageAccounts':
        return <ManageAccountsScreen navigate={navigate} goBack={goBack} />;
      case 'manageTransactions':
        return <ManageTransactionsScreen navigate={navigate} goBack={goBack} />;
      default:
        return <AccountListScreen navigate={navigate} />;
    }
  };

  return (
    <DataProvider>
      <View style={styles.container}>
        {renderScreen()}
      </View>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
