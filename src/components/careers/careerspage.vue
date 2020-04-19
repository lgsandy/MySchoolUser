<template>
<div>
 <v-card
    class="mx-auto"
  >
    <v-img class="white--text align-end" height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title class="justify-center">Career Page</v-card-title>
    </v-img>
  </v-card>
  <div  class="contactHeader">
      <span >Vacancies</span>
  </div>

      <v-card width="100%" class="red" v-for="career in careers" :key="career.id" >
            <v-row>
                <v-col>
              <v-card  style="height:100%;margin:0% 20% 0% 20%;padding-left:20%">
                  <div >
                  <span style="font-size: 25px;font-weight: bold;text-transform: capitalize;}">{{career.title}}</span>
                  </div>
                 <div style="margin:5pxplace-content: center;display: flex;">
                 <span style="width:75%">Job Title : {{career.title}}</span>
                 </div>  
                 <div style="margin:5pxplace-content: center;display: flex;">
                 <span style="width:75%">Location : {{career.location}}</span>
                 </div>  
                  <div style="margin:5pxplace-content: center;display: flex;">
                 <span style="width:75%">Requirement: {{career.requirement}}</span>
                 </div>  
                <div style="margin:5pxplace-content: center;display: flex;">
                 <span style="width:75%">Job Posted: {{career.date}}</span>
                 </div>  
              </v-card>
                </v-col>
            </v-row>
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
    careers: [],
    loading: false
  }),
  created() {
    this.loadCareersData();
  },
  methods: {
    loadCareersData() {
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
          .doc("careers");
        ref.onSnapshot(res => {
          this.loading = false;
          if (res && res.data()) {
            this.careers = res.data().careers;
            console.log("careers",this.careers);
          }
        });
      }
    }
  }
};
</script>