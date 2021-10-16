import {
  Divider,
  Grid,
  Link,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import RepeatIcon from "@material-ui/icons/Repeat";

// css to style UI component
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: "1rem",
  },
  orderIdText: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  title: {
    margin: "0 1rem",
  },
  deliveredText: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 600,
  },
  emptyAlert: {
    margin: "1rem",
    height: 500,
  },
  buyAgainBtn: {
    "&:hover": {
      backgroundColor: "white",
      color: theme.palette.info.dark,
      border: `${theme.palette.info.dark} 1px solid`,
    },
    backgroundColor: theme.palette.info.dark,
    color: "white",
    fontWeight: 800,
    borderRadius: 25,
    marginRight: "1rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1rem",
    },
  },
  supportBtn: {
    "&:hover": {
      backgroundColor: "white",
      color: theme.palette.info.dark,
      border: `${theme.palette.info.dark} 3px solid`,
    },
    backgroundColor: theme.palette.info.dark,
    color: "white",
    fontWeight: 800,
    borderRadius: 25,
    marginBottom: "1rem",
  },
  orderItemBtns: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const OrderHistoryTab = ({ orders }) => {
  const classes = useStyles();

  // needed to make responsive design
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            {orders.length} {orders.length === 1 ? "Order" : "Orders"} placed
          </Typography>
        </Grid>
        {orders.length === 0 && (
          <Grid item xs={12} className={classes.emptyAlert}>
            <Alert severity="info">You have no previous orders</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          {orders &&
            orders.map((order) => (
              <Card variant="outlined" className={classes.root} key={order._id}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={2}>
                      <Typography>ORDER PLACED</Typography>
                      <Typography>{order.date.substring(5, 16)}</Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Typography>TOTAL</Typography>
                      <Typography>£{order.total}</Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Typography>DISPATCH TO</Typography>
                      <Typography>
                        {order.user.firstName} {order.user.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography className={classes.orderIdText}>
                        ORDER # {order._id}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classes.deliveredText}>
                        Delivered {order.deliveredAt.substring(5, 16)}
                      </Typography>
                      <Typography>Parcel was handed to resident</Typography>
                    </Grid>
                    {order &&
                      order.orderItems.map((orderItem) => (
                        <Grid container spacing={2} key={orderItem._id}>
                          <Grid item xs={12} md={2}>
                            <img
                              src={orderItem.productImage}
                              alt="order item"
                            />
                          </Grid>
                          <Grid item xs={12} md={7}>
                            <Link href={`/products/${orderItem.productId}`}>
                              <Typography variant="h4">
                                {orderItem.name}
                              </Typography>
                              <Typography>{orderItem.description}</Typography>
                            </Link>

                            <Button
                              variant="contained"
                              fullWidth={mobile ? true : false}
                              className={classes.buyAgainBtn}
                            >
                              <RepeatIcon />
                              Buy it again
                            </Button>
                            <Button
                              fullWidth={mobile ? true : false}
                              href={`/orders/${order._id}`}
                              style={{ borderRadius: 25 }}
                              variant="contained"
                            >
                              View your item
                            </Button>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={3}
                            className={classes.orderItemBtns}
                          >
                            <Button
                              variant="contained"
                              fullWidth={mobile ? true : false}
                              className={classes.supportBtn}
                            >
                              Get Product Support
                            </Button>
                            <Button
                              variant="contained"
                              fullWidth={mobile ? true : false}
                              style={{ borderRadius: 25 }}
                              href={`/products/${orderItem.productId}`}
                            >
                              Write Product Review
                            </Button>
                          </Grid>
                        </Grid>
                      ))}
                  </Grid>
                </CardContent>
              </Card>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default OrderHistoryTab;
