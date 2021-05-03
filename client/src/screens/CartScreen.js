import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Button, Typography, Avatar, Divider, Paper, List, ListItem, ListItemAvatar, ListItemText, FormControl, Select, MenuItem, IconButton, Card, CardContent, CardActions } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
        margin: "0 2rem"
    },
    drawerPaper: { 
        width: "900px",
        height: "100px",
        margin: "1rem 0",
        // background: "#f5f5f5" 
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
        color: "white",
        marginBottom: "2rem"
    },
    paper: {
        minHeight: "600px"
    }
  }));

const CartScreen = ({ match, location, history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart)

    const removeFromCartHandler = (productId) => {
        dispatch(deleteFromCart(productId));
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    }
    
    return (
        <Paper className={classes.paper}>
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" component="h1" className={classes.title}>Shopping Cart</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card className={classes.root} variant="outlined" align="center">
                        <CardContent justify="space-between">
                            <div className={classes.box}>
                                <Typography gutterBottom>Items</Typography>
                                <Typography variant="h5"gutterBottom>{cartItems.reduce((acc, element) => acc + element.quantity, 0)}</Typography>
                            </div>
                            <Divider style={{margin: "0.5rem 0"}}/>
                            <div className={classes.box}>
                                <Typography gutterBottom>Subtotal</Typography>
                                <Typography variant="h5"gutterBottom>£{cartItems.reduce((acc, element) => acc + element.quantity * element.price, 0).toFixed(2)}</Typography>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button 
                            variant="contained" 
                            color="primary" 
                            size="small"
                            fullWidth
                            className={classes.btn}
                            onClick={checkoutHandler} 
                            disabled={cartItems.length === 0}>
                                Proceed to checkout
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton 
                edge="start" 
                className={classes.backIcon} 
                color="inherit" component={Link} 
                // to={cartItems ? `/products/${cartItems[cartItems.length-1].productId}` : '/products'} 
                to={'/products'}
                aria-label="back"
            >
                <ArrowBackIcon />
            </IconButton>
            {cartItems.length === 0 
                ?   <div>
                    
                    <Message status="info" text="Your cart is empty" />
                </div>  
                : (
                <List dense className={classes.root}>
                    {cartItems.map((item, idx) => {
                        return (
                            <Paper className={classes.drawerPaper} key={idx}>
                                <ListItem key={item.productId}>
                                <ListItemAvatar className={classes.item}>
                                    <Avatar alt="product image" src={item.productImage}  className={classes.large}/>
                                </ListItemAvatar>
                                <ListItemText primary={item.name}/>
                                <ListItemText primary={`£${item.price}`} style={{margin: "0 5rem"}}/>
                                <ListItemText primary={`Size ${item.size}`}/>
                                <ListItemText primary={
                                    <FormControl className={classes.formControl}>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    style={{margin: "0 10rem"}}
                                    value={item.quantity}
                                    onChange={e => dispatch(addToCart(item.productId, Number(e.target.value)))}
                                    >
                                    {
                                        [...Array(item.quantityInStock).keys()].map(x => (
                                            <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>
                                } />
                                <ListItemText primary={
                                    <IconButton aria-label="delete" onClick={() => removeFromCartHandler(item.productId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                } />
                            </ListItem>
                            </Paper>
                        )
                    })}
                </List>
            )}
        </Container>
        </Paper>
    );
}

export default CartScreen;