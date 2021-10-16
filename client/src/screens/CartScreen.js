import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {
  Button,
  Typography,
  Divider,
  Paper,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  CardActions,
  InputLabel,
  Box,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

// CSS to style UI component
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "6rem",
    minHeight: "80vh",
    paddingBottom: "2rem",
  },
  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("xl")]: {
      position: "absolute",
      top: 0,
      right: 0,
      marginTop: "4.7rem",
      width: 334,
    },
  },
  backBtn: {
    marginTop: "2rem",
    marginBottom: "1rem",
    backgroundColor: "#f5f5f5",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
  },
  btn: {
    "&:hover": {
      backgroundColor: "white",
      color: theme.palette.info.dark,
      border: `${theme.palette.info.dark} 1px solid`,
    },
    backgroundColor: theme.palette.info.dark,
    border: `${theme.palette.info.dark} 1px solid`,
    color: "white",
    fontWeight: 800,
    borderRadius: 25,
  },
  backIcon: {
    "&:hover": {
      backgroundColor: "black",
    },
    backgroundColor: theme.palette.text.secondary,
    color: "white",
    marginBottom: "2rem",
  },
}));

const CartScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { cartItems } = useSelector((state) => state.cart);

  const removeFromCartHandler = (productId) => {
    dispatch(deleteFromCart(productId));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  return (
    <Paper className={classes.paper}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" className={classes.title}>
              Shopping Cart
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className={classes.root} variant="outlined" align="center">
              <CardContent className={classes.test}>
                <div className={classes.box}>
                  <Typography gutterBottom>Items</Typography>
                  <Typography variant="h5" gutterBottom>
                    {cartItems.reduce(
                      (acc, element) => acc + element.quantity,
                      0
                    )}
                  </Typography>
                </div>
                <Divider style={{ margin: "0.5rem 0" }} />
                <div className={classes.box}>
                  <Typography gutterBottom>Subtotal</Typography>
                  <Typography variant="h5" gutterBottom>
                    £
                    {cartItems
                      .reduce(
                        (acc, element) =>
                          acc + element.quantity * element.price,
                        0
                      )
                      .toFixed(2)}
                  </Typography>
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
                  disabled={cartItems.length === 0}
                >
                  Proceed to checkout
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        {!mobile && (
          <Button
            variant="contained"
            component={Link}
            to={"/products"}
            className={classes.backBtn}
          >
            <ArrowBackIosIcon /> Product List
          </Button>
        )}
        {cartItems.length === 0 ? (
          <div>
            <Message status="info" text="Your cart is empty" />
          </div>
        ) : (
          <>
            {!mobile && (
              <Typography variant="body1">
                <Box textAlign="right" style={{ paddingRight: 17 }}>
                  Price
                </Box>
              </Typography>
            )}
            <Card variant="outlined" className={classes.card}>
              {cartItems.map((item, index) => {
                return (
                  <CardContent key={index}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={2}>
                        <img src={item.productImage} alt="product" />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography variant="h5">
                          <Box fontWeight={600}>{item.name}</Box>
                        </Typography>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          component="p"
                        >
                          Eligible for Next Day Delivery
                        </Typography>
                        <Typography style={{ color: "#007600" }}>
                          In stock
                        </Typography>
                        <Typography variant="h6">
                          <Box>
                            Size: <b />
                            {item.size}
                          </Box>
                        </Typography>
                        <Typography variant="h6">
                          <Box fontSize="1rem">
                            Brand: <b>{item.brand}</b>
                          </Box>
                        </Typography>
                        <Typography variant="h6">
                          <Box fontSize="1rem">
                            Category: <b>{item.category}</b>
                          </Box>
                        </Typography>
                        <Grid container>
                          <Grid item xs={12}>
                            <FormControl>
                              <InputLabel id="quantity-in-stock-label">
                                Qty
                              </InputLabel>
                              <Select
                                labelId="quantity-in-stock-label"
                                id="quantity-in-stock"
                                value={item.quantity}
                                onChange={(e) =>
                                  dispatch(
                                    addToCart(
                                      item.productId,
                                      Number(e.target.value),
                                      item.size
                                    )
                                  )
                                }
                              >
                                {[...Array(item.quantityInStock).keys()].map(
                                  (element) => (
                                    <MenuItem
                                      key={element + 1}
                                      value={element + 1}
                                    >
                                      {element + 1}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                            <IconButton
                              aria-label="delete"
                              onClick={() =>
                                removeFromCartHandler(item.productId)
                              }
                              style={{ marginTop: 10 }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Typography variant="h5">
                          <Box
                            fontWeight={600}
                            textAlign={mobile ? "left" : "right"}
                          >
                            £{addDecimals(item.price * item.quantity)}
                          </Box>
                        </Typography>
                      </Grid>
                      {index !== cartItems.length - 1 && (
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                );
              })}
            </Card>
          </>
        )}
      </Container>
    </Paper>
  );
};

export default CartScreen;
