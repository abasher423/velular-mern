import axios from 'axios';

const api = () => {
    return axios.create({
        baseURL: 'http://localhost:8080/api'
    });
}

export default api;