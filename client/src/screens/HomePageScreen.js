import React from 'react';
import Grid from '@material-ui/core/Grid';
import SlideShow from '../components/SlideShow'
import { Button, Container, Tooltip } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Image from 'material-ui-image';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';
import HelpIcon from '@material-ui/icons/Help';

// CSS to style UI component
const useStyles = makeStyles(theme => ({
    slogan: {
        marginTop: "2rem",
        textAlign: "center",
        maxWidth: "100%"
    },
    sloganText: {
        marginTop: "2rem",
        textAlign: "center",
        padding: "5px 0"
    },
    text: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: 568,
        width: "auto",
        [theme.breakpoints.down('sm')] : {
            height: 311,
            width: "auto"
        },
        marginTop: "2rem"
    },
    image: {
        textAlign: "center",
        marginTop: "2rem",
        padding: "1rem",
        height: 300,
        width: "auto",
        position: "relative",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    root: {
        justifyContent: "center"
    },
    carouselPaper: {
        maxWidth: 1280,
        padding: "0.5rem",
        [theme.breakpoints.up('sm')] : {
            padding: "2rem"
        },
        margin: "0 1.5rem"
    },
    nikeImage: {
        marginTop: "2rem",
        maxWidth: "100%",
        height: "auto"
    },
    cardPaper: {
        // height: "500px"
    },
    cardText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 50,
        right: 125,
        color: "white",
        [theme.breakpoints.down('sm')] : {
            right: 100
        }
    }
}));

const HomePageScreen = () => {
    const classes = useStyles();

    // Random text for slogan info
    const sloganInfo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada consectetur nibh vitae porta. Morbi ullamcorper, odio vel fringilla luctus, purus lacus euismod neque, sed laoreet nisl enim eu nisl'

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Paper className={classes.carouselPaper}>
                    <SlideShow />
                </Paper>
            </Grid>

            {/* ------------ Slogan ----------------- */}
            <Grid item xs={12} md={6}>
                <Container>
                    <Paper>
                        <div className={classes.slogan}>
                            <img src="/images/slogan.png" alt="slogan"/>
                            <Tooltip title={sloganInfo}>
                                <HelpIcon />
                            </Tooltip>
                        </div>
                    </Paper>
                </Container>
            </Grid>

            <Grid item xs={12} md={6}>
                <Container>
                    <Paper>
                        <div className={classes.sloganText}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Distinct Trainers for Distinct Individuals
                            </Typography>
                            <Button component={Link} to={'/products'}>Shop Now</Button>
                        </div>
                    </Paper>
                </Container>
            </Grid>

             {/* ------------- Nike Air 1s ----------------- */}
             <Grid item xs={12} md={6}>
                    <Container>
                        <div className={classes.nikeImage}>
                            <Link to={'/products'}>
                                <Image src="/images/vans p3.jpg" />
                            </Link>
                        </div>        
                    </Container>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Container>
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
                    </Container>
                </Grid>

                {/* --------------- Cards ------------------- */}
                <Container>
                <Grid container justify="center" spacing={0}>
                <Grid item xs={12} md={4}>
                    <Paper className={classes.cardPaper}>
                    <div className={classes.image} style={{backgroundImage: "url(/images/air-force-01.jpg)"}}>
                        <div className={classes.cardText}>
                            <Button // Button component adapted from example in https://material-ui.com/components/buttons/
                                variant="contained" 
                                component={Link} 
                                to={'/products'} 
                                className={classes.root}
                            >
                                learn more 
                            <NavigateNextIcon />
                            </Button>
                        </div>
                    </div>
                    </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <Paper className={classes.cardPaper}>
                    <div className={classes.image} style={{backgroundImage: "url(/images/vans-1.jpg)"}}>
                            <div className={classes.cardText}>
                                {/* <Typography variant="h4" component="h2" style={{margin: "1rem 0"}}> */}
                                {/* Vans */}
                                {/* </Typography> */}
                                <Button variant="contained" component={Link} to={'/products'} >Learn More <NavigateNextIcon /></Button>
                            </div>
                    </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper className={classes.cardPaper}>
                    <div className={classes.image} style={{backgroundImage: "url(/images/air-max-2.jpg)"}}>
                        <div className={classes.cardText}>
                            {/* <Typography variant="h4" component="h2">
                                Air Max
                            </Typography> */}
                            <Button // Button component adapted from example in https://material-ui.com/components/buttons/
                                variant="contained" 
                                component={Link} 
                                to={'/products'} 
                            >
                                Learn More 
                            <NavigateNextIcon />
                            </Button>                                
                        </div>
                    </div>
                    </Paper>
                </Grid>
                </Grid>
                </Container>
        </Grid>
    );
};

export default HomePageScreen;