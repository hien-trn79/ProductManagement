import express from 'express'
import MeController from '../app/controllers/MeController.js'

const router = express.Router();

router.get('/restore', MeController.index);

export default router;