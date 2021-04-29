import axios from 'axios';

const api = () => {
    return axios.create({
        baseURL: 'http://localhost:8080/api'
        // baseURL: '/api'  
    });
}

export default api;