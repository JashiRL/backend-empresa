import EmpleadoService from '../services/empleadoService.js'
import { validationResult } from 'express-validator'

const empleadoService = new EmpleadoService()

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  next()
}

const createEmpleado = async (req, res) => {
  handleValidationErrors(req)
  try {
    const empleadoId = await empleadoService.createEmpleado(req.body, req.file)
    res.status(201).json({
      success: true,
      empleadoId
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const updateEmpleado = async (req, res) => {
  // handleValidationErrors(req)
  try {
    const id = req.params.id
    await empleadoService.updateEmpleado(id, req.body, req.file)
    res.status(201).json({
      success: true
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const deleteEmpleado = async (req, res) => {
  // handleValidationErrors(req)
  try {
    const id = req.params.id
    await empleadoService.deleteEmpleadoes(id)
    res.status(201).json({
      success: true
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const getAllEmpleados = async (req, res) => {
  try {
    const empleados = await empleadoService.getAllEmpleados()
    res.status(201).json({
      success: true,
      empleados
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const getEmpleadobyId = async (req, res) => {
  // handleValidationErrors(req)
  try {
    const id = req.params.id
    const empleado = empleadoService.getEmpleadoById(id)
    if (!empleado) {
      res.status(404).json({
        success: false,
        error: 'Empleado Not Fpund!'
      })
    }
    res.status(201).json({
      success: true,
      empleados
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const getEmpleadobyUsername = async (req, res) => {
  // handleValidationErrors(req)
  try {
    const username = req.params.username
    const empleado = empleadoService.getEmpleadobyUsername(username)
    if (!empleado) {
      res.status(404).json({
        success: false,
        error: 'Empleado Not Fpund!'
      })
    }
    res.status(201).json({
      success: true,
      empleados
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const getEmpleadobyRol = async (req, res) => {
  // handleValidationErrors(req)
  try {
    const rol = req.params.rol
    const empleado = empleadoService.getEmpleadobyRol(rol)
    if (!empleado) {
      res.status(404).json({
        success: false,
        error: 'Empleado Not Fpund!'
      })
    }
    res.status(201).json({
      success: true,
      empleados
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

export {
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  getAllEmpleados,
  getEmpleadobyId,
  getEmpleadobyRol,
  getEmpleadobyUsername
}