<template>
  <div id="app">
    <v-app id="inspire">
      <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>
      <!-- Scroll to top Button -->
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        dark
        fixed
        bottom
        right
        color="primary"
        @click="toTop"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <v-card id="mainCard">
        <v-data-table
          :headers="headers"
          :items="materials"
          :search="search"
          :loading="loading"
          loading-text="Loading... Please wait"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" persistent max-width="800px">
              <template v-slot:activator="{ on }">
                <v-card-title>
                  <h4>Material Details</h4>
                  <v-divider class="mx-2" vertical dark></v-divider>
                  <!-- <v-btn color="primary" dark class="mb-2" v-on="on">Add State</v-btn> -->
                  <v-btn small dark fab left color="pink" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-divider class="mx-2" inset vertical></v-divider>

                  <!-- Stert Export to Excel -->
                  <download-excel
                    v-if="materials.length!=0"
                    class="btn btn-default"
                    :data="materials"
                    :fields="json_fields"
                    worksheet="My Worksheet"
                    name="materials.xls"
                    id="downloadExcel"
                  >
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn fab depressed small>
                          <v-img v-on="on" :src="require('../../../assets/excel.png')"></v-img>
                        </v-btn>
                      </template>
                      <span>Export to Excel</span>
                    </v-tooltip>
                  </download-excel>
                  <!-- End Export to Excel -->

                  <div class="flex-grow-1"></div>
                  <v-text-field
                    v-model="search"
                    placeholder="Search Material Name"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
              </template>

              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-select
                            :items="groupId"
                            :rules="groupRules"
                            v-model="editedItem.material_group_id"
                            label="Material Group Name"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-select
                            :items="subGroupId"
                            :rules="groupRules"
                            v-model="editedItem.material_sub_group_id"
                            label="Sub Group Name"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-select
                            :items="subGroupId2"
                            :rules="groupRules"
                            v-model="editedItem.material_sub_group2_id"
                            label="Sub Group 2 Name"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="editedItem.material_name"
                            :rules="groupRules"
                            label="Material Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="editedItem.part_number"
                            :rules="groupRules"
                            label="Part Number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="editedItem.material_description"
                            :rules="groupRules"
                            label="Material Description"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-select
                            :items="status"
                            :rules="groupRules"
                            v-model="editedItem.status"
                            label="Status"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  <v-btn color="blue darken-1" text @click="reset">clear</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- </v-toolbar> -->
          </template>
          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" color="primary" @click="editItem(item)">edit</v-icon>
              </template>
              <span>edit</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" color="error" @click="deleteItem(item)">delete</v-icon>
              </template>
              <span>delete</span>
            </v-tooltip>
          </template>

          <template v-slot:no-data>
            <v-alert type="info" color="red" outlined>No Data Available</v-alert>
          </template>
        </v-data-table>
        <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
        <!-- </v-card> -->

        <div class="text-center">
          <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
        </div>

        <v-snackbar v-model="snackbar" :color="color">
          <b>{{ text }}</b>
          <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-card>
    </v-app>
  </div>
