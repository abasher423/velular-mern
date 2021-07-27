/* eslint-disable import/no-anonymous-default-export */
import api from './api';

// All requests made to the server for products

const index = (keyword = '') => {
    return api().get(`/products?keyword=${keyword}`);
};
const indexOne = (productId) => {
    return api().get(`/products/${productId}`);
};
const fetchCustomsList = (token) => {
    return api().get('/products/customs', token);
};
const fetchArtistCustoms = (token) => {
    return api().get('/products/customs/artist', token);
};
const updateCustomStatus = (customId, status, token) => {
    return api().put(`/products/customs/${customId}`, status, token);
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
    updateCustomStatus,
    submitCustom,
    createCustom,
    writeReview,
    updateCustom,
    deleteCustom
};