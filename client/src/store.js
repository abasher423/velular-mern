import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers';

/*
    * Functions for localstorage compatability and reducers
    * This was adapted from a Udemy course "MERN eCommerce From Scratch" by Brad Traversy
    * Link here to course' GitHub:
    * https://github.com/bradtraversy/proshop_mern/blob/master/frontend/src/store.js
*/

const reducer = combineReducers({
    cart: cartReducer,
    userLogin: userLoginReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
});

// fetching cart from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) : [];

// fetching user info from local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')) : null;

// fetching shipping details info from local storage
const shippingDetailsFromStorage = localStorage.getItem('shippingDetails')
  ? JSON.parse(localStorage.getItem('shippingDetails')) : {};

const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingDetails: shippingDetailsFromStorage 
    },
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;