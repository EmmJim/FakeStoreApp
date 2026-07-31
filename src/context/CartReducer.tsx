import { CartAction, CartState } from './CartTypes';

export const initialCartState: CartState = {
    items: [],
};

export const cartReducer = (
    state: CartState,
    action: CartAction,
): CartState => {

    switch (action.type) {
        case 'ADD_PRODUCT': {
            const existingProduct = state.items.find(
                item => item.id === action.payload.id,
            );

            if (existingProduct) {
                    return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        } : item,
                    ),
                };
            }

            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        ...action.payload,
                        quantity: 1,
                    },
                ],
            };
        }

        case 'REMOVE_PRODUCT':
            return {
                ...state,
                items: state.items.filter(
                item => item.id !== action.payload,
                ),
            };

        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
            };

        case 'DECREMENT_PRODUCT':
            return {
                ...state,
                items: state.items
                .map(item =>
                    item.id === action.payload
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                    } : item,
                )
                .filter(item => item.quantity > 0),
            };

        case 'INCREMENT_PRODUCT':
        return {
            ...state,
            items: state.items.map(item =>
            item.id === action.payload
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                } : item,
            ),
        };

        default:
        return state;
    }
};