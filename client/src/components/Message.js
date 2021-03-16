import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const Message = ({ status, text }) => {
    const classes = useStyles();

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