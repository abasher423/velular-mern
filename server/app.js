import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRoutes from './api/routes/products.js';
import db from './api/config/keys.js'

const app = express();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); // "true" allows parsing extended bodies with rich data
app.use(bodyParser.json());

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(db.mongoURI, dbOptions)
  .then(() => {
      console.log('Database is now connected...');

      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => console.log('Server running on port 3000...'));
  })
  .catch (error => {
      console.log(error);
      throw error;
  });

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
    next();
});

// routes middleware
app.use('/api/products', productRoutes);

app.use((req,res,next) => {
    const error = new Error('Incorrect URL Page Not Found');
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



export default app;
//4.42 