/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const login = (credentials) => {
    return api().post('/users/login', credentials)
}

export default{
    login
}