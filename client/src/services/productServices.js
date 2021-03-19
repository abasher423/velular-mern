/* eslint-disable import/no-anonymous-default-export */
import api from './api';

const index = () => {
    return api().get('/products')
}
const indexOne = (productId) => {
    return api().get(`/products/${productId}`)
}

export default{
    index,
    indexOne
}