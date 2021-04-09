<template>
  <div>
    <h1>Hello World</h1>
    <button @click="addTodo">Add Todo</button>
    <button @click="editTodo">Edit Todo</button>
    <button @click="deleteTodo">Delete Todo</button>
  </div>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'auth',
  name: 'hello',
  data () {
    return {
      loading: false,
      error: null
    }
  },
  methods: {
    ...mapActions('todos', ['fetchTodos', 'createTodo', 'updateTodo', 'destroyTodo']),
    async init () {
      await this.fetchTodos()
      this.$store.commit('todos/current')
    },
    addTodo () {
      const todo = {
        category: 'Test2',
        description: 'My Description of the new Todo written from Nuxt',
        title: 'My Todo from Nuxt',
      }
      this.createTodo(todo)
    },
    editTodo () {
      let todo = JSON.parse(JSON.stringify(this.$store.state.todos.currentTodo))
      todo.completed = true
      this.updateTodo(todo)
    },
    deleteTodo () {
      let todo = JSON.parse(JSON.stringify(this.$store.state.todos.currentTodo))
      console.log(todo)
      this.destroyTodo(todo)
    },
  },
  mounted () {
    this.init()
  },
}
</script>

<style scoped>

</style>