</template>
<script>
// import {baseURL} from "../../../../src/constant/constant";
export default {
  data: () => ({
    skeleton: true,
    /*breadcrumb*/
    items: [
      {
        text: "Masters",
        disabled: false,
        href: "masters"
      },
      {
        text: "Material Master",
        disabled: false,
        href: "material_master"
      }
    ],
    /*breadcrumb*/
    dialog: false,
    overlay: false,
    loading: true,
    // value: false,
    // type: "",
    fab: false,
    snackbar: false,
    text: "",
    color: "",
    search: "",
    groupRules: [
      v => !!v || "Name is required",
    //   v => (v && v.length >= 3) || "Name must be at least 3 character"
    ],

    headers: [
      // { text: "State Id", readonly: true, value: "_id", disable: true },
       {
        text: "Sr.No",
        align: "left",
        sortable: false,
        value: "sr_no",
        width: 10
      },
      {
        text: "Actions",
        align: "right",
        value: "action",
        sortable: false,
        width: 100
      },
      {
        text: "Material Name",
        align: "left",
        sortable: false,
        value: "material_name",
        width: 150
      },
      {
        text: "Material Group Name",
        align: "left",
        sortable: false,
        value: "material_group_id",
        width: 150
      },
      {
        text: "Sub Group Name",
        align: "left",
        sortable: false,
        value: "material_sub_group_id",
        width: 150
      },
      {
        text: "Sub Group 2 Name",
        align: "left",
        sortable: false,
        value: "material_sub_group2_id",
        width: 180
      },
      {
        text: "Part Number",
        align: "left",
        sortable: false,
        value: "part_number",
        width: 150
      },
      {
        text: "Material Description",
        align: "left",
        sortable: false,
        value: "material_description",
        width: 150
      },
      {
        text: "Status",
        align: "left",
        sortable: false,
        value: "status",
        width: 150
      }
    ],
    materials: [],
    groupId: ["Group Name"],
    subGroupId: ["Sub Group Name"],
    subGroupId2: ["Sub Group Name 2"],
    status: ["Yes", "No"],

    editedIndex: -1,
    editedItem: {
      material_name: "",
      material_group_id: "",
      material_sub_group_id: "",
      material_sub_group2_id: "",
      part_number: "",
      material_description: "",
      status: ""
    },
    defaultItem: {
      material_name: "",
      material_group_id: "",
      material_sub_group_id: "",
      material_sub_group2_id: "",
      part_number: "",
      material_description: "",
      status: ""
    },
    /*Start Export to Excel*/
    json_fields: {
      "Material Name": "material_name",
      "Material Group Id": "material_group_id",
      "Material Sub Group Id": "material_sub_group_id",
      "Material Sub Group 2 Id": "material_sub_group2_id",
      "Part Number": "part_number",
      "Material Description": "material_description",
      "Status": "status"
    },

    json_meta: [
      [
        {
          key: "charset",
          value: "utf-8"
        }
      ]
    ]
    /*End Export to Excel*/
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Material" : "Edit Material";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    setTimeout(() => {
      this.materials = [];      
      this.initialize();
      this.loading = false;
    }, 1000);
  },

  methods: {
    initialize() {
      this.materials = [
        {
          sr_no: 1,
          material_name: "Group Name",
          material_group_id: "Group Name",
          material_sub_group_id: "Sub Gruop Name",
          material_sub_group2_id: "Sub Group Name 2",
          part_number: "Port122",
          material_description: "description",
          status: "Yes"
        }
      ];
        // this.$http
        //   .get(baseURL+"/states")
        //   .then(response => {
        //     // this.materials = response.data;
        //     for (var i = 0; i < response.data.length; i++) {
        //       this.materials.push({
        //         sr_no: i + 1,
        //         group_name: response.data[i].name,
        //         _id: response.data[i]._id
        //       });
        //       // console.log(i+1);
        //     }
        //     this.loading = false;
        //   })
        //   .catch(error => {
        //     console.log(error);

        //     setTimeout(() => {
        //       this.loading = false;
        //     }, 3000);
        //   });
    },

    editItem(item) {
      this.editedIndex = this.materials.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.materials.indexOf(item);
      // this.Ddialog = true
      if (
        confirm("Are you sure you want to delete this item?") &&
        this.materials.splice(index, 1)
      ) {
        // axios
        //   .delete("http://localhost:3000/api/materials/" + item._id)
        //   .then(result => {
        //     console.log(result);
        //     this.snackbar = true;
        //     this.text = "Deleted successfully";
        //     this.color = "success";
        //     this.materials=[];
        //     this.initialize();
        //   })
        //   .catch(error => {
        //     console.log(error);
        //     this.snackbar = true;
        //     this.text = "Unable to Delete";
        //     this.color = "warning";
        //   });
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.materials[this.editedIndex], this.editedItem);
          //   axios
          //     .put(
          //       "http://localhost:3000/api/materials/" + this.editedItem._id,
          //       this.editedItem
          //     )
          //     .then(result => {
          //       console.log(result);
          //       this.snackbar = true;
          //       this.text = "Update Successfully";
          //       this.color = "success";
          //       this.overlay = false;
          //     })
          //     .catch(error => {
          //       console.log(error);
          //       this.snackbar = true;
          //       this.text = "Unable to Update";
          //       this.color = "warning";
          //       this.overlay = false;
          //     });
        } else {
          this.overlay = true;
          //   this.materials.push(this.editedItem)
          this.materials.push({
            sr_no: this.materials.length + 1,
            material_name: this.editedItem.material_name,
            material_group_id: this.editedItem.material_group_id,
            material_sub_group_id: this.editedItem.material_sub_group_id,
            material_sub_group2_id: this.editedItem.material_sub_group2_id,
            part_number: this.editedItem.part_number,
            material_description: this.editedItem.material_description,
            status: this.editedItem.status
          });
          //   axios
          //     .post("http://localhost:3000/api/materials", this.editedItem)
          //     .then(response => {
          //       console.log(response.data);
          //       this.snackbar = true;
          //       this.text = "Saved Successfully";
          //       this.color = "success";
          //       // this.type = "success";
          //       //this.value = true;
          //       this.overlay = false;
          //       // setTimeout(() => {
          //       //   this.overlay = false;
          //       // }, 4000);
          //       this.materials.push({
          //         sr_no:this.materials.length+1,
          //         name: response.data.name,
          //         _id: response.data._id
          //       });
          //     })
          //     .catch(error => {
          //       console.log(error);
          //       this.snackbar = true;
          //       this.text = "Saved Failed";
          //       this.color = "warning";
          //       this.overlay = false;
          //     });
          // this.materials.push({
          //   name: this.editedItem.name
          // });
        }
        this.close();
        this.overlay = false;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    /*scrollin button */
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
    /*end scrollin button */
  }
};
</script>
<style scoped>
#mainCard {
  padding-top: 8px;
}
</style>