import React, { useEffect } from 'react';
import { Container, Fade, IconButton, Tooltip, Typography } from '@material-ui/core';
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
import LoopIcon from '@material-ui/icons/Loop';

// CSS to style UI component
const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        margin: '2rem'
    },
    table: {
        minWidth: 700
    },
    accept: {
      "&:hover": {
        backgroundColor: theme.palette.success.main,
        color: 'white'
      },
        color: theme.palette.success.dark,
        backgroundColor: '#deffe8',
        marginLeft: '0.25rem',
        marginRight: '1rem'
    },
    reject: {
      "&:hover": {
        backgroundColor: theme.palette.error.main,
        color: 'white'
      },
        color: theme.palette.error.main,
        backgroundColor: '#ffdede'
    },
    editBtn: {
      backgroundColor: '#ededed',
      marginRight: '1rem'
    },
    pendingBtn: {
      backgroundColor: '#d9e8ff',
      color: '#1b2082',
    }
}));

// function reused from https://material-ui.com/components/tables/
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#d9e8ff',
      color: '#1b2082',
      fontWeight: 700
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  // function reused from https://material-ui.com/components/tables/
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        // backgroundColor: '#d9e8ff',
      }
    },
  }))(TableRow);

const CustomListScreen = () => {
    const classes = useStyles();

    // States
    const [customsList, setCustomsList] = useState('');
    const [error, setError] = useState('');

    // variable to store jwt token and info about logged in user
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // React hook to fetch custom list from server when component mounted
    useEffect(() => {
        const fetchCustomsList = async () => {
            try{
                if (!customsList){
                    const token = {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`
                        }
                    }
                    const response = await productServices.fetchCustomsList(token);
                    setCustomsList(response.data.customs)
                }
            } catch (error){
                setError(error.response && error.response.data.message);
            }
        }

        fetchCustomsList();
    }, [customsList, userInfo.token]);

    // event handler for when "Accept" button is clicked
    const acceptHandler = async (customId) => {
      const token = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
            }
        }
        await productServices.updateCustomStatus(customId, { status: 'Accepted' }, token);
        setCustomsList('');
    };

    // event handler for when "Reject" button is clicked
    const rejectHandler = async (customId) => {
      const token = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
            }
        }
        await productServices.updateCustomStatus(customId, { status: 'Rejected' }, token);
        setCustomsList('');
    };

    // event handler for when "Pending" button is clicked
    const pendingHandler = async (customId) => {
      const token = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
      }
      await productServices.updateCustomStatus(customId, { status: 'Pending' }, token);
      setCustomsList([]);
    }

    return (
        <Container>
            <Typography variant="h3" component="h1" className={classes.title}>Manage Pending Customs</Typography>
            {error && <Message status="error" text={error} />}
            <TableContainer component={Paper}>
                  <Table // Table component adapted from https://material-ui.com/components/tables/
                    className={classes.table} 
                    aria-label="customs table"
                  >
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
                      {customsList && customsList.map(custom => (
                        <StyledTableRow key={custom._id}>
                          <StyledTableCell component="th" scope="row">{custom._id}</StyledTableCell>
                          <StyledTableCell>{custom.name}</StyledTableCell>
                          <StyledTableCell>£{custom.price}</StyledTableCell>
                          <StyledTableCell>{custom.category}</StyledTableCell>
                          <StyledTableCell>{custom.brand}</StyledTableCell>
                          <StyledTableCell>
                            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Edit">
                              <IconButton edge="start" component={Link} className={classes.editBtn} to={`/customs/${custom._id}`}>
                                  <EditIcon />
                              </IconButton>
                            </Tooltip> 
                            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Pending">
                              <IconButton edge="start" className={classes.pendingBtn} onClick={() => pendingHandler(custom._id)}>
                                  <LoopIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Accept">
                              <IconButton edge="start"  className={classes.accept} onClick={() => acceptHandler(custom._id)}>
                                  <CheckIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Reject">
                              <IconButton edge="start" className={classes.reject} onClick={() => rejectHandler(custom._id)}>
                                  <CloseIcon />
                              </IconButton>
                            </Tooltip>
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