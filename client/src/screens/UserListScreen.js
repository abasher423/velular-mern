import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';
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

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    margin: '2rem'
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

const UserListScreen = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const usersList = useSelector(state => state.usersList);
    const { loading, error, users } = usersList;

    const userDelete = useSelector(state => state.userDelete);
    const { successDelete } = userDelete;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.role === 'admin'){
          dispatch(listUsers());
        } else {
          history.push('/login');
        }
    }, [dispatch, history, userInfo, successDelete]);

    const deleteHandler = (userId) => {
      dispatch(deleteUser(userId));
    }

    return (
        <Container>
            <Typography variant="h3" component="h1" className={classes.title}>Manage Users</Typography>
            { loading ? <Loader /> : error ? <Message status="error" text={error} /> : (
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="users table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>User ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Admin</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map(user => (
                        <StyledTableRow key={user.userId}>
                          <StyledTableCell component="th" scope="row">{user.userId}</StyledTableCell>
                          <StyledTableCell>{user.firstName} {user.lastName}</StyledTableCell>
                          <StyledTableCell>
                            <Link href={`mailto:${user.email}`} style={{color: 'blueviolet'}}>{user.email}</Link>
                          </StyledTableCell>
                          <StyledTableCell>
                            {user.role === 'admin' ? (
                              <CheckIcon style={{ color: "green" }}/>) : (
                              <CloseIcon style={{ color: "red"}} />
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            <IconButton edge="start" component={Link} to={`/users/${user.userId}`}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="start" onClick={() => deleteHandler(user.userId)}>
                                <DeleteIcon />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default UserListScreen;
