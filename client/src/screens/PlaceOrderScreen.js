import { Avatar, Button, Card, CardActions, CardContent, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import Message from '../components/Message';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

const useStyles = makeStyles((theme) => ({
    root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: "white",
  },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    title: {
        marginBottom: "2rem"
    },
    item: {
        margin: "1rem 0"
    },
    drawerPaper: { 
        width: 750,
        height: 100,
        margin: "1rem 0",
        background: "white" 
    },
    box: {
        display: "flex",
        justifyContent: "space-between"
    },
    btn: {
        "&:hover": {            
            backgroundColor: "white",
            border: `${theme.palette.info.dark} 3px solid`,
            color: theme.palette.info.dark,
        },
        backgroundColor: theme.palette.info.dark,
        color: "white",        
        fontWeight: 800,
        borderRadius: 25
    },
    backIcon: {
        "&:hover": {
            backgroundColor: "black"
        },
        backgroundColor: theme.palette.text.secondary,
        color: "white"
    },
    paper: {
        minHeight: 700,
        padding: "1rem"
    }
  }));

const PlaceOrderScreen = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const cart = useSelector(state => state.cart);
    if (!cart.shippingDetails.hasOwnProperty('address')){
        history.push('/shipping');
    }
    
    // calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }
    let total = 0;
    for (let i=0; i<cart.cartItems.length; i++){
        total += (cart.cartItems[i].price * cart.cartItems[i].quantity);
    }
    cart.totalItemsPrice = addDecimals(total);
    // shipping price (if total is < £100 then its £10 shipping fee)
    cart.totalShippingPrice = addDecimals(cart.totalItemsPrice > 100 ? 0 : 20);
    // 15% tax
    cart.tax = addDecimals(Number((0.05 * cart.totalItemsPrice).toFixed(2)));
    // total price
    cart.total = (Number(cart.totalItemsPrice) + Number(cart.totalShippingPrice) + Number(cart.tax)).toFixed(2);

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (success) {
          history.push(`/orders/${order._id}`)
          dispatch({ type: USER_DETAILS_RESET });
          dispatch({ type: ORDER_CREATE_RESET });
        }
        // eslint-disable-next-line
      }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shipping: cart.shippingDetails,
            paymentMethod: cart.paymentMethod,
            totalItemsPrice: cart.totalItemsPrice,
            totalShippingPrice: cart.totalShippingPrice,
            tax: cart.tax,
            total: cart.total
        }));
    };

    return(
        <Paper className={classes.paper}>
        <Container>
        <Grid container spacing={2}>
            {/* <Container> */}
                <Grid item xs={12}>
                    <Typography component="h1" variant="h3" align="center">Review Your Order</Typography>
                </Grid>
                <Grid item xs={12} className={classes.item}>
                <IconButton edge="start" className={classes.backIcon} color="inherit" component={Link} to={'/shipping'} aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                </Grid>
                <Grid item xs={12} md={8} className={classes.main}>
                    <Grid item xs={12} className={classes.item} >
                        <Typography component="h1" variant="h4"> Shipping Details </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.item} >
                        <Typography 
                        variant="body1">
                            {`${cart.shippingDetails.address}, ${cart.shippingDetails.city}, ${cart.shippingDetails.postCode}, ${cart.shippingDetails.country}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider style={{width: '750px'}}/>
                    </Grid>
                    <Grid item xs={12} className={classes.item} >
                        <Typography component="h1" variant="h4"> Payment Method </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.item} >
                        <Typography 
                        variant="body1">
                            Method: {cart.paymentMethod}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider style={{width: '750px'}}/>
                    </Grid>
                    <Grid item xs={12} className={classes.item} >
                        <Typography component="h1" variant="h4"> Order Items </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <List dense className={classes.root}>
                        {cart.cartItems.map((item, idx) => {
                            return (
                                <Paper className={classes.drawerPaper} key={idx}>
                                    <ListItem>
                                    <ListItemAvatar style={{margin: "0.5rem 0"}}>
                                        <Avatar alt="product image" src={item.productImage}  className={classes.large}/>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={item.name} 
                                        style={{margin: "0 2rem"}}
                                    />
                                    <ListItemText 
                                        primary={`Size ${item.size}`} 
                                        style={{margin: "0 2rem"}}
                                    />
                                    <ListItemText 
                                        primary={`${item.quantity} x £${item.price} = £${item.quantity * item.price}`} 
                                        style={{margin: "0 2rem"}}
                                    />
                                    </ListItem>
                                </Paper>
                                )
                            })}
                        </List>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4} className={classes.main}>
                    <Card // Code adapted from example in https://material-ui.com/components/cards/
                        className={classes.root} 
                        variant="outlined" 
                        align="center"
                    >
                        <CardContent justify="space-between">
                            <div>
                                <Typography variant="h5" gutterBottom algin="center">Order Summary</Typography>
                            </div>
                            <Divider style={{margin: "0.5rem 0"}}/>
                            <div className={classes.box}>
                                <Typography variant="h6">Items</Typography>
                                <Typography>£{cart.totalItemsPrice}</Typography>
                            </div>
                            <Divider style={{margin: "0.5rem 0"}}/>
                            <div className={classes.box}>
                                <Typography variant="h6">Shipping</Typography>
                                <Typography>£{cart.totalShippingPrice}</Typography>
                            </div>
                            <Divider style={{margin: "0.5rem 0"}}/>
                            <div className={classes.box}>
                                <Typography variant="h6">Tax</Typography>
                                <Typography>£{cart.tax}</Typography>
                            </div>
                            <Divider style={{margin: "0.5rem 0"}}/>
                            <div className={classes.box}>
                                <Typography variant="h6">Total</Typography>
                                <Typography>£{cart.total}</Typography>
                            </div>
                            <div>
                            {error && <Message status="error" text={error} />}
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button // Code adapted from example in https://material-ui.com/components/buttons/
                            variant="contained" 
                            color="primary" 
                            size="small"
                            fullWidth
                            className={classes.btn}
                            onClick={placeOrderHandler} 
                            disabled={cart.cartItems.length === 0}
                            >
                                Place Order
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            {/* </Container> */}
        </Grid>
        </Container>
        </Paper>
    );
};

export default PlaceOrderScreen;