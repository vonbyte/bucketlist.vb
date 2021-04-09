const fastify = require('fastify')
const boom = require('boom')
const PORT = process.env.PORT || 3000
const db = require('./config/db')
const verifyToken = require('./plugins/verifyToken')
const routes = require('./routes')

const app = fastify({
  logger: true
})

app.register(db)
app.register(require("fastify-jwt"), {
  secret: "shhhhh"
})
app.register(require('fastify-nuxtjs')).after(() => {
  app.nuxt('*');
});


app.decorate("authenticate", async function(request, reply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})



// Routes

app.post('/api/login', (req, reply) => {
  const user = req.body.username
  const pwd = req.body.password

  let authenticated = user === process.env.APP_USER && pwd === process.env.APP_PW
  if (!authenticated) {
    reply.code(422)
    return boom.expectationFailed('Credentials invalid.')
  } else {
    const token = app.jwt.sign({ user, pwd },{ expiresIn: "4h"})
    reply.send({ token })
  }
})

routes.forEach((route,index) => {
  route.preValidation = [app.authenticate]
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
