import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const MenuModal = ({ visible, onClose, navigate }) => {
  const menuItems = [
    { icon: '🏠', label: 'Ana Sayfa', screen: 'accounts' },
    { icon: '💳', label: 'Hesap Yönetimi', screen: 'manageAccounts' },
    { icon: '⇄', label: 'İşlem Yönetimi', screen: 'manageTransactions' },
  ];

  const handleNavigate = (screen) => {
    onClose();
    if (navigate) navigate(screen);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerIcon}>🏢</Text>
            <Text style={styles.modalTitle}>Menü</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuItems}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleNavigate(item.screen)}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuItemText}>{item.label}</Text>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Banka Uygulaması v1.0.0</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
    flex: 1,
    marginLeft: 12,
  },
  closeButton: {
    padding: 4,
  },
  menuItems: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
    flex: 1,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
  headerIcon: {
    fontSize: 40,
  },
  closeIcon: {
    fontSize: 28,
    color: '#666',
  },
  menuIcon: {
    fontSize: 24,
  },
  chevron: {
    fontSize: 20,
    color: '#999',
  },
});

export default MenuModal;
