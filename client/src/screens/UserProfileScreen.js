import { Button, Checkbox, Container, FormControlLabel, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listUserOrder } from '../actions/orderActions';
import jwt from 'jwt-decode'
import { USER_LOGIN, USER_LOGOUT, USER_UPDATE_RESET } from '../constants/userConstants';
import Alert from '@material-ui/lab/Alert';
import { ORDER_LIST_USER_RESET } from '../constants/orderConstants';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.info.dark,
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.success.main,
          }
      },
      clear: {
          color: "red"
      },
      table: {
        minWidth: 700,
      },
      title: {
        marginBottom: "2rem"
      },
      checkbox: {
        //   marginTop: "2rem"
      }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const UserProfileScreen = ({ history }) => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(null);
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo } = userLogin;

    const userUpdate = useSelector(state => state.userUpdate);
    const { success } = userUpdate;

    const orderListUser = useSelector(state => state.orderListUser);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListUser;

    useEffect(() => {
        if (!userInfo){
            history.push('/login');
        } else {
            if (!user || success){
                dispatch({ type: USER_UPDATE_RESET });
                dispatch({ type: ORDER_LIST_USER_RESET });
                dispatch(getUserDetails(jwt(userInfo.token).userId));
                dispatch(listUserOrder(jwt(userInfo.token).userId));
                
            } else {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
                setRole(user.role);
            }
        }
        
    }, [dispatch, history, userInfo, user, success]) // we want to set variables when user changes

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
   
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword){
            setMessage('Passwords do not match');
        } else {
            dispatch(updateUserProfile(jwt(userInfo.token).userId, userData));
        }
    }

    // HANDLERS
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
    const roleHandler = (e) => {
        if (e.target.checked){
            setRole('artist');
        } else {
            setRole('customer');
        }
    }
    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    }

    return (
        <Container component="main" >
            <Grid container spacing={4}>
                <form className={classes.form}>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h4" className={classes.title}>Edit Profile</Typography>
                                {success && <Message status="success" text={"Profile Updated"}/>}
                                {message && <Message status="info" text={message}/>}
                                {error && <Message status="error" text={error} />}
                                {loading && <Loader />}
                            </Grid>
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
                            <FormControlLabel
                                className={classes.checkbox}
                                control={<Checkbox 
                                    onChange={roleHandler} 
                                    checked={role === 'artist'? true : false}
                                    color="primary" />}
                                label="I am an artist"
                            />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    id="password"
                                    label="New Password"
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
                                    value={confirmPassword}
                                    onChange={confirmPasswordHandler}
                                    name="confirmPassword"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    onClick={submitHandler}
                                    className={classes.submit}
                                >
                                    update
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid item xs={12}>
                                <Typography variant="h4" component="h1" className={classes.title}>My Orders ({orders ? orders.length : '0'})</Typography>
                                {!orders && <Alert severity="info">Order list is empty</Alert>}
                                {loadingOrders ? <Loader /> : errorOrders 
                                ? <Message status="error" text={errorOrders}/> : (
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="orders table">
                                            <TableHead>
                                                <StyledTableRow>
                                                   <StyledTableCell>Order ID</StyledTableCell> 
                                                   <StyledTableCell allign="right">Date</StyledTableCell> 
                                                   <StyledTableCell allign="right">Total</StyledTableCell> 
                                                   <StyledTableCell allign="right">Paid</StyledTableCell> 
                                                   <StyledTableCell allign="right">Delivered</StyledTableCell> 
                                                   <StyledTableCell allign="right"></StyledTableCell> 
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {orders.map(order => (
                                                    <StyledTableRow key={order._id}>
                                                        <StyledTableCell component="th" scope="row">
                                                            {order._id}    
                                                        </StyledTableCell>
                                                        <StyledTableCell>{order.date}</StyledTableCell>
                                                        <StyledTableCell>£{order.totalPrice}</StyledTableCell> 
                                                        <StyledTableCell>{order.isPaid ? order.paidAt.substring(0, 25) : (
                                                            <ClearIcon className={classes.clear}/>
                                                        )}</StyledTableCell> 
                                                        <StyledTableCell>{order.isDelivered ? order.deliveredAt.substring(0, 25) : (
                                                            <ClearIcon className={classes.clear}/>
                                                        )}</StyledTableCell>
                                                        <StyledTableCell>
                                                              <Button 
                                                                variant="contained"
                                                                component={Link}
                                                                to={`/orders/${order._id}`}
                                                            >
                                                                Details
                                                            </Button>  
                                                        </StyledTableCell> 
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Container>
    );
};

export default UserProfileScreen;