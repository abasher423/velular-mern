import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import title from '../images/title.png';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontWeight: '500'
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
  typography: {
    h6: {
      "fontWeight": 600,
    }
  }
}));

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Container>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    <img src={title} alt="logo" className={classes.logo}/>
                    <Button className={classes.breadcrumbs} color="inherit">Shop</Button>
                    <Button className={classes.breadcrumbs} color="inherit">Brands</Button>
                    <Button className={classes.breadcrumbs} color="inherit">Favourites</Button>
                    <Button className={classes.breadcrumbs} color="inherit">services</Button>
                    </Typography>
                    
                    <IconButton edge="start" className={classes.icons} color="inherit" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.icons} color="inherit" aria-label="favorite">
                        <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.icons} color="inherit" aria-label="cart">
                        <ShoppingBasketOutlinedIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.icons} color="inherit" aria-label="login">
                        <PersonOutlineOutlinedIcon />
                    </IconButton>
                </Toolbar>
                </Container>
            </AppBar>
        </div>
        );
};

export default Header;