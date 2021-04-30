import React from 'react';
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
import Link from 'react-router-dom/Link'
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from '../actions/userActions';
import { useHistory } from "react-router-dom";
import { Divider, Drawer, Fade, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Tooltip, useMediaQuery, useTheme } from '@material-ui/core';
import { USER_LOGOUT } from '../constants/userConstants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "4rem"
  },
  title: {
    flexGrow: 1,
    fontWeight: '500',
    textDecoration: 'none',
    color: 'black',
    fontFamily: 'New Century Schoolbook'
  },
  logo: {
      marginTop: '15px',
      width: '250px',
      height: 'auto'
  },
  breadcrumbs: {
      marginBottom: '25px',
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
  loggedIn: {
      "&:hover": {
        backgroundColor: theme.palette.success.main
      },
      backgroundColor: theme.palette.info.dark,
      color: 'white'
  }
}));

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchrolEl2, setAnchorEl2] = useState(null);
    const [anchorEl3, setAnchorEl3] = useState(null);
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

    const adminHandleClick = (e) => {
        setAnchorEl2(e.currentTarget);
    }

    const artistHandleClick = (e) => {
        setAnchorEl3(e.currentTarget);
    }
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const adminHandleClose = () => {
        setAnchorEl2(null);
    };

    const artistHandleClose = () => {
        setAnchorEl3(null);
    };

    const logoutHandler = () => {
        dispatch(logout());
        setAnchorEl(null);
    };

    const handleMenuOption = option => {
        history.push(`/${option}`)
    }

    const menuItems = (
        <div>
            <div className={classes.toolbar}>
                {userInfo && (
                    <>
                    <Divider />
                    <List>
                        {['Profile', 'Orders'].map(option => (
                            <ListItem button key={option}>
                                <ListItemText primary={option} />
                            </ListItem>
                        ))}
                    </List>
                    </>
                )}
                <Divider />
                <List>
                    {['Home', 'Favourites', 'Cart'].map((option, idx) => (
                        <ListItem button key={option} onClick={() => handleMenuOption(option[0].toLowerCase() + option.substring(1))}>
                            <ListItemIcon>
                                {idx === 0 ? <HomeIcon /> : idx === 1 ? <FavoriteBorderIcon /> : idx === 2 ? 
                                <ShoppingCartOutlinedIcon /> : <PersonOutlineOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText>{option}</ListItemText>
                        </ListItem>
                    ))}
                    {userInfo ? 
                        <ListItem button onClick={() => {dispatch({ type: USER_LOGOUT })}}>
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

    // https://material-ui.com/components/drawers/
    // https://material-ui.com/components/menus/

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Container>
                <Toolbar>
                    <Typography variant="h3" component={Link} to={'/'} className={classes.title}>
                        Velular
                    </Typography>

                    {mobile ? (
                        <>
                            {userInfo && (
                                <Typography variant="h6" component="h1">
                                {userInfo.firstName[0].toUpperCase() + userInfo.firstName.substring(1)}
                                </Typography>
                            )}
                            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Search">
                                <IconButton edge="start" className={classes.icons} component={Link} to={'/search'} color="inherit" aria-label="login">
                                    <SearchIcon />
                                </IconButton>
                            </Tooltip>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerOpen}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
                                {menuItems}
                            </Drawer>
                        </>
                    ) : (
                        <>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Search">
                        <IconButton edge="start" className={classes.icons} color="inherit" component={Link} to={'/search'} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Favourites">
                        <IconButton edge="start" className={classes.icons} color="inherit" component={Link} to={'/favourites'} aria-label="favorite">
                            <FavoriteBorderIcon />
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
                                variant="contained"
                                color="primary"
                                onClick={handleClick}>
                                    {userInfo.firstName}
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to={'/'} onClick={handleClose}>Home</MenuItem>
                                <MenuItem component={Link} to={'/profile'} onClick={handleClose}>Profile</MenuItem>
                                <MenuItem component={Link} to={'/login'} onClick={logoutHandler}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) :
                    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Sign In">
                        <IconButton edge="start" className={classes.icons} component={Link} to={'/login'} color="inherit" aria-label="login">
                            <PersonOutlineOutlinedIcon />
                        </IconButton>
                    </Tooltip>}
                    {userInfo && userInfo.role === 'admin' && (
                        <div style={{margin: "0 1rem"}}>
                            <Button 
                                onClick={adminHandleClick}>
                                    Admin
                            </Button>
                            <Menu
                                id="admin menu"
                                anchorEl={anchrolEl2}
                                keepMounted
                                open={Boolean(anchrolEl2)}
                                onClose={adminHandleClose}
                            >
                                <MenuItem component={Link} to={'/admin/users-list'} onClick={adminHandleClose}>Users</MenuItem>
                                <MenuItem component={Link} to={'/admin/customs-list'} onClick={adminHandleClose}>Customs</MenuItem>
                                <MenuItem component={Link} to={'/admin/orders-list'} onClick={adminHandleClose}>Orders</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {userInfo && userInfo.role === 'artist' && (
                        <div style={{margin: "0 1rem"}}>
                            <Button 
                                onClick={artistHandleClick}>
                                    Artist
                            </Button>
                            <Menu
                                id="artist menu"
                                anchorEl={anchorEl3}
                                keepMounted
                                open={Boolean(anchorEl3)}
                                onClose={artistHandleClose}
                            >
                                <MenuItem component={Link} to={'/artist/customs'} onClick={artistHandleClose}>Customs</MenuItem>
                                <MenuItem component={Link} to={'/artist/orders-list'} onClick={artistHandleClose}>Orders</MenuItem>
                            </Menu>
                        </div>
                    )}
                    </>
                    )}
                </Toolbar>
                </Container>
            </AppBar>
        </div>
        );
};

export default Header;