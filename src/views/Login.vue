<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-flex xs12>
                <v-img :src="require('../assets/rukylogo.jpg')" class="my-3" contain height="75"></v-img>
              </v-flex>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <p v-if="showerror" style="color:red;">Enter Invalid credentials</p>
                  <v-form v-model="valid">
                    <v-text-field
                      v-on:click="selectedusername"
                      label="Username"
                      name="login"
                      :rules="loginRules"
                      prepend-icon="person"
                      type="text"
                      v-model="input.username"
                    ></v-text-field>

                    <v-text-field
                      v-on:click="selectedpass"
                      id="password"
                      label="Password"
                      name="password"
                      :append-icon="show4 ? 'visibility' : 'visibility_off'"
                      :rules="passRules"
                      prepend-icon="lock"
                      :type="show4 ? 'text' : 'password'"
                      v-model="input.password"
                      @click:append="show4 = !show4"
                    ></v-text-field>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <!-- <v-btn color="primary" to="/">Home</v-btn> -->
                  <v-spacer></v-spacer>
                  <v-btn color="primary" v-on:click="loginUser()">Login</v-btn>
                </v-card-actions>
              </v-card>
              <p align="center">
                Don't have account ?
                <a href="/signup">Sign Up</a>
              </p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import { mapActions } from "vuex";
// import router from '../router/index';

export default {
  name: "Login",

  data() {
    return {
      showerror: false,
      valid: false,
      show4: false,
      loginRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 100) || "Name must be less than 100 characters"
      ],
      passRules: [
        v => !!v || "Password is required",
        v => (v && v.length <= 15) || "password must be less than 15 characters"
      ],
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      let user = {
        email: this.input.username,
        password: this.input.password
      };
      this.login(user)
        .then(result => {

       
          console.log(result);
          if (result.data.success) {
   console.log('----------');
          // router.push({name:'/main'}).catch((err) => {console.log(err)})
          this.$router.go();
        
          } else {
            this.showerror = true;
          }
        })
        .catch(err => {
          console.log(err);
           this.showerror = true;
        });
    },
    
    selectedusername() {
      this.showerror = false;
    },
    selectedpass() {
      this.showerror = false;
    }
  }
};
</script>
