import { Router } from 'express'
import { login, logout } from '../controllers/authController.js'
import { check } from 'express-validator'

const router = Router()

router.post(
  '/login',
  [
    check('usuario', 'El Usuario es Obligatorio').not().isEmpty(),
    check('password', 'El Password es Obligatorio').not().isEmpty()
  ],
  login
)

router.post('/logout', logout)

export default router
