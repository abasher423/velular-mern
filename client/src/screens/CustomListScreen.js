import React, { useEffect } from 'react';
import { Container, IconButton, Typography } from '@material-ui/core';
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
import productServices from '../services/productServices';

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        margin: '2rem'
    },
    table: {
        minWidth: 700
    },
    accept: {
        color: theme.palette.success.main
    },
    reject: {
        color: theme.palette.error.main
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

const CustomListScreen = () => {
    const classes = useStyles();
    const [customsList, setCustomsList] = useState([]);
    const [error, setError] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo } = userLogin;

    const token = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    useEffect(() => {
        const fetchCustomsList = async () => {
            try{
                if (customsList.length < 1){
                    const token = {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`
                        }
                    }
    
                    const response = await productServices.fetchCustomsList(token);
                    setCustomsList(response.data.customs)
                }
            } catch (error){
                setError(
                    error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
                );
            }
        }

        fetchCustomsList();
    }, [customsList, userInfo.token]);

    const acceptHandler = async (customId) => {
        await productServices.acceptCustom(customId, token);
        const response = await productServices.fetchCustomsList(token);
        setCustomsList(response.data.customs);
    };

    const rejectHandler = async (customId) => {
        await productServices.rejectCustom(customId, token);
        const response = await productServices.fetchCustomsList(token);
        setCustomsList(response.data.customs);
    };

    return (
        <Container>
            <Typography variant="h3" component="h1" className={classes.title}>Manage Pending Customs</Typography>
            {error && <Message status="error" text={error} />}
            <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customs table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Custom ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Price</StyledTableCell>
                        <StyledTableCell>Category</StyledTableCell>
                        <StyledTableCell>Brand</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customsList.map(custom => (
                        <StyledTableRow key={custom._id}>
                          <StyledTableCell component="th" scope="row">{custom._id}</StyledTableCell>
                          <StyledTableCell>{custom.name}</StyledTableCell>
                          <StyledTableCell>£{custom.price}</StyledTableCell>
                          <StyledTableCell>{custom.category}</StyledTableCell>
                          <StyledTableCell>{custom.brand}</StyledTableCell>
                          <StyledTableCell>
                            <IconButton edge="start" component={Link} to={`/customs/${custom._id}`}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="start"  className={classes.accept} onClick={() => acceptHandler(custom._id)}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton edge="start" className={classes.reject} onClick={() => rejectHandler(custom._id)}>
                                <CloseIcon />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
        </Container>
    )
}

export default CustomListScreen;