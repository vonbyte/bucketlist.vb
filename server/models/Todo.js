const Mongoose = require('mongoose')

const todoSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

module.exports = Mongoose.model('Todo', todoSchema)
