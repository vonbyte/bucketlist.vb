const fastify = require('fastify')
const boom = require('boom')
const PORT = process.env.PORT || 3000
const db = require('./config/db')
const verifyToken = require('./plugins/verifyToken')
const routes = require('./routes')

const app = fastify({
  logger: true,
})

app.register(db)
app.register(require('fastify-jwt'), {
  secret: 'shhhhh',
})

app.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

// Routes
// Proxy nuxt routes
app.register(require('fastify-nuxtjs')).after(() => {
  app.nuxt('*')
})

// Auth routes
app.post('/api/login', (req, reply) => {
  const user = req.body.username
  const pwd = req.body.password

  // ToDo super hardcoded goes to database later
  let authenticated = user === process.env.APP_USER && pwd ===
    process.env.APP_PW

  if (!authenticated) {
    reply.code(422)
    return boom.expectationFailed('Credentials invalid.')
  }
  const token = app.jwt.sign({ user, pwd }, { expiresIn: '4h' })
  reply.send({ token })
})

// API Routes
routes.forEach((route, index) => {
  route.preHandler = [app.authenticate]
  app.route(route)
})

// Start Server
const start = async () => {
  try {
    await app.listen(PORT)
    app.log.info(`Server is listening on ${app.server.address().port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
