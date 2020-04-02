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
                  <v-toolbar-title>Signup</v-toolbar-title>
                  <div class="flex-grow-1"></div>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form">
                    <v-text-field
                      label="User"
                      name="user"
                      :rules="inputRules"
                      v-model="input.name"
                      prepend-icon="person"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      label="Email"
                      name="email"
                      :rules="EmailRules"
                      v-model="input.email"
                      prepend-icon="email"
                      type="text"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      :rules="passRules"
                      v-model="input.password"
                      prepend-icon="lock"
                      type="password"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      label="Confirm Password"
                      :rules="cPassRules"
                      v-model="input.confirm_password"
                      prepend-icon="lock"
                      :append-icon="show4 ? 'visibility' : 'visibility_off'"
                      :type="show4 ? 'text' : 'password'"
                      @click:append="show4 = !show4"
                    ></v-text-field>

                    <v-checkbox
                      v-model="input.checkbox"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      label="Do you agree?"
                      required
                    ></v-checkbox>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="save">sign up</v-btn>
                </v-card-actions>
              </v-card>
              <p align="center">
                Have already account ?
                <a href="/">Login</a>
              </p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <div class="text-center">
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </div>

      <v-snackbar v-model="snackbar" :color="color">
        <b>{{ text }}</b>
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    name: "Signup",
    valid: false,
    show3: false,
    show4: false,
    snackbar: false,
    text: "",
    color: "",
    overlay: false,
    inputRules: [v => !!v || "Name is required"],
    EmailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ],
    passRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 5) || "password must be greater than 5 characters",
      v => (v && v.length <= 15) || "password must be less than 15 characters"
    ],
    input: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      checkbox: ""
    }
  }),
  computed: {
    cPassRules() {
      return [
        this.input.password === this.input.confirm_password ||
          "Password Does not match",
        v => !!v || "Confirmation Password is required"
      ];
    }
  },
  methods: {
    ...mapActions(["register"]),

    save() {
      console.log(this.input);

      if (this.$refs.form.validate()) {
        this.overlay = true;
        let user = {
          name: this.input.name,
          email: this.input.email,
          password: this.input.password
        };
        this.register(user)
          .then(result => {
            console.log(result);
            if (result.data == "Duplicate Email") {
              setTimeout(() => {
                this.overlay = false;
                // this.$refs.form.reset();
                this.snackbar = true;
                this.text = result.data;
                this.color = "warning";
              }, 1000);
            } else {
              setTimeout(() => {
                this.overlay = false;
                this.snackbar = true;
                this.text = "Saved Successfully";
                this.color = "green";
              }, 800);
              setTimeout(() => {
                this.$router.push("/");
              }, 1500);
            }
          })
          .catch(err => {
            console.log(err);
            this.showerror = true;
            this.snackbar = true;
            this.$refs.form.reset();
            this.text = "Saved Failed";
            this.color = "warning";
            this.overlay = false;
          });
        // alert("submit");
        // this.$http
        // .post(baseURL+"user/register",this.input)
        //   .then(response => {
        //     console.log(response.data);
        //     if (response.data == "Duplicate Email") {
        //       setTimeout(() => {
        //         this.overlay = false;
        //         // this.$refs.form.reset();
        //         this.snackbar = true;
        //         this.text = response.data;
        //         this.color = "warning";
        //       }, 1000);
        //     } else {
        //       setTimeout(() => {
        //         this.overlay = false;
        //         this.snackbar = true;
        //         this.text = "Saved Successfully";
        //         this.color = "green";
        //       }, 800);
        //       setTimeout(() => {
        //         this.$router.push("/");
        //       }, 1500);
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error);
        //     this.snackbar = true;
        //     this.$refs.form.reset();
        //     this.text = "Saved Failed";
        //     this.color = "warning";
        //     this.overlay = false;
        //   });
      }
    }
  }
};
</script>