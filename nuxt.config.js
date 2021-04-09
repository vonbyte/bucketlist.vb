export default {
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  axios: {
    baseURL: "http://localhost:3000/api"
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
      local: {
        token: {
          required: true,
          property: 'token',
          type: 'Bearer'
        },
        endpoints: {
          login: { url: 'login', method: 'post'},
          logout: false,
          user: false
        }
      }
    }
  }
}
