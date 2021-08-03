import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_DETAILS } from '../constants/cartConstants';
import productServices from '../services/productServices';

// getState fetches the state tree (for local storage)
export const addToCart = (productId, quantity, size) => async (dispatch, getState) => {
    const { data } = await productServices.indexOne(productId);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productId: data._id,
            artist: data.artist,
            name: data.name,
            category: data.category,
            description: data.description,
            brand: data.brand,
            productImage: data.productImage,
            quantityInStock: data.quantityInStock,
            price: data.price,
            quantity, size
        }
    })
    // saving to local storage (using localstorage API)
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const deleteFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: CART_DELETE_ITEM,
        payload: productId
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingDetails = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_DETAILS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymntMethod', JSON.stringify(data));
}