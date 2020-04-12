<template>
  <v-card class="mx-auto">
    <v-toolbar flat color="light-blue accent-4" dark dense height="35" class="justify-center">
      <v-spacer />
      <v-toolbar-title>{{$route.params.id}}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-tabs v-model="tab" centered>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#student">Student</v-tab>

        <v-tab href="#timeTable">Timetable</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1" value="student">
          <v-data-table
            :headers="headers"
            :items="desserts"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="name"
            show-expand
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Student details</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
              </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">More info about:: {{ item.name }}</td>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item :key="2" value="timeTable">
          <p>Time Tables details</p>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>
<script>
import { db } from "../fireBase/firebaseauth";
export default {
  name: "class",
  data() {
    return {
      tab: "mapview",
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: "Roll No",
          align: "start",
          sortable: false,
          value: "rollNumber"
        },
        { text: "Name", value: "studentName" },
        { text: "Phone No", value: "phoneNumber" },
        { text: "Attendance", value: "isPresent" },
        { text: "", value: "data-table-expand" }
      ],
      desserts: [
        {
          rollNumber: "101",
          studentName: "Sandy",
          phoneNumber: 1234567890,
          isPresent: true
        }
      ]
    };
  },
  computed: {},

  watch: {},

  created() {
    this.getstudentData()
  },
  methods: {
    getstudentData() {
    if (localStorage && localStorage.userLoginInfo && localStorage.userLoginInfo.length) {
     let value = JSON.parse(localStorage.userLoginInfo);
      let ref = db.collection('allschool').doc(value.country).collection(value.state).
        doc(value.district).collection(value.school).doc('allClass').collection('Classes').
        doc('class-1').collection('students');
       ref.onSnapshot(res => {
        if (res) {
          console.log("All student",res.docs[0].data().info);
            console.log("All student",res.docs[0].data().isPresent);
        }
      })

    }
  }
  }
};
</script>