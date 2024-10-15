import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { getEmpleadobyUsername } from './empleadoController.js'

export const login = async (req, res) => {
  const { usuario, password } = req.body

  try {
    const user = await getEmpleadoUsername(usuario)

    if (!user) {
      res.status(401).json({
        error: true,
        message: 'Usuario no Existe'
      })
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      res.status(401).json({
        error: true,
        message: 'La Contraseña es incorrecta'
      })
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.rol,
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: '2h' 
      }
    )
    return res.json({ token })
  } catch (error) {
    res.status(401).json({
      error: true,
      message: 'Error: ' + error.message
    })
  }
}

export const logout = (req, res) => {
  res.json({
    error: false,
    message: 'Sesion Cerrada con Exito!, Now get outta here, Ya bother me'
  })
}
