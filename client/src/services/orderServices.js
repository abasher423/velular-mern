/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const index = (token) => {
    return api().get('/orders', token);
}

const indexOne = (orderId, token) => {
    return api().get(`/orders/${orderId}`, token);
};

const listUserOrders = (userId, token) => {
    return api().get(`/orders/${userId}/orders`, token);
};

const create = (orderData, token) => {
    return api().post('/orders', orderData, token);
};

const updateToPaid = (orderId, orderData, token) => {
    return api().put(`/orders/${orderId}/pay`, orderData, token);
};

const updateToDelivered = (orderId, token) => {
    return api().put(`/orders/${orderId}/delivered`, token);
}

export default{
    index,
    indexOne,
    listUserOrders,
    create,
    updateToPaid,
    updateToDelivered
}