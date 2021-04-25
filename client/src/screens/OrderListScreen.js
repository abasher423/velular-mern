import React, { useEffect } from 'react';
import { Button, Container, IconButton, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import orderServices from '../services/orderServices';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center'
    },
    close: {
        color: theme.palette.error.main
    },
    paid: {
        color: theme.palette.success.main,
        paddingLeft: '5px'
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const OrderListScreen = () => {
    const classes = useStyles();
    const [ordersList, setOrdersList] = useState([]);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        const fetchOrdersList = async () => {
            const token = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const response = await orderServices.index(token);
            const paidOrders = response.data.orders.filter(order => {
                return order.order.isPaid === true;
            })
            setOrdersList(paidOrders);
        }
        fetchOrdersList();
    }, [userInfo.token])

    return (
        <>
        <Typography variant="h3" component="h1" className={classes.title}>Manage Orders ({ordersList ? ordersList.length : '0'})</Typography>
        <Container>
            <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customs table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Order ID</StyledTableCell>
                        <StyledTableCell>User</StyledTableCell>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Total</StyledTableCell>
                        <StyledTableCell>Paid</StyledTableCell>
                        <StyledTableCell>Delivered</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ordersList.map(order => (
                        <StyledTableRow key={order.order._id}>
                          <StyledTableCell component="th" scope="row">{order.order._id}</StyledTableCell>
                          <StyledTableCell>{order.order.user.firstName} {order.order.user.lastName}</StyledTableCell>
                          <StyledTableCell>{order.order.date.substring(0,16)}</StyledTableCell>
                          <StyledTableCell>£{order.order.totalPrice}</StyledTableCell>
                          <StyledTableCell>
                              {order.order.paidAt.substring(0, 25)} 
                              <CheckCircleOutlineIcon className={classes.paid}/>
                          </StyledTableCell>
                          <StyledTableCell>
                              {order.order.isDelivered ? order.order.deliveredAt.substring(0, 25) : 
                                <CloseIcon className={classes.close} />          
                              }
                            </StyledTableCell>
                          <StyledTableCell>
                            <Button
                                variant="contained"
                                component={Link}
                                to={`/orders/${order.order._id}`}
                            >
                                Details
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
        </Container>
        </>
    );
};

export default OrderListScreen;