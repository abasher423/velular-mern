import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, Paper, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "2rem"
    },
    footer: {
        backgroundColor: "grey",
        height: "200px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(12),
        fontWeight: "700",
        fontFamily: "Serif"
    },
    details: {
        fontSize: theme.typography.pxToRem(12),
        fontFamily: "Serif"
    },
    socials: {
        textAlign: "center",
        marginTop: "1rem",
        display: "flex",
        justifyContent: "space-around",
        allignItems: "center"
    },
    paper: {
        padding: "1rem",
        marginTop: "2rem"
    }
  }));


const Footer = () => {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    
    const [expanded, setExpanded] = useState(false);

    // https://material-ui.com/components/accordion/#controlled-accordion
    const handleAccordionChange = (panel) => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <Container className="center">
            <Paper className={classes.paper}>
            {!mobile ?
            <footer className={classes.footer}>
            <div className="footer-heading footer-1">
                <h2>What's New</h2>
                <p>Air Force 1s</p>
                <p>Vans</p>
                <p>Air Max</p>
                <p>Gucci</p>
            </div>
            <div className="footer-heading footer-2">
                <h2>Services</h2>
                <p>Size Guide</p>
                <p>Terms and Conditions</p>
                <p>Privacy Policy</p>
                <p>Legal</p>
            </div>
            <div className="footer-heading footer-2">
                <h2>Socials</h2>
                <p><InstagramIcon /></p>
                <p><TwitterIcon /></p>
                <p><FacebookIcon/></p>
            </div>
            </footer> :
             <Grid container justify="center" className={classes.root}>
                <Grid item xs={12}>
                    <Accordion expanded={expanded === "panel1a"} onChange={handleAccordionChange("panel1a")}>
                        <AccordionSummary 
                            expandIcon={expanded === "panel1a" ? <RemoveIcon /> : <AddIcon />}
                            aria-controls="panl1a-about-us"
                            id="panel1a-about-us-header"
                        >
                            <Typography className={classes.heading}>ABOUT US</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                            <Typography className={classes.details}>(+44) 7975 782 168</Typography>
                            <Typography className={classes.details}>info@velular.com</Typography>
                            <Typography className={classes.details}>Sustainability</Typography>
                            <Typography className={classes.details}>Work with us</Typography>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === "panel1b"} onChange={handleAccordionChange("panel1b")}>
                        <AccordionSummary 
                            expandIcon={expanded === "panel1b" ? <RemoveIcon /> : <AddIcon />}
                            aria-controls="panl1a-legal"
                            id="panel1b-legal-header"
                        >
                            <Typography className={classes.heading}>LEGAL TERMS AND CONDITIONS</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                            <Typography className={classes.details}>Legal Notice</Typography>
                            <Typography className={classes.details}>Privacy Policy</Typography>
                            <Typography className={classes.details}>Cookie Policy</Typography>
                            <Typography className={classes.details}>Terms of Sale</Typography>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === "panel1c"} onChange={handleAccordionChange("panel1c")}>
                        <AccordionSummary 
                            expandIcon={expanded === "panel1c" ? <RemoveIcon /> : <AddIcon />}
                            aria-controls="panl1a-customer-service"
                            id="panel1c-about-customer-service"
                        >
                            <Typography className={classes.heading}>CUSTOMER SERVICE</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                            <Typography className={classes.details}>Contact Us</Typography>
                            <Typography className={classes.details}>FAQ</Typography>
                            <Typography className={classes.details}>Track your order</Typography>
                            <Typography className={classes.details}>Refunds and returns</Typography>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12} className={classes.socials}>
                    <FacebookIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                    <YouTubeIcon />
                    <LinkedInIcon />
                </Grid>
             </Grid>}
             </Paper>
        </Container>
    );
};

export default Footer;