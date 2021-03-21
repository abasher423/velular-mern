/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const indexOne = (userId, token) => {
    return api().get(`/users/${userId}`, token);
};

const update = (userId, updateItems, token) => {
    return api().patch(`/users/${userId}`, updateItems, token)
};

export default{
    indexOne,
    update
};