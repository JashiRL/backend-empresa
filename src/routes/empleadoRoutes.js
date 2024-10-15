import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { check } from 'express-validator'
import multer from 'multer'
import {
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  getAllEmpleados,
  getEmpleadobyId,
  getEmpleadobyUsername,
  getEmpleadobyRol
} from '../controllers/empleadoController.js'

const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router()

router.post(
  '/create',
  // aqui va el middleware
  upload.single('imagen'),
  [
    check('nombre').notEmpty().withMessage('El Nombre es Obligatorio'),
    check('usuario').notEmpty().withMessage('El Usuario es Obligatorio'),
    check('Password').notEmpty().withMessage('La contraseña debe tener minimo 6 caracteres')
  ],
  createEmpleado
)

router.put('/update/:id', authMiddleware, upload.single('imagen'), updateEmpleado)
router.delete('delete/:id', authMiddleware, deleteEmpleado)
router.get('/', authMiddleware, getAllEmpleados)
router.post('/empleado/:id', authMiddleware, getEmpleadobyId)
router.post('/rol/:rol', authMiddleware, getEmpleadobyRol)
router.post('/usuario/:usuario', authMiddleware, getEmpleadobyUsername)

export default router
