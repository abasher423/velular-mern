import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Product';
import Grid from '@material-ui/core/Grid'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Typography } from '@material-ui/core';
import productServices from '../services/productServices';
import { useState } from 'react';

const ListedProducts = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await productServices.index();
                setProducts(response.data.products)
            } catch(error){
                setError(error.response && error.response.data.message);
            }
        }
        fetchProductList()
    }, []);

    return (
        <>
        <Typography variant="h2" component="h2" style={{ marginBottom: "3rem", textAlign: "center" }}>Latest Products</Typography>
        { error ? <Message status="error" text={error} />
            : <Grid container spacing={2} alignItems="stretch">
            {products.map(product => {
                return <Grid item  xs={12} md={3} key={product._id} >
                            <Card 
                                product={product}
                            />
                        </Grid>
            })}
        </Grid>}
        
        </>
    );
}

export default ListedProducts;