import { IconButton, makeStyles, Fade, TextField, Tooltip } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { useState } from "react";

const useStyles = makeStyles(theme => ({
    icon: {
        margin: "5px 0"
    }
}));

const SearchBox = ({ history }) => {
    const classes = useStyles();

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
        <form onSubmit={submitHandler}>
            <TextField 
                size="small"
                margin="dense"
                variant="outlined"
                label="Search Products.."
                style={{ marginLeft: 5}}
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