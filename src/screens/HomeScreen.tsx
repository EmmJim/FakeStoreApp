import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Text, ActivityIndicator } from 'react-native';
import {ProductCard} from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
}

export default function HomeScreen() {
  const {products, loading} = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    return [
      'All',
      ...new Set(products.map((product: Product) => product.category.name)),
    ];
  }, [products]);
  
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      console.log(products)
      return products;
    }
  
    return products.filter(
      (product: Product) => product.category.name === selectedCategory
    );
  }, [products, selectedCategory]);

  if (loading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hi Emmanuel!</Text>
        <Text style={[styles.title, styles.titleLg]}>Good Morning!</Text>
      </View>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
        contentContainerStyle={styles.categoriesContainer}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isSelected = item === selectedCategory;

          return (
            <Pressable
              onPress={() => setSelectedCategory(item)}
              style={[
                styles.categoryButton,
                isSelected && styles.selectedCategoryButton,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        }}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item: Product) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard product={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  titleContainer: {
    marginVertical: 10
  },

  title: {
    fontSize: 13, 
    fontWeight: 'bold',
  },

  titleLg: {
    fontSize: 16
  },

  container: {
    flex: 1,
    padding: 18
  },

  categoriesContainer: {
    paddingVertical: 8,
  },

  categories: {
    height: 70
  },

  categoryButton: {
    borderWidth: 1,
    borderColor: '#454545',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  selectedCategoryButton: {
    backgroundColor: '#050505',
    borderColor: '#050505',
  },

  categoryText: {
    color: '#454545',
    fontWeight: '500'
  },

  selectedCategoryText: {
    color: '#fff',
  },
});