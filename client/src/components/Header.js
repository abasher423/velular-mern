import React from 'react';
import { Route } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { logout } from '../actions/userActions';
import { useHistory } from "react-router-dom";
import { Avatar, Box, Divider, Drawer, Fade, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, TextField, Tooltip, useMediaQuery, useTheme } from '@material-ui/core';
import { USER_LOGOUT } from '../constants/userConstants';
import SearchBox from './SearchBox';
import { Icon, InlineIcon } from '@iconify/react';
import shoeSneaker from '@iconify-icons/mdi/shoe-sneaker';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  heading: {
    [theme.breakpoints.down('sm')] : {
        fontSize: theme.typography.pxToRem(16)
    }
  },
  title: {
    flexGrow: 1,
    display: "flex",
    textDecoration: 'none',
    color: 'black',
    [theme.breakpoints.down('sm')] : {
        fontSize: theme.typography.pxToRem(25),
        fontWeight: 700
    }
  },
  logo: {
      marginTop: 15,
      width: 250,
      height: 'auto'
  },
  breadcrumbs: {
      marginBottom: 25,
      fontWeight: '500'
  },
  icons: {
      margin: '5px 0'
  },
  cart: {
    margin: '5px 0',
    backgroundColor: 'red',
    color: 'white'
  },
  typography: {
    h6: {
      "fontWeight": 600,
    }
  },
}));

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutHandler = () => {
        dispatch(logout());
        setAnchorEl(null);
    };
    const handleMenuOption = option => {
        if (option === 'home') {
            history.push('/');
        } else if (option === 'trainers'){
            history.push('/page/1')
        } else {
            history.push(`/${option}`);
        }
    };

    const menuItems = (
        <div className={classes.appbar2} onClick={handleDrawerClose}>
            <div className={classes.toolbar}>
                {userInfo && (
                    <>
                    <Divider />
                    <List>
                        {['Profile', 'Orders'].map(option => (
                            <ListItem
                            button key={option} onClick={() => handleMenuOption(option[0].toLowerCase() + option.substring(1))}>
                                <ListItemText primary={option} />
                            </ListItem>
                        ))}
                        {userInfo && (userInfo.role === 'admin') && (
                            ['Manage Users', 'Manage Customs', 'Manage Orders'].map(option => (
                                <ListItem button key={option} onClick={() => handleMenuOption(option)}>
                                    <ListItemText primary={option} />
                                </ListItem>
                            ))
                        )}
                        {userInfo && (userInfo.role === 'artist') && (
                            <ListItem button  onClick={() => history.push('/artist/customs')}>
                                <ListItemText primary="Customs" />
                            </ListItem>
                        )}
                    </List>
                    </>
                )}
                <Divider />
                <List>
                    {['Home', 'Trainers', 'Cart'].map((option, idx) => (
                        <ListItem button key={option} onClick={() => handleMenuOption(option[0].toLowerCase() + option.substring(1))}>
                            <ListItemIcon>
                                {idx === 0 ? <HomeIcon /> : idx === 1 ? <Icon icon={shoeSneaker} width="25" height="25" /> : idx === 2 ? 
                                <ShoppingCartOutlinedIcon /> : <PersonOutlineOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText>{option}</ListItemText>
                        </ListItem>
                    ))}
                    {userInfo ? 
                        <ListItem button component={Link} to={'/login'} onClick={logoutHandler}>
                        <ListItemIcon>
                            <PersonOutlineOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                        </ListItem> :
                        <ListItem button onClick={() => handleMenuOption('login')} >
                        <ListItemIcon>
                            <PersonOutlineOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText>Login</ListItemText>
                        </ListItem>}
                </List>
            </div>
        </div>
    )

    return (
        <header className={classes.root}>
            <AppBar position="fixed" color="default" className={classes.appbar}>
                <Container>
                <Toolbar>
                    <img src="/images/logo.png" style={{ height: 50, padding: 0, margin: 0 }} alt="logo" />
                    {!mobile && (<Typography variant="h3" component={Link} to={'/'} className={classes.title}>
                        <Box letterSpacing={10} m={1}>
                            elular
                        </Box>
                    </Typography>)}

                    {mobile ? (
                        <>
                            <Route render={({history}) => <SearchBox history={history}/>} />
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerOpen}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="right" 
                                open={openDrawer} 
                                onClose={handleDrawerClose}
                            >
                                {menuItems}
                            </Drawer>
                        </>
                    ) : (
                        <>
                        <Typography variant="body2" >United Kingdom/English</Typography>
                        {/* Cannot use History or Match in header so we import from react-router-dom */}
                        <Route render={({history}) => <SearchBox history={history} />} />

                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Trainers">
                            <IconButton edge="start" className={classes.icons} color="inherit" component={Link} to={'/page/1'} aria-label="favorite">
                            <Icon icon={shoeSneaker} width="28" height="28" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Cart">
                            <IconButton edge="start" className={classes.icons} component={Link} to={'/cart'} color="inherit" aria-label="cart">
                                <ShoppingCartOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        
                        { userInfo ? (
                            <div>
                                <Button
                                    className={userInfo ? classes.loggedIn : ''}
                                    onClick={handleClick}>
                                        {userInfo.firstName}
                                        <ExpandMoreIcon />
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem component={Link} to={'/'} onClick={handleClose}>Home</MenuItem>
                                    <MenuItem component={Link} to={'/account'} onClick={handleClose}>Account</MenuItem>
                                    <MenuItem component={Link} to={'/orders'} onClick={handleClose}>Orders</MenuItem>
                                    {userInfo && (userInfo.role === 'admin') && (
                                        <div>
                                            <MenuItem component={Link} to={'/admin/users-list'} onClick={handleClose}>Manage Users</MenuItem>
                                            <MenuItem component={Link} to={'/admin/customs-list'} onClick={handleClose}>Manage Customs</MenuItem>
                                            <MenuItem component={Link} to={'/admin/orders-list'} onClick={handleClose}>Manage Orders</MenuItem>
                                        </div>
                                    )}
                                    {userInfo && (userInfo.role === 'artist') && (
                                        <MenuItem component={Link} to={'/artist/customs'} onClick={handleClose}>Customs</MenuItem>
                                    )}
                                    <MenuItem component={Link} to={'/login'} onClick={logoutHandler}>Logout</MenuItem>
                                </Menu>
                            </div>
                        ) :
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Sign In">
                            <IconButton edge="start" className={classes.icons} component={Link} to={'/login'} color="inherit" aria-label="login">
                                <PersonOutlineOutlinedIcon />
                            </IconButton>
                        </Tooltip>}        
                        </>
                    )}
                </Toolbar>
                </Container>
            </AppBar>
        </header>
        );
};

export default Header;