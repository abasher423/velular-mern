import React from 'react';
import Card from '../components/Product';
import Grid from '@material-ui/core/Grid'
import products from '../products';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
    cardContainer: {
        paddingLeft: "40px",
        paddingRight: "40px"
      }
});

const HomePage = () => {
    const classes = useStyles();

    return (
        <>
        <h1>Latest Products</h1>
        <Grid container spacing={4} alignItems="stretch">
            {products.map((product, idx) => {
                return <Grid item xs={3}>
                            <Card 
                                key={idx} 
                                title={product.name}
                                description={product.description}
                                image={product.image}/>
                        </Grid>
            })}
        </Grid>
        </>
    );
}

export default HomePage;