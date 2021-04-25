import axios from 'axios';

const api = () => {
    return axios.create({
        baseURL: '/api'
    });
}

export default api;