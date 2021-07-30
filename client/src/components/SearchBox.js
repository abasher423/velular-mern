import { IconButton, makeStyles, Fade, TextField, Tooltip, useMediaQuery, useTheme } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { useState } from "react";

const useStyles = makeStyles(theme => ({
    icon: {
        margin: "5px 0"
    },
    form: {
        display: "flex",
        marginLeft: 5,
        marginTop: 7
    },
    input: {
        margin: "5px 0"
    }
}));

const SearchBox = ({ history }) => {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));

    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()){
            history.push(`/search/${keyword}`);
        } else {
            history.push('/products');
        }
    }

    return(
        <form onSubmit={submitHandler} className={classes.form}>
            <TextField 
                size="small"
                margin="dense"
                variant="outlined"
                label={ mobile ? "Search.." : "Search Products.."}
                className={classes.input}
                onChange={e => setKeyword(e.target.value)}
            />
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Search">
                <IconButton 
                    edge="start" 
                    className={classes.icon}
                    type="submit"
                    color="inherit" 
                    aria-label="login" 
                >
                    <SearchIcon />
                </IconButton>    
            </Tooltip>
            
        </form>
    );
};

export default SearchBox;