import React from 'react';
import Card from '../components/Product';
import Grid from '@material-ui/core/Grid'
import products from '../products';

const HomePage = () => {
    return (
        <>
        <h1>Latest Products</h1>
        <Grid container spacing={4} alignItems="stretch">
            {products.map(product => {
                return <Grid item xs={3} key={product._id} >
                            <Card 
                                product={product}
                            />
                        </Grid>
            })}
        </Grid>
        </>
    );
}

export default HomePage;