import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Product';
import Grid from '@material-ui/core/Grid'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts }from '../actions/productActions';

const ListedProducts = () => {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);

    const { loading, error, products} =  productList;
    
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
        <h1>Latest Products</h1>
        { loading ? <Loader /> : error ? <Message status="error" text={error} />
            : <Grid container spacing={2} alignItems="stretch">
            {products.map(product => {
                return <Grid item xs={3} key={product._id} >
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