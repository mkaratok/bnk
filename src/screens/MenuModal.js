import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const MenuModal = ({ visible, onClose, navigate }) => {
  const menuItems = [
    { icon: 'H', label: 'Hesaplarım', screen: 'accounts' },
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
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>QNB</Text>
            </View>
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
                activeOpacity={0.8}
              >
                <View style={styles.menuIconBox}>
                  <Text style={styles.menuIconText}>{item.icon}</Text>
                </View>
                <Text style={styles.menuItemText}>{item.label}</Text>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <View style={styles.footerLine} />
            <Text style={styles.footerText}>QNB Finansbank Mobil v1.0.0</Text>
            <Text style={styles.footerSubtext}>Tüm hakları saklıdır</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 54, 93, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 32,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1B365D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B365D',
    flex: 1,
    marginLeft: 12,
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 22,
    color: '#8898AA',
    fontWeight: '400',
  },
  menuItems: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF3E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuIconText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F26522',
  },
  menuItemText: {
    fontSize: 15,
    color: '#1B365D',
    flex: 1,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 18,
    color: '#CBD5E0',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    marginTop: 10,
  },
  footerLine: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EDF2F7',
    marginBottom: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#8898AA',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 11,
    color: '#CBD5E0',
    marginTop: 4,
  },
});

export default MenuModal;
