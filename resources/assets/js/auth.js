import {router} from './app'

// const API_URL = 'http://vanguard/'
const API_URL = 'http://admincentre.eservicesgroup.com:7890/';
const TOKEN_URL = API_URL + 'oauth/access_token'

export default {

  user: {
    authenticated: false
  },

  login(context, creds, cb) {
    creds.grant_type = 'password'
    creds.client_id = 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
    creds.client_secret = 'e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4'

    context.$http.post(TOKEN_URL, creds).then((response) => {
      localStorage.setItem('access_token', response.data.access_token)
      context.$http.headers.common['Authorization'] = 'Bearer ' + localStorage.access_token;
      this.user.authenticated = true
      cb(true)
      return
    }, (response) => {

    })
  },

  logout() {
    localStorage.removeItem('access_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('access_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }

    return this.user.authenticated
  },

  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}
