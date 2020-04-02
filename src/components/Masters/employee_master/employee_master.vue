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
            <v-dialog v-model="dialog" persistent max-width="500px">
              <template v-slot:activator="{ on }">
                <v-card-title>
                  <h4>Employee Master</h4>
                  <v-divider class="mx-2" vertical dark></v-divider>
                  <!-- <v-btn color="primary" dark class="mb-2" v-on="on">Add State</v-btn> -->
                  <v-btn small dark fab left color="pink" v-on="on" >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-divider class="mx-2" inset vertical></v-divider>

                  <!-- Stert Export to Excel -->
                  <!-- <download-excel
                    v-if="groups.length!=0"
                    class="btn btn-default"
                    :data="groups"
                    :fields="json_fields"
                    worksheet="My Worksheet"
                    name="groups.xls"
                    id="downloadExcel"
                  >
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn fab depressed small>
                          <v-img v-on="on" :src="require('../../assets/excel.png')"></v-img>
                        </v-btn>
                      </template>
                      <span>Export to Excel</span>
                    </v-tooltip>
                  </download-excel> -->
                  <!-- End Export to Excel -->

                  <div class="flex-grow-1"></div>
                  <v-text-field
                    v-model="search"
                    placeholder="Search Employee "
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
                          <v-text-field type="string"
                            v-model="editedItem.employee_name"                           
                            label="Employee Name "                          
                           :rules="employeeName"            
                           maxlength="20"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field type="number"
                            v-model="editedItem.phone_number"
                            :rules="vendorContact"
                            label="Phone Number "

                              ></v-text-field>
                        </v-col>
                        </v-row>
                       
                       
                       
                        <v-row>
                        <v-col cols="12" md="6">
                        <v-text-field 
                         v-model="editedItem.employeeEmail"
                        :rules="employeeEmail"
                        label="Email Id"

        
                          ></v-text-field>
                        </v-col>
                         <v-col cols="12" md="6">
                        <v-select
                        v-model="editedItem.gender"
                         :items="genderValues"
                         :rules="genderStatus"
                         label="Gender"
                         ></v-select>
                        </v-col>
                        </v-row>



                     <v-row>
                         <v-col cols="12" md="6">
                        <v-text-field
                         v-model="editedItem.nationality"
                        :rules="employeeNationality"
                        label="Nationality"
                        ></v-text-field>
                        </v-col>
                          <v-col cols="12" md="6">
                        <v-text-field
                         v-model="editedItem.pan_number"
                        :rules="employeePan"
                        label="PAN Number"
                        ></v-text-field>
                        </v-col>
                     </v-row>
                        <v-row>
                          <v-col cols="12" md="6">
                        <v-text-field
                         v-model="editedItem.blood_group"
                        :rules="employeeBlood"
                        label="Blood Group"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                 <v-text-field type = "number"
                 v-model="editedItem.age"
                :rules="employeeAge"
                 label="Age" ></v-text-field>
                     </v-col>
                        </v-row>   

                         <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field type="number"
                            v-model="editedItem.aadhar_number"
                            :rules="employeeAadhar"
                            label="AADHAR Number "
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.passport_number"
                            :rules="employeepassport"
                            label="Passport Number "
                          ></v-text-field>
                        </v-col>
                        </v-row>


                    <v-row>
                    <v-col cols="12" md="6">
                         <v-dialog
                      ref="menu"
                      v-model="menu"
                      :return-value.sync="date"
                      persistent
                       width="290px"
                       :close-on-content-click="false"
                        >
             <template v-slot:activator="{ on }">
             <v-text-field
            v-model="date"
            label="Date of Birth"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
           <v-date-picker v-model="date" scrollable >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                 </v-date-picker>
                   </v-dialog>
                        </v-col>
                 <v-col cols="12" md="6">
                         <v-dialog
                      ref="modal"
                      v-model="modal"
                      :return-value.sync="date1"
                      persistent
                       width="290px"
                       :close-on-content-click="false"
                        >
             <template v-slot:activator="{ on }">
             <v-text-field
            v-model="date1"
            label="Date of Join"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
           <v-date-picker v-model="date1" scrollable >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.modal.save(date1)">OK</v-btn>
                 </v-date-picker>
                   </v-dialog>
                        </v-col>
                    </v-row>





                      <v-row> 
                     <v-col >
                     <v-textarea
                     rows="3"
                      v-model="editedItem.present_address"
                     :rules="employeeAdress"
                     label="Present Address" ></v-textarea>
                        </v-col>      
                      </v-row>

                      <v-row> 
                     <v-col >
                      <v-textarea
                      rows="3"
                     v-model="editedItem.permenant_address"
                      label="Permenant Address" ></v-textarea>
                        </v-col>      
                      </v-row>

                      <v-row>
                       


                         <v-col cols="12" md="6" v-show="status_value">
                         <v-select
                       :items="statusValues"
                       :rules="employeeStatus"
                       label="Status" >  </v-select>
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
status_value:false,
//date: null,
   date1: null,
   date: null,
     
       menu: false,
       modal: false,
    
    
    skeleton: true,
     statusValues: ['YES', 'NO'],
     genderValues:['Male','Female'],
    /*breadcrumb*/
    items: [
      {
        text: "Masters",
        disabled: false,
        href: "masters"
      },
      {
        text: "Employee Master",
        disabled: false,
        href: "employeemaster"
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
    employeeName: [
      v => !!v || "Employee name is required",
      v => (v && v.length >= 3) || "Name must be at least 3 character"
    ],
vendorContact: [
      v => !!v || "Phone Number is required",
      v => (v && v.length >= 12) && (v.length <=15)|| "Invalid Phone number"
    ],
   
    employeeAdress: [
      v => !!v || " Address is required",
      v => (v && v.length >= 10) || "Address must be at least 10 character"
    ],
    employeeStatus: [
      v => !!v || " YES / NO is required",
      v => (v && v.length >= 2) || "Staus is Require"
    ],
    genderStatus: [
      v => !!v || " Gender is required",
      v => (v && v.length >= 2) || "Gender is Require"
    ],
    employeeEmail: [
      v => !!v || " Email is required",
      //v => (v && v.length >= 10) || "Email is Require"
      v => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(v) || 'Invalid e-mail.'
          },
    ],
  employeeAge: [
      v => !!v || " Age is required",
      v => (v && v.length == 2) && (v.length < 140)|| "Invalid"
    ],
    employeeDOB: [
      v => !!v || " DOB is required",
      v => (v && v.length >= 10) || "DOB is Require"
    ],
employeeJOD: [
      v => !!v || " Joining Date is required",
      v => (v && v.length >= 7) || "Joining Date is Require"
    ],
    employeepassport: [
      v => !!v || " Passport Number is required",
      v => (v && v.length >= 9) || "Enter Valid Passposrt Number"
    ],
    employeeAadhar: [
      v => !!v || " Aadhar is required",
      v => (v && v.length == 12) || "Enter Valid AADHAR "
    ],
    employeePan: [
      v => !!v || " PAN Number is required",
      v => (v && v.length == 10) || "Enter Valid PAN Number "
    ],
    employeeBlood: [
      v => !!v || " Blood Group",
      v => (v && v.length >= 2) || "Blood Group"
    ],
    employeeNationality: [
      v => !!v || " Employee Nationality"
      
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
        text: "Employee Name",
        align: "left",
        sortable: false,
        value: "employee_name",
        width: 50
      },
      {
        text: "Phone No",
        align: "left",
        sortable: false,
        value: "phone_number",
        width: 50
      },
      {
        text: "Email",
        align: "left",
        sortable: false,
        value: "email_id",
        width: 50
      },
      
      {
        text: "Date Of Birth",
        align: "left",
        sortable: false,
        value: "dob",
        width: 50
      },
       {
        text: "Age",
        align: "left",
        sortable: false,
        value: "age",
        width: 20
      },
       {
        text: "Gender",
        align: "left",
        sortable: false,
        value: "gender",
        width: 30
      },
      {
        text: "Date Of Join",
        align: "left",
        sortable: false,
        value: "joining_date",
        width: 50
      },
      {
        text: "Nationality",
        align: "left",
        sortable: false,
        value: "nationality",
        width: 30
      },
      {
        text: "Aadhar Number",
        align: "left",
        sortable: false,
        value: "aadhar_number",
        width: 50
      },
      {
        text: "PAN Number",
        align: "left",
        sortable: false,
        value: "pan_number",
        width: 50
      },
      {
        text: "Passport Number",
        align: "left",
        sortable: false,
        value: "passport_number",
        width: 50
      },
      {
        text: "Blood Group",
        align: "left",
        sortable: false,
        value: "blood_group",
        width: 25
      },
        {
        text: "Present Address",
        align: "left",
        sortable: false,
        value: "present_address",
        width: 50
      },
      
      {
        text: "Permenant Address",
        align: "left",
        sortable: false,
        value: "permenant_address",
        width: 75
      },
       
      {
        text: "Status",
        align: "left",
        sortable: false,
        value: "status",
        width: 30
      }

      
    ],
    groups: [],

    editedIndex: -1,
    editedItem: {
      employee_name: "",
      _id: "",
      phone_number:"",
      email_id:"",
      present_address:"",
      permenant_address:"",
      age:"",
      dob:"",
      joining_date:"",
      status:"Active",
      gender:"",
      nationality:"",
      blood_group:"",
      pan_number:"",
      aadhar_number:"",
      passport_number:"",

    },
    defaultItem: {
      employee_name: "",
      _id: "",
      phone_number:"",
      email_id:"",
      present_address:"",
      permenant_address:"",
      age:"",
      dob:"",
      joining_date:"",
      status:"Acticve",
      gender:"",
      nationality:"",
      blood_group:"",
      pan_number:"",
      aadhar_number:"",
      passport_number:"",
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
      return this.editedIndex === -1 ? " Add Employee " : "Edit Employee Details";
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
     employee_name: "Ravi",
      
      phone_number:"95551255548979",
      email_id:"sedots@gmail.com",
      permenant_address:"Bandhar,Andhra",
      nationality:"Indian",
      passport_number:"GST45GY67",
      present_address:"Somajiguda,Hyderabad",
      blood_group:"O+",
      status:"Yes",
      gender:"Male",
      age:34,
      aadhar_number:"12645535365585",
      pan_number:"FD4554234T",
      dob:"02/12/1990",
      joining_date:"12/05/2016"
        }
      ];
    },

    editItem(item) {
      this.status_value=true;
      this.editedIndex = this.groups.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.statusValues = ["YES","NO"];
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