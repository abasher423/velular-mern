import express from 'express';
import multer from 'multer';
import checkAuth from '../auth/check-auth.js';
import ProductsController from '../controllers/products.js';

const router = express.Router();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        // accept a file
        cb(null, true);
    } else {
        // reject a file
        cb(new Error('Incorrect file'), false);
    }
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // max 5mb for image size
    },
    fileFilter: fileFilter
});

router.get('/', ProductsController.products_get_all);

router.get('/:productId', ProductsController.products_get_product);

router.post('/', checkAuth('admin'), upload.single('productImage'), ProductsController.products_create_product);

router.patch('/:productId', checkAuth('admin'), ProductsController.products_update_product);

router.delete('/:productId', checkAuth('admin'), ProductsController.products_delete_product);

export default router;