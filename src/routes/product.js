import productController from '../app/controllers/ProductController.js';
import express from 'express'

const router = express.Router();

router.post('/create/:slug', productController.save);
router.get('/create', productController.create);
router.get('/:id/edit', productController.edit);
router.patch('/:id/restore', productController.restore);
router.delete('/:id/force', productController.forceDelete);
router.get('/:slug', productController.show);
router.put('/:id', productController.update)
router.delete('/:id', productController.delete);
router.post('/handleForm/:slug', productController.handleForm);
router.get('/', productController.index);

export default router;