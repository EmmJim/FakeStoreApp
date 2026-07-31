import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './src/navigation/RootNavigator';
import { CartProvider } from './src/context/CartContext';
import { Provider as PaperProvider } from 'react-native-paper';


export default function App() {

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle={'light-content'}
        />
        <CartProvider>
          <RootNavigator />
        </CartProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}