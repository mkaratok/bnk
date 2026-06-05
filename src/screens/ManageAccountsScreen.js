import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, ScrollView, Alert, StatusBar } from 'react-native';
import { useData } from '../context/DataContext';

const ManageAccountsScreen = ({ navigate, goBack }) => {
  const { accounts, addAccount, updateAccount, deleteAccount } = useData();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState({
    accountNumber: '',
    accountName: '',
    balance: '',
    currency: 'TRY',
    type: 'Vadesiz'
  });

  const resetForm = () => {
    setFormData({
      accountNumber: '',
      accountName: '',
      balance: '',
      currency: 'TRY',
      type: 'Vadesiz'
    });
    setEditingAccount(null);
  };

  const handleAdd = () => {
    resetForm();
    setModalVisible(true);
  };

  const handleEdit = (account) => {
    setEditingAccount(account);
    setFormData({
      accountNumber: account.accountNumber,
      accountName: account.accountName,
      balance: account.balance.toString(),
      currency: account.currency,
      type: account.type
    });
    setModalVisible(true);
  };

  const handleDelete = (account) => {
    Alert.alert(
      'Hesabı Sil',
      `${account.accountName} hesabını silmek istediğinize emin misiniz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => deleteAccount(account.id)
        }
      ]
    );
  };

  const handleSave = () => {
    if (!formData.accountNumber || !formData.accountName || !formData.balance) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    const accountData = {
      accountNumber: formData.accountNumber,
      accountName: formData.accountName,
      balance: parseFloat(formData.balance),
      currency: formData.currency,
      type: formData.type
    };

    if (editingAccount) {
      updateAccount(editingAccount.id, accountData);
    } else {
      addAccount(accountData);
    }

    setModalVisible(false);
    resetForm();
  };

  const renderAccount = ({ item }) => (
    <View style={styles.accountCard}>
      <View style={styles.accountInfo}>
        <Text style={styles.accountName}>{item.accountName}</Text>
        <Text style={styles.accountNumber}>{item.accountNumber}</Text>
        <Text style={styles.balance}>
          {new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: item.currency,
          }).format(item.balance)}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.iconText}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.iconText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hesap Yönetimi</Text>
        <TouchableOpacity onPress={handleAdd}>
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={accounts}
        renderItem={renderAccount}
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
            <Text style={styles.modalTitle}>
              {editingAccount ? 'Hesabı Düzenle' : 'Yeni Hesap Ekle'}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Hesap Adı</Text>
              <TextInput
                style={styles.input}
                value={formData.accountName}
                onChangeText={(text) => setFormData({ ...formData, accountName: text })}
                placeholder="Örn: Vadesiz TL Hesabı"
              />

              <Text style={styles.label}>Hesap Numarası</Text>
              <TextInput
                style={styles.input}
                value={formData.accountNumber}
                onChangeText={(text) => setFormData({ ...formData, accountNumber: text })}
                placeholder="TR330006100519786457841326"
              />

              <Text style={styles.label}>Bakiye</Text>
              <TextInput
                style={styles.input}
                value={formData.balance}
                onChangeText={(text) => setFormData({ ...formData, balance: text })}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />

              <Text style={styles.label}>Para Birimi</Text>
              <View style={styles.pickerContainer}>
                {['TRY', 'USD', 'EUR'].map((curr) => (
                  <TouchableOpacity
                    key={curr}
                    style={[
                      styles.pickerButton,
                      formData.currency === curr && styles.pickerButtonActive
                    ]}
                    onPress={() => setFormData({ ...formData, currency: curr })}
                  >
                    <Text style={[
                      styles.pickerButtonText,
                      formData.currency === curr && styles.pickerButtonTextActive
                    ]}>
                      {curr}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Hesap Türü</Text>
              <View style={styles.pickerContainer}>
                {['Vadesiz', 'Vadeli'].map((type) => (
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
  accountCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  accountInfo: {
    flex: 1,
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
    marginBottom: 4,
  },
  balance: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#2196f3',
  },
  deleteButton: {
    backgroundColor: '#f44336',
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

export default ManageAccountsScreen;
