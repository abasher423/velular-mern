// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/checkout/Checkout.js

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Message from '../components/Message';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import ShippingForm from '../components/ShippingForm';
import PaymentDetailsForm from '../components/PaymentDetailsForm';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingDetails } from '../actions/cartActions';
import { savePaymentMethod } from '../actions/cartActions';
import ReviewForm from '../components/ReviewForm';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

const steps = ['Shipping Address', 'Payment Details', 'Review Your Order'];

const ShippingScreen = ({ history }) => {
    const classes = useStyles();
    const cart = useSelector(state => state.cart);
    const { shippingDetails } = cart;
    const [activeStep, setActiveStep] = useState(0);
    const [address, setAddress] = useState(shippingDetails.address ? shippingDetails.address : '');
    const [city, setCity] = useState(shippingDetails.city ? shippingDetails.city : '' );
    const [postCode, setPostCode] = useState(shippingDetails.postCode ? shippingDetails.postCode : '');
    const [country, setCountry] = useState(shippingDetails.country ? shippingDetails.country : '');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
 
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const submitHandler = (e) => {
        if (address === '' || city === '' || postCode === '' || country === ''){
            setActiveStep(0)
            setMessage('Missing required fields');
        } else if (paymentMethod === ''){
            setActiveStep(1);
            setMessage('Missing Payment Method');
        } else {
            e.preventDefault();
            dispatch(saveShippingDetails({ address, city, postCode, country }));
            dispatch(savePaymentMethod(paymentMethod));
            history.push('/place-order')
        }
    }

    const addAddress = (e) => {
        setAddress(e.target.value);
    }
    const addCity = (e) => {
        setCity(e.target.value);
    }
    const addPostCode = (e) => {
        setPostCode(e.target.value);
    }
    const addCountry = (e) => {
        setCountry(e.target.value);
    }
    const addPaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    }

    function getStepContent(step) {
        switch (step) {
          case 0:
            return <ShippingForm 
                address={address}
                addressChange={addAddress}
                city={city}
                cityChange={addCity}
                postCode={postCode}
                postCodeChange={addPostCode}
                country={country}
                countryChange={addCountry}
            />;
          case 1:
            return <PaymentDetailsForm 
                payment={paymentMethod} 
                paymentMethodChange={addPaymentMethod}
            />;
          case 2:
            return <ReviewForm />;
          default:
            throw new Error('Unknown step');
        }
    }

    return (
        <div>
        <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Shipping
          </Typography>
          {message && <Message status="error" text={message} />}
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={activeStep === steps.length - 1 ? true : false}
                  >
                      Next
                  </Button>
                  {activeStep === steps.length - 1 
                    ? <Button
                        variant="contained"
                        color="primary"
                        onClick={submitHandler}
                        className={classes.button}
                    >
                        Continue
                    </Button>
                    : '' 
                  }
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
        </div>
    );
};

export default ShippingScreen;