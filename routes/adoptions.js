import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

import {
  submitApply,
  getMyAdoptions,
  getAllAdoptions,
  deleteAdoptionById,
  editAdoptionById
} from '../controllers/adoptions.js'

const router = express.Router()

router.post('/', auth, content('application/json'), submitApply)
router.get('/me', auth, getMyAdoptions)
router.get('/all', auth, admin, getAllAdoptions)
router.delete('/:id', auth, admin, deleteAdoptionById)
router.patch('/:id', auth, admin, editAdoptionById)

export default router
