import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILURE
} from '../constants/orderConstants';
import orderServices from '../services/orderServices';

export const createOrder = (orderData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();
        console.log(userInfo.token)
        const token = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await orderServices.create(orderData, token);
     
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data.order
        })

    } catch (error){
        dispatch({
            type: ORDER_CREATE_FAILURE,
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}