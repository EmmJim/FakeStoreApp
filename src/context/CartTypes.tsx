import { Product } from "../screens/HomeScreen";

export interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

export type CartAction =
    | {
        type: 'ADD_PRODUCT';
        payload: Product;
        }
    | {
        type: 'INCREMENT_PRODUCT';
        payload: number;
        }
    | {
        type: 'REMOVE_PRODUCT';
        payload: number;
        }
    | {
        type: 'DECREMENT_PRODUCT';
        payload: number;
        }
    | {
        type: 'CLEAR_CART';
        };