import { makeStyles } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Link from 'react-router-dom/Link';

const useStyles = makeStyles(theme => ({
    image: {
        textAlign: "center",
        height: "500px",
        width: 'auto',
        [theme.breakpoints.down('lg')] : {
            height: "400px"
        },
        [theme.breakpoints.down('sm')] : {
            height: "300px"
        }
    },
    carouselBtn: {}
}))

// code from https://www.npmjs.com/package/react-material-ui-carousel
const SlideShow = () => {
    const classes = useStyles();

    return(
        <Carousel 
        fullHeightHover={false}     // We want the nav buttons wrapper to only be as big as the button element is
        navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
            
        }} 
        navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
            style: {
                bottom: '0',
                top: 'unset'
            }
        }} >
            <div className={classes.image}>
                <Link to={'/products'}>
                    <img className="center" src="/images/air-max-5.jpg" alt="airmax"/>
                </Link>
            </div>
            <div className={classes.image}>
                <Link to={'/products'}>
                    <img src="/images/air-max-2.jpg" alt="airmax2" />
                </Link>
            </div>
            <div className={classes.image}>
                <Link to={'/products'}>
                    <img src="/images/air-max-4.jpg" alt="airforce" />
                </Link>
            </div>
        </Carousel>
    );
}

export default SlideShow;