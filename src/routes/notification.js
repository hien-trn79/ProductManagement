import NotificationController from "../app/controllers/NotificationController.js";
import express from 'express';

const router = express.Router();

router.get('/', NotificationController.index);

export default router;