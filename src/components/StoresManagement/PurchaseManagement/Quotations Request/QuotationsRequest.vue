<template>
  <div id="app">
    <v-app id="inspire">
      <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>

      <v-row>
        <v-col cols="12" sm="6">
          <v-card id="mainCard" class="elevation-6">
            <v-card-title>
              <h4>Quotation Request</h4>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container>
                  <!-- <v-row> -->
                  <!-- <v-col cols="12" md="12"> -->
                  <v-autocomplete
                    v-model="editedItem.indentFrom"
                    :items="indentFrom"
                    label="Indent From Project / Office"
                    :menu-props="{ bottom: true, overflowY: true }"
                    @change="indentFromhandler"
                    dense
                  ></v-autocomplete>
                  <!-- </v-col> -->
                  <!-- <v-col cols="12" md="12" v-show="projectHideShow"> -->
                  <v-autocomplete
                    v-model="selectedProj"
                    :items="projects"
                    label="Project"
                    item-text="project_name"
                    item-value="details"
                    @change="selectProject"
                    :menu-props="{ bottom: true, overflowY: true }"
                    dense
                    v-show="projectHideShow"
                  ></v-autocomplete>
                  <!-- </v-col> -->
                  <!-- <v-col cols="12" md="12" v-show="officeHideShow"> -->
                  <v-autocomplete
                    v-model="editedItem.office"
                    :items="indentFrom"
                    label="Office"
                    :menu-props="{ bottom: true, overflowY: true }"
                    dense
                    v-show="officeHideShow"
                  ></v-autocomplete>
                  <!-- </v-col> -->
                  <!-- <v-col cols="12" md="12"> -->
                  <v-autocomplete
                    v-model="editedItem.site"
                    :items="sitesSelectBox"
                    label="Site"
                    :menu-props="{ bottom: true, overflowY: true }"
                    dense
                  ></v-autocomplete>
                  <!-- </v-col> -->
                  <!-- <v-col cols="12" md="12"> -->
                  <v-autocomplete
                    v-model="editedItem.store"
                    :items="selectStoreBox"
                    label="Store"
                    :menu-props="{ bottom: true, overflowY: true }"
                    dense
                  ></v-autocomplete>
                  <!-- </v-col> -->
                  <!-- <v-col cols="12" md="12"> -->

                  <v-autocomplete
                    v-model="editedItem.indentType"
                    :items="indentType"
                    label="Indent Number"
                    :menu-props="{ bottom: true, overflowY: true }"
                    dense
                  ></v-autocomplete>
                  <v-btn outlined color="indigo" rounded>View</v-btn>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card id="mainCard" class="elevation-6">
            <v-card-title>
              <h4>Vendor Selection</h4>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container>
                  <!-- <v-row> -->
                  <!-- <v-col cols="12" md="12"> -->
                  <v-autocomplete
                    v-model="editedItem.indentFrom"
                    :items="indentFrom"
                    label="Vendor Group"
                    :menu-props="{ bottom: true, overflowY: true }"
                    @change="indentFromhandler"
                    dense
                  ></v-autocomplete>
                  <!-- </v-col> -->
                  <!-- <v-col cols="12" md="12" v-show="projectHideShow"> -->
                  <v-autocomplete
                    v-model="selectedProj"
                    :items="projects"
                    label="Vendor Sub-Group"
                    item-text="project_name"
                    item-value="details"
                    @change="selectProject"
                    :menu-props="{ bottom: true, overflowY: true }"
                    dense
                  ></v-autocomplete>
                  <!-- </v-col> -->
                  <!-- <v-col cols="12" md="12" v-show="officeHideShow"> -->
                  <v-autocomplete
                    v-model="editedItem.office"
                    :items="indentFrom"
                    label="Vendor Sub-Group-1"
                    :menu-props="{ bottom: true, overflowY: true }"
                    dense
                  ></v-autocomplete>
                  <!-- </v-col> -->
                  <!-- <v-col cols="12" md="12"> -->
                  <v-autocomplete
                    v-model="editedItem.site"
                    :items="sitesSelectBox"
                    label="Select Vendor"
                    :menu-props="{ bottom: true, overflowY: true }"
                    dense
                  ></v-autocomplete>
                  <v-btn outlined color="error" rounded>Save</v-btn>

                </v-container>
              </v-form>
            </v-card-text>
            <!-- <v-card id="mainCard" class="elevation-6">
              <v-card-title>
                <h4>Vendor Details</h4>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :headers="vendorsHeaders"
                  :items="vendorsDetails"
                  :items-per-page="5"
                  class="elevation-1"
                  hide-default-footer
                ></v-data-table>
              </v-card-text>
            </v-card>-->
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-expansion-panels >
          <v-expansion-panel>
            <v-expansion-panel-header  >Vendor Details</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                :headers="vendorsHeaders"
                :items="vendorsDetails"
                :items-per-page="5"
                class="elevation-1"
                hide-default-footer
              ></v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card id="mainCard" class="elevation-6">
            <v-card-title>
              <h4>Indent Details</h4>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="groups"
                :items-per-page="5"
                class="elevation-1"
                hide-default-footer
              ></v-data-table>
            </v-card-text>
            <v-card-actions>
              <v-btn outlined color="indigo">save</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
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
    </v-app>
  </div>
