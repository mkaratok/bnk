import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useData } from '../context/DataContext';

const ReceiptScreenSimple = ({ goBack, receiptNumber }) => {
  const { receipts } = useData();
  const receipt = receipts[receiptNumber];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (!receipt) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dekont</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>Dekont bulunamadı</Text>
        </View>
      </View>
    );
  }

  const DetailRow = ({ label, value }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dekont</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.receiptCard}>
          <View style={styles.statusContainer}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.statusText}>{receipt.status}</Text>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>İşlem Tutarı</Text>
            <Text style={styles.amount}>
              {formatCurrency(receipt.amount, receipt.currency)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsContainer}>
            <DetailRow label="Dekont No" value={receipt.receiptNumber} />
            <DetailRow label="Referans No" value={receipt.referenceNumber} />
            <DetailRow label="İşlem Tarihi" value={formatDate(receipt.date)} />
            <DetailRow label="İşlem Türü" value={receipt.transactionType} />
            
            <View style={styles.sectionDivider} />
            
            <Text style={styles.sectionTitle}>Gönderen Bilgileri</Text>
            <DetailRow label="Hesap Sahibi" value={receipt.senderName} />
            <DetailRow label="Hesap No" value={receipt.senderAccount} />
            
            <View style={styles.sectionDivider} />
            
            <Text style={styles.sectionTitle}>Alıcı Bilgileri</Text>
            <DetailRow label="Hesap Sahibi" value={receipt.receiverName} />
            <DetailRow label="Hesap No" value={receipt.receiverAccount} />
            
            <View style={styles.sectionDivider} />
            
            <DetailRow label="Açıklama" value={receipt.description} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.shieldIcon}>🛡️</Text>
            <Text style={styles.footerText}>Bu dekont güvenli bir şekilde oluşturulmuştur</Text>
          </View>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  receiptCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4caf50',
    marginTop: 8,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 24,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#f5f5f5',
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    marginTop: 16,
  },
  backButton: {
    fontSize: 24,
    color: '#fff',
  },
  errorIcon: {
    fontSize: 64,
  },
  successIcon: {
    fontSize: 48,
    color: '#4caf50',
  },
  shieldIcon: {
    fontSize: 16,
    color: '#4caf50',
  },
});

export default ReceiptScreenSimple;
