import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILURE,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILURE,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAILURE,
    ORDER_LIST_USER_REQUEST,
    ORDER_LIST_USER_SUCCESS,
    ORDER_LIST_USER_FAILURE
} from '../constants/orderConstants';
import orderServices from '../services/orderServices';

export const createOrder = (orderData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();
        
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

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const { userLogin: { userInfo } } = getState();
       
        const token = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await orderServices.indexOne(orderId, token);
     
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })


    } catch (error){
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        });

        const { userLogin: { userInfo } } = getState();
       
        const token = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await orderServices.updateToPaid(orderId, paymentResult, token);
     
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })


    } catch (error){ // need to change
        dispatch({
            type: ORDER_PAY_FAILURE,
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const listUserOrder = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_USER_REQUEST
        });

        const { userLogin: { userInfo } } = getState();
       
        const token = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await orderServices.listUserOrders(userId, token);
     
        dispatch({
            type: ORDER_LIST_USER_SUCCESS,
            payload: data.orders
        })


    } catch (error){ // need to change
        dispatch({
            type: ORDER_LIST_USER_FAILURE,
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}