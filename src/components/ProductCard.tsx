import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from '../screens/HomeScreen';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useCart } from "../context/CartContext";
import { Snackbar } from 'react-native-paper';
import { useState } from 'react';


type ProductCardProps = {
  product: Product;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function ProductCard({ product }: ProductCardProps) {
  const navigation = useNavigation<NavigationProp>();
  const { addProduct } = useCart();

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.productName} numberOfLines={2}>
        {product.title}
      </Text>

      <Text style={styles.price}>
        Price: ${product.price}
      </Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.detailsButton}
          onPress={() => {
            navigation.navigate("Details", {
              product,
            });
          }}
        >
          <Text style={styles.detailsButtonText}>
            More Details
          </Text>
        </Pressable>

        <Pressable
          style={styles.cartButton}
          onPress={() => {
            addProduct(product);
            setSnackbarVisible(true);
          }}
        >
          <Text style={styles.cartButtonText}>
            Add To Cart
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
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    gap: 8,
  },

  image: {
    width: "100%",
    height: 140,
    borderRadius: 10,
  },

  productName: {
    marginTop: 10
  },

  price: {
    fontSize: 12,
    color: "#454545",
    fontWeight: "bold",
    marginVertical: 10,
  },

  buttonContainer: {
    flexDirection: "column",
    gap: 10,
  },

  detailsButton: {
    borderWidth: 1,
    borderColor: "#454545",
    padding: 5,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
  },

  detailsButtonText: {
    color: "#454545",
    fontSize: 12,
  },

  cartButton: {
    backgroundColor: "#454545",
    padding: 5,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
  },

  cartButtonText: {
    color: "#fff",
    fontSize: 12,
  },
});