import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useState, useeffect } from 'react';


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: "50%",
            margin: theme.spacing(1)
        },
        marginTop: "100px"
    }
}));

const initialValues = {
    id: '',
    name: '',
    brand: '',
    description: '',
    size: 0,
    initialPrice: 0,
    countInStock: 0,
}

const CreateProductScreen = () => {
    const classes = useStyles();
    const [values, setValues] = useState(initialValues);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    
    return (
        <form className={classes.root}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} align="center">
                        <TextField variant="outlined" name="name" label="Product Name" value={values.name} onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={12} align="center" >
                    <TextField variant="outlined" nam="brand" label="Brand" value={values.brand} onChange={handleChange}/>
                    </Grid>
                </Grid>
            </Container>
        </form>
    );
}

export default CreateProductScreen;