<template>
  <v-app id="inspire">
  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form ref="loginForm" lazy-validation>
                <v-text-field
                  v-model="user.login"
                  :rules="rules.emailRules"
                  label="Login"
                  name="login"
                  type="text"
                />
                <v-text-field
                  v-model="user.password"
                  :rules="[rules.required]"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" to="/register">Register</v-btn>
              <v-spacer />
              <v-btn color="primary" :loading="loading" @click="validate">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
  <v-snackbar
    v-model="snackbar"
  >
    {{ message }}
    <v-btn
      color="pink"
      text
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
  </v-app>
</template>

<script>
  import User from '../models/user';

  export default {
    name: 'Login',
    data() {
      return {
        user: new User('', ''),
        loading: false,
        message: '',
        snackbar: false,
        rules: {
           required: value => !!value || 'Required',
           emailRules: [
             v => !!v || "Required",
             v => /.+@.+\..+/.test(v) || "E-mail must be valid"
           ],
         },
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    created() {
      if (this.loggedIn) {
        this.$router.push('/rainbow');
      }
    },
    methods: {
      validate() {
        if (this.$refs.loginForm.validate()) {
          this.loading = true;
          this.snackbar = false;

          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/rainbow');
            },
            error => {
              this.loading = false;
              this.snackbar = true;
              this.message = error.response.data.message.toString();
            }
          );
        }
      }
    }
  };
</script>
