import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'  //para detectar las ruta y nombre de archivo, es file system
import path from 'path'
import EmpleadoRepository from '../repositories/empleadoRepository.js'
import EmpleadoModel from '../models/empleadoModel.js'
import { sendPasswaordRResetEmail } from '../utils/emailService.js'

const empleadoRepository = new EmpleadoRepository()
const secret = process.env.JWT_SECRET
const saltRound = 10 

class EmpleadoService{
    async createEmpleado (data, file) {  //es un metodo por eso no lleva funcion flecha
        const existEmpleado = await empleadoRepository.getEmpleadoByUsername(data.username)
        if (existEmpleado) {
            throw new Error('El usuername ya existe')
        }
        const hashedPass = await bcrypt.hash(data.password.saltRound)

        const newEmpleado = new EmpleadoModel(
            null,
            data.nombre,
            data.apaterno,
            data.amaterno,
            data.direccion,
            data.telefono,
            data.ciudad,
            data.estado,
            data.username,
            hashedPass,
            data.rol,
            null
        )

        const empleadoId = await empleadoRepository.createEmpleado(newEmpleado)

        if (file) {
            const image = `${empleadoId}_image.png`
            const imagePath = path.join('src', 'userImages', image)
            fs.writeFileSync(imagePath, file.buffer)
            await empleadoRepository.updateEmpleado(empleadoId, {imagen: image})
        }
    }
}