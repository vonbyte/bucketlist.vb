const boom = require('boom')
const Mongoose = require('mongoose')
const Todo = require('../models/Todo')

exports.list = async (req, reply) => {
  try {
    return await Todo.find()
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.detail = async (req, reply) => {
  try {
    const id = req.params.id
    checkParam(id)
    return await Todo.findById(id)
  } catch (err) {

    throw boom.boomify(err)
  }
}

exports.add = async (req, reply) => {
  try {
    let todo = new Todo(req.body)
    reply.code(201)
    return await todo.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.update = async (req, reply) => {
  try {
    const id = req.params.id
    checkParam(id)
    return await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    })
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.destroy = async (req, reply) => {
  try {
    const id = req.params.id
    checkParam(id)
    await Todo.findByIdAndDelete(id)
    reply.code(204)
    return { Message: 'Todo Deleted' }
  } catch (err) {
    throw boom.boomify(err)
  }
}

function checkParam (id) {
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    reply.code(404)
    return boom.notFound('Todo not found', { id })
  }
}
