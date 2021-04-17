// action creators
import productServices from '../services/productServices';
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAILURE
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