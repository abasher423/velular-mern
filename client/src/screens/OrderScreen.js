import { Avatar, Button, Card, CardActions, CardContent, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography 
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Alert from '@material-ui/lab/Alert';


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
    main: {
        // marginTop: "2rem"
    }
}));

const OrderScreen = ({ match }) => {
    const orderId = match.params.orderId;
    
    const dispatch = useDispatch();
    const classes = useStyles();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    useEffect(() => {
        if(!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        }
    }, [order, orderId]);
    
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    return loading ? <Loader /> : error ? <Message status="error" text={error} /> : <>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography component="h1" variant="h4">Order: {order._id}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} className={classes.item}>
            </Grid>
            <Grid item xs={8} className={classes.main}>
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
                            <Paper className={classes.drawerPaper}>
                                <ListItem key={idx}>
                                <ListItemAvatar style={{margin: "0.5rem 0"}}>
                                    <Avatar alt="product image" src={item.productImage}  className={classes.large}/>
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={item.name} 
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
            <Grid item xs={4} className={classes.main}>
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
                    <CardActions>
                    {/* Button */}
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    </>
};

export default OrderScreen;