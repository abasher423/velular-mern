/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const index = () => {
    return api().get('/products');
};

const indexOne = (productId) => {
    return api().get(`/products/${productId}`);
};

const fetchCustomsList = (token) => {
    return api().get('/products/customs', token);
};

const acceptCustom = (customId, token) => {
    return api().put(`/products/customs/${customId}/accept`, token);
};

const rejectCustom = (customId, token) => {
    return api().put(`/products/customs/${customId}/reject`, token);
};

const updateCustom = (customData, customId, token) => {
    return api().patch(`/products/${customId}`, customData, token);
};

export default{
    index,
    indexOne,
    fetchCustomsList,
    acceptCustom,
    rejectCustom,
    updateCustom
};