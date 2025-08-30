import ContactController from "../app/controllers/ContactController.js";
import express from 'express'

const router = express.Router();

router.post('/createStaff/:slug', ContactController.save)
router.get('/createStaff', ContactController.createStaff);
router.get('/:slug', ContactController.detail)
router.get('/', ContactController.show);

export default router;