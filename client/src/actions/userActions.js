import { 
    USER_LOGIN_FAILURE, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT,
    USER_REGISTER_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from "../constants/userConstants";
import authenticationServices from '../services/AuthenticationServices';

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

        console.log(data);

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