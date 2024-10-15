import { RateLimiterMemory } from "rate-limiter-flexible"

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duracion: 1
})

const rateLimitMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
  .then(() => {
    next()
  })
  .catch(() => {
    res.status(429).json({
      message: 'Muchas Peticiones... Come on Bro Chill, Whats Wrong With You'
    })
  })
}

export default rateLimitMiddleware
