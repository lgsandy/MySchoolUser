
<template>
  <v-card class="mx-auto">
    <v-toolbar flat color="light-blue accent-4" dark dense height="35">
      <v-toolbar-title>Teachers Details</v-toolbar-title>
    </v-toolbar>

    <v-row no-gutters>
      <v-col v-for="(item, i) in teachers" :key="i" cols="12" sm="3" class="pa-1">
        <!-- <v-card class="pa-2" outlined tile>One of three columns</v-card> -->
        <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`" class="px-3 pt-3 pb-3">
          <v-skeleton-loader class="mx-auto" max-width="300" type="card" :loading="loading">
            <v-card class="mx-auto" tile>
              <v-list shaped>
                <v-subheader class="title" v-text="item.data().name"></v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item dense>
                    <v-list-item-icon>
                      <v-icon color="indigo darken-4">email</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.data().email"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item dense>
                    <v-list-item-icon>
                      <v-icon color="deep-purple accent-4">phone</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.data().mobileNumber"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item dense>
                    <v-list-item-icon>
                      <v-icon color="orange darken-4">date_range</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.data().dob"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item dense>
                    <v-list-item-icon>
                      <v-icon color="blue darken-4" v-show="item.data().gender=='Male'">tag_faces</v-icon>
                      <v-icon color="pink accent-2" v-show="item.data().gender=='Female'">face</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.data().gender"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item dense>
                    <v-list-item-icon>
                      <v-list-item-title v-text="item.data().isPresent?'Present':'Absent'"></v-list-item-title>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-icon
                        class="blink"
                        :color="item.data().isPresent?'#008000':'#FF0000'"
                      >fiber_manual_record</v-icon>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { db } from "../fireBase/firebaseauth";
export default {
  inject: ["theme"],
  data: () => ({
    item: 1,
    status: 1,
    teachers: [],
    loading: false
  }),
  created() {
    this.getTeacherData();
  },
  methods: {
    getTeacherData() {
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
          .doc("allteachers")
          .collection("teacher");
        ref.onSnapshot(res => {
          this.loading = false;
          if (res && res.docs.length) {
            this.teachers = res.docs;
          }
        });
      }
    }
  }
};
</script>
<style scoped>
/* .blink {
  animation: blink 2s steps(5, start) infinite;
  -webkit-animation: blink 1s steps(5, start) infinite;
}
@keyframes blink {
  to {
    visibility: hidden;
  }
}
@-webkit-keyframes blink {
  to {
    visibility: hidden;
  }
} */
@keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

.blink {
  animation: fade 1000ms infinite;
  -webkit-animation: fade 1000ms infinite;
}
</style>