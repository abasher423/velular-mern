import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import SlideShow from '../components/SlideShow'
import { Button, Container, Tooltip, useTheme, useMediaQuery, Box, IconButton } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import HelpIcon from '@material-ui/icons/Help';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faDraftingCompass } from '@fortawesome/free-solid-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

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
        },
    },
    quote: {
        position: "absolute",
        top: 600,
        left: 280,
        fontSize: 50,
        fontWeight: 800,
        // animation: "fadeIn 2s infinite alternate",
        color: "#1b1b1b",
        [theme.breakpoints.down('lg')] :{
            left: 300,
            top: 670,
            fontSize: 40,
        },
        [theme.breakpoints.down('md')] :{
            left: 200,
            top: 750,
            fontSize: 30,
        }
    },
    slogan: {
        marginTop: "10rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: 15,
        [theme.breakpoints.down('md')] : {
            flexDirection: "column",
            marginTop: "0.5rem"
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
    },
    learnBtn: {
        justifyContent: "center"
    },
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        [theme.breakpoints.up('md')]:{
            height: "100vh"
        },
        [theme.breakpoints.down('md')]:{
            padding: "4rem 0"
        }
    },
    continue: {
        // animation: "fadeIn 2s infinite alternate",
        fontSize: 20
    },
    boxText: {
        marginTop: 30,
        [theme.breakpoints.down('md')]:{
            fontSize: 30
        }
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
       borderRadius: 4,
       boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
       height: "100%",
       width: "100%"
    },
    cardPaper: {
        borderRadius: 4,
        boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
    },
    image: {
        textAlign: "center",
        padding: "1rem",
        height: 600,
        width: "auto",
        position: "relative",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        transition: "all .2s ease-in-out",
        "&:hover":{
            transform: "scale(1.1)"
        },
        [theme.breakpoints.down('sm')] : {
            height: 300
        }
    }
}));

const HomePageScreen = () => {
    const classes = useStyles();

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    const mobile2 = useMediaQuery(theme.breakpoints.down("md"));

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
                        {!mobile2 && <Typography variant="h6" className={classes.quote}>
                            <Box >
                                <span style={{color: "orange"}}>Be</span> the change <br /> you want to see  <br /> in the world
                            </Box>
                        </Typography>}
                    </div>
                </Link>
            </Grid>
            
            <Container>
            {/* ------------ Slogan ----------------- */}
            <Grid item xs={12}>
                    <Paper className={classes.slogan}>
                        <div>
                            {/* <img src="/images/slogan.png" alt="slogan"/> */}
                            <Typography variant="h1">
                                <Box fontSize={45} fontWeight="fontWeightMedium"  textAlign="center">
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
                <Grid item xs={12} md={6}>
                      
                            <Link to={'/products/608b75a8cf423f44243ed11d'}>
                                <img src="/images/vans-p3.jpg" alt="Vans" className={classes.nikeImage}/>
                            </Link>
                </Grid>

                <Grid item xs={12} md={6}>
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
                <Paper className={classes.carouselPaper}>
                    <SlideShow />
                </Paper>
            </Grid>

            {/* ------------------- Icons ----------------- */}
            <Container className={classes.iconContainer}>
                <Grid container spacing={1}>
                    
                        <Grid item xs={12} md={4} data-aos={!mobile ? "fade-right" : ""}>
                            <FontAwesomeIcon icon={faCreditCard} size={!mobile ? "8x" : "4x"} />
                            <Typography variant="h3" className={classes.boxText}>
                                <Box textAlign="center">
                                    Purchase
                                </Box>
                            </Typography>
                            <Typography variant="h4" className={classes.boxText}>
                                <Box textAlign="center">
                                <span style={{ color: "#FFA500"}}>Buy</span> premium custom shoes designed by independent artists
                                </Box>
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={4} data-aos={!mobile ? "fade-right" : ""} data-aos-delay={300}>
                            <FontAwesomeIcon icon={faDraftingCompass} size={!mobile ? "8x" : "4x"} />
                            <Typography variant="h3" className={classes.boxText}>
                                <Box textAlign="center">
                                    Design
                                </Box>
                            </Typography>
                            <Typography variant="h4" className={classes.boxText}>
                                <Box textAlign="center">
                                    <span style={{ color: "#FFA500"}}>Create</span> custom quality shoes ready to be sold to valued customers
                                </Box>
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={4} data-aos={!mobile ? "fade-right" : ""} data-aos-delay={600}>
                            <FontAwesomeIcon icon={faTruck} size={!mobile ? "8x" : "4x"} />
                            <Typography variant="h3" className={classes.boxText}>
                                <Box textAlign="center">
                                    Shipping
                                </Box>
                            </Typography>
                            <Typography variant="h4" className={classes.boxText}>
                                <Box textAlign="center">
                                <span style={{ color: "#FFA500"}}>Enjoy</span> next day delivery on selected custom designed sneakers
                                </Box>
                            </Typography>
                        </Grid>

                        <Grid item xs={12} align="center" data-aos={!mobile ? "fade-right" : ""} data-aos-delay={900}>
                        <IconButton edge="start" color="inherit" component={Link} to={'/page/1'} aria-label="continue" className={classes.continue}>
                            <FontAwesomeIcon icon={faAngleDoubleRight} size={!mobile ? "3x" : "4x"} />
                        </IconButton>
                        </Grid>
                </Grid>
            </Container>

            {/* --------------- Cards ------------------- */}
            <Grid container justify="center" spacing={0} >
                <Grid item xs={12} md={4}>
                    <Paper className={classes.cardPaper}>
                        <Link to={'/products/60a31b6abf4e9e0004e912fb'}>
                            <div className={classes.image} style={{backgroundImage: "url(/images/air-force-01.jpg)"}} />
                        </Link>
                    </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <Paper className={classes.cardPaper}>
                        <Link to={'/products/610aaba7851c6b298c22deaa'}>
                            <div className={classes.image} style={{backgroundImage: "url(/images/vans-1.jpg)"}} />
                        </Link>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper className={classes.cardPaper}>
                    <Link to={'/products/610aaf8ccaea2f5408180c6a'}>
                        <div className={classes.image} style={{backgroundImage: "url(/images/airforce-1d.jpg)"}} />
                    </Link>

                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomePageScreen;