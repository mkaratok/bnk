import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DataProvider } from './src/context/DataContext';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </DataProvider>
  );
}
