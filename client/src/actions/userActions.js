import { ORDER_LIST_USER_RESET } from "../constants/orderConstants";
import { 
    USER_DETAILS_FAILURE,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAILURE, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT,
    USER_REGISTER_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAILURE,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from "../constants/userConstants";
import authenticationServices from '../services/AuthenticationServices';
import userServices from '../services/userServices';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const credentials = {
            "email": email,
            "password": password
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await authenticationServices.login({
            email: email,
            password: password
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data)); // need to change
    } catch (error){
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT});
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_USER_RESET });
}

export const register = (firstName, lastName, email, password, role) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const { data } = await authenticationServices.register({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: role
        });

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data)); // need to change

    } catch (error){
        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const getUserDetails = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        });

        const { userLogin: { userInfo } } = getState();
  
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await userServices.indexOne(userId, config);
     
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error){
        dispatch({
            type: USER_DETAILS_FAILURE,
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const updateUserProfile = (userId, userData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();
  
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await userServices.update(userId, userData, config);
     
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error){
        dispatch({
            type: USER_UPDATE_FAILURE,
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}