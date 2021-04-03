import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2)
        },
    },
}));

const Loader = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CircularProgress color="secondary" />
       </div>
    )
};

export default Loader;