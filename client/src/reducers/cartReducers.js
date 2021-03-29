import {
    CART_ADD_ITEM,
    CART_DELETE_ITEM,
    CART_ITEMS_RESET,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_DETAILS
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingDetails: {} }, action) => {
    switch (action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(product => product.productId === item.productId);

            if (existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(product => product.productId === existItem.productId ? item : product)
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }

        case CART_DELETE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(product => product.productId !== action.payload)
            }

        case CART_SAVE_SHIPPING_DETAILS:
            return { 
                ...state, 
                shippingDetails: action.payload 
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case CART_ITEMS_RESET: {
            return { ...state, cartItems: [] };
        }
        default:
           return state;
    }
};