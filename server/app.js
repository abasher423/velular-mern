import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import productRoutes from './routes/products.js';

// server
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); // "true" allows parsing extended bodies with rich data
app.use(bodyParser.json());

// setting Headers to prevent CORS errors
app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
});

// routes middleware
app.use('/products', productRoutes);

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message // Not Found
        }
    });
});

app.listen(PORT, () => console.log('Server running on port 3000...'));

export default app;
//4.42 