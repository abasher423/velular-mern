import { 
    USER_LOGIN_FAILURE, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from "../constants/userConstants";

/*
    * Three functions to create an action in Redux for logging in
    * This was reused from a Udemy course "MERN eCommerce From Scratch" by Brad Traversy
    * Link here to course' GitHub:
    * https://github.com/bradtraversy/proshop_mern/blob/master/frontend/src/reducers/orderReducer.js
*/

export const userLoginReducer = (state = {}, action) => {
    switch (action.type){
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAILURE:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};