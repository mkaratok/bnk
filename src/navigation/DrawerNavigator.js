import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import StackNavigator from './StackNavigator';
import ManageAccountsScreen from '../screens/ManageAccountsScreen';
import ManageTransactionsScreen from '../screens/ManageTransactionsScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Ionicons name="business" size={48} color="#fff" />
        <Text style={styles.drawerTitle}>Banka Uygulaması</Text>
        <Text style={styles.drawerSubtitle}>Yönetim Paneli</Text>
      </View>
      
      <View style={styles.drawerContent}>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('Home')}
        >
          <Ionicons name="home" size={24} color="#1a237e" />
          <Text style={styles.drawerItemText}>Ana Sayfa</Text>
        </TouchableOpacity>

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Yönetim</Text>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('ManageAccounts')}
        >
          <Ionicons name="wallet" size={24} color="#1a237e" />
          <Text style={styles.drawerItemText}>Hesap Yönetimi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('ManageTransactions')}
        >
          <Ionicons name="swap-horizontal" size={24} color="#1a237e" />
          <Text style={styles.drawerItemText}>İşlem Yönetimi</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>Versiyon 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="ManageAccounts" component={ManageAccountsScreen} />
      <Drawer.Screen name="ManageTransactions" component={ManageTransactionsScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#1a237e',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  drawerSubtitle: {
    fontSize: 14,
    color: '#b3b3ff',
    marginTop: 4,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    paddingHorizontal: 20,
    paddingVertical: 8,
    textTransform: 'uppercase',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

export default DrawerNavigator;
