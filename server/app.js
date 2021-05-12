import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import productRoutes from './api/routes/products.js';
import orderRoutes from './api/routes/orders.js';
import userRoutes from './api/routes/users.js';
import cors from 'cors';
import path from 'path';

const app = express();

// mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); // makes uploads folder publicly accessable
app.use(express.urlencoded({extended: false})); // "true" allows parsing extended bodies with rich data
app.use(express.json());
app.use(cors());

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

mongoose
  .connect(process.env.MONGO_ATLAS_PW, dbOptions)
  .then(() => {
      console.log('Database is now connected...');

      const PORT = process.env.PORT || 8080;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
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
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// paypal route to fetch client ID
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

// Heroku Deployment
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    })
}

app.use((req,res,next) => {
    const error = new Error('Incorrect URL Page Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 404).json({
        error: {
            message: error.message // Not Found
        }
    });
});



export default app;
//4.42 