import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, ScrollView, Alert, StatusBar } from 'react-native';
import { useData } from '../context/DataContext';

const ManageTransactionsScreen = ({ navigate, goBack }) => {
  const { accounts, transactions, addTransaction, deleteTransaction } = useData();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'Gelen',
    category: 'Diğer',
    receiver: '',
    sender: '',
    date: new Date().toISOString()
  });

  const resetForm = () => {
    setFormData({
      description: '',
      amount: '',
      type: 'Gelen',
      category: 'Diğer',
      receiver: '',
      sender: '',
      date: new Date().toISOString()
    });
  };

  const handleAdd = () => {
    resetForm();
    setModalVisible(true);
  };

  const handleDelete = (accountId, transactionId, description) => {
    Alert.alert(
      'İşlemi Sil',
      `"${description}" işlemini silmek istediğinize emin misiniz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => deleteTransaction(accountId, transactionId)
        }
      ]
    );
  };

  const handleSave = () => {
    if (!formData.description || !formData.amount || !selectedAccountId) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    const amount = parseFloat(formData.amount);
    const transactionData = {
      description: formData.description,
      amount: formData.type === 'Gelen' ? amount : -amount,
      type: formData.type,
      category: formData.category,
      receiver: formData.receiver,
      sender: formData.sender,
      date: formData.date,
      balance: 0,
      receiptNumber: `DKT-${Date.now()}`
    };

    addTransaction(selectedAccountId, transactionData);
    setModalVisible(false);
    resetForm();
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderAccountTransactions = ({ item: account }) => {
    const accountTransactions = transactions[account.id] || [];
    
    return (
      <View style={styles.accountSection}>
        <Text style={styles.accountSectionTitle}>{account.accountName}</Text>
        {accountTransactions.length === 0 ? (
          <Text style={styles.emptyText}>İşlem bulunmuyor</Text>
        ) : (
          accountTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <Text style={styles.description}>{transaction.description}</Text>
                <Text style={styles.date}>{formatDate(transaction.date)}</Text>
                <Text style={[
                  styles.amount,
                  { color: transaction.type === 'Gelen' ? '#4caf50' : '#f44336' }
                ]}>
                  {transaction.type === 'Gelen' ? '+' : '-'}
                  {formatCurrency(transaction.amount, account.currency)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(account.id, transaction.id, transaction.description)}
              >
                <Text style={styles.iconText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>İşlem Yönetimi</Text>
        <TouchableOpacity onPress={handleAdd}>
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={accounts}
        renderItem={renderAccountTransactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yeni İşlem Ekle</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Hesap Seç</Text>
              <View style={styles.accountPicker}>
                {accounts.map((account) => (
                  <TouchableOpacity
                    key={account.id}
                    style={[
                      styles.accountPickerButton,
                      selectedAccountId === account.id && styles.accountPickerButtonActive
                    ]}
                    onPress={() => setSelectedAccountId(account.id)}
                  >
                    <Text style={[
                      styles.accountPickerText,
                      selectedAccountId === account.id && styles.accountPickerTextActive
                    ]}>
                      {account.accountName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Açıklama</Text>
              <TextInput
                style={styles.input}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="İşlem açıklaması"
              />

              <Text style={styles.label}>Tutar</Text>
              <TextInput
                style={styles.input}
                value={formData.amount}
                onChangeText={(text) => setFormData({ ...formData, amount: text })}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />

              <Text style={styles.label}>İşlem Türü</Text>
              <View style={styles.pickerContainer}>
                {['Gelen', 'Giden'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.pickerButton,
                      formData.type === type && styles.pickerButtonActive
                    ]}
                    onPress={() => setFormData({ ...formData, type })}
                  >
                    <Text style={[
                      styles.pickerButtonText,
                      formData.type === type && styles.pickerButtonTextActive
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Kategori</Text>
              <View style={styles.categoryContainer}>
                {['Maaş', 'Alışveriş', 'Fatura', 'Nakit Çekim', 'Döviz İşlemi', 'Diğer'].map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryButton,
                      formData.category === cat && styles.categoryButtonActive
                    ]}
                    onPress={() => setFormData({ ...formData, category: cat })}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      formData.category === cat && styles.categoryButtonTextActive
                    ]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {formData.type === 'Gelen' && (
                <>
                  <Text style={styles.label}>Gönderen</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.sender}
                    onChangeText={(text) => setFormData({ ...formData, sender: text })}
                    placeholder="Gönderen adı"
                  />
                </>
              )}

              {formData.type === 'Giden' && (
                <>
                  <Text style={styles.label}>Alıcı</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.receiver}
                    onChangeText={(text) => setFormData({ ...formData, receiver: text })}
                    placeholder="Alıcı adı"
                  />
                </>
              )}
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  resetForm();
                }}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  accountSection: {
    marginBottom: 24,
  },
  accountSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  accountPicker: {
    marginBottom: 8,
  },
  accountPickerButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  accountPickerButtonActive: {
    backgroundColor: '#1a237e',
    borderColor: '#1a237e',
  },
  accountPickerText: {
    fontSize: 14,
    color: '#666',
  },
  accountPickerTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  pickerButtonActive: {
    backgroundColor: '#1a237e',
    borderColor: '#1a237e',
  },
  pickerButtonText: {
    fontSize: 14,
    color: '#666',
  },
  pickerButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#1a237e',
    borderColor: '#1a237e',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#1a237e',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  iconText: {
    fontSize: 20,
    color: '#fff',
  },
  backButton: {
    fontSize: 24,
    color: '#fff',
  },
  addButton: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ManageTransactionsScreen;
