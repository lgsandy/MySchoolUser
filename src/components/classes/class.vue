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
          value: "rollNo"
        },
        { text: "Name", value: "name" },
        { text: "Phone No", value: "phoneNo" },
        { text: "Attendance", value: "attendence" },
        { text: "", value: "data-table-expand" }
      ],
      desserts: [
        {
          rollNo: "101",
          name: "Sandy",
          phoneNo: 1234567890,
          attendence: true
        }
      ]
    };
  },
  computed: {},

  watch: {},

  created() {},
  methods: {}
};
</script>