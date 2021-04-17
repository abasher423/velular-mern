import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer, userListReducer, userDeleteReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListUserReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    usersList: userListReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListUser: orderListUserReducer
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
    userLogin: { userInfo: userInfoFromStorage } // need to change
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;