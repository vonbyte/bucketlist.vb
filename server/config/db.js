const fastifyPlugin = require('fastify-plugin')
const mongoose = require('mongoose')

// Connect to DB
async function dbConnector(fastify, options, next) {

  try {
    const url = process.env.DB_URL
    const db = await mongoose
      .connect(url, {
        useNewUrlParser: true,
      useUnifiedTopology: true
      })
    console.log("Database is connected")
    fastify.decorate('mongo', db)
    next()
  } catch (err) {
    console.log(err)
  }

}
module.exports = fastifyPlugin(dbConnector)
