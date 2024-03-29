import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
  Avatar,
  Link,
  Paper,
} from "@material-ui/core";

// CSS to style UI component
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "6rem",
    minHeight: "80vh",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(40),
  },
  txtfield: {
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
  },
  submit: {
    "&:hover": {
      color: theme.palette.info.dark,
      backgroundColor: "white",
      border: `${theme.palette.info.dark} 1px solid`,
    },
    backgroundColor: theme.palette.info.dark,
    border: `${theme.palette.info.dark} 1px solid`,
    color: "white",
    fontWeight: 800,
    borderRadius: 25,
    margin: theme.spacing(3, 0, 2),
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
  },
  avatar: {
    backgroundColor: "white",
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  paper: {
    height: 600,
    padding: "1rem",
    width: 500,
    [theme.breakpoints.down("sm")]: {
      width: 300,
      height: 500,
    },
    textAlign: "center",
  },
}));

const UserLoginScreen = ({ location, history }) => {
  const classes = useStyles();

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    // if not logged in
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  // HANDLERS
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlepasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Grid item xs={12} align="center">
          <Avatar className={classes.avatar}>
            <img src="images/logo.png" alt="logo" />
          </Avatar>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography className={classes.heading}>Login</Typography>
        </Grid>
        {error && <Message status="error" text={error} />}
        {loading && <Loader />}
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container>
            <Grid item xs={12} align="center">
              <TextField
                variant="outlined"
                margin="normal"
                required
                className={classes.txtfield}
                id="email"
                label="Email Address"
                value={email}
                onChange={handleEmailChange}
                name="email"
              />
            </Grid>
            <Grid item xs={12} align="center">
              <TextField
                variant="outlined"
                margin="normal"
                required
                className={classes.txtfield}
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={handlepasswordChange}
                name="password"
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                type="submit"
                variant="contained"
                className={classes.submit}
              >
                Sign in
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link href="/register" variant="body2">
                Dont have an account? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default UserLoginScreen;
