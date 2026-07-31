import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

import CardItem from '../components/CardItem';
import { useCart } from '../context/CartContext';

export const CartScreen = () => {
  const navigation = useNavigation();
  const { items, total } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft
              width={30}
              height={30}
              color="black"
            />
          </Pressable>

          <Text style={styles.headerTitle}>
            My Cart
          </Text>
        </View>
      </View>

      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardItem product={item} />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Your cart is empty, add items to your cart
            </Text>
          </View>
        )}
      />

      <View style={styles.checkoutCard}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.totalPrice}>
            ${total.toFixed(2)}
          </Text>
        </View>

        <Pressable style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>
            CHECKOUT
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  header: {
    marginBottom: 5,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginVertical: 5,
  },

  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  list: {
    flex: 1,
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },

  emptyText: {
    fontSize: 16,
    color: '#666',
  },

  checkoutCard: {
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFF',
  },

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalLabel: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  totalPrice: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  checkoutButton: {
    marginTop: 16,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FCA73F',
    alignItems: 'center',
  },

  checkoutButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CartScreen;