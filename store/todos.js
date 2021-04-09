export const state = () => ({
  list: [],
  currentTodo: {}
})

export const mutations = {

  add (state, todo) {
    state.list.push(
      todo
    )
  },
  edit (state, todo) {
    let oldTodo = state.list.findIndex(entry => entry._id === todo._id)
    if (oldTodo !== -1) {
      state.list.splice(oldTodo, 1, todo)
    }
  },
  remove (state, todo) {
    let oldTodo = state.list.findIndex(entry => entry._id === todo._id)
    if (oldTodo !== -1) {
      state.list.splice(state.list.indexOf(todo), 1)
    }
  },
  current (state) {
    if (state.list.length > 0) {
      state.currentTodo = state.list.splice(-1)[0]
    }

  },
}

export const actions = {
  async fetchTodos ({ commit }) {
      const allTodos = await this.$axios.$get('/todo')
      allTodos.forEach(todo => {
        commit('add',todo)
      })
  },
  async createTodo ({ commit },todo) {
    const newTodo = await this.$axios.$post('/todo',todo)
    commit('add',newTodo)
  },
  async updateTodo ({ commit }, todo ) {
    const newTodo = await this.$axios.$put('/todo/' + todo._id,todo)
    commit('edit',(newTodo))
  },
  async destroyTodo ({ commit }, todo) {
    await this.$axios.$delete('/todo/' + todo._id)
    commit('remove',(todo))
    commit('current')
  },
}

