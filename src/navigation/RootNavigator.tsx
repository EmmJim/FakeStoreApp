import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetailsScreen from '../screens/DetailsScreen';
import TabNavigator from './TabNavigator';
import { Product } from '../screens/HomeScreen';
import { Image } from 'react-native';

export type RootStackParamList = {
  MainTabs: undefined;
  Details: {
    product: Product;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          headerStyle: {
            backgroundColor: '#050505',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={{ uri: 'https://coincierge.club/wp-content/uploads/2017/08/buy-icon.png' }}
              style={{
                width: 180,
                height: 30,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />

        <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
                headerShown: false,
            }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}