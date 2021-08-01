 // https://stackoverflow.com/questions/65214950/how-to-disappear-alert-after-5-seconds-in-react-js
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

// css to style UI component
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

// code adapted from example https://stackoverflow.com/questions/62286242/react-material-ui-delayed-permission-dialog
// to display message for only 5seconds
const Message = ({ status, text }) => {
    const classes = useStyles();
    const [show, setShow] = useState(true);

    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     // after 3 seconds set show to false
    //     setShow(false);
    //   }, 5000)

    //   return () => {
    //     clearTimeout(timer);
    //   }
    // }, []);

    //  // If show is false the component will return null and stop here
    // if (!show) return null

      // If show is true this will be returned
    return (
        <div className={classes.root}>
          {/* error, warning, info or success */}
          <Alert severity={status}>{text}</Alert>
        </div>
    );
};

Message.defaultProps = {
    status: 'success',
    text: 'Success'
}

export default Message;