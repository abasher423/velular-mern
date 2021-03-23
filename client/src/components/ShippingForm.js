import { Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';

const ShippingForm = ({ address, addressChange, city, cityChange, postCode, postCodeChange, country, countryChange }) => {
    return (
        <>
            <Typography variant="h6" gutterBottom> Shipping Address </Typography>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                            variant="standard"
                            margin="normal"
                            autoComplete="true"
                            fullWidth
                            required
                            id="address"
                            label="Address"
                            value={address}
                            onChange={(e) => addressChange(e)}
                            name="address"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            variant="standard"
                            margin="normal"
                            autoComplete="true"
                            fullWidth
                            required
                            id="city"
                            label="city"
                            value={city}
                            onChange={(e) => cityChange(e)}
                            name="city"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            variant="standard"
                            margin="normal"
                            autoComplete="true"
                            fullWidth
                            required
                            id="postCode"
                            label="Postal Code"
                            value={postCode}
                            onChange={e => postCodeChange(e)}
                            name="postCode"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            variant="standard"
                            margin="normal"
                            autoComplete="true"
                            fullWidth
                            required
                            id="country"
                            label="Country"
                            value={country}
                            onChange={e => countryChange(e)}
                            name="country"
                        />
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default ShippingForm;