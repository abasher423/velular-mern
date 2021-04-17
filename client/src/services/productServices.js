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

const fetchArtistCustoms = (token) => {
    return api().get('/products/customs/artist', token);
}

const acceptCustom = (customId, token) => {
    return api().put(`/products/customs/${customId}/accept`, token);
};

const rejectCustom = (customId, token) => {
    return api().put(`/products/customs/${customId}/reject`, token);
};

const pendingCustom = (customId, token) => {
    return api().put(`/products/customs/${customId}/pending`, token);
};

const submitCustom = (customId, token) => {
    return api().put(`/products/customs/${customId}/submitted`, token);
};

const updateCustom = (customData, customId, token) => {
    return api().patch(`/products/${customId}`, customData, token);
};

const createCustom = (customData) => {
    return api().post('/products', customData, {headers: { "Content-Type": "multipart/form-data" }});
    
};

const writeReview = (productId, reviewData ,token) => {
    return api().post(`/products/${productId}/reviews`, reviewData, token);
};

const deleteCustom = (customId, token) => {
    return api().delete(`/products/${customId}`, token);
};

export default{
    index,
    indexOne,
    fetchCustomsList,
    fetchArtistCustoms,
    acceptCustom,
    rejectCustom,
    pendingCustom,
    submitCustom,
    createCustom,
    writeReview,
    updateCustom,
    deleteCustom
};