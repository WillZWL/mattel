<template>
  <div class="container" v-if="!authenticated">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Login</div>
                <div class="panel-body">
                    <form @submit.prevent="login" class="form-horizontal" role="form">

                        <div class="form-group">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="col-md-6">
                                <input id="email" v-model="credentials.username" type="email" class="form-control" name="email" value="" required autofocus>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password" class="col-md-4 control-label">Password</label>

                            <div class="col-md-6">
                                <input id="password" v-model="credentials.password" type="password" class="form-control" name="password" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-primary"> Login </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
  <div v-else>
    logged
  </div>
</template>

<script>
import auth from '../../js/auth'

export default {

  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: '',
      authenticated: auth.checkAuth()
    }
  },
  methods: {
    login () {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }

      auth.login(this, credentials, loggedIn => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/order')
        }
      })
    }
  }
}
</script>

<style>
.error {
  color: red;
}
</style>
