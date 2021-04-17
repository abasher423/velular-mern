import React, { useEffect, useState } from 'react';
import { Container, Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { Button,IconButton, TextField, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import productServices from '../services/productServices';
import { useSelector } from 'react-redux';
import jwt from 'jwt-decode';
import Message from './Message';

const useStyles = makeStyles(theme => ({
    sizeFormControl: {
        marginTop: '17px',
        minWidth: 195,
    },
    container: {
        marginBottom: '2rem'
    },
    categoryFormControl: {
        minWidth: 195
    },
    brandFormControl: {
        minWidth: 195
    },
    button: {
        marginTop: '2rem'
    },
    button2: {
        marginTop: '2rem',
        backgroundColor: theme.palette.info.main
    },
}));

const CustomCreateForm = ({ setOpenForm, setCustomDetails }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(null);
    const [openBrand, setOpenBrand] = useState(null);
    const [openSize, setOpenSize] = useState(null);
    const [error, setError] = useState(null);

    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
  
    //HANDLERS
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCloseSize = () => {
        setOpenSize(false);
    };

    const handleOpenSize = () => {
        setOpenSize(true);
    };

    const handleCloseBrand = () => {
        setOpenBrand(false);
    };

    const handleOpenBrand = () => {
        setOpenSize(true);
    };

    const productNameHandler = (e) => {
        setProductName(e.target.value);
    };

    const priceHandler = (e) => {
        setPrice(e.target.value);
    }

    const sizeHandler = (e) => {
        setSize(e.target.value);
    };

    const quantityHandler = (e) => {
        setQuantity(e.target.value);
    }

    const brandHandler = (e) => {
        setBrand(e.target.value);
    };

    const categoryHandler = (e) => {
        setCategory(e.target.value);
    };

    const descriptionHandler = (e) => {
        setDescription(e.target.value);
    };

    const fileHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const saveHandler = async (e) => {
        try {
            const data = new FormData();
            data.append('name', productName);
            data.append('price', price);
            data.append('size', size);
            data.append('quantityInStock', quantity);
            data.append('brand', brand);
            data.append('category', category);
            data.append('description', description);
            data.append('artist', jwt(userInfo.token).userId);
            data.append('productImage', file);

            // const config = {
            //     headers: {
            //         'Content-type': 'multipart/form-data'
            //     }
            // }

            await productServices.createCustom(data);
            setCustomDetails([]);
            setOpenForm(false);
        } catch (error){
            setError(
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
            );
            console.log(error)
        }
    };
    
    const menuItems = [];
    for (let i=2; i<14; i+=0.5){
        menuItems.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    
    return (
        <form enctype="multipart/form-data">
        <Container maxWidth="sm">
        <Grid container className={classes.container}>
            {error && <Message status="error" text={error} />}
            <Grid item xs={6}>
            <TextField 
                variant="standard"
                margin="normal"
                autoComplete="true"
                id="productName"
                label="Product Name"
                onChange={productNameHandler}
                name="productName"
                required
            />
            </Grid>
            <Grid item xs={6}>
            <TextField 
                variant="standard"
                margin="normal"
                autoComplete="true"
                id="price"
                label="Proposed Price (£)"
                onChange={priceHandler}
                name="price"
                required
            />
            </Grid>
            <Grid item xs={6}>
            <FormControl className={classes.sizeFormControl}>
                <InputLabel id="demo-controlled-open-select-label" required>Size</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="select-size"
                    open={openSize}
                    onClose={handleCloseSize}
                    onOpen={handleOpenSize}
                    onChange={sizeHandler}
                >
                {menuItems}
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    variant="standard"
                    margin="normal"
                    autoComplete="true"
                    id="quantity"
                    label="Quantity In Stock"
                    onChange={quantityHandler}
                    name="quantity"
                    required
                />
            </Grid>
            <Grid item xs={6}>
                <FormControl className={classes.brandFormControl} margin="normal">
                    <InputLabel id="demo-controlled-open-select-label" required>Brand</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="select-brand"
                        open={openBrand}
                        onClose={handleCloseBrand}
                        onOpen={handleOpenBrand}
                        value={brand}
                        onChange={brandHandler}
                    >
                    <MenuItem value="Adidas">Adidas</MenuItem>
                    <MenuItem value="Nike">Nike</MenuItem>
                    <MenuItem value="Vans">Vans</MenuItem>
                    <MenuItem value="Timberlands">Timberlands</MenuItem>
                    <MenuItem value="Gucci">Gucci</MenuItem>
                    <MenuItem value="Other">Air Force</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl className={classes.categoryFormControl} margin="normal">
                    <InputLabel id="demo-controlled-open-select-label required">Category</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={category}
                        onChange={categoryHandler}
                    >
                    <MenuItem value="Trainers">Trainers</MenuItem>
                    <MenuItem value="Socks">Socks</MenuItem>
                    <MenuItem value="Slippers">Slippers</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    variant="outlined"
                    margin="normal"
                    id="description"
                    label="Description"
                    fullWidth
                    multiline
                    required
                    rows={4}
                    onChange={descriptionHandler}
                    name="description"
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="default"
                    fullWidth
                    required
                    className={classes.button}
                    component="label"
                    startIcon={<CloudUploadIcon />}
                >
                    Upload
                    <input 
                        type="file"
                        id="file"
                        onChange={fileHandler}
                        hidden
                    />
                </Button>
            </Grid>
            <Grid item xs={12}>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={saveHandler}
                className={classes.button2}
                startIcon={<SaveIcon />}
            >
                Save
            </Button>
            </Grid>
        </Grid>
        </Container>
        </form>
    );
};

export default CustomCreateForm;