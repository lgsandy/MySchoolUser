<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-flex xs12>
                <v-img :src="require('../assets/school.png')" class="my-3" contain height="120"></v-img>
              </v-flex>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <p v-if="showerror" style="color:red;">Enter Invalid credentials</p>
                  <v-form v-model="valid">
                    <v-select
                      prepend-icon="emoji_flags"
                      :items="country"
                      v-model="input.country"
                      label="Select Country"
                      @change="loaddistrict"
                    ></v-select>
                    <v-select
                      prepend-icon="house"
                      :items="states"
                      item-text="name"
                      label="Select State"
                      v-model="input.state"
                      @change="loadDist"
                    ></v-select>
                    <v-select
                      prepend-icon="store"
                      label="Select District"
                      :items="districts"
                      v-model="input.district"
                      @change="loadSchool"
                    ></v-select>
                    <v-select
                      prepend-icon="school"
                      label="Select School"
                      :items="schools"
                      item-text="id"
                      v-model="input.school"
                    ></v-select>
                    <v-text-field label="Mobile No" prepend-icon="phone" v-model="input.mobileNo"></v-text-field>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <!-- <v-btn color="primary" to="/">Home</v-btn> -->
                  <v-spacer></v-spacer>
                  <v-btn color="primary" v-on:click="loginUser()">Login</v-btn>
                </v-card-actions>
              </v-card>
              <!-- <p align="center">
                Don't have account ?
                <a href="/signup">Sign Up</a>
              </p>-->
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import router from "../router/index";
import countryjson from "../components/countryJson/countrylist.json";
import { db } from "../components/fireBase/firebaseauth";
export default {
  name: "Login",

  data() {
    return {
      jsonData: countryjson,
      country: ["hhh", "jhjh"],
      states: ["hgg", "jgh"],
      districts: ["hgg", "jgh"],
      schools: [],
      stateIndex: -1,
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
        country: "",
        state: "",
        district: "",
        school: "",
        mobileNo: ""
      }
    };
  },
  created() {
    this.country = Object.keys(this.jsonData);
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      let ref = db
        .collection("allschool")
        .doc(this.input.country)
        .collection(this.input.state)
        .doc(this.input.district)
        .collection(this.input.school)
        .doc("permission");
      ref.get().then(res => {
        if (res && res.data()) {
          let allDetails = res.data().permission;
          let matchDetails = allDetails.find(
            el => el.mobileNumber == this.input.mobileNo
          );
          if (matchDetails) {
            let userDetails = this.input;
            userDetails.mobileNumber = matchDetails.mobileNumber;
            userDetails.name = matchDetails.name;
            console.log("user Data", userDetails);
            localStorage.userLoginInfo = JSON.stringify(userDetails);
            router.push("/main");
          }
        } else {
          console.log(res.docs);
        }
      });
    },
    loaddistrict() {
      this.states = this.jsonData[this.input.country];
    },
    loadDist() {
      let stateDist = this.states.find(el => el.name == this.input.state);
      this.districts = stateDist.districts;

      // this.stateIndex=this.states.indexOf();
      // this.districts = this.states.;
    },
    loadSchool() {
      let ref = db
        .collection("allschool")
        .doc(this.input.country)
        .collection(this.input.state)
        .doc(this.input.district)
        .collection("school");
      ref.get().then(res => {
        if (res && res.docs.length) {
          this.schools = res.docs;
        } else {
          console.log(res.docs);
        }
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


