import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container, Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import CustomCreateForm from './CustomCreateForm';

// css to style UI components
const useStyles = makeStyles(theme => ({
    div: {
        display: 'flex'
    },
    title: {
        flexGrow: 1
    },
    closeBtn:{
        "&:hover": {
            backgroundColor: theme.palette.error.main,
            color: 'white'
        },
        color: theme.palette.error.main,
    }
}));

// This component renders a popup window when the "Create Custom" button is clicked
const PopupDialog = ({ openForm, setOpenForm, setCustomDetails}) => {
    const classes = useStyles();

    return (
        <Container>
            <Dialog
                open={openForm}
                maxWidth="md"
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <div className={classes.div}>
                        <Typography variant="h5" component="div" className={classes.title}>Custom</Typography>
                        <IconButton
                            edge="start"
                            className={classes.closeBtn}
                            onClick={() => setOpenForm(false)}
                            size="small">
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <Divider />
                <DialogContent key={1}>
                <DialogContentText>
                    Please fill out all required fields
                </DialogContentText>
                <CustomCreateForm setOpenForm={setOpenForm} setCustomDetails={setCustomDetails}/>
                </DialogContent>
        </Dialog>
        </Container>
    );
};

export default PopupDialog;