// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import { Container, Grid, Typography, FormGroup, makeStyles, TextField, Button, Avatar, Link, Paper, useMediaQuery, useTheme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      heading: {
        fontSize: theme.typography.pxToRem(40),
        fontFamily: "serif"
      },
      txtfield: {
          width: "400px",
          [theme.breakpoints.down('sm')] : {
              width: "200px"
          }
      },
      submit: {
          "&:hover": {
            backgroundColor: theme.palette.success.main,
          },
        backgroundColor: theme.palette.info.dark,
        color: "white",
        margin: theme.spacing(3, 0, 2),
        width: "400px",
        [theme.breakpoints.down('sm')] : {
            width: "200px"
        }
      },
      avatar: {
          backgroundColor: "white",
          width: theme.spacing(15),
          height: theme.spacing(15),
      },
      paper: {
          height: "600px",
          padding: "1rem",
          width: "500px",
          [theme.breakpoints.down('sm')] : {
              width: "300px",
              height: "500px"
          },
          textAlign: "center"
      }
}));

const UserLoginScreen = ({ location, history }) => {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();


    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    
    useEffect(() => {
        // if not logged in
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect])

    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    const handlepasswordChange = e => {
        setPassword(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // DISPATCH login
        dispatch(login(email, password));
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper}>
            <Grid item xs={12} align="center">
            <Avatar className={classes.avatar}>
                <img src="images/logo.png" alt="logo"/>
            </Avatar>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography className={classes.heading}>Login</Typography>
            </Grid>
            {error && <Message status="error" text={error} />}
            {loading && <Loader />}
            <form className={classes.form}>
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
                            onClick={submitHandler}
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