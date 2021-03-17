import { CART_ADD_ITEM } from '../constants/cartConstants';
import productServices from '../services/productsServices';

// getState fetches the state tree (for local storage)
export const addToCart = (productId, quantity) => async (dispatch, getState) => {
    const { data } = await productServices.indexOne(productId);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productId: data._id,
            name: data.name,
            brand: data.brand,
            productImage: data.productImage,
            quantityInStock: data.quantityInStock,
            price: data.price,
            quantity
        }
    })

    // saving to local storage (using localstorage API)
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}