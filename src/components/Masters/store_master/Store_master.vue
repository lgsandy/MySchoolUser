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
                  <h4>Store Master</h4>
                  <v-divider class="mx-2" vertical dark></v-divider>
                  <!-- <v-btn color="primary" dark class="mb-2" v-on="on">Add State</v-btn> -->
                  <v-btn small dark fab left color="pink" v-on="on" @click="AddButton">
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
                    placeholder="Search Store Name"
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
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="editedItem.project_code"
                            :rules="stateRules"
                            :items="project_code"
                            label="Project Name"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-select
                            v-model="editedItem.site_name"
                            :rules="stateRules"
                            :items="site_code"
                            label="Site Name"
                          ></v-select>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="editedItem.store_type"
                            :rules="StoreType"
                            label="Store type"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.store_name"
                            :rules="stateRules"
                            label="Store Name"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.description"
                            label="Description"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6" v-if="status_change">
                          <v-select
                            v-model="editedItem.status"
                            :rules="stateRules"
                            :items="status"
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
    //date
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    //end date
    skeleton: true,
    /*breadcrumb*/
    items: [
      {
        text: "All Master",
        disabled: false,
        href: "masters"
      },
      {
        text: "Store Master",
        disabled: false,
        href: "group"
      }
    ],
    status: ["Yes", "No"],
    project_code: ["1", "3", "4"],
    site_code: ["1", "3", "4"],
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
    stateRules: [
      v => !!v || "Name is required",
      v => (v && v.length >= 3) || "Name must be at least 3 character"
    ],
    StoreType: [
      v => !!v || "Store Type required",
      v => (v && v.length >= 8) || "Store Type Required"
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
        text: "Project Name",
        align: "left",
        sortable: false,
        value: "project_code",
        width: 150
      },
      {
        text: "Site Name",
        align: "left",
        sortable: false,
        value: "site_code",
        width: 150
      },
      {
        text: "Store Name",
        align: "left",
        sortable: false,
        value: "store_name",
        width: 150
      },
      {
        text: "Store Type",
        align: "left",
        sortable: false,
        value: "store_type",
        width: 150
      },
      {
        text: "Description",
        align: "left",
        sortable: false,
        value: "description",
        width: 150
      },
      {
        text: "Status",
        align: "left",
        sortable: false,
        value: "status",
        width: 150
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
      "Store name": "name"
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
      return this.editedIndex === -1 ? "New Store" : "Edit Group";
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
 AddButton(){
     this.status_change=false;
    },

    initialize() {
      this.groups = [
        {
          sr_no: "1",
          store_name: "Store Name"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.groups.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
     this.status_change=true;

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