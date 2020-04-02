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
          :items="groups"
          :search="search"
          :loading="loading"
          loading-text="Loading... Please wait"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-card-title>
                  <h4>Mix Design Master</h4>
                  <v-divider class="mx-2" vertical dark></v-divider>
                  <!-- <v-btn color="primary" dark class="mb-2" v-on="on">Add State</v-btn> -->
                  <v-btn small dark fab left color="pink" v-on="on" @click="AddClick">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-divider class="mx-2" inset vertical></v-divider>

                  <!-- Stert Export to Excel -->
                  <download-excel
                    v-if="groups.length!=0"
                    class="btn btn-default"
                    :data="groups"
                    :fields="json_fields"
                    worksheet="My Worksheet"
                    name="groups.xls"
                    id="downloadExcel"
                  >
                    <v-tooltip bottom>
                      <!-- <template v-slot:activator="{ on }">
                        <v-btn fab depressed small>
                          <v-img v-on="on" :src="require('../../assets/excel.png')"></v-img>
                        </v-btn>
                      </template>-->
                      <span>Export to Excel</span>
                    </v-tooltip>
                  </download-excel>
                  <!-- End Export to Excel -->

                  <div class="flex-grow-1"></div>
                  <v-text-field
                    v-model="search"
                    placeholder="Search Group Name"
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
                          
                            <v-col>
                              <v-select v-model="editedItem.group_name" :rules="materialRules1" :items="group_name" label="Group Name">
                              </v-select>
                            </v-col>
                            <v-col>
                              <v-select v-model="editedItem.sub_group_name" :rules="materialRules2" :items="sub_group_name" label="Sub Group Name">
                              </v-select>
                            </v-col>
                         </v-row>
                         <v-row>
                             <v-col>
                              <v-select v-model="editedItem.sub_group2_name" :rules="materialRules3" :items="sub_group2_name" label="Sub Group2 Name">
                              </v-select>
                            </v-col>
                            <v-col>
                              <v-text-field
                              v-model="editedItem.material_name"
                              :rules="materialRules5"
                              label="Material Name"> 
                              </v-text-field>
                            </v-col>
                         </v-row>
                        <v-row>
            
                              <v-col v-if="status_val">
                              <v-select v-model="editedItem.status" :rules="materialRules7" :items="status" label="Status">
                              </v-select>
                            </v-col>
                            <v-col>
                              <v-text-field
                                 v-model="editedItem.des"
                                 label="Description"> 
                                </v-text-field>
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
                <v-icon v-on="on" color="primary" class="mr-2" @click="editItem(item)">edit</v-icon>
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
// import axios from "axios";

export default {
  data: () => ({
    status:['Yes','No'],
    skeleton: true,
    /*breadcrumb*/
    items: [
      {
        text: "Masters",
        disabled: false,
        href: "masters"
      },
      {
        text: "Mix Design Material Master",
        disabled: false,
        href: "mixDesignMaterialMaster"
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
    materialRules1: [
      v => !!v || "Group Name is required",
      v => (v && v.length >= 3) || "Group Name is required"
    ],materialRules2: [
      v => !!v || "Sub Group Name is required",
      v => (v && v.length >= 3) || "Sub Group Name is required"
    ],materialRules3: [
      v => !!v || "Sub Group2 Name is required",
      v => (v && v.length >= 3) || "Sub Group2 Name is required"
    ],materialRules4: [
      v => !!v || "Material Code is required",
      v => (v && v.length >= 3) || "Material Code is required"
    ],materialRules5: [
      v => !!v || "Material Name is required",
      v => (v && v.length >= 3) || "Material Name is required"
    ],materialRules6: [
      v => !!v || "Part Number is required",
      v => (v && v.length >= 3) || "Part Number is required"
    ],materialRules7: [
      v => !!v || "Status is required",
      v => (v && v.length >= 3) || "Status is required"
    ],

    headers: [
      // { text: "State Id", readonly: true, value: "_id", disable: true },
      {
        text: "Sr.No",
        align: "center",
        sortable: false,
        value: "sr_no",
        width: 10
      },
      {
        text: "Group Name",
        align: "center",
        sortable: false,
        value: "group_name",
        width: 80
      },
      {
        text: "Sub Group Name",
        align: "center",
        sortable: false,
        value: "sub_group_Name",
        width: 80
      },
      {
        text: "Sub Group2 Name",
        align: "center",
        sortable: false,
        value: "sub_group2_name",
        width: 80
      },
      {
        text: "Material Name",
        align: "center",
        sortable: false,
        value: "material_name",
        width: 150
      },
      {
        text: "Status",
        align: "center",
        sortable: false,
        value: "status",
        width: 50
      },
      {
        text: "Description",
        align: "center",
        sortable: false,
        value: "des",
        width: 100
      },
      {
        text: "Actions",
        align: "right",
        value: "action",
        sortable: false,
        width: 10
      }
    ],
    groups: [],

    editedIndex: -1,
    editedItem: {
      group_name: "",
      _id: ""
    },
    defaultItem: {
      group_name: "",
      _id: ""
    },
    /*Start Export to Excel*/
    json_fields: {
      "Group name": "name"
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
      return this.editedIndex === -1 ? "Sub Group Master" : "Edit Group";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    setTimeout(() => {
      this.groups = [];
      this.initialize();
      this.loading = false;
    }, 1000);
  },

  methods: {
    initialize() {
      this.groups = [
        {
          sr_no: "1",
          group_type: "Sub Group",
          group_name: "Test",
          sub_group_name: "Test1",
          sub_group2_name: "Group Name",
          material_name: "Group Material",
          status: "Yes"
        }
      ];
    },

    AddClick(){
    this.status_val = false
    },

    editItem(item) {
      this.status_val=true;
      this.editedIndex = this.groups.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.groups.indexOf(item);
      // this.Ddialog = true

      confirm("Are you sure you want to delete this item?") &&
        this.groups.splice(index, 1);
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
          Object.assign(this.groups[this.editedIndex], this.editedItem);
        } else {
          this.overlay = true;
          //   this.groups.push(this.editedItem)
          this.groups.push({
            sr_no: this.groups.length + 1,
            group_name: this.editedItem.group_name
          });
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