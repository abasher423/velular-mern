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

// CSS to style UI component
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
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
    marginRight: "1rem",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1rem",
    },
  },
  supportBtn: {
    "&:hover": {
      backgroundColor: "white",
      color: theme.palette.info.dark,
      border: `${theme.palette.info.dark} 1px solid`,
    },
    backgroundColor: theme.palette.info.dark,
    color: "white",
    fontWeight: 800,
    borderRadius: 25,
    marginBottom: "1rem",
  },
  orderItem: {
    margin: "0.5rem 0",
  },
  completeOrder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

// This component is rendered when "Uncomplete" tab is clicked
const OrderUnpaidTab = ({ orders }) => {
  const classes = useStyles();

  // breakpoints for responsive web design
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
                      <Typography>ORDER NOT PLACED</Typography>
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
                        Order Not Paid
                      </Typography>
                      <Typography>
                        Order has <b>not</b> been dispatched
                      </Typography>
                    </Grid>
                    {order &&
                      order.orderItems.map((orderItem) => (
                        <Grid
                          container
                          spacing={2}
                          key={orderItem._id}
                          className={classes.orderItem}
                        >
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
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={3}
                            className={classes.completeOrder}
                          >
                            <Button
                              variant="contained"
                              fullWidth={mobile ? true : false}
                              href={`/orders/${order._id}`}
                              className={classes.supportBtn}
                            >
                              Complete Your Order
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

export default OrderUnpaidTab;
