import siteController from '../app/controllers/SiteController.js'
import express from 'express'

const router = express.Router()

router.get('/message/:id', siteController.message)
router.get('/home', siteController.home)
router.get('/', siteController.index)

export default router;