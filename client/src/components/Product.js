import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Rating from "./Rating";
import Link from "react-router-dom/Link";
import { Divider } from "@material-ui/core";

// CSS to style UI component
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: "100%",
  },
  cardArea: {
    // height: "100%",
  },
  media: {
    height: 270,
    width: "auto",
  },
  divide: {
    margin: "0.25rem 0",
  },
  ratingText: {
    fontSize: theme.typography.pxToRem(20),
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  return (
    <Link
      to={`/products/${product._id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Card className={classes.root}>
        <CardActionArea className={classes.cardArea}>
          <CardMedia
            className={classes.media}
            image={product.productImage}
            title="product"
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="h2">
              {product.name}
            </Typography>
            <Divider className={classes.divide} />
            <Typography gutterBottom variant="h6" component="h2">
              {product.brand}
            </Typography>
            <Divider className={classes.divide} />
            <Typography variant="body2" color="textSecondary" component="p">
              {product.description}
            </Typography>
            <Divider className={classes.divide} />
            <Typography variant="h5" component="h3">
              {`£${addDecimals(product.pricing.price)}`}
            </Typography>
            <Divider className={classes.divide} />
            <Typography className={classes.ratingText}>
              <Rating
                value={product.averageRating}
                text={`${Math.round(product.averageRating * 10) / 10} stars`}
              />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Product;
