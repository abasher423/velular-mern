/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const login = (credentials, headers) => {
    return api().post('/users/login', credentials, headers)
}

export default{
    login
}