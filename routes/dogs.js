import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import {
  create,
  getDogs,
  getAllDogs,
  getDogById,
  updateDogById
} from '../controllers/dogs.js'

const router = express.Router()

router.post('/', auth, admin, content('multipart/form-data'), upload, create)
router.get('/', getDogs)
router.get('/all', auth, admin, getAllDogs)
router.get('/:id', getDogById)
router.patch('/:id', auth, admin, content('multipart/form-data'), upload, updateDogById)

export default router
