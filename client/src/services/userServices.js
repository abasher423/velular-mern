/* eslint-disable import/no-anonymous-default-export */
import api from './api';

// All requests made to the server for users

const index = (token) => {
    return api().get('/users', token);
};
const indexOne = (userId, token) => {
    return api().get(`/users/${userId}`, token);
};
const adminFetchUser = (userId, token) => {
    return api().get(`/users/${userId}/admin-fetch`, token);
};
const adminUpdateUser = (userId, userData, token) => {
    return api().patch(`/users/${userId}/admin-update`, userData,token);
};
const update = (userId, updateItems, token) => {
    return api().patch(`/users/${userId}`, updateItems, token)
};
const deleteUser = (userId, token) => {
    return api().delete(`/users/${userId}`, token)
};

export default{
    index,
    indexOne,
    adminFetchUser,
    adminUpdateUser,
    update,
    deleteUser
};