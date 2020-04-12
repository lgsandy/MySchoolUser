<template>
  <v-row>
    <v-col cols="12" sm="6" class="pa-4">
      <v-card class="mx-auto" max-width="434" tile>
        <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
          <v-row align="end" class="fill-height">
            <v-col align-self="start" class="pa-0" cols="12">
              <v-avatar class="profile" color="grey" size="164" tile>
                <v-img :src="principal.thumbnail"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="title">Marcus Obrien</v-list-item-title>
                  <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-img>
        <v-card-actions class="white justify-center">
          <v-btn
            v-for="(social, i) in socials"
            :key="i"
            :color="social.color"
            class="mx-3"
            fab
            icon
            outlined
          >
            <v-icon large>{{ social.icon }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" class="pa-4">
      <v-card class="mx-auto" tile>
        <v-list rounded>
          <v-subheader>DETAILS</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>email</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{principal.email}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{principal.mobileNumber}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>explicit</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{principal.exprience}}</v-list-item-title>
                <v-list-item-title>Year's Experience</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>label_important</v-icon>
              </v-list-item-icon>
              <v-list-item-content>{{principal.thought}}</v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { db } from "../fireBase/firebaseauth";
export default {
  inject: ["theme"],
  data: () => ({
    principal: [],
    loading: false,
    socials: [
      {
        icon: "fab fa-facebook",
        color: "indigo"
      },
      {
        icon: "fab fa-linkedin",
        color: "cyan darken-1"
      },
      {
        icon: "fab fa-instagram",
        color: "red lighten-3"
      }
    ]
  }),
  created() {
    this.loadTeacherData();
  },
  methods: {
    loadTeacherData() {
      this.loading = true;
      if (
        localStorage &&
        localStorage.userLoginInfo &&
        localStorage.userLoginInfo.length
      ) {
        this.isDataLoaded = true;
        let value = JSON.parse(localStorage.userLoginInfo);
        let ref = db
          .collection("allschool")
          .doc(value.country)
          .collection(value.state)
          .doc(value.district)
          .collection(value.school)
          .doc("principal");
        ref.onSnapshot(res => {
          this.loading = false;
          if (res && res.data()) {
            this.principal = res.data();
          }
        });
      }
    }
  }
};
</script>