</template>
<script>
import { baseURL } from "../../../../constant/constant";

export default {
  data: () => ({
    //for date picker
    date: new Date().toISOString().substr(0, 10),
    indentDatepicker: false,
    expiryDatepicker: false,
    projectHideShow: false,
    officeHideShow: false,
    partHideShow: false,
    materialNameHideShow: false,
    materialScodeHideShow: false,
    skeleton: true,
    indentFrom: ["Project", "Office"],
    SearchBy: ["Part Number", "Material Name", "Material Shor Code"],
    indentType: ["024552", "984265"],
    sitesSelectBox: ["Site1", "Site2"],
    selectStoreBox: ["Store1", "Store2"],
    //for editing column
    snack: false,
    snackColor: "",
    snackText: "",
    max25chars: v => v.length <= 25 || "Input too long!",
    large: true,
    //for select box
    projects: [],
    selectedProj: [],
    singleSelect: false,
    selected: [],

    /*breadcrumb*/
    items: [
      {
        text: "Stores Management",
        disabled: false,
        href: "stores_management"
      },
      {
        text: "Purchase Management",
        disabled: false,
        href: "purchaseManagement"
      },
      {
        text: "Quotations Request",
        disabled: false,
        href: "quotationsrequest"
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
    stateRules: [
      v => !!v || "Designation is required",
      v => (v && v.length >= 2) || "Designation must be at least 2 character"
    ],
    designationStatus: [
      v => !!v || "Status is required",
      v => (v && v.length >= 2) || "Either YES / NO"
    ],

    headers: [
      // { text: "State Id", readonly: true, value: "_id", disable: true },

      {
        text: "Sr.No",
        align: "left",
        sortable: false,
        value: "sno",
        width: 10
      },
      {
        text: "Actions",
        align: "right",
        value: "action",
        sortable: false,
        width: 10
      },
      {
        text: "Material Group",
        align: "left",
        sortable: false,
        value: "materialGroup",
        width: 100
      },
      {
        text: "Material Sub-Group",
        align: "left",
        sortable: false,
        value: "materialSubGroup",
        width: 100
      },
      {
        text: "Material Sub-Group-1",
        align: "left",
        sortable: false,
        value: "materialSubGroup1",
        width: 50
      },
      {
        text: "Material Name",
        align: "left",
        sort: false,
        value: "materialName",
        width: 50
      },
      {
        text: "Part No",
        align: "left",
        sortable: false,
        value: "partNumber",
        width: 50
      },
      {
        text: "Material Short Code",
        align: "left",
        sortable: false,
        value: "materialShorCode",
        width: 50
      },
      {
        text: "Description",
        align: "left",
        sortable: false,
        value: "description",
        width: 50
      },
      {
        text: "Current Stock Qty",
        align: "left",
        sortable: false,
        value: "currentStock",
        width: 50
      },
      {
        text: "Required Stock Qty",
        align: "left",
        sortable: false,
        value: "requiredStock",
        width: 50
      },
      {
        text: "Units",
        align: "left",
        sortable: false,
        value: "units",
        width: 50
      },
      {
        text: "Remarks",
        align: "left",
        sortable: false,
        value: "remarks2",
        width: 50
      }
    ],
    //   start Vendors details headers
    vendorsHeaders: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: true,
        value: "name"
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" }
    ],
    vendorsDetails: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%"
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%"
      }
    ],
    // End vendor details
    groups: [],

    editedIndex: -1,
    editedItem: {
      sno: "",
      indentFrom: "",
      project: "",
      office: "",
      site: "",
      store: "",
      indentDate: "",
      expiryDate: "",
      remarks1: "",
      materialGroup: "",
      materialSubGroup: "",
      materialSubGroup1: "",
      searchBy: "",
      materialName: "",
      partNumber: "",
      materialShorCode: "",
      currentStock: "",
      requiredStock: "",
      units: "",
      remarks2: "",
      description: ""
    },
    defaultItem: {
      sno: "",
      indentFrom: "",
      project: "",
      office: "",
      site: "",
      store: "",
      indentDate: "",
      expiryDate: "",
      remarks1: "",
      materialGroup: "",
      materialSubGroup: "",
      materialSubGroup1: "",
      searchBy: "",
      materialName: "",
      partNumber: "",
      materialShorCode: "",
      currentStock: "",
      requiredStock: "",
      units: "",
      remarks2: "",
      description: ""
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
      return this.editedIndex === -1 ? " Add Details " : "Edit Details";
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
      this.addDetails();
      // this.$http
      //   .get(baseURL + "designation")
      //   .then(response => {
      //     this.groups = response.data;
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
      this.editedIndex = this.groups.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.groups.indexOf(item);
      // this.Ddialog = true

      confirm("Are you sure you want to delete this item?") &&
        this.groups.splice(index, 1);
      this.$http
        .delete(baseURL + "designation/" + item.designation_id)
        .then(result => {
          console.log(result);
          this.snackbar = true;
          this.text = "Deleted successfully";
          this.color = "success";
        })
        .catch(error => {
          console.log(error);
          this.snackbar = true;
          this.text = "Unable to Delete";
          this.color = "warning";
        });
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
          this.$http
            .put(
              baseURL + "designation/" + this.editedItem.designation_id,
              this.editedItem
            )
            .then(result => {
              console.log(result);
              this.snackbar = true;
              this.text = "Update Successfully";
              this.color = "success";
              this.overlay = false;
            })
            .catch(error => {
              console.log(error);
              this.snackbar = true;
              this.text = "Unable to Update";
              this.color = "warning";
              this.overlay = false;
            });
        } else {
          this.overlay = true;
          //   this.groups.push(this.editedItem)
          this.$http
            .post(baseURL + "designation", this.editedItem)
            .then(() => {
              // console.log(response.data);

              this.snackbar = true;
              this.text = "Saved Successfully";
              this.color = "success";

              this.overlay = false;
              this.groups.push({
                sno: this.groups.length + 1,
                designation: this.editedItem.designation,
                designation_short_name: this.editedItem.designation_short_name,
                status: this.editedItem.status
              });
              this.initialize();
            })
            .catch(error => {
              console.log(error);
              this.snackbar = true;
              this.text = "Saved Failed";
              this.color = "warning";
              this.overlay = false;
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
    },
    /*end scrollin button */

    //methos for hansling indent from
    indentFromhandler() {
      if (this.editedItem.indentFrom == "Project") {
        this.projectHideShow = true;
        this.officeHideShow = false;
        this.loadProjectSelectBox();
      } else {
        this.officeHideShow = true;
        this.projectHideShow = false;
      }
    },
    //methos for hansling search by from
    searchByFromhandler() {
      if (this.editedItem.searchBy == "Part Number") {
        this.partHideShow = true;
        this.materialNameHideShow = false;
        this.materialScodeHideShow = false;
      } else if (this.editedItem.searchBy == "Material Name") {
        this.partHideShow = false;
        this.materialNameHideShow = true;
        this.materialScodeHideShow = false;
      } else {
        this.partHideShow = false;
        this.materialNameHideShow = false;
        this.materialScodeHideShow = true;
      }
    },
    //create method to add selected details to table
    addDetails() {
      this.groups.push({
        sno: 1,
        project: "gfdg",
        office: "fsdf",
        site: "fsdfs",
        store: "dsadsa"
      });
      this.close();
    },
    //Start For edition column in datatable
    saveDialogEdit() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancelDialogEdit() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    openDialogEdit() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    closeDialogEdit() {
      console.log("Dialog closed");
    },
    //End For edition column in datatable

    //craete function to load projects select box
    loadProjectSelectBox() {
      this.$http
        .get(baseURL + "project/dropdowns")
        .then(result => {
          result.data.forEach(row => {
            this.projects.push({
              project_name: row.project_name,
              details: row
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectProject() {
      console.log(this.editedItem.project);
    }
  }
};
</script>
<style scoped>
#mainCard {
  padding-top: 8px;
}
</style>