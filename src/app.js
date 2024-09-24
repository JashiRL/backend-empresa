import express from 'express'
import dotenv from 'dotenv'
import empleadoRoutes from './routes/empleadoRoutes.js'
import authMiddleware from './middlewares/authMiddleware.js'
import errorHanddler from './middlewares/errorHanddler.js'
import rateLimitMiddleware from './middlewares/rateLimit.js'

dotenv.config ()

const app = express ()
app.use(express.json())
app.use(rateLimitMiddleware)
app.use('./api/empleados', empleadoRoutes)
app.use(errorHanddler)

const PORT = process.env.PORT || 3020
app.listen(PORT, () => {
    console.log(`Servidor traajando :${PORT}`)
})