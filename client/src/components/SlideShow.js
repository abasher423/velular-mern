import { makeStyles } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Link from 'react-router-dom/Link';

const useStyles = makeStyles(theme => ({
    image: {
        textAlign: "center",
        height: "30rem",
        width: "auto",
        [theme.breakpoints.down('sm')] : {
            height: 200
        }
    },
    carouselBtn: {}
}))

const SlideShow = () => {
    const classes = useStyles();

    return(
        <Carousel 
        navButtonsWrapperProps={{ 
            style: {
                bottom: '0',
                top: 'unset'
            }
        }} >
            <div className={classes.image}>
                <Link to={'/products/6090aef9f6ea3f1b288aafdd'}>
                    <img className="center" src="/images/air-max-5.jpg" alt="airmax"/>
                </Link>
            </div>
            <div className={classes.image}>
                <Link to={'/products/6090b085b36ea04ac04c11f6'}>
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