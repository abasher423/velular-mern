import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'react-router-dom/Link';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Container, Divider, IconButton, InputLabel, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import productServices from '../services/productServices';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles( theme => ({
    root: {
        minWidth: 275,
      },
    box: {
        display: "flex",
        justifyContent: "space-between"
    },
    btn: {
        "&:hover": {
            backgroundColor: theme.palette.success.main
        },
        marginBottom: "0.5rem",
        backgroundColor: theme.palette.info.dark
    },
    submitBtn: {
        "&:hover": {
            backgroundColor: theme.palette.success.main,
            color: 'white'
        },
        backgroundColor: 'black',
        color: 'white',
        marginTop: '1rem',
        marginBottom: '150px' //
    },
    backIcon: {
        "&:hover": {
            backgroundColor: "black"
        },
        backgroundColor: theme.palette.text.secondary,
        color: "white",
        marginBottom: "2rem"
    },
    divider: {
        margin: theme.spacing(4)
    },
    image: {
        width: '390px',
        height: 'auto',
        [theme.breakpoints.down('sm')] : {
            width: "300px",
            height: "auto"
        }
    },
    reviewDivider: {
        margin: '2rem 0'
    },
    ratingDropDown: {
        width: 400
    },
    txtfield: {
        width: '45px'
    }
}));

const ProductDetailScreen = ({ history, match }) => {
    const productId = match.params.productId;
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(5);
    const [product, setProduct] = useState('');
    const [error, setError] = useState('');
    const [reviewError, setReviewError] = useState('');
    const [open, setOpen] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    useEffect(() => {
        if(!product){
            const fetchProductDetails = async () => {
                try {
                    const response = await productServices.indexOne(productId)
                    setProduct(response.data)
                } catch(err){
                    setError(err)
                }
            }
    
            fetchProductDetails();
        }

    }, [productId, product]);

    const handleQtyChange = e => {
        setQuantity(e.target.value)
    };

    const handleSizeChange = e => {
        setSize(e.target.value)
    };

    const addToCartHandler = (e) => {
        dispatch(addToCart(product._id, quantity, size))
        history.push('/cart');
    };

    // HANDLERS

    const ratingHandler = (e) => {
        setRating(e.target.value);
    };

    const commentHandler = (e) => {
        setComment(e.target.value);
    }

    const submitHandler = async () => {
        try {
            if (userInfo){
                const reviewData = { rating, comment };
                const token = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                };
                await productServices.writeReview(productId, reviewData, token);
                setProduct('');
            } else {
                history.push('/login');
            }
        } catch(error){
            setReviewError(error.response && error.response.data.message);
            setTimeout(() => setReviewError(''), 3000);
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    
    return (
        <>
            <Container>
            <IconButton edge="start" className={classes.backIcon} color="inherit" component={Link} to={'/products'} aria-label="back">
                <ArrowBackIcon />
            </IconButton>
            </Container>
            <Container>
                {error ? <Message status="error" text={error} /> : (
                    <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <div className={classes.image}>
                            <img src={product.productImage} alt={product}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div>
                            <Typography variant="h2" component="h2" >{product.name}</Typography>
                            <Divider style={{margin: "0.5rem 0"}}/>
                            <Rating value={product.averageRating} text={`${product.totalNumRating} Reviews`} />
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
                                    <Typography  gutterBottom>Status</Typography>
                                    <Typography                                
                                    gutterBottom 
                                    style={product.quantityInStock > 0 ? {color: "#81c784"} : {color: "red"}}>
                                        {product.quantityInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Typography>
                                </div>
                                <Divider style={{margin: "0.5rem 0"}}/>

                                <div className={classes.box}>
                                    <Typography gutterBottom>Quantity</Typography>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                        labelId="quantity-select-label"
                                        id="quantity-select"
                                        value={quantity}
                                        onChange={handleQtyChange}
                                        >
                                        {
                                            [...Array(product.quantityInStock).keys()].map(k => (
                                                <MenuItem key={k + 1} value={k + 1}>{k + 1}</MenuItem>
                                            ))
                                        }
                                        </Select>
                                    </FormControl>
                                </div>
                                <Divider style={{margin: "0.5rem 0"}}/>

                                <div className={classes.box}>
                                    <Typography gutterBottom>Size (3 - {product.size})</Typography>
                                    <TextField 
                                        variant="standard"
                                        className={classes.txtfield}
                                        id="size"
                                        value={size}
                                        onChange={handleSizeChange}
                                        name="size"
                                    />
                                </div>
                                <Divider style={{margin: "0.5rem 0"}}/>
                            </CardContent>
                            <CardActions>
                                <Button 
                                variant="contained" 
                                color="secondary" 
                                size="small"
                                fullWidth 
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
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Divider className={classes.divider}/>
                    </Grid>
                    {product && product.reviews && product.reviews.length > 0 && (<Grid item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h2">Reviews</Typography>
                            <Divider />
                        </Grid>
                    </Grid>)}
                    {reviewError && <Message status="error" text={reviewError}/>}
                     {product && product.reviews && product.reviews.map((review, idx) => (
                        <Grid item xs={12} key={idx}>
                            <Typography>{review.firstName}</Typography>
                                <Rating value={review.rating} />
                            <Typography>{review.comment}</Typography>
                            <Typography>
                                {review.createdAt.substring(8,10)}/
                                {review.createdAt.substring(5,7)}/
                                {review.createdAt.substring(0,4)}
                            </Typography>
                            <Divider className={classes.reviewDivider}/>
                         </Grid>
                     ))}
                    <form>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h2" style={{margin: '2rem 0'}}>Write a Review</Typography>
                        <Divider />
                    </Grid>  
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2">Rating</Typography>
                        <FormControl className={classes.ratingDropDown} margin="normal">
                            <Select
                                labelId="rating-label"
                                id="rating-select"
                                variant="outlined"
                                open={open}
                                value={rating}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                onChange={ratingHandler}
                                >
                                <MenuItem value="0">Select Rating</MenuItem>
                                <MenuItem value="1">1 - Very Poor</MenuItem>
                                <MenuItem value="2">2 - Poor</MenuItem>
                                <MenuItem value="3">3 - Ok</MenuItem>
                                <MenuItem value="4">4 - Good</MenuItem>
                                <MenuItem value="5">5 - Excellent</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2">Comment</Typography>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            label="Comment"
                            id="comment"
                            name="comment"
                            rows={4}
                            onChange={commentHandler}
                            multiline
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant="contained"
                            color="primary"
                            className={classes.submitBtn}
                            onClick={submitHandler}
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Grid>
                    </form>    
                </Grid>
            </Container>
        </>
    );
};

export default ProductDetailScreen;