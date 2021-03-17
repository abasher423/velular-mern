import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'react-router-dom/Link';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Container, Divider, ThemeProvider } from '@material-ui/core';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

const useStyles = makeStyles( theme => ({
    root: {
        minWidth: 275,
      },
    box: {
        display: "flex",
        justifyContent: "space-between"
    },
    btn: {
        marginBottom: "0.5rem",
        backgroundColor: theme.palette.success.main
    }
}));

const ProductDetailScreen = ({ history, match }) => {
    const [quantity, setQuantity] = useState(1);

    const classes = useStyles();
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    
    useEffect(() => {
        dispatch(listProductDetails(match.params.productId));
    }, [dispatch, match]);

    const handleQtyChange = e => {
        setQuantity(e.target.value)
    };

    const addToCartHandler = (e) => {
        dispatch(addToCart(product._id, quantity))
        history.push('/cart')
        // history.push(`/cart/${product._id}?qty=${quantity}`);
    }
    return (
        <>
            <Container>
                <Button variant="contained" color="secondary" component={Link} to={'/products'} style={{ marginBottom: "2rem" }}>Back</Button>
            </Container>
            <Container>
                { loading ? <Loader /> : error ? <Message status="error" text={error} /> : (
                    <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <div className={classes.image}>
                            <Image src={product.productImage} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div>
                            <Typography variant="h2" component="h2" >{product.name}</Typography>
                            <Divider style={{margin: "0.5rem 0"}}/>
                            <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                            <Divider style={{margin: "0.5rem 0"}}/>
                            <Typography variant="h4" component="h3">{product.brand}</Typography>
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
                                    style={product.quantityInStock > 0 ? {color: "#81c784"} : {color: "red"}}>
                                        {product.quantityInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Typography>
                                </div>
                                <Divider style={{margin: "0.5rem 0"}}/>

                                <div className={classes.box}>
                                    <Typography color="success" gutterBottom>Quantity</Typography>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={quantity}
                                        onChange={handleQtyChange}
                                        >
                                        {
                                            [...Array(product.quantityInStock).keys()].map(x => (
                                                <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                                            ))
                                        }
                                        </Select>
                                    </FormControl>
                                </div>
                                <Divider style={{margin: "0.5rem 0"}}/>
                            </CardContent>
                            <CardActions>
                                <Button 
                                variant="contained" 
                                color="secondary" 
                                size="small" 
                                className={classes.btn}
                                onClick={addToCartHandler} 
                                disabled={product.countInStock === 0}>
                                    Add to Cart
                                </Button>
                            </CardActions>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
                )}
                
            </Container>
        </>
    );
};

export default ProductDetailScreen;