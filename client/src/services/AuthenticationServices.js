/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const login = (credentials) => {
    return api().post('/users/login', credentials);
}

const register = (data) => {
    return api().post('/users/register', data);
}

const paypal = () => {
    return api().get('/config/paypal');
}

export default{
    login,
    register,
    paypal
}