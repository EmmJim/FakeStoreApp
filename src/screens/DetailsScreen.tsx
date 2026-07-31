import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Snackbar } from 'react-native-paper';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const { width } = Dimensions.get('window');

export default function DetailsScreen({route}: Props) {
  const { product } = route.params;
  const navigation = useNavigation();
  const { addProduct } = useCart();
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={product.images}
        horizontal
        pagingEnabled
        style={styles.imagesList}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />

      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft
          width={30}
          height={30}
          color="black"
        />
      </Pressable>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {product.title}
          </Text>

          <Text style={styles.price}>
            ${product.price}
          </Text>
        </View>

        <Text style={styles.detailsTitle}>
          Details
        </Text>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {product.description}
          </Text>
        </View>

        <Pressable
          style={styles.buyButton}
          onPress={() => {
            addProduct(product);
            setSnackbarVisible(true);
          }}
        >
          <Text style={styles.addToCartText}>
            ADD TO CART
          </Text>
        </Pressable>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        🛒 Product added to cart!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesList: {
    flexGrow: 0,
  },

  image: {
    width,
    height: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  content: {
    padding: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
    flexWrap: 'wrap',
    gap: 10
  },

  title: {
    fontWeight: 'bold',
    fontSize: 17,
  },

  price: {
    color: '#F29D38',
    fontWeight: 'bold',
    fontSize: 22,
  },

  detailsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  descriptionContainer: {
    backgroundColor: '#ebebeb',
    padding: 5,
    borderRadius: 10,
    marginVertical: 20
  },

  description: {
    width: '90%',
    marginVertical: 5,
    color: '#979595',
  },

  buyButton: {
    backgroundColor: '#FCA73F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
  },

  addToCartText: {
    fontWeight: 'bold',
  },
});