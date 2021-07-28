import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Product';
import Grid from '@material-ui/core/Grid'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Typography } from '@material-ui/core';
import productServices from '../services/productServices';
import { useState } from 'react';
import Paginate from '../components/Paginate';

const ListedProducts = ({ match, history }) => {
    //search keyword
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    // states
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState({});
    const [pages, setPages] = useState({});
    const [error, setError] = useState('');
    
    // React hook to fetch product list when component mounts
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                // sends GET request to server and filters out 'Accepted' customs
                const response = await productServices.index(keyword, pageNumber);
                const acceptedCustoms = response.data.products.filter(product => {
                    return product.status === 'Accepted'
                })
                // setProducts(acceptedCustoms);
                setProducts(response.data.products); //TEST
                setPage(response.data.page);
                setPages(response.data.pages);
            } catch(error){
                setError(error.response && error.response.data.message);
            }
        }
        fetchProductList()
    }, [keyword, pageNumber]);
   
    const handlePage = (e, value) => {
        history.push(`/page/${value}`)
        setPage(value);
    }
    return (
        <>
        <Typography variant="h2" style={{ marginBottom: "3rem", textAlign: "left" }}>Latest Products</Typography>
        { error ? <Message status="error" text={error} />
            : <> <Grid container spacing={2} alignItems="stretch" style={{flexGrow: 1}}>
            {products.map(product => (
                 <Grid item  xs={12} sm={6} md={3} key={product._id} style={{ flexGrow: 1 }}>
                    <Card 
                        product={product}
                    />
                </Grid>
            ))}
        </Grid> 
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} handlePage={handlePage} />
        </>}
        
        </>
    );
}

export default ListedProducts;