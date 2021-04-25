import React from 'react';
import Grid from '@material-ui/core/Grid';
import SlideShow from '../components/SlideShow'
import { Button, Container } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Image from 'material-ui-image';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    slogan: {
        marginTop: "150px",
        textAlign: "center"
    },
    sloganText: {
        marginTop: "150px",
        textAlign: "center",
        padding: "5px 0"
    },
    text: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "550px",
        marginTop: "150px"
    },
    image: {
        marginTop: "150px",
        padding: "1rem"
    },
    root: {
        justifyContent: "center"
    }
});

const HomePageScreen = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SlideShow />
            </Grid>

            {/* Slogan */}
            <Grid item xs={12} md={6}>
                <Container>
                    <Paper>
                    <div className={classes.slogan}>
                        <img src="/images/slogan.png" alt="slogan"/>
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
                        <div style={{ marginTop: "150px"}}>
                            <Image src="/images/Air force 2.jpg" />
                        </div>        
                    </Container>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Container>
                        <div className={classes.text}>
                            <Typography variant="h5" component="h2">
                                Sophisticated Design
                            </Typography>
                            <Typography variant="h3" component="h2" style={{ margin: "2rem 0" }}>
                                Nike Air 1s
                            </Typography>
                            <Button variant="outlined" component={Link} to={'/products'}>Continue</Button>
                        </div>
                    </Container>
                </Grid>

                {/* --------------- Cards ------------------- */}
                <Grid item xs={12} md={4}>
                    <Container>
                        <Paper>
                        <div className={classes.image}>
                            <img src="/images/airforce-3.jpeg" alt="airmax3" height="400px" width="340px"/>
                            <Typography variant="h4" component="h2" style={{margin: "1rem 0"}}>
                                Nike Air 1s
                            </Typography>
                            <Button variant="contained" className={classes.root}>learn more <NavigateNextIcon /></Button>
                        </div>
                        </Paper>
                    </Container>
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <Container>
                        <Paper>
                        <div className={classes.image}>
                                <img src="/images/vans-2.jpg" alt="airmax4" height="400px" width="340px"/>
                                <Typography variant="h4" component="h2" style={{margin: "1rem 0"}}>
                                Vans
                                </Typography>
                                <Button variant="contained" >Learn More <NavigateNextIcon /></Button>
                        </div>
                        </Paper>
                    </Container>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Container>
                        <Paper>
                        <div className={classes.image}>
                            <img src="/images/air-max-5.jpg" alt="airmax5" height="400px" width="340px"/>
                            <Typography variant="h4" component="h2" style={{margin: "1rem 0"}}>
                                Air Max
                            </Typography>
                            <Button variant="contained">Learn More <NavigateNextIcon /></Button>
                        </div>
                        </Paper>
                    </Container>
                </Grid>

        </Grid>
    );
};

export default HomePageScreen;