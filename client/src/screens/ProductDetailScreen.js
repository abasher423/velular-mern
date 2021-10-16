import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Container, Divider, Paper, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import productServices from "../services/productServices";
import { Link } from "react-router-dom";

// CSS to style UI component
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "6rem",
    minHeight: "80vh",
  },
  root: {
    minWidth: 275,
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
    marginBottom: "0.5rem",
  },
  submitBtn: {
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      border: "black 1px solid",
    },
    border: "black 1px solid",
    backgroundColor: "black",
    color: "white",
    fontWeight: 800,
    borderRadius: 25,
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  backBtn: {
    margin: "1rem 0",
    backgroundColor: "#f5f5f5",
  },
  divider: {
    margin: theme.spacing(4),
  },
  image: {
    flexGrow: 1,
  },
  reviewDivider: {
    margin: "2rem 0",
  },
  ratingDivider: {
    [theme.breakpoints.down("sm")]: {
      width: 315,
    },
  },
  ratingDropDown: {
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: 315,
    },
  },
  txtfield: {
    width: 45,
  },
}));

const ProductDetailScreen = ({ history, match }) => {
  // product ID fetched from URL
  const productId = match.params.productId;

  // States
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(3);
  const [product, setProduct] = useState("");
  const [error, setError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [open, setOpen] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // React hook to fetch product details when component mounts
  useEffect(() => {
    if (!product) {
      const fetchProductDetails = async () => {
        try {
          // sends GET request to server
          const response = await productServices.indexOne(productId);
          setProduct(response.data);
        } catch (err) {
          setError(err);
        }
      };

      fetchProductDetails();
    }
  }, [productId, product]);

  // HANDLERS
  const handleQtyChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const addToCartHandler = (e) => {
    dispatch(addToCart(product._id, quantity, size));
    history.push("/cart");
  };
  const ratingHandler = (e) => {
    setRating(e.target.value);
  };
  const commentHandler = (e) => {
    setComment(e.target.value);
  };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (userInfo) {
        const reviewData = { rating, comment };
        const token = {
          headers: {
            // jwt to be sent for verification
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        // sends POST request to server
        await productServices.writeReview(productId, reviewData, token);
        setProduct("");
      } else {
        history.push("/login");
      }
    } catch (error) {
      setReviewError(error.response && error.response.data.message);
      setTimeout(() => setReviewError(""), 3000);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleSizeList = () => {
    let sizeList = 0;
    let isInteger = false;
    // checks to see if size is a whole number
    if (product.size % 1 === 0.5) {
      sizeList = product.size - 0.5;
    } else {
      sizeList = product.size;
      isInteger = true;
    }
    // creates array of whole numbers
    let array = [...Array(sizeList).keys()];
    // creates new array to hold all sizes
    let results = [];
    for (let i = 2; i < array.length; i++) {
      results.push(array[i]);
      if (array[i] !== array.length) {
        results.push(array[i] + 0.5);
      }
    }
    if (isInteger) {
      results.pop();
    }
    return results;
  };

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  return (
    <Paper className={classes.paper}>
      <Container>
        <Typography variant="h3">Product Details</Typography>
        <Button
          variant="contained"
          component={Link}
          to={"/products"}
          className={classes.backBtn}
        >
          <ArrowBackIosIcon /> Product List
        </Button>
      </Container>
      <Container>
        {error ? (
          <Message status="error" text={error} />
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <div className={classes.image}>
                <img src={product.productImage} alt={product} />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <div>
                <Typography variant="h2" component="h2">
                  {product.name}
                </Typography>
                <Divider style={{ margin: "0.5rem 0" }} />
                <Rating
                  value={product.averageRating}
                  text={`${product.totalNumRating} Reviews`}
                />
                <Divider style={{ margin: "0.5rem 0" }} />
                <Typography variant="h4" component="h3">
                  {product.brand}
                </Typography>
                <Divider style={{ margin: "0.5rem 0" }} />
                <Typography variant="h6" component="p">{`Price: £${addDecimals(
                  product.price
                )}`}</Typography>
                <Divider style={{ margin: "0.5rem 0" }} />
                <Typography variant="h6" color="textSecondary" component="p">
                  {product.description}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} lg={4}>
              <div>
                <Card className={classes.root} variant="outlined">
                  <CardContent justify="space-between">
                    <div className={classes.box}>
                      <Typography gutterBottom>Price</Typography>
                      <Typography variant="h5" gutterBottom>{`£${addDecimals(
                        product.price
                      )}`}</Typography>
                    </div>
                    <Divider style={{ margin: "0.5rem 0" }} />

                    <div className={classes.box}>
                      <Typography gutterBottom>Status</Typography>
                      <Typography
                        gutterBottom
                        style={
                          product.quantityInStock > 0
                            ? { color: "#81c784" }
                            : { color: "red" }
                        }
                      >
                        {product.quantityInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </Typography>
                    </div>
                    <Divider style={{ margin: "0.5rem 0" }} />

                    <div className={classes.box}>
                      <Typography gutterBottom>Quantity</Typography>
                      <FormControl className={classes.formControl}>
                        <Select
                          labelId="quantity-select-label"
                          id="quantity-select"
                          value={quantity}
                          onChange={handleQtyChange}
                        >
                          {[...Array(product.quantityInStock).keys()].map(
                            (element) => (
                              <MenuItem key={element + 1} value={element + 1}>
                                {element + 1}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    </div>
                    <Divider style={{ margin: "0.5rem 0" }} />

                    <div className={classes.box}>
                      <Typography gutterBottom>
                        Size (3 - {product.size})
                      </Typography>
                      <FormControl className={classes.formControl}>
                        <Select
                          labelId="size-select-label"
                          id="size-select"
                          value={size}
                          onChange={handleSizeChange}
                        >
                          {handleSizeList().map((element) => (
                            <MenuItem key={element + 1} value={element + 1}>
                              {element + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <Divider style={{ margin: "0.5rem 0" }} />
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      fullWidth
                      className={classes.btn}
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                    >
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
            <Divider className={classes.divider} />
          </Grid>
          {product && product.reviews && product.reviews.length > 0 && (
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography variant="h4" component="h2">
                  Reviews
                </Typography>
                <Divider />
              </Grid>
            </Grid>
          )}
          {reviewError && <Message status="error" text={reviewError} />}
          {product &&
            product.reviews &&
            product.reviews.map((review, idx) => (
              <Grid item xs={12} key={idx}>
                <Typography>{review.firstName}</Typography>
                <Rating value={review.rating} />
                <Typography>{review.comment}</Typography>
                <Typography>
                  {review.createdAt.substring(8, 10)}/
                  {review.createdAt.substring(5, 7)}/
                  {review.createdAt.substring(0, 4)}
                </Typography>
                <Divider className={classes.reviewDivider} />
              </Grid>
            ))}
          <form onSubmit={submitHandler}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="h2"
                style={{ margin: "2rem 0" }}
              >
                Write a Review
              </Typography>
              <Divider className={classes.ratingDivider} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="h2">
                Rating
              </Typography>
              <FormControl className={classes.ratingDropDown} margin="normal">
                <Select
                  labelId="rating-label"
                  id="rating-select"
                  variant="outlined"
                  open={open}
                  value={rating}
                  required
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
              <Typography variant="h6" component="h2">
                Comment
              </Typography>
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
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
      </Container>
    </Paper>
  );
};

export default ProductDetailScreen;
