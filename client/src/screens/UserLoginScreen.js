// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Container, Grid, Typography, FormGroup, makeStyles, TextField, Button, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      txtfield: {
          width: "400px"
      },
      submit: {
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
          },
        margin: theme.spacing(3, 0, 2),
        width: "400px"
      },
      avatar: {
          backgroundColor: theme.palette.secondary.main,
          width: theme.spacing(5),
          height: theme.spacing(5),
      }
}));

const UserLoginScreen = ({ location, history }) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        // if not logged in
        if (userInfo) {
            // history.push(redirect);
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
        // <Grid container spacing={2}>
            <Container>
                <Grid item xs={12} align="center">
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h1">Sign In</Typography>
                </Grid>
                {error && <Message status="error" text={error} />}
                {loading && <Loader />}
                <form className={classes.form}>
                    <Grid container spacing={12}>
                        <Grid itm xs={12} align="center">
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
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <TextField 
                                variant="outlined"
                                margin="normal"
                                required
                                className={classes.txtfield}
                                id="password"
                                label="Password"
                                value={password}
                                onChange={handlepasswordChange}
                                name="password"
                                autoComplete="password"
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button 
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={submitHandler}
                                className={classes.submit}
                            >
                                Sign in
                            </Button>
                        </Grid>
                        <Grid item xs={3} align="center" style={{marginLeft: "300px"}}>
                            <Link href="#" variant="body2">
                                Forgot Password?
                            </Link>
                        </Grid>
                        <Grid item xs={3} align="center">
                            <Link 
                                to={redirect ? `/register?redirect=${redirect}` : '/register'} 
                                variant="body2">
                                Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        // </Grid>
    );
};

export default UserLoginScreen;