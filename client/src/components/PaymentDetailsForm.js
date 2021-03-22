import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';

const PaymentDetailsForm = ({ paymentMethod, paymentMethodChange }) => {
    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Payment Type</FormLabel>
                <RadioGroup 
                    // defaultValue="paypal" 
                    aria-label="paymntType" 
                    name="customized-radios"
                    value={paymentMethod}
                    onChange={e => paymentMethodChange(e)}
                >
                    <FormControlLabel value="paypal" control={<Radio color="primary" />} label="PayPal" />
                    <FormControlLabel value="stripe" control={<Radio color="primary" />} label="Stripe" />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default PaymentDetailsForm;