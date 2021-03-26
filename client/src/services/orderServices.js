/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const indexOne = (orderId, token) => {
    return api().get(`/orders/${orderId}`, token);
}
const listUserOrders = (userId, token) => {
    return api().get(`/orders/${userId}/orders`, token);
}
const create = (orderData, token) => {
    return api().post('/orders', orderData, token);
}
const updateToPaid = (orderId, orderData, token) => {
    return api().put(`/orders/${orderId}/pay`, orderData, token);
}

export default{
    indexOne,
    listUserOrders,
    create,
    updateToPaid
}