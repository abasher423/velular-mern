import React, { useEffect, useState } from 'react';
import { Container, Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { Button,IconButton, TextField, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import productServices from '../services/productServices';
import { useSelector } from 'react-redux';
import jwt from 'jwt-decode';
import Message from './Message';

// css styles for the UI component
const useStyles = makeStyles(theme => ({
    sizeFormControl: {
        marginTop: 17,
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

// form to create a custom which is rendered in parent component ""
const CustomCreateForm = ({ setOpenForm, setCustomDetails }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(null);
    const [openBrand, setOpenBrand] = useState(null);
    const [openSize, setOpenSize] = useState(null);
    const [error, setError] = useState(null);

    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState(3);
    const [quantity, setQuantity] = useState(0);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
  
    // HANDLERS
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

            await productServices.createCustom(data);
            setCustomDetails([]);
            setOpenForm(false);
        } catch (error){
            setError(error.response && error.response.data.message);
            console.log(error);
        }
    };
    
    // populates size dropdown input from sizes 3 - 14.5 (incrementing by 0.5)
    const menuItems = [];
    for (let i=3; i<15; i+=0.5){
        menuItems.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    
    return (
        <form>
            <Container maxWidth="sm">
                <Grid container className={classes.container}>
                    {error && <Message status="error" text={error} />}
                    <Grid item xs={6}>
                    <TextField // Code adapted from examples in https://material-ui.com/components/text-fields/ 
                        variant="standard"
                        margin="normal"
                        autoComplete="true"
                        id="productName"
                        label="Product Name"
                        name="productName"
                        required
                        onChange={productNameHandler}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField // Code adapted from examples in https://material-ui.com/components/text-fields/ 
                        variant="standard"
                        margin="normal"
                        autoComplete="true"
                        id="price"
                        label="Proposed Price (£)"
                        name="price"
                        type="number"
                        required
                        onChange={priceHandler}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl className={classes.sizeFormControl}>
                        <InputLabel id="controlled-size-select-label" required>Size</InputLabel>
                        <Select // Code adapted from examples in https://material-ui.com/components/selects/
                            labelId="controlled-size-select-label"
                            id="select-size"
                            open={openSize}
                            value={size}
                            onClose={handleCloseSize}
                            onOpen={handleOpenSize}
                            onChange={sizeHandler}
                        >
                        {menuItems}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField // Code adapted from examples in https://material-ui.com/components/text-fields/ 
                            variant="standard"
                            margin="normal"
                            autoComplete="true"
                            id="quantity"
                            label="Quantity In Stock"
                            type="number"
                            onChange={quantityHandler}
                            name="quantity"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.brandFormControl} margin="normal">
                            <InputLabel id="controlled-brand-select-label" required>Brand</InputLabel>
                            <Select // Code adapted from examples in https://material-ui.com/components/selects/
                                labelId="controlled-brand-select-label"
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
                            <InputLabel id="open-select-label required">Category</InputLabel>
                            <Select // Code adapted from examples in https://material-ui.com/components/selects/
                                labelId="open-select-label"
                                id="open-select"
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
                        <TextField // Code adapted from examples in https://material-ui.com/components/text-fields/ 
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
                        <Button // Code adapted from examples in https://material-ui.com/components/buttons/
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
                                accept="image/*"
                                onChange={fileHandler}
                                hidden
                            />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                    <Button // Code adapted from examples in https://material-ui.com/components/buttons/
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