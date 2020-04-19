<template>
<div>
  <v-card class="mx-auto">
    <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-card-title class="justify-center">About Us Page</v-card-title>
    </v-img>
  </v-card>
  <div  class="contactHeader">
      <span >Know About Our Services</span>
  </div>
      <v-card flat tile width="100%" class="lighten-1 text-center">
       <p style="text-align: justify;padding: 30px;">{{aboutUs.text}}</p>
      </v-card>

</div>
</template>
<style scoped>
.contactHeader{
    height: 80px;
    place-content: center;
    align-items: center;
    display: flex;
    font-size: 33px;
    color: gray;
    font-weight: bold;
}
</style>

<script>
import { db } from "../fireBase/firebaseauth";
export default {
  inject: ["theme"],
  data: () => ({
      icons: [
        'mdi-home',
        'mdi-email',
        'mdi-phone',
      ],
    aboutUs: [],
    loading: false
  }),
  created() {
    this.loadAboutUsData();
  },
  methods: {
    loadAboutUsData() {
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
          .doc("aboutus");
        ref.onSnapshot(res => {
          this.loading = false;
          if (res && res.data()) {
            this.aboutUs = res.data();
            console.log("aboutUs",this.aboutUs);
          }
        });
      }
    }
  }
};
</script>