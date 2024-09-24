import EmpleadoService from '../services/empleadoService.js'
import { validationResult } from 'express-validator'

const EmpleadoService = new EmpleadoService()

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next()
}

//ffuncion para crear un empleado
const createEmpleado = async (req, res) => {
    handleValidationErrors(req)
    try{
        const empleadoId = await EmpleadoService.createEmpleado(req.body, req.file)
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

//funcion para poder actualizr un empleado
const updateEmpleado = async (req, res) => {
    handleValidationErrors(req)
    try {
        const id = req.params.id
        await EmpleadoService.updateEmpleado(id, req.body, req.file)
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

//funcion para borrar un empleado
const deleteEmpleado = async(req, res) => {
    handleValidationErrors(req)
    try {
        const id = req.params.id
        await EmpleadoService.deleteEmpleado( id )
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

const getAllEmpleados = async (req, res)=> {
    try {
        const empleados = await EmpleadoService.getAllEmpleados()
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

const getEmpleadoById = async (req, res) => {
    handleValidationErrors(req)
    try {
        const id =  req.params.id
        const empleado = EmpleadoService.getEmpleadoById( id )
        if (!empleado) {
            res.status(404).json({
                success: false,
                message: 'Employee not found'
            })
        }
        res.status(201).json({
            success: true,
            empleado
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const getEmpleadoByUsername = async (req, res) => {
    handleValidationErrors(req)
    try {
        const username =  req.params.username
        const empleado = EmpleadoService.getEmpleadoByUsername( username )
        if (!empleado) {
            res.status(404).json({
                success: false,
                message: 'Employee not found'
            })
        }
        res.status(201).json({
            success: true,
            empleado
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const getEmpleadoByRol = async (req, res) => {
    handleValidationErrors(req)
    try {
        const rol =  req.params.rol
        const empleado = EmpleadoService.getEmpleadoByRol( rol )
        if (!empleado) {
            res.status(404).json({
                success: false,
                message: 'Employee not found'
            })
        }
        res.status(201).json({
            success: true,
            empleado
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
    getEmpleadoById,
    getEmpleadoByRol,
    getEmpleadoByUsername
}