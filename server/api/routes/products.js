import express from 'express';
import multer from 'multer';
import checkAuth from '../auth/check-auth.js';
import checkRole from '../auth/check-role.js';
import ProductsController from '../controllers/products.js';

const router = express.Router();
// file type constraints
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        // accept a file
        cb(null, true);
    } else {
        // reject a file
        cb(new Error('Incorrect file'), false);
    }
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => { //where to store file
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname); // file name
    }
});
// file size constraints
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // max 5mb for image size
    },
    fileFilter: fileFilter
});

router.get('/', ProductsController.products_get_all);

router.get('/customs', checkAuth(), checkRole('admin'), ProductsController.customs_get_all);

router.get('/customs/artist', checkAuth(), ProductsController.customs_get_all_artist);

router.get('/:productId', ProductsController.products_get_product);

router.put('/customs/:customId', checkAuth(), ProductsController.custom_update_status);

router.put('/customs/:customId/accept', ProductsController.custom_update_accept);

router.put('/customs/:customId/reject', ProductsController.custom_update_reject);

router.put('/customs/:customId/pending', ProductsController.custom_update_pending);

router.put('/customs/:customId/submitted', ProductsController.custom_update_submitted);

router.post('/', upload.single('productImage'), ProductsController.products_create_product);

router.post('/:productId/reviews', checkAuth(), ProductsController.products_create_review);

router.patch('/:productId', ProductsController.products_update_product);

router.delete('/:productId',  ProductsController.products_delete_product);

export default router;