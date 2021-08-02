import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import SlideShow from '../components/SlideShow'
import { Button, Container, Tooltip, useTheme, useMediaQuery, Box } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import HelpIcon from '@material-ui/icons/Help';
import Aos from 'aos';
import 'aos/dist/aos.css';

const useStyles = makeStyles(theme => ({
    mainImage: {
        textAlign: "center",
        height: "100vh",
        width: "auto",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        borderRadius: 4,
       boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        [theme.breakpoints.down('xs')] : {
            height: 500,
            marginTop: "2rem"
        }
    },
    quote: {
        position: "absolute",
        top: 350,
        left: 180,
        animation: "fadeIn 2s infinite alternate",
        color: "#1b1b1b"
    },
    slogan: {
        marginTop: "10rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: 15,
        [theme.breakpoints.down('xs')] : {
            flexDirection: "column",
            marginTop: "2rem"
        }
    },
    sloganText: {
        marginTop: "2rem",
        textAlign: "center",
    },
    sloganInfo: {
        textAlign: "center"
    },
    text: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: 443,
        width: "auto",
        [theme.breakpoints.down('sm')] : {
            height: 311,
            width: "auto"
        },
        // marginTop: "2rem"
    },
    learnBtn: {
        justifyContent: "center"
    },
    carousel: {
        [theme.breakpoints.down('sm')] : {
            marginTop: "2rem"
        },
        marginTop: "10rem",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#1b1b1b"
    },
    carouselPaper: {
        [theme.breakpoints.up('sm')] : {
            padding: 5
        },
        margin: "9rem 1.5rem"
    },
    nikeImage: {
    //    marginTop: "2rem",
       borderRadius: 4,
       boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
    },
    cardPaper: {
        borderRadius: 4,
        boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
    },
    image: {
        textAlign: "center",
        marginTop: "2rem",
        padding: "1rem",
        height: 600,
        width: "auto",
        position: "relative",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        [theme.breakpoints.down('sm')] : {
            height: 300
        }
    }
}));

const HomePageScreen = () => {
    const classes = useStyles();

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    // Random text for slogan info
    const sloganInfo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada consectetur nibh vitae porta. Morbi ullamcorper, odio vel fringilla luctus, purus lacus euismod neque, sed laoreet nisl enim eu nisl'

    return (
        <Grid container spacing={0} className={classes.root}>
            <Grid item xs={12}>
                <Link to={'/products'}>
                    <div className={classes.mainImage} style={ !mobile ? { backgroundImage: "url(/images/jordan_1.jpg)" } : {backgroundImage: "url(/images/jordan_2.jpg)"}}>
                        {!mobile && <Typography variant="h6" className={classes.quote}>
                            <Box fontSize={50} >
                                "Be the change <br /> you want to see  <br /> in the world"
                            </Box>
                        </Typography>}
                    </div>
                </Link>
            </Grid>
            
            <Container>
            {/* ------------ Slogan ----------------- */}
            <Grid item xs={12} data-aos={!mobile ? "fade-up" : ""}>
                    <Paper className={classes.slogan}>
                        <div>
                            {/* <img src="/images/slogan.png" alt="slogan"/> */}
                            <Typography variant="h1">
                                <Box fontSize={45} fontWeight="fontWeightMedium" fontFamily="Monospace" textAlign="center">
                                    One of One <span>Trainers</span>
                                </Box>
                            </Typography>
                            <div className={classes.sloganInfo}>
                                <Tooltip title={sloganInfo}>
                                    <HelpIcon />
                                </Tooltip>
                            </div>
                        </div>
            
                        <div className={classes.sloganText}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Distinct Trainers for Distinct Individuals
                            </Typography>
                            <Button component={Link} to={'/products'}>Shop Now</Button>
                        </div>
                    </Paper>
            </Grid>
            
             {/* ------------- Nike Air 1s ----------------- */}
             <Grid container>
                <Grid item xs={12} md={6} data-aos={!mobile ? "fade-left" : ""}>
                    <div>
                        <Link to={'/products'}>
                            <img src="/images/vans p3.jpg" alt="Vans" className={classes.nikeImage}/>
                        </Link>
                    </div>        
                </Grid>

                <Grid item xs={12} md={6} data-aos={!mobile ? "fade-right" : ""}>
                    <Paper>
                        <div className={classes.text}>
                            <Typography variant="h5" component="h2">
                                Sophisticated Design
                            </Typography>
                            <Typography variant="h3" component="h2" style={{ margin: "2rem 0" }}>
                                Nike Air 1s
                            </Typography>
                            <Button variant="outlined" component={Link} to={'/products'}>Continue</Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            </Container>

            {/* --------------- Carousel -------------- */}
            <Grid item xs={12} className={classes.carousel}>
                <Paper className={classes.carouselPaper} data-aos="fade-down">
                    <SlideShow />
                </Paper>
            </Grid>

                {/* --------------- Cards ------------------- */}
                <Grid container justify="center" spacing={0} >
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.cardPaper}>
                            <Link to={'/products'}>
                                <div className={classes.image} style={{backgroundImage: "url(/images/air-force-01.jpg)"}} />
                            </Link>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.cardPaper}>
                            <Link to={'/products'}>
                                <div className={classes.image} style={{backgroundImage: "url(/images/vans-1.jpg)"}} />
                            </Link>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper className={classes.cardPaper}>
                        <Link to={'/products'}>
                            <div className={classes.image} style={{backgroundImage: "url(/images/air-max-2.jpg)"}} />
                        </Link>

                        </Paper>
                    </Grid>
                </Grid>
                
        </Grid>
    );
};

export default HomePageScreen;