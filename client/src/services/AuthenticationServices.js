/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const login = (credentials) => {
    return api().post('/users/login', credentials)
}

const register = (data) => {
    return api().post('/users/register', data)
}

export default{
    login,
    register
}