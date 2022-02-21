import express from 'express'
// import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

import {
  // checkout,
  getMyAdoptions,
  getAllAdoptions
} from '../controllers/adoptions.js'

const router = express.Router()

// router.post('/', auth, content('application/json'), checkout)
router.get('/me', auth, getMyAdoptions)
router.get('/all', auth, admin, getAllAdoptions)

export default router
