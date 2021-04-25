import React, { useEffect, useState } from 'react';
import { Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Button, Checkbox, FormControlLabel, IconButton, TextField, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import productServices from '../services/productServices';

const useStyles = makeStyles(theme => ({
    backIcon: {
        margin: theme.spacing(1),
        backgroundColor: 'grey',
        color: 'white',
        "&:hover": {
            backgroundColor: 'black',
        }
    },
    title: {
        textAlign: 'center'
    },
    image: {
        width: '500px',
        height: 'auto'
    },
    form: {
        width: '100%'
    },
    divider: {
        marginLeft: '400px',
        width: '400px',
        marginBottom: '2rem'
    },
    sizeFormControl: {
        marginTop: '17px',
        minWidth: 185,
    },
    categoryFormControl: {
        // marginBottom: '2rem',
        minWidth: 400
    },
    brandFormControl: {
        minWidth: 400
    },
    btn: {
        "&:hover": {
            backgroundColor: theme.palette.success.main
        },
        marginBottom: "0.5rem",
        backgroundColor: theme.palette.info.dark
    }
}));

const CustomUpdateScreen = ({ match, history }) => {
    const classes = useStyles();
    const customId = match.params.customId;
    const [open, setOpen] = useState(null);
    const [openBrand, setOpenBrand] = useState(null);
    const [openSize, setOpenSize] = useState(null);
    const [customDetails, setCustomDetails] = useState('');
    const [productName, setProductName] = useState(customDetails.name || '');
    const [price, setPrice] = useState(customDetails.price || '');
    const [size, setSize] = useState(customDetails.size || 0);
    const [quantity, setQuantity] = useState(customDetails.quantityInStock || 0);
    const [brand, setBrand] = useState(customDetails.brand || '');
    const [category, setCategory] = useState(customDetails.category || '');
    const [description, setDescription] = useState(customDetails.description || '');
    const [reason, setReason] = useState(customDetails.reason || '');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        const fetchCustomDetails = async () => {
            if (!customDetails){
                const token = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                const response = await productServices.indexOne(customId, token);
                setCustomDetails(response.data);
            } else {
                setProductName(customDetails.name);
                setPrice(customDetails.price);
                setSize(customDetails.size);
                setQuantity(customDetails.quantityInStock);
                setBrand(customDetails.brand);
                setCategory(customDetails.category);
                setDescription(customDetails.description);
                setReason(customDetails.reason);
            }
        }

        fetchCustomDetails();
    }, [customDetails, userInfo.token, customId])

    const customData = [
        {propName: "name", value: null},
        {propName: "price", value: null},
        {propName: "size", value: null},
        {propName: "quantityInStock", value: null},
        {propName: "brand", value: null},
        {propName: "description", value: null},
        {propName: "category", value: null},
        {propName: "reason", value: null}
    ]
    customData[0].value = productName;
    customData[1].value = price;
    customData[2].value = size;
    customData[3].value = quantity;
    customData[4].value = brand;
    customData[5].value = description;
    customData[6].value = category;
    customData[7].value = reason;
    
    // HANDLERS
    const updateHandler = async () => {
        const token = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await productServices.updateCustom(customData, customId, token);
        history.push('/admin/customs-list');
    };

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
    };

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

    const reasonHandler = (e) => {
        setReason(e.target.value);
    };

    const menuItems = [];
    for (let i=2; i<14; i+=0.5){
        menuItems.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    
    return (
        <>
            <IconButton edge="start" className={classes.backIcon} color="inherit" component={Link} to={'/admin/customs-list'} aria-label="back">
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1" className={classes.title}>Edit Custom</Typography>
            <Divider className={classes.divider}/>
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <img className={classes.image} src={customDetails.productImage} alt="custom" />
                    </Grid>
                    <Grid item xs={8}>
                        <form className={classes.form}>
                            <Container maxWidth="xs">
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <TextField 
                                            variant="standard"
                                            margin="normal"
                                            autoComplete="true"
                                            id="productName"
                                            label="Product Name"
                                            value={productName}
                                            onChange={productNameHandler}
                                            name="productName"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                            variant="standard"
                                            margin="normal"
                                            autoComplete="true"
                                            id="price"
                                            label="Price"
                                            value={price}
                                            onChange={priceHandler}
                                            name="price"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                    <FormControl className={classes.sizeFormControl}>
                                        <InputLabel id="demo-controlled-open-select-label">Size</InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="select-size"
                                            open={openSize}
                                            onClose={handleCloseSize}
                                            onOpen={handleOpenSize}
                                            value={size}
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
                                            value={quantity}
                                            onChange={quantityHandler}
                                            name="quantity"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl className={classes.brandFormControl} margin="normal">
                                            <InputLabel id="demo-controlled-open-select-label">Brand</InputLabel>
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
                                    <Grid item xs={12}>
                                        <TextField 
                                            variant="standard"
                                            margin="normal"
                                            autoComplete="true"
                                            id="description"
                                            label="Description"
                                            fullWidth
                                            value={description}
                                            onChange={descriptionHandler}
                                            name="description"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl className={classes.categoryFormControl} margin="normal">
                                            <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
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
                                        id="outlined-multiline-static"
                                        label="Note"
                                        margin="normal"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        variant="outlined"
                                        value={reason}
                                        onChange={reasonHandler}
                                    />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.btn}
                                            onClick={updateHandler}
                                            fullWidth
                                        >
                                            Update
                                        </Button>
                                    </Grid>
                            </Grid>
                            </Container>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default CustomUpdateScreen;