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
} from '../constants/orderConstants';
import orderServices from '../services/orderServices';

/*
    * Two functions to create and pay for an order in the frontend
    * The code was adapted by renaming variable names
    * This was adapted from a Udemy course by Brad Traversy
    * Link here to course' GitHub:
    * https://github.com/bradtraversy/proshop_mern/blob/master/frontend/src/actions/orderActions.js
*/

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