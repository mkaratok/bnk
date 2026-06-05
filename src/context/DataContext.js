import React, { createContext, useState, useContext } from 'react';
import { accounts as initialAccounts, transactions as initialTransactions, receipts as initialReceipts } from '../data/mockData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [receipts, setReceipts] = useState(initialReceipts);

  const addAccount = (account) => {
    const newAccount = {
      ...account,
      id: Date.now().toString(),
    };
    setAccounts([...accounts, newAccount]);
    setTransactions({ ...transactions, [newAccount.id]: [] });
  };

  const updateAccount = (id, updatedAccount) => {
    setAccounts(accounts.map(acc => acc.id === id ? { ...acc, ...updatedAccount } : acc));
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
    const newTransactions = { ...transactions };
    delete newTransactions[id];
    setTransactions(newTransactions);
  };

  const addTransaction = (accountId, transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      accountId,
    };
    
    setTransactions({
      ...transactions,
      [accountId]: [newTransaction, ...(transactions[accountId] || [])]
    });

    const account = accounts.find(acc => acc.id === accountId);
    if (account) {
      updateAccount(accountId, { balance: account.balance + transaction.amount });
    }

    if (transaction.receiptNumber) {
      const newReceipt = {
        receiptNumber: transaction.receiptNumber,
        transactionId: newTransaction.id,
        date: transaction.date,
        senderAccount: transaction.type === 'Giden' ? account.accountNumber : '-',
        senderName: transaction.type === 'Giden' ? 'Ahmet Yılmaz' : (transaction.sender || '-'),
        receiverAccount: transaction.type === 'Gelen' ? account.accountNumber : '-',
        receiverName: transaction.type === 'Gelen' ? 'Ahmet Yılmaz' : (transaction.receiver || '-'),
        amount: Math.abs(transaction.amount),
        currency: account.currency,
        description: transaction.description,
        transactionType: transaction.category,
        status: 'Tamamlandı',
        referenceNumber: `REF-${Date.now()}`
      };
      setReceipts({ ...receipts, [transaction.receiptNumber]: newReceipt });
    }
  };

  const deleteTransaction = (accountId, transactionId) => {
    const accountTransactions = transactions[accountId] || [];
    const transaction = accountTransactions.find(t => t.id === transactionId);
    
    if (transaction) {
      const account = accounts.find(acc => acc.id === accountId);
      if (account) {
        updateAccount(accountId, { balance: account.balance - transaction.amount });
      }

      if (transaction.receiptNumber) {
        const newReceipts = { ...receipts };
        delete newReceipts[transaction.receiptNumber];
        setReceipts(newReceipts);
      }
    }

    setTransactions({
      ...transactions,
      [accountId]: accountTransactions.filter(t => t.id !== transactionId)
    });
  };

  return (
    <DataContext.Provider value={{
      accounts,
      transactions,
      receipts,
      addAccount,
      updateAccount,
      deleteAccount,
      addTransaction,
      deleteTransaction
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
