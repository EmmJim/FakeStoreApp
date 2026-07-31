import React from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { CartItem } from '../context/CartTypes';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

type ProductCardProps = {
    product: CartItem;
};

export const CardItem = ({ product }: ProductCardProps) => {
    const { incrementProduct, removeProduct, decrementProduct } = useCart();

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.productContainer}>
                    <Image
                        source={{ uri: product.images[0] }}
                        style={styles.image}
                    />

                    <View style={styles.infoContainer}>
                        <Text style={styles.title} numberOfLines={2}>
                        {product.title}
                        </Text>

                        <Text style={styles.quantity}>
                        Quantity: {product.quantity}
                        </Text>

                        <View style={styles.actionsContainer}>
                            <Pressable
                                style={styles.quantityButton}
                                onPress={() => decrementProduct(product.id)}
                            >
                                <Minus size={15} color='white' />
                            </Pressable>

                            <Pressable
                                style={styles.quantityButton}
                                onPress={() => incrementProduct(product.id)}
                            >
                                <Plus size={15} color='white' />
                            </Pressable>

                            <Pressable
                                style={styles.deleteButton}
                                onPress={() => removeProduct(product.id)}
                            >
                                <Trash2 size={20} color='red' />
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>
                        ${product.price}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default CardItem;

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    productContainer: {
        flexDirection: 'row',
        gap: 20,
        flex: 1,
    },

    image: {
        width: 90,
        height: 80,
        borderRadius: 10,
        resizeMode: 'cover',
    },

    infoContainer: {
        justifyContent: 'space-between',
        flex: 1,
    },

    title: {
        fontWeight: 'bold',
        color: '#454545',
        fontSize: 14,
    },

    quantity: {
        fontSize: 12,
    },

    actionsContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },

    quantityButton: {
        backgroundColor: '#454545',
        borderRadius: 5,
        padding: 2,
    },

    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    priceContainer: {
        justifyContent: 'flex-end',
        paddingBottom: 5,
    },

    price: {
        color: '#FCA73F',
        fontWeight: 'bold',
        fontSize: 18,
    },
});