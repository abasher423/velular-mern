// TEMPLATE https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-up/SignUp.js

import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { register } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "white",
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: theme.palette.info.dark,
      color: "white",
      "&:hover": {
          backgroundColor: theme.palette.success.main,
        }
    },
    paper: {
        height: "800px",
        padding: "2rem"
    }
}));

const UserRegisterScreen = ({ history, location }) => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo){
            history.push(redirect)
        }
    })

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else {
            dispatch(register(firstName, lastName, email, password, role));
            history.push('/login');
        }
    }
    const roleHandler = (e) => {
        if (e.target.checked){
            setRole('artist');
        } else {
            setRole('customer');
        }
    }
    const firstNameHandler = (e) => {
        setFirstName(e.target.value);
    }
    const lastNameHandler = (e) => {
        setLastName(e.target.value);
    }
    const emailHandler = (e) => {
        setEmail(e.target.value);
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }
    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    }

    return (
        <Paper className={classes.paper}>
        <Container component="main" maxWidth="xs">
            <Grid container>
            <Grid item xs={12} align="center">
                <Avatar className={classes.avatar}>
                    <img src="images/logo.png" alt="logo"/>
                </Avatar>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h1">Register</Typography>
                </Grid>
                {message && <Message status="info" text={message}/>}
                {error && <Message status="error" text={error} />}
                {loading && <Loader />}
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} align="center">
                            <TextField 
                                variant="outlined"
                                fullWidth
                                required
                                id="firstName"
                                label="First Name"
                                value={firstName}
                                onChange={firstNameHandler}
                                name="firstName"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} align="center">
                            <TextField 
                                variant="outlined"
                                fullWidth
                                required
                                id="lastName"
                                label="Last Name"
                                value={lastName}
                                onChange={lastNameHandler}
                                name="lastName"
                            />
                        </Grid>
                    </Grid>
                        <Grid item xs={12} align="center">
                            <TextField 
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                value={email}
                                onChange={emailHandler}
                                name="email"
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <TextField 
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                value={password}
                                onChange={passwordHandler}
                                name="password"
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <TextField 
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={confirmPasswordHandler}
                                name="confirmPassword"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox onChange={roleHandler} color="primary" />}
                                label="I am an artist"
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button 
                                type="submit"
                                variant="contained"
                                fullWidth
                                onClick={submitHandler}
                                className={classes.submit}
                            >
                                Register
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Link href={redirect? `/login?redirect=${redirect}` : '/login'}> Already have an account? sign in</Link>
                        </Grid>
                </form>
            </Grid>
        </Container>
        </Paper>
    );
}

export default UserRegisterScreen;