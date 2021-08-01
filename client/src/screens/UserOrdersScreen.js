import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useState } from 'react';
import OrderHistoryTab from '../components/OrderHistoryTab';
import OrderOpenTab from '../components/OrderOpenTab';
import OrderUnpaidTab from '../components/OrderUnpaidTab';
import { useEffect } from 'react';
import orderServices from '../services/orderServices';
import { token } from 'morgan';
import jwt from 'jwt-decode';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import Message from '../components/Message';

// CSS to style UI component
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    heading: {
        marginBottom: "1rem"
    }
}))

const UserOrdersScreen = () => {
    const classes = useStyles();

    // States
    const [selectedTab, setSelectedTab] = useState(0);
    const [pastOrders, setPastOrders] = useState('');
    const [openOrders, setOpenOrders] = useState('');
    const [unpaidOrders, setUnpaidOrders] = useState('');
    const [error, setError] = useState('');

    // stores jwt and info about logged in user
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // React hook to fetch orders from server when component mounts
    useEffect(() => {
        const fetchOrders = async () => {
            if (!pastOrders || !openOrders){
                try {
                    const token = {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`
                        }
                    };
                    // decoding jwt to retrieve plaintext version of the user Id
                    const userId = await jwt(userInfo.token).userId;
                    const response = await orderServices.listUserOrders(userId, token);

                    const pastOrders = response.data.orders.filter(order => {
                        return order.isDelivered === true && order.isPaid === true;
                    });
                    const openOrders = response.data.orders.filter(order => {
                        return order.isDelivered === false && order.isPaid === true;
                    });
                    const unpaidOrders = response.data.orders.filter(order => {
                        return order.isDelivered === false && order.isPaid === false;
                    });

                    setPastOrders(pastOrders);
                    setOpenOrders(openOrders);
                    setUnpaidOrders(unpaidOrders);
                  
                } catch (error){
                    console.log(error);
                    setError(error.response && error.response.data.message);
                }
            }
        }
        fetchOrders();
    }, [pastOrders, openOrders, userInfo.token]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h4" className={classes.heading}>Your Orders</Typography>
            </Grid>

            {error && (
                <Grid item xs={12}>
                    <Message status="danger" text={error} />
                </Grid>
            )}

            <Grid item xs={12}>
                <Paper className={classes.root}>
                    <Tabs
                        value={selectedTab}
                        variant="scrollable"
                        onChange={handleTabChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                    >
                        <Tab label="orders" />
                        <Tab label="Open Orders" />
                        <Tab label="Uncomplete Orders" />
                    </Tabs>
                    {selectedTab === 0 && <OrderHistoryTab orders={pastOrders} />}
                    {selectedTab === 1 && <OrderOpenTab orders={openOrders} />}
                    {selectedTab === 2 && <OrderUnpaidTab orders={unpaidOrders} />}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UserOrdersScreen;