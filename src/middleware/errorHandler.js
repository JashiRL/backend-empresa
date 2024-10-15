const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: 'Ocurrio un Error en el Servidor',
    error: err.stack
  })
}

export default errorHandler
