<template>
  <div>
    <h2>Login form</h2>
    <div v-if="error">
      {{error}}
    </div>
    <form action="#" method="post">
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="email">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" v-model="password">
      </div>
      <div>
        <button @click.prevent="login" type="button">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login () {
      try {
        let response = await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password,
          },
        })
        console.log(response)
        this.$router.push('/')
      } catch(err) {
        console.log(err)
        this.error = err.response.data.message
      }
    },
  },
}
</script>

<style scoped>

</style>
