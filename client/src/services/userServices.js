/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const indexOne = (userId, token) => {
    return api.get(`/users/${userId}`);
};

const update = (userId, userData, token) => {
    return api().patch(`/users/${userId}`, userData, token)
};

export default{
    indexOne,
    update
};