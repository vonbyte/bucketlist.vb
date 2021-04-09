<template>
  <nav>
    <div>
      <nuxt-link to="/">Home</nuxt-link>
    </div>
    <div v-if="isAuthenticated">
      <nuxt-link to="/todo">Todos</nuxt-link>
      <a href="#" @click.prevent="logout">Logout</a>
    </div>
    <template v-else>
      <nuxt-link to="/register">Register</nuxt-link>
      <nuxt-link to="/login">Log In</nuxt-link>
    </template>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {

    async logout () {
      await this.$auth.logout()
    },
  },
}

</script>
