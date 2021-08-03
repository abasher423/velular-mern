import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';

// renders two radio buttons for PayPal and Stripe (Stripe option is not implemented but added for future work)
const PaymentDetailsForm = ({ paymentMethod, paymentMethodChange }) => {
    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Payment Type</FormLabel>
                <RadioGroup
                    defaultValue="paypal" 
                    aria-label="paymntType" 
                    name="customized-radios"
                    value={paymentMethod}
                    onChange={e => paymentMethodChange(e)}
                >
                    <FormControlLabel value="PayPal" control={<Radio color="primary" />} label="PayPal" />
                    <FormControlLabel value="Stripe" control={<Radio color="primary" />} disabled label="Stripe" />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default PaymentDetailsForm;