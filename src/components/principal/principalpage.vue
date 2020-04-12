<template>
    <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="principal.thumbnail"
    >
      <v-card-title>principal</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Name : {{principal.name}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Email :{{principal.email}}</div>
      <div>Phone No. :{{principal.mobileNumber}}</div>
      <div>Exprience. :{{principal.exprience}} yrs</div>
       <div>Thought</div>
        <div>{{principal.thought}} yrs</div>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from "../fireBase/firebaseauth";
export default {
  inject: ["theme"],
  data: () => ({
    principal: [],
    loading: false
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