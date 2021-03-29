/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const index = (token) => {
    return api().get('/users', token);
}

const indexOne = (userId, token) => {
    return api().get(`/users/${userId}`, token);
};

const update = (userId, updateItems, token) => {
    return api().patch(`/users/${userId}`, updateItems, token)
};

export default{
    index,
    indexOne,
    update
};