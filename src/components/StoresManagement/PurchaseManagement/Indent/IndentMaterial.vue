<template>
  <div id="app">
    <v-app id="inspire">
      <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>

      <v-card id="mainCard" height=260>
        <v-card-title>
          <h4>Indent Request for Materials</h4>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12" md="3">
                  <v-autocomplete
                    v-model="editedItem.indentFrom"
                    :items="indentFrom"
                    label="Indent From Project / Office"
                    :menu-props="{ bottom: true, overflowY: true }"
                    @change="indentFromhandler"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="3" v-show="projectHideShow">
                  <v-autocomplete
                    v-model="selectedProj"
                    :items="projects"
                    label="Project"
                    item-text="project_name"
                    item-value='details'
                    @change="selectProject"
                    :menu-props="{ bottom: true, overflowY: true }"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="3" v-show="officeHideShow">
                  <v-autocomplete
                    v-model="editedItem.office"
                    :items="indentFrom"
                    label="Office"
                    :menu-props="{ bottom: true, overflowY: true }"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="3">
                  <v-autocomplete
                    v-model="editedItem.site"
                    :items="indentFrom"
                    label="Site"
                    :menu-props="{ bottom: true, overflowY: true }"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="3">
                  <v-autocomplete
                    v-model="editedItem.store"
                    :items="indentFrom"
                    label="Store"
                    :menu-props="{ bottom: true, overflowY: true }"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="3">
                  <v-menu
                    v-model="indentDatepicker"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedItem.indentDate"
                        label="Indent Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.indentDate"
                      @input="indentDatepicker = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                  <v-menu
                    v-model="expiryDatepicker"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedItem.expiryDate"
                        label="Expiry Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.expiryDate"
                      @input="expiryDatepicker = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field v-model="editedItem.remarks1" :rules="stateRules" label="Remarks "></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>

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
          hide-default-footer
        >
          <!-- start for Editing column in table -->
          <template v-slot:item.remarks2="props">
            <v-edit-dialog
              :return-value.sync="props.item.remarks2"
              large
              @save="saveDialogEdit"
              @cancel="cancelDialogEdit"
              @open="openDialogEdit"
              @close="closeDialogEdit"
            >
              <div>{{ props.item.remarks2 }}</div>
              <template v-slot:input>
                <div class="mt-4 title">Update Remarks</div>
              </template>
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.remarks2"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.requiredStock="props">
            <v-edit-dialog
              :return-value.sync="props.item.requiredStock"
              large
              @save="saveDialogEdit"
              @cancel="cancelDialogEdit"
              @open="openDialogEdit"
              @close="closeDialogEdit"
            >
              <div>{{ props.item.requiredStock }}</div>
              <template v-slot:input>
                <div class="mt-4 title">Update Required Stock</div>
              </template>
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.requiredStock"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.description="props">
            <v-edit-dialog
              :return-value.sync="props.item.description"
              large
              @save="saveDialogEdit"
              @cancel="cancelDialogEdit"
              @open="openDialogEdit"
              @close="closeDialogEdit"
            >
              <div>{{ props.item.description }}</div>
              <template v-slot:input>
                <div class="mt-4 title">Update Description</div>
              </template>
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.description"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <!-- end for Editing column in table -->

          <template v-slot:top>
            <v-dialog v-model="dialog" persistent max-width="850">
              <template v-slot:activator="{ on }">
                <v-card-title>
                  <v-btn color="primary" dark class="mb-2" v-on="on">Add Materials Items</v-btn>
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
                        <v-col cols="12" md="3">
                          <v-autocomplete
                            v-model="editedItem.materialGroup"
                            :items="indentFrom"
                            label="Material Group"
                            :menu-props="{ bottom: true, overflowY: true }"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-autocomplete
                            v-model="editedItem.materialSubGroup"
                            :items="indentFrom"
                            label="Material Sub-group"
                            :menu-props="{ bottom: true, overflowY: true }"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-autocomplete
                            v-model="editedItem.materialSubGroup1"
                            :items="indentFrom"
                            label="Material Sub-group-1"
                            :menu-props="{ bottom: true, overflowY: true }"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-select
                            v-model="editedItem.searchBy"
                            :items="SearchBy"
                            label="Search By"
                            @change="searchByFromhandler"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="3" v-show="partHideShow">
                          <v-autocomplete
                            v-model="editedItem.partNumber"
                            :items="indentFrom"
                            label="Part Number"
                            :menu-props="{ bottom: true, overflowY: true }"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3" v-show="materialNameHideShow">
                          <v-autocomplete
                            v-model="editedItem.materialName"
                            :items="indentFrom"
                            label="Material Name"
                            :menu-props="{ bottom: true, overflowY: true }"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3" v-show="materialScodeHideShow">
                          <v-autocomplete
                            v-model="editedItem.materialShorCode"
                            :items="indentFrom"
                            label="Material Short Code"
                            :menu-props="{ bottom: true, overflowY: true }"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-select
                            v-model="editedItem.currentStock"
                            :items="indentFrom"
                            label="Current Stock"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-select
                            v-model="editedItem.requiredStock"
                            :items="indentFrom"
                            label="Required Stock"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-select v-model="editedItem.units" :items="indentFrom" label="Units"></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.remarks2"
                            :items="indentFrom"
                            label="renarks"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="addDetails">Add</v-btn>
                  <v-btn color="blue darken-1" text @click="reset">clear</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <!-- <template v-slot:activator="{ on }">
                <v-icon v-on="on" color="primary" class="mr-2" @click="editItem(item)">edit</v-icon>
              </template> -->
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
        <div class="text-center">
          <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
        </div>

        <v-snackbar v-model="snackbar" :color="color">
          <b>{{ text }}</b>
          <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
     <v-card-actions v-show="groups.length!=0">
          <!-- <v-btn rounded color="primary" dark>Reset</v-btn> -->
          <v-spacer></v-spacer>
          <v-btn rounded color="error" dark >Save</v-btn>
        </v-card-actions>
      </v-card>
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
    //for editing column
    snack: false,
    snackColor: "",
    snackText: "",
    max25chars: v => v.length <= 25 || "Input too long!",
    large:true,
    //for select box
    projects:[],
    selectedProj:[],

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
        text: "Indent Management",
        disabled: false,
        href: "indentMaterial"
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
        sno: this.groups.length + 1,
        project: this.editedItem.project,
        office: this.editedItem.office,
        site: this.editedItem.site,
        store: this.editedItem.store,
        indentDate: this.editedItem.indentDate,
        expiryDate: this.editedItem.expiryDate,
        materialGroup: this.editedItem.materialGroup,
        materialSubGroup: this.editedItem.materialSubGroup,
        materialSubGroup1: this.editedItem.materialSubGroup1,
        materialName: this.editedItem.materialName,
        partNumber: this.editedItem.partNumber,
        materialShorCode: this.editedItem.materialShorCode,
        currentStock: this.editedItem.currentStock,
        requiredStock: this.editedItem.requiredStock,
        remarks2: this.editedItem.remarks2,
        units: this.editedItem.units,
        description: this.editedItem.description
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
    loadProjectSelectBox(){
      this.$http.get(baseURL+'project/dropdowns')
      .then(result=>{
        result.data.forEach(row=>{
          this.projects.push({
            project_name:row.project_name,
            details:row,
          });
        });
      })
      .catch(err=>{
        console.log(err);
      });
    },
    selectProject(){
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