import { Avatar, Button, Card, CardActions, CardContent, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, useMediaQuery, useTheme 
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Alert from '@material-ui/lab/Alert';
import { PayPalButton } from 'react-paypal-button-v2';
import AuthenticationServices from '../services/AuthenticationServices';
import { ORDER_LIST_USER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';
import { CART_ITEMS_RESET } from '../constants/cartConstants';
import orderServices from '../services/orderServices';


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
        width: "750px",
        height: "100px",
        margin: "1rem 0",
        background: "white" 
    },
    box: {
        display: "flex",
        justifyContent: "space-between"
    },
    btn: {
        "&:hover": {
            backgroundColor: theme.palette.success.main
        },
        display: "block",
        backgroundColor: theme.palette.info.dark
    },
    backIcon: {
        "&:hover": {
            backgroundColor: "black"
        },
        backgroundColor: theme.palette.text.secondary,
        color: "white"
    },
    delivered: {
        "&:hover": {
            backgroundColor: theme.palette.success.main
        },
        backgroundColor: 'black'
    },
    heading: {
        fontSize: theme.typography.pxToRem(20)
    }
}));

const OrderScreen = ({ match, history }) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    const orderId = match.params.orderId;
    const [sdkReady, setSdkReady] = useState(false);
    
    const dispatch = useDispatch();
    const classes = useStyles();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading:loadingPay, success:successPay } = orderPay;

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await AuthenticationServices.paypal();
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        }
        

        if(!order || order._id !== orderId || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        } else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, order, orderId, successPay]);
    
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
        dispatch({ type: ORDER_LIST_USER_RESET });
    };

    const deliveredHandler = async (orderId) => {
        const token = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await orderServices.updateToDelivered(orderId, token);
        history.push('/admin/orders-list');
    };
    
    return loading ? <Loader /> : error ? <Message status="error" text={error} /> : <>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography component="h2" variant="h4" className={classes.heading}>Order: {order._id}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} className={classes.item}>
            </Grid>
            <Grid item xs={12} md={8} className={classes.main}>
                <Grid item xs={12} className={classes.item} >
                    <Typography component="h1" variant="h4"> Shipping Details </Typography>
                </Grid>
                <Grid item xs={12} className={classes.item} >
                    <Typography 
                    variant="body1">
                        {order.user.firstName} {order.user.lastName}
                    </Typography>
                    <Typography 
                    variant="body1">
                        {`${order.shippingDetails.address}, 
                        ${order.shippingDetails.city},
                        ${order.shippingDetails.country},
                        ${order.shippingDetails.postCode}`}
                    </Typography>
                    <Typography 
                    variant="body1">
                        {order.user.email}
                    </Typography>
                    {order.isDelivered ? <Alert severity="success" style={{margin: "1rem 0"}}>Delivered on {order.deliveredAt}</Alert>
                        : <Alert severity="error" style={{margin: "1rem 0"}}>Not Delivered</Alert>
                    }
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
                        Method: {order.paymentMethod}
                    </Typography>
                    {order.isPaid ? <Alert severity="success" style={{margin: "1rem 0"}}>Paid on {order.paidAt}</Alert>
                        : <Alert severity="error" style={{margin: "1rem 0"}}>Not Paid</Alert>
                    }
                </Grid>
                <Grid item xs={12}>
                    <Divider style={{width: '750px'}}/>
                </Grid>
                <Grid item xs={12} className={classes.item} >
                    <Typography component="h1" variant="h4"> Order Items </Typography>
                </Grid>
                <Grid item xs={12}>
                    <List dense className={classes.root}>
                    {order.orderItems.map((item, idx) => {
                        return (
                            <Paper key={idx} className={classes.drawerPaper}>
                                <ListItem key={idx}>
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
                <Card className={classes.root} variant="outlined" align="center">
                    <CardContent justify="space-between">
                        <div>
                            <Typography variant="h5" gutterBottom algin="center">Order Summary</Typography>
                        </div>
                        <Divider style={{margin: "0.5rem 0"}}/>
                        <div className={classes.box}>
                            <Typography variant="h6">Items</Typography>
                            <Typography>£{addDecimals(order.itemsPrice)}</Typography>
                        </div>
                        <Divider style={{margin: "0.5rem 0"}}/>
                        <div className={classes.box}>
                            <Typography variant="h6">Shipping</Typography>
                            <Typography>£{addDecimals(order.shippingPrice)}</Typography>
                        </div>
                        <Divider style={{margin: "0.5rem 0"}}/>
                        <div className={classes.box}>
                            <Typography variant="h6">Tax</Typography>
                            <Typography>£{addDecimals(order.taxPrice)}</Typography>
                        </div>
                        <Divider style={{margin: "0.5rem 0"}}/>
                        <div className={classes.box}>
                            <Typography variant="h6">Total</Typography>
                            <Typography>£{addDecimals(order.totalPrice)}</Typography>
                        </div>
                    </CardContent>
                    {!order.isPaid && (
                        <CardContent>
                             {/* ADD CART CHECK TO SEE QUANTITY AVAILABILITY  */}
                            {loadingPay && <Loader />}
                            {!sdkReady ? <Loader /> : (
                                <PayPalButton 
                                    amount={order.totalPrice} 
                                    onSuccess={successPaymentHandler}
                                />
                            )}
                        </CardContent>
                    )}
                    { userInfo && userInfo.role === 'admin' && order.isPaid && !order.isDelivered && (
                        <CardContent>
                            <Button
                            variant="contained"
                            color="primary"
                            className={classes.delivered}
                            onClick={() => deliveredHandler(order._id)}
                            fullWidth
                        >
                            Mark as Delivered
                        </Button>
                        </CardContent>
                    )}
                </Card>
            </Grid>
        </Grid>
    </>
};

export default OrderScreen;