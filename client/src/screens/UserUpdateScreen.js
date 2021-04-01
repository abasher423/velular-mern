import { Button, Checkbox, Container, FormControlLabel, IconButton, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { getUserDetails } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import userServices from '../services/userServices';

const useStyles = makeStyles(theme => ({
    btn: {
        backgroundColor: theme.palette.info.dark,
       "&:hover": {
           backgroundColor: theme.palette.success.main
       } 
    },
    backIcon: {
        margin: theme.spacing(1),
        backgroundColor: 'grey',
        color: 'white',
        "&:hover": {
            backgroundColor: 'black',
        }
    },
    checkbox: {
        margin: '1rem 0'
    }
}));

const UserUpdateScreen = ({ match, history }) => {
    const classes = useStyles();
    const userId = match.params.userId;
    const [userDetails, setUserDetails] = useState('');
    const [firstName, setFirstName] = useState(userDetails.firstName || '');
    const [lastName, setLastName] = useState(userDetails.lastName || '');
    const [email, setEmail] = useState(userDetails.email || '');
    const [role, setRole] = useState(userDetails || '');
  
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo } = userLogin;

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!userDetails){
                const token = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                const response = await userServices.adminFetchUser(userId, token);
                setUserDetails(response.data);
            } else {
                setFirstName(userDetails.firstName);
                setLastName(userDetails.lastName);
                setEmail(userDetails.email);
                setRole(userDetails.role);
            }
        }

        fetchUserDetails();
    }, [userInfo.token, userId, userDetails]);

    const userData = [
        {propName: "firstName", value: null},
        {propName: "lastName", value: null},
        {propName: "email", value: null},
        {propName: "role", value: null}
    ]
    userData[0].value = firstName;
    userData[1].value = lastName;
    userData[2].value = email;
    userData[3].value = role;
    
    const firstNameHandler = (e) => {
        setFirstName(e.target.value);
    };
    const lastNameHandler = (e) => {
        setLastName(e.target.value);
    };
    const emailHandler = (e) => {
        setEmail(e.target.value);
    };
    const roleHandler = (e) => {
        if (e.target.checked){
            setRole('admin');
        } else {
            if (role === 'admin'){
                setRole('customer');
            } else {
                setRole(userDetails.role);
            }
        }
    };
    const submitHandler = async () => {
        const token = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await userServices.adminUpdateUser(userId, userData, token);
        history.push('/users-list');
    };
    return (
        <>
        <IconButton edge="start" className={classes.backIcon} color="inherit" component={Link} to={'/users-list'} aria-label="back">
            <ArrowBackIcon />
        </IconButton>
        <Container component="main" maxWidth="xs">
            <Typography variant="h3" component="h1">Update User</Typography>
            <form className={classes.form}>
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
                <FormControlLabel
                    className={classes.checkbox}
                    label="Set Admin"
                    control={<Checkbox 
                        onChange={roleHandler} 
                        checked={role === 'admin'? true : false}
                        color="primary" />}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    onClick={submitHandler}
                    fullWidth
                >
                    Update
                </Button>
            </form>
        </Container>
        </>
    );
};

export default UserUpdateScreen;