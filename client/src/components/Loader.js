import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

// css to style UI component
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
    // Code adapted from https://material-ui.com/components/progress/
    return (
        <div className={classes.root}>
          <LinearProgress color="secondary" />
       </div>
    )
};

export default Loader;