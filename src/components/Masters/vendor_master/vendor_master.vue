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
            <v-dialog v-model="dialog" persistent="false" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-card-title>
                  <h4>Vendor Master</h4>
                  <v-divider class="mx-2" vertical dark></v-divider>
                  <!-- <v-btn color="primary" dark class="mb-2" v-on="on">Add State</v-btn> -->
                  <v-btn small dark fab left color="pink" v-on="on" @click="addButton">
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
                    placeholder="Search Vendor"
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
                          <v-text-field
                            v-model="editedItem.vendor_name"
                            :rules="vendorRules"
                            label="Vendor Name "
                            maxlength="30"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.contact_no"
                            :rules="vendorContact"
                            label="Contact Number "
                          ></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row>
                         <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.email"
                            :rules="vendorEmail"
                            label="Email"
                          ></v-text-field>
                        </v-col>
                       <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.contact_person"
                            
                            label="Contact Person"
                             maxlength="30"
                          ></v-text-field>
                        </v-col>

                      </v-row>

                      <v-row>
                         <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.gst_no"
                            :rules="vendorGST"
                            label="GST Number"
                             maxlength="20"
                          ></v-text-field>
                        </v-col>
                       <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.fax_no"
                            
                            label="Fax Number"
                             maxlength="20"
                          ></v-text-field>
                        </v-col>

                      </v-row>


                      <v-row> 

                     <v-col >
                          <v-text-field
                            v-model="editedItem.address"
                            :rules="vendorAdress"
                            label="Address"
                             maxlength="40"
                          ></v-text-field>
                        </v-col>      
                      </v-row>

                      <v-row> 
                     <v-col cols="12" md="4" v-if="status_value">
                         <v-select
                     :items="StatusValues"
                     :rules="vendorStaus"
                     label="Status"
                   ></v-select>
                        </v-col>  
                     <v-col >
                          <v-text-field
                            v-model="editedItem.remarks"
                            
                            label="Remarks"
                          ></v-text-field>
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
    skeleton: true,
     StatusValues: ['YES', 'NO'],
    /*breadcrumb*/
    items: [
      {
        text: "Masters",
        disabled: false,
        href: "masters"
      },
      {
        text: "Vendor Master",
        disabled: false,
        href: "vendormaster"
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
    vendorRules: [
      v => !!v || "Vendor name is required",
      v => (v && v.length >= 3) || "Name must be at least 3 character"
    ],
vendorContact: [
      v => !!v || "Contact Number is required",
      v => (v && v.length >= 14) || "Invalid Phone Number"
    ],
    vendorAdress: [
      v => !!v || " Address is required",
      v => (v && v.length >= 10) || "Address must be at least 10 character"
    ],
    vendorStatus: [
      v => !!v || " YES / NO is required",
      v => (v && v.length >= 2) || "Staus is Require"
    ],
    vendorEmail: [
      v => !!v || " Email is required",
      v => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(v) || 'Invalid e-mail.'
          },
    ],
vendorGST: [
      v => !!v || " GST No is required",
      v => (v && v.length >= 7) || "GST is Require"
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
        text: "Vendor Name",
        align: "left",
        sortable: false,
        value: "vendor_name",
        width: 50
      },
      {
        text: "Contact No",
        align: "left",
        sortable: false,
        value: "contact_no",
        width: 50
      },
      {
        text: "Email",
        align: "left",
        sortable: false,
        value: "email",
        width: 50
      },

      
      {
        text: "Address",
        align: "left",
        sortable: false,
        value: "address",
        width: 75
      },
       {
        text: "GST No",
        align: "left",
        sortable: false,
        value: "gst_no",
        width: 50
      },
       {
        text: "Fax No",
        align: "left",
        sortable: false,
        value: "fax_no",
        width: 50
      },
       {
        text: "Contact Person",
        align: "left",
        sortable: false,
        value: "contact_person",
        width: 50
      },

       {
        text: "Remarks",
        align: "left",
        sortable: false,
        value: "remarks",
        width: 50
      },
      {
        text: "Status",
        align: "left",
        sortable: false,
        value: "status",
        width: 50
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
      vendor_name: "",
      _id: "",
      contact_no:"",
      emai:"",
      contact_person:"",
      fax_no:"",
      gst_no:"",
      address:"",
      remarks:"",
      status:""
    },
    defaultItem: {
      vendor_name: "",
      _id: "",
      contact_no:"",
      emai:"",
      contact_person:"",
      fax_no:"",
      gst_no:"",
      address:"",
      remarks:"",
      status:""

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
      return this.editedIndex === -1 ? " Add Vendor " : "Edit Vendor";
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

    addButton(){
      this.status_value = false
    },
    initialize() {
      this.groups = [
        {
          sr_no: "1",
     vendor_name: "Ravi",
      
      contact_no:"9555125554",
      email:"sedots@gmail.com",
      contact_person:"Balu",
      fax_no:"F234FGT56",
      gst_no:"GST45GY67",
      address:"Hyderabad",
      remarks:"Good",
      status:"Yes"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.groups.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
       this.status_value=true;
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
            designation: this.editedItem.designation,
            designation_short_name:this.editedItem.designation_short_name,
            status:this.editedItem.status

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