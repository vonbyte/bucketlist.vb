const todoController = require('../controller/todoController')

const todo = [
  {
    method: 'GET',
    url: '/api/todo',
    handler: todoController.list
  },
  {
    method: 'GET',
    url: '/api/todo/:id',
    handler: todoController.detail
  },
  {
    method: 'POST',
    url: '/api/todo',
    handler: todoController.add
  },
  {
    method: 'PUT',
    url: '/api/todo/:id',
    handler: todoController.update
  },
  {
    method: 'DELETE',
    url: '/api/todo/:id',
    handler: todoController.destroy
  }
]

module.exports = todo

