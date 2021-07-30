import Pagination from '@material-ui/lab/Pagination'

const Paginate = ({ pages, page, handlePage}) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
            <Pagination  color="primary" count={Math.ceil(pages)} defaultPage={1} page={page} onChange={handlePage} />
        </div>
    );
};

export default Paginate;