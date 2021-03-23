/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const create = (orderData, token) => {
    return api().post('/orders', orderData, token)
}

export default{
    create
}