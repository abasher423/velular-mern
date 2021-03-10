import { Container, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: "grey",
        height: "200px",
        marginBottom: "1rem",
        marginTop: "150px"
    }
  }));


const Footer = () => {
    const classes = useStyles();

    return (
        <Container className="center">
            <footer className={classes.footer}>
            <div class="footer-heading footer-1">
                <h2><Typography variant="h7" color="textSecondary">What's New</Typography></h2>
                <p>Air Force 1s</p>
                <p>Vans</p>
                <p>Air Max</p>
                <p>Gucci</p>
            </div>
            <div class="footer-heading footer-2">
                <h2><Typography variant="h7" color="textSecondary">Services</Typography></h2>
                <p>Size Guide</p>
                <p>Terms and Conditions</p>
                <p>Privacy Policy</p>
                <p>Legal</p>
            </div>
            <div class="footer-heading footer-2">
                <h2><Typography variant="h7" color="textSecondary">Socials</Typography></h2>
                <p><InstagramIcon /></p>
                <p><TwitterIcon /></p>
                <p><FacebookIcon/></p>
            </div>
            
            </footer>
        </Container>
    );
};

export default Footer;