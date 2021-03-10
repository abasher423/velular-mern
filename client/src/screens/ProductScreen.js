import React from 'react';
import Link from 'react-router-dom/Link';
import Rating from '../components/Rating';
import products from '../products';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Container, Divider } from '@material-ui/core';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
      },
    box: {
        display: "flex",
        justifyContent: "space-between"
    },
    btn: {
        marginBottom: "0.5rem"
    }
});

const ProductScreen = ({ match }) => {
    const classes = useStyles();
    const product = products.find(product => product._id === match.params.productId);

    return (
        <>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Button variant="contained" component={Link} to={'/products'} style={{ marginTop: "50px" }}>Back</Button>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div className={classes.image}>
                            <Image src={product.image} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div>
                            <Typography variant="h4" component="h2" >{product.name}</Typography>
                            <Divider style={{margin: "0.5rem 0"}}/>
                            <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                            <Divider style={{margin: "0.5rem 0"}}/>
                            <Typography variant="h6" component="p">{`Price: £${product.price}`}</Typography> 
                            <Divider style={{margin: "0.5rem 0"}}/>
                            <Typography variant="h6" color="textSecondary" component="p">{product.description}</Typography> 
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div>
                        <Card className={classes.root} variant="outlined">
                            <CardContent justify="space-between">
                                <div className={classes.box}>
                                    <Typography gutterBottom>Price</Typography>
                                    <Typography variant="h5"gutterBottom>{`£${product.price}`}</Typography>
                                </div>
                                <Divider style={{margin: "0.5rem 0"}}/>
                                <div className={classes.box}>
                                    <Typography color="success" gutterBottom>Status</Typography>
                                    <Typography 
                                    color="success" 
                                    gutterBottom 
                                    style={product.countInStock > 0 ? {color: "#81c784"} : {color: "red"}}>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Typography>
                                </div>
                                <Divider style={{margin: "0.5rem 0"}}/>
                            </CardContent>
                            <CardActions>
                                <Button variant="outlined" color="primary" size="small" className={classes.btn} disabled={
                                    product.countInStock === 0
                                }>Add to Cart</Button>
                            </CardActions>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ProductScreen;