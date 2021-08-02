import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Switch } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jwt-decode';
import userServices from '../services/userServices';
import Message from '../components/Message';
import { USER_LOGOUT } from '../constants/userConstants';

// CSS to style UI component
const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "6rem", 
      minHeight: "80vh"
    },
    image: {
      backgroundImage: `url("/images/airjordan-1.jpg")`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: theme.palette.info.dark,
      color: "white",
      border: `${theme.palette.info.dark} 3px solid`,
      fontWeight: 800,
      borderRadius: 25,
      "&:hover": {
        backgroundColor: "white",
        color: theme.palette.info.dark
      }
    },
  }));
  
  const UserProfileScreen = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    // States
    const [user, setUser] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [switchOpen, setSwitchOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');

    // stores jwt and info about logged in user
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // React hook to fetch user when component mounts
    useEffect(() => {
      const fetchuser = async () => {
        if (!user){
          try {
            const token = {
              headers: {
                Authorization: `Bearer ${userInfo.token}`
              }
            };
            const userId = await jwt(userInfo.token).userId;
            // sends GET request to the server
            const response = await userServices.indexOne(userId, token);
            setUser(response.data);
          } catch (error){
            setError(error.response && error.response.data.message);
            setTimeout(() => setError(null), 3000);
          }
        } else {
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setEmail(user.email);
          setRole(user.role);
          setSwitchOpen(user.role === 'artist' ? true : false);
        }
      }
      fetchuser();
    }, [user, userInfo.token]);

    const userData = [
      {propName: "firstName", value: null},
      {propName: "lastName", value: null},
      {propName: "email", value: null},
      {propName: "role", value: null},
      {propName: "password", value: null},
      ]
      userData[0].value = firstName;
      userData[1].value = lastName;
      userData[2].value = email;
      userData[3].value = role;
      userData[4].value = password;

    // HANDLERS
    const firstNameHandler = (e) => {
      setFirstName(e.target.value);
    };
    const lastNameHandler = (e) => {
      setLastName(e.target.value);
    };
    const emailHandler = (e) => {
      setEmail(e.target.value);
    };
    const passwordHandler = (e) => {
      setPassword(e.target.value);
    };
    const password2Handler = (e) => {
      setPassword2(e.target.value);
    };
    const roleHandler = (e) => {
      setSwitchOpen(e.target.checked);
      if (!switchOpen){
        setRole('artist');
      } else {
        setRole('customer')
      } 
    };
    const submitHandler = async (e) => {
      e.preventDefault();
      if (password !== password2){
        setError('Passwords do not match');
        setTimeout(() => setError(null), 3000);
      } else {
        try {
          const token = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`
            }
          };
          const userId = await jwt(userInfo.token).userId;
          // sends POST request to the server
          const { data } = await userServices.update(userId, userData, token);
          localStorage.setItem('userInfo', JSON.stringify(data));
          history.push('/login')
          dispatch({ type: USER_LOGOUT})
          history.push('/login')
        } catch (error){
          setError(error.response && error.response.data.message);
          setTimeout(() => setError(null), 3000);
        }
      }
    }

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h4">
              Account
            </Typography>
            {error && (<Message status="error" text={error} />)}
            <form className={classes.form} onSubmit={submitHandler}>
            <Grid item xs={12}>
            <TextField
                    variant="standard"
                    margin="normal"
                    autoComplete="true"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={firstNameHandler}
                    name="firstName"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="standard"
                    margin="normal"
                    autoComplete="true"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    value={lastName}
                    onChange={lastNameHandler}
                    name="lastName"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="standard"
                    margin="normal"
                    autoComplete="true"
                    fullWidth
                    id="email"
                    label="Email Address"
                    value={email}
                    onChange={emailHandler}
                    name="email"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="password"
                    label="New Password"
                    type="password"
                    value={password}
                    onChange={passwordHandler}
                    name="password"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={password2}
                    onChange={password2Handler}
                    name="confirmPassword"
                />
            </Grid>
            <Grid item xs={12} style={{marginTop: "1.5rem"}}>
            <FormControlLabel
              control={<Switch checked={switchOpen} onChange={roleHandler} name="artist" />}
              label="Artist"
            />
            </Grid>
            <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className={classes.submit}
                >
                    update
                </Button>
            </Grid>
            </form>
          </div>
        </Grid>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Grid>
    );
  }

export default UserProfileScreen;