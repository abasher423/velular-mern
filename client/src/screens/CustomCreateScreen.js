import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { useState } from 'react';
import { AccordionActions, Button, Container, Divider, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import productServices from '../services/productServices';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import PopupDialog from '../components/PopupDialog';


const useStyles = makeStyles(theme => ({
    container: {
        marginTop: "6rem", 
        minHeight: "80vh"
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    title: {
        textAlign: 'center'
    },
    new: {
        textAlign: 'right'
    },
    createBtn: {
        "&:hover": {
            backgroundColor: theme.palette.success.light
        },
        backgroundColor: theme.palette.success.main,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '25%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2)
    },
    image: {
        height: 185,
        width: "auto"
    },
    deleteBtn: {
        color: theme.palette.error.main
    },
    submitBtn: {
        color: theme.palette.success.main
    },
    visitBtn: {
        "&:hover": {
            backgroundColor: theme.palette.success.light
        },
        backgroundColor: theme.palette.success.dark
    }
}));

const CustomCreateScreen = () => {
    const classes = useStyles();
    const [openForm, setOpenForm] = useState(false);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [customDetails, setCustomDetails] = useState('');

    // variable to store jwt and user logged in info
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // React hook to fetch custom details when component mounts
    useEffect(() => {
        const fetchCustomDetails = async () => {
            if (!customDetails){
                try {
                    const token = {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`
                        }
                    }
                    const response = await productServices.fetchArtistCustoms(token);
                    const data = response.data.customs.sort(function(a,b) {return (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0);} );
                    setCustomDetails(data);
                } catch (error){
                    setError(error.response && error.response.data.message);
                }
            }
        }
        fetchCustomDetails();
        
    }, [userInfo.token, customDetails]);

    
    // HANDLERS
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleClickOpen = () => {
        setOpenForm(true);
    };
    const submitHandler = async (event, customId) => {
        const token = {
            headers: { // jwt token to be sent for verification
                Authorization: `Bearer ${userInfo.token}` 
            }
        };
        // sends PUT request to server
        await productServices.updateCustomStatus(customId, { status: 'Submitted' }, token);
        setCustomDetails('');
    };
    const deleteHandler = async (customId) => {
        const token = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        // sends PUT request to server
        await productServices.deleteCustom(customId, token);
        setCustomDetails('');
    }
    
    return (
        <Container className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.title}>
                    <Typography variant="h3" component="h1">Manage Customs</Typography>
                </Grid>
                <Grid item xs={12} className={classes.new}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.createBtn}
                    onClick={handleClickOpen}
                    startIcon={<AddIcon />}
                >
                    Create New
                </Button>
                <PopupDialog
                    openForm={openForm}
                    setOpenForm={setOpenForm}
                    setCustomDetails={setCustomDetails}
                    onClick={() => setOpenForm(true)}
                />
                </Grid>
                <Grid item xs={12}>
                    {error && <Message status="info" text={error} />}
                    <div className={classes.root}>
                    {customDetails && customDetails.map((custom, idx) => {
                        return (
                        <Accordion key={idx}
                            expanded={expanded === `panel${idx}`}
                            style={
                                custom.status ==='Accepted' ? {backgroundColor: '#eeffe6'} : 
                                custom.status === 'Rejected' ? {backgroundColor: '#fcedeb'} : 
                                custom.status === 'Submitted' ? {backgroundColor: '#f0f6ff'} :
                                {backgroundColor: 'white'}
                            } 
                            onChange={handleChange(`panel${idx}`)}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${idx}bh-content`}
                        id={`panel${idx}bh-header`}
                        >
                            <Typography className={classes.heading}>{custom._id}</Typography>
                            <Typography className={classes.secondaryHeading}>{custom.status}</Typography>
                        </AccordionSummary>
                        <Divider />
                            <AccordionDetails className={classes.details}>
                            <div className={classes.column}>
                                    <img src={custom.productImage} className={classes.image} alt="product" />
                                </div>
                                <div className={clsx(classes.column, classes.helper)}>
                                    <Typography variant="body2" component="p">Product Name: <b>{custom.name}</b></Typography>
                                    <br />
                                    <Typography variant="body2" component="p">
                                        {custom.status === 'Accepted' ? 'Price: ' : 'Proposed Price: '}
                                        <b>£{custom.price}</b>
                                    </Typography>
                                    <br />
                                    <Typography variant="body2" component="p">Size: <b>( 3 - {custom.size} )</b></Typography>
                                    <br />
                                    <Typography variant="body2" component="p">Cateogry: <b>{custom.category}</b></Typography>
                                    <br />
                                    <Typography variant="body2" component="p">Brand: <b>{custom.brand}</b></Typography>
                                </div>
                                <div className={clsx(classes.column, classes.helper)}>
                                    <Typography variant="body2" component="p"><u>Description</u></Typography>
                                    <br />
                                    <Typography variant="body2" component="p">{custom.description}</Typography>
                                </div>
                                { custom.reason && (
                                    <div className={clsx(classes.column, classes.helper)}>
                                        <Typography variant="body2" component="p"><u>Feedback</u></Typography>
                                        <br />
                                        <Typography variant="body2" component="p">{custom.reason}</Typography>
                                    </div>
                                )}
                                </AccordionDetails>
                            <Divider />
                        {custom.status === 'Pending' && (
                            <AccordionActions>
                            <Button
                                size="small" 
                                className={classes.deleteBtn}
                                onClick={() => deleteHandler(custom._id)}
                            >
                                Delete
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                className={classes.submitBtn}
                                onClick={() => submitHandler(custom._id)}
                            >
                                Submit
                            </Button>
                            </AccordionActions>
                        )}
                        {custom.status === 'Rejected' && (
                            <AccordionActions>
                            <Button
                                size="small" 
                                className={classes.deleteBtn}
                                onClick={() => deleteHandler(custom._id)}
                            >
                                Delete
                            </Button>
                            </AccordionActions>
                        )}
                        {custom.status === 'Accepted' && (
                            <AccordionActions>
                            <Button
                                size="small" 
                                color="primary"
                                variant="contained"
                                component={Link}
                                to={`/products/${custom._id}`}
                                className={classes.visitBtn}
                            >
                                Visit Product
                            </Button>
                            </AccordionActions>
                        )}
                    </Accordion>)
                    })}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CustomCreateScreen;