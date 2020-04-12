<template>
<div>
 <v-card
    class="mx-auto"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title class="justify-center">Contact Page</v-card-title>
    </v-img>
  </v-card>
  <div  class="contactHeader">
      <span >Contact Us - Get In Touch</span>
  </div>

  <v-card >
    <v-footer>
      <v-card
        flat
        tile
        width="100%"
        class="red lighten-1 text-center"
      >
        <v-card-text>
            <v-row>
                <v-col>
              <v-card  class="mx-4" style="height:100%">
                 <div >
                   <v-icon size="24px" style="margin:2px">mdi-home</v-icon>
                 </div>    
                  <div >
                  <span style="font-weight: bold;font-size: 14px;">ADDRESS</span>
                 </div>  
                 <div style="margin:5pxplace-content: center;display: flex;">
                  <p style="width:75%">{{contactUs.address}}</p>
                 </div>  
              </v-card>
                </v-col>
                <v-col>
             <v-card  class="mx-4" style="height:100%">
                 <div>
                   <v-icon size="24px"  style="margin:2px">mdi-email</v-icon>
                 </div>    
                  <div >
                    <span style="font-weight: bold;font-size: 14px;">EMAIL</span>
                 </div>  
                 <div style="margin:5px">
                 <span>{{contactUs.email}}</span>
                 </div>  
              </v-card>
                </v-col>
                <v-col>
              <v-card  class="mx-4" style="height:100%">
                 <div>
                   <v-icon size="24px"  style="margin:2px">mdi-phone</v-icon>
                 </div>    
                  <div >
                   <span style="font-weight: bold;font-size: 14px;">PHONE</span>
                 </div>  
                 <div style="margin:5px">
                    <span>{{contactUs.mobileNumber}}</span>
                 </div>  
              </v-card>
                </v-col>
            </v-row>
    
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
  <v-card style="width:100%;min-height:300px">
  <iframe :src="contactUs.iframeSrc" style="margin:5px;width:98%;min-height:300px"/>

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
    contactUs: [],
    loading: false
  }),
  created() {
    this.loadContactUsData();
  },
  methods: {
    loadContactUsData() {
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
          .doc("contactus");
        ref.onSnapshot(res => {
          this.loading = false;
          if (res && res.data()) {
            this.contactUs = res.data();
            console.log("ContactUs",this.contactUs);
          }
        });
      }
    }
  }
};
</script>