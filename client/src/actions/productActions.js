// action creators
import productServices from '../services/productsServices';
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE
} from '../constants/productConstants';

export const listProducts = () => async (dispatch) =>{
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await productServices.index();
        dispatch({ 
            type: PRODUCT_LIST_SUCCESS,
            payload: data.products
        });
    } catch (error){
        dispatch({
            type: PRODUCT_LIST_FAILURE,
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const listProductDetails = (productId) => async (dispatch) =>{
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await productServices.indexOne(productId);
        dispatch({ 
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error){
        dispatch({
            type: PRODUCT_DETAILS_FAILURE,
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}