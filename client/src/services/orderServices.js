/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const indexOne = (orderId, token) => {
    return api().get(`/orders/${orderId}`, token);
}
const create = (orderData, token) => {
    return api().post('/orders', orderData, token);
}

export default{
    indexOne,
    create
}