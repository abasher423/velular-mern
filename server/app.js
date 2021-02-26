import express from 'express';
import productRoutes from './routes/products.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/products', productRoutes);

app.listen(PORT, () => console.log('Server running on port 3000...'));

export default app;