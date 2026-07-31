import React, {
    createContext,
    useContext,
    useMemo,
    useReducer,
    ReactNode,
} from 'react';

import { Product } from '../screens/HomeScreen';
import { cartReducer, initialCartState } from './CartReducer';
import { CartItem } from './CartTypes';

interface CartContextProps {
    items: CartItem[];
    addProduct: (product: Product) => void;
    incrementProduct: (productId: number) => void;
    removeProduct: (productId: number) => void;
    decrementProduct: (productId: number) => void;
    clearCart: () => void;
    total: number;
    totalItems: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    const addProduct = (product: Product) => {
        dispatch({
            type: 'ADD_PRODUCT',
            payload: product,
        });
    };

    const incrementProduct = (productId: number) => {
        dispatch({
            type: 'INCREMENT_PRODUCT',
            payload: productId,
        });
    };

    const removeProduct = (productId: number) => {
        dispatch({
            type: 'REMOVE_PRODUCT',
            payload: productId,
        });
    };

    const decrementProduct = (productId: number) => {
        dispatch({
            type: 'DECREMENT_PRODUCT',
            payload: productId,
        });
    };

    const clearCart = () => {
        dispatch({
            type: 'CLEAR_CART',
        });
    };

    const total = useMemo(() => {
        return state.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
        );
    }, [state.items]);

    const totalItems = useMemo(() => {
        return state.items.reduce(
            (sum, item) => sum + item.quantity,
            0,
        );
    }, [state.items]);

    const value: CartContextProps = {
        items: state.items,
        addProduct,
        incrementProduct,
        removeProduct,
        decrementProduct,
        clearCart,
        total,
        totalItems,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
    }

    return context;
}