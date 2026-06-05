import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountListScreen from '../screens/AccountListScreen';
import TransactionListScreen from '../screens/TransactionListScreen';
import ReceiptScreen from '../screens/ReceiptScreen';
import ManageAccountsScreen from '../screens/ManageAccountsScreen';
import ManageTransactionsScreen from '../screens/ManageTransactionsScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AccountList" component={AccountListScreen} />
      <Stack.Screen name="Transactions" component={TransactionListScreen} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} />
      <Stack.Screen name="ManageAccounts" component={ManageAccountsScreen} />
      <Stack.Screen name="ManageTransactions" component={ManageTransactionsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
