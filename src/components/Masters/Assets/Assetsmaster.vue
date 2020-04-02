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
      <!-- Scroll to top Button -->
      <!-- <v-card-text> -->
      <v-card id="mainCard">
        <v-data-table
          loading-text="Loading... Please wait"
          :loading="loading"
          :items="assets"
          :search="search"
        >
          <!-- :headers="headers" -->
          <template v-slot:top>
            <v-dialog v-model="dialog" persistent>
              <template v-slot:activator="{ on }">
                <v-card-title>
                  <h4>Assets Details</h4>
                  <v-divider class="mx-2" vertical dark></v-divider>
                  <v-btn small dark fab left color="pink" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-divider class="mx-2" inset vertical></v-divider>

                  <div class="flex-grow-1"></div>
                  <v-text-field
                    v-model="search"
                    placeholder="Search Asset Name"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
              </template>
              <v-card>
                <v-stepper v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step
                      :editable="editable"
                      :complete="e1 > 1"
                      step="1"
                    >Basic Information</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                      :editable="editable"
                      :complete="e1 > 2"
                      step="2"
                    >Additional Information</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :editable="editable" :complete="e1 > 3" step="3">Invoice</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :editable="editable" step="4">Others Information</v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <v-card class="mb-12" color="white">
                        <v-container>
                          <v-form ref="form">
                            <v-row align="center">
                              <v-col cols="12" md="4">
                                <v-select
                                  :items="assetTypes"
                                  :rules="assetRules"
                                  v-model="editedItem.asset_type"
                                  label="Asset Type"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-select
                                  :items="assetGroup"
                                  :rules="assetRules"
                                  v-model="editedItem.asset_group"
                                  label="Asset Group"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-select
                                  :items="assetsubGroup"
                                  :rules="assetRules"
                                  v-model="editedItem.asset_sub_group"
                                  label="Asset Sub Group"
                                ></v-select>
                              </v-col>
                            </v-row>
                            <v-row align="center">
                              <v-col cols="12" md="4">
                                <v-select
                                  :items="assetsubGroup2"
                                  :rules="assetRules"
                                  v-model="editedItem.asset_sub_group2"
                                  label="Asset Sub Group 2"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="assetRules"
                                  v-model="editedItem.asset_name"
                                  label="Asset Name"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.chasis_number"
                                  label="Chasis Number"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row align="center">
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.model_number"
                                  label="Model Number"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="assetRules"
                                  v-model="editedItem.company"
                                  label="Company"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.serial_number"
                                  label="Serial Number"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row align="center">
                              <v-col cols="12" md="4">
                                <v-switch
                                  v-model="registration_status"
                                  :label="`Registration status`"
                                  @change="selectRegistrationStatus"
                                ></v-switch>
                                <!-- <v-select
                                  :items="assetTypes"
                                  :rules="assetRules"
                                  v-model="editedItem.registration_status"
                                  label="Registration status"
                                ></v-select>-->
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.registration_number"
                                  label="Registration Number"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.engine_number"
                                  label="Engine Number"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <div align="center">
                              <v-row>
                                <v-col>
                                  <v-btn color="error" @click="closeDialog">Close</v-btn>
                                </v-col>
                                <v-col>
                                  <v-btn color="warning" @click="reset1">Reset</v-btn>
                                </v-col>

                                <v-col>
                                  <v-btn color="primary" @click="next">Continue</v-btn>
                                </v-col>
                              </v-row>
                            </div>
                          </v-form>
                        </v-container>
                      </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <v-card class="mb-12" color="white">
                        <v-container>
                          <v-form ref="form2">
                            <v-row align="center">
                              <v-col cols="12" md="4">
                                <v-switch
                                  v-model="insurance_status"
                                  :label="`Insurance status`"
                                  @change="selectInsuranceStatus"
                                ></v-switch>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-switch
                                  v-model="emi_status"
                                  :label="`EMI status`"
                                  @change="selectEMIStatus"
                                ></v-switch>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-menu
                                  v-model="menu"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="editedItem.purchasing_date"
                                      :rules="dateRules"
                                      label="Purchasing Date"
                                      prepend-inner-icon="event"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="editedItem.purchasing_date"
                                    @input="menu = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                            </v-row>
                            <v-row align="center">
                              <v-col cols="12" md="4">
                                <v-menu
                                  v-model="menu2"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="editedItem.warranty_upto"
                                      :rules="dateRules"
                                      label="Warranty Upto"
                                      prepend-inner-icon="event"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="editedItem.warranty_upto"
                                    @input="menu2 = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.warranty_years"
                                  label="Warranty Years"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.life_of_asset_years"
                                  label="Life of Asset Years"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row align="center">
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="assetRules"
                                  v-model="editedItem.fuel_type"
                                  label="Fuel Type"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.fuel_tank_capacity"
                                  label="Fuel Tank Capacity"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.purchase_value"
                                  label="Purchase Value"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.book_value"
                                  label="Book Value"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-menu
                                  v-model="menu3"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="editedItem.book_value_date"
                                      :rules="dateRules"
                                      label="Book Value Date"
                                      prepend-inner-icon="event"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="editedItem.book_value_date"
                                    @input="menu3 = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-textarea
                                  rows="3"
                                  outlined
                                  label="Description"
                                  v-model="editedItem.description"
                                ></v-textarea>
                              </v-col>
                            </v-row>
                            <div align="center">
                              <v-row>
                                <v-col>
                                  <v-btn color="error" @click="closeDialog">Close</v-btn>
                                </v-col>
                                <v-col>
                                  <v-btn color="warning" @click="reset2">Reset</v-btn>
                                </v-col>
                                <v-col>
                                  <v-btn color="primary" @click="next">Continue</v-btn>
                                </v-col>
                              </v-row>
                            </div>
                          </v-form>
                        </v-container>
                      </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <v-card class="mb-12" color="white">
                        <v-container>
                          <v-form ref="form3">
                            <v-row align="center">
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.invoice_no"
                                  label="Invoice No"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-menu
                                  v-model="menu4"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="editedItem.invoice_date"
                                      :rules="dateRules"
                                      label="Invoice Date"
                                      prepend-inner-icon="event"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="editedItem.invoice_date"
                                    @input="menu4 = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-select
                                  :items="suppliers"
                                  :rules="assetRules"
                                  v-model="editedItem.supplier_name"
                                  item-text="supplier_name"
                                  item-value="supplier_id"
                                  label="Supplier Name"
                                ></v-select>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" md="4">
                                <v-file-input
                                  v-model="editedItem.invoice_copy_upload_status"
                                  show-size
                                  label="Invoice Upload Status"
                                ></v-file-input>

                                <!-- <v-radio-group
                                  label="Invoice Upload Status"
                                  v-model="editedItem.invoice_copy_upload_status"
                                  :mandatory="false"
                                >
                                  <v-row>
                                    <v-col cols="12" sm="4">
                                      <v-radio label="Yes" value="Yes"></v-radio>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                      <v-radio label="No" value="No"></v-radio>
                                    </v-col>
                                  </v-row>
                                </v-radio-group>-->
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-file-input
                                  v-model="editedItem.warranty_card_upload_status"
                                  show-size
                                  label="Warranty Card Upload Status"
                                ></v-file-input>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-file-input
                                  v-model="editedItem.manual_upload_status"
                                  show-size
                                  label="Manual Upload Status"
                                ></v-file-input>
                              </v-col>
                            </v-row>
                            <v-row align="center">
                              <v-col cols="12" md="4">
                                <v-file-input
                                  v-model="editedItem.parts_catalogue_upload_status"
                                  show-size
                                  label="Parts Catalogue Upload Status"
                                ></v-file-input>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-textarea
                                  rows="3"
                                  outlined
                                  label="Supplier Address"
                                  v-model="editedItem.supplier_address"
                                ></v-textarea>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-textarea
                                  rows="3"
                                  outlined
                                  label="Service Center Address"
                                  v-model="editedItem.service_center_address"
                                ></v-textarea>
                              </v-col>
                            </v-row>

                            <v-row align="center">
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.service_contact_number1"
                                  label="Service Contact Number1"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>

                              <v-col cols="12" md="4">
                                <v-text-field
                                  v-model="editedItem.service_contact_number2"
                                  label="Service Contact Number2"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="numberRules"
                                  v-model="editedItem.service_frequency"
                                  label="Service Frequency"
                                  type="number"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                            </v-row>

                            <div align="center">
                              <v-row>
                                <v-col>
                                  <v-btn color="error" @click="closeDialog">Close</v-btn>
                                </v-col>
                                <v-col>
                                  <v-btn color="warning" @click="reset3">Reset</v-btn>
                                </v-col>
                                <v-col>
                                  <v-btn color="primary" @click="next">Continue</v-btn>
                                </v-col>
                              </v-row>
                            </div>
                          </v-form>
                        </v-container>
                      </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                      <v-card class="mb-12" color="white">
                        <v-container>
                          <v-form ref="form4">
                            <v-row align="center">
                              <v-col cols="12" md="4">
                                <v-text-field
                                  :rules="assetRules"
                                  v-model="editedItem.asset_assign_to"
                                  label="Asset Assign To"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-select
                                  :items="assetsConditions"
                                  :rules="assetRules"
                                  v-model="editedItem.asset_condition"
                                  item-text="asset_condition"
                                  item-value="asset_condition"
                                  label="Asset Condition"
                                ></v-select>
                              </v-col>

                              <v-col col="12" md="4">
                                <v-text-field
                                  v-model="editedItem.vendor_details"
                                  label="Vendor Details"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" md="4">
                                <v-radio-group
                                  :rules="assetRules"
                                  label="Asset Ownership"
                                  v-model="editedItem.asset_ownership	"
                                  :mandatory="false"
                                >
                                  <v-row>
                                    <v-col cols="12" sm="4">
                                      <v-radio label="Own" value="Own"></v-radio>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                      <v-radio label="Lease" value="Lease"></v-radio>
                                    </v-col>
                                  </v-row>
                                </v-radio-group>
                              </v-col>

                              <v-col cols="12" md="4">
                                <v-menu
                                  v-model="menu5"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="editedItem.leased_start_date"
                                      :rules="dateRules"
                                      label="Leased Start Date"
                                      prepend-inner-icon="event"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="editedItem.leased_start_date"
                                    @input="menu5 = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-menu
                                  v-model="menu6"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="editedItem.leased_end_date"
                                      :rules="dateRules"
                                      label="Leased End Date"
                                      prepend-inner-icon="event"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="editedItem.leased_end_date"
                                    @input="menu6 = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" md="4">
                                <v-radio-group
                                  :rules="permissionRules"
                                  label="Store Issues Fuel"
                                  v-model="editedItem.store_issues_fuel	"
                                  :mandatory="false"
                                >
                                  <v-row>
                                    <v-col cols="12" sm="6">
                                      <v-radio label="permitted" value="permitted"></v-radio>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                      <v-radio label="Not permit" value="not-permitted"></v-radio>
                                    </v-col>
                                  </v-row>
                                </v-radio-group>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-radio-group
                                  :rules="permissionRules"
                                  label="Store Issues Spares"
                                  v-model="editedItem.store_issues_spares	"
                                  :mandatory="false"
                                >
                                  <v-row>
                                    <v-col cols="12" sm="6">
                                      <v-radio label="permitted" value="permitted"></v-radio>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                      <v-radio label="Not permit" value="not-permitted"></v-radio>
                                    </v-col>
                                  </v-row>
                                </v-radio-group>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-radio-group
                                  :rules="permissionRules"
                                  label="Store Garage Maintenance"
                                  v-model="editedItem.store_garage_maintenance	"
                                  :mandatory="false"
                                >
                                  <v-row>
                                    <v-col cols="12" sm="6">
                                      <v-radio label="permitted" value="permitted"></v-radio>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                      <v-radio label="Not permit" value="not-permitted"></v-radio>
                                    </v-col>
                                  </v-row>
                                </v-radio-group>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" md="4">
                                <v-radio-group
                                  :rules="assetRules"
                                  label="Write Off Status"
                                  v-model="editedItem.write_off_status	"
                                  :mandatory="false"
                                >
                                  <v-row>
                                    <v-col cols="12" sm="4">
                                      <v-radio label="Yes" value="Yes"></v-radio>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                      <v-radio label="No" value="No"></v-radio>
                                    </v-col>
                                  </v-row>
                                </v-radio-group>
                              </v-col>

                              <v-col cols="12" md="4">
                                <v-select
                                  :items="issueStatus"
                                  :rules="assetRules"
                                  v-model="editedItem.store_issues_fuel_rate_status"
                                  label="Issues Fuel Rate Status"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" md="4">
                                <v-select
                                  :items="issueStatus"
                                  :rules="assetRules"
                                  v-model="editedItem.store_issues_spares_rate_status"
                                  label="Issues Spares Rate Status"
                                ></v-select>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" md="4">
                                <v-select
                                  :items="issueStatus"
                                  :rules="assetRules"
                                  v-model="editedItem.store_garage_maintenance_rate_status"
                                  label="Issues Maintenance Rate Status"
                                ></v-select>
                              </v-col>
                            </v-row>

                            <div align="center">
                              <v-row>
                                <v-col>
                                  <v-btn color="error" @click="closeDialog">Close</v-btn>
                                </v-col>
                                <v-col>
                                  <v-btn color="warning" @click="reset4">Reset</v-btn>
                                </v-col>
                                <v-col>
                                  <v-scale-transition>
                                    <div v-if="!loading" class="text-center">
                                      <v-btn color="success" @click="save">Save</v-btn>
                                    </div>
                                  </v-scale-transition>
                                </v-col>
                              </v-row>
                            </div>
                          </v-form>
                        </v-container>
                      </v-card>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-card>
            </v-dialog>
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
      <!-- </v-card-text> -->
      <!-- </v-container> -->
    </v-app>
  </div>
</template>
<script>
export default {
  data: () => ({
    registration_status: false,
    insurance_status: false,
    emi_status: false,

    /*breadcrumb*/
    items: [
      {
        text: "Masters",
        disabled: false,
        href: "masters"
      },
      {
        text: "Assets Master",
        disabled: false,
        href: "assets_master"
      }
    ],
    /*breadcrumb*/

    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    menu6: false,

    dialog: false,
    overlay: false,
    fab: false,
    snackbar: false,
    text: "",
    color: "",
    loading: false,
    search: "",
    e1: 0,
    editable: true,
    assetRules: [v => !!v || "Name is required"],
    numberRules: [v => !!v || "Number is required"],
    dateRules: [v => !!v || "Date is required"],
    permissionRules: [v => !!v || "permission Required"],
    // headers: [
    //   {
    //     text: "Sr.No",
    //     align: "left",
    //     sortable: false,
    //     value: "sr_no"
    //   },
    //   { text: "Actions", value: "action", sortable: false, width: 110 },
    //   {
    //     text: "Farmer Name",
    //     align: "left",
    //     sortable: false,
    //     value: "farmer_name",
    //     width: 200
    //   },
    //   // { text: 'Farmer id', value: 'farmer_id',sortable: false},
    //   {
    //     text: "Land id",
    //     value: "land_id",
    //     sortable: false,
    //     width: 100,
    //     align: "end"
    //   },
    //   {
    //     text: "Land Sub id",
    //     value: "land_sub_id",
    //     sortable: false,
    //     width: 120,
    //     align: "end"
    //   },
    //   { text: "State", value: "state_name", sortable: false, width: 140 },
    //   {
    //     text: "District.",
    //     value: "district_name",
    //     sortable: false,
    //     width: 140
    //   },
    //   { text: "Mandal.", value: "mandal_name", sortable: false, width: 140 },
    //   { text: "Village", value: "village_name", sortable: false, width: 140 },
    //   {
    //     text: "Total Land Area(H.A).",
    //     value: "total_area",
    //     sortable: false,
    //     width: 140,
    //     align: "end"
    //   },
    //   {
    //     text: "Number Of Sampling",
    //     value: "no_of_sampling",
    //     sortable: false,
    //     width: 140,
    //     align: "end"
    //   },
    //   {
    //     text: "Total Number Of Sampling",
    //     value: "total_no_of_sampling",
    //     sortable: false,
    //     width: 140,
    //     align: "end"
    //   },
    //   {
    //     text: "Number Of Sampling For Gap Filling",
    //     value: "no_of_sampling_for_gap_filling",
    //     sortable: false,
    //     width: 140,
    //     align: "end"
    //   },
    //   {
    //     text: "Plantation Area",
    //     value: "plantation_area",
    //     sortable: false,
    //     align: "end"
    //   },
    //   {
    //     text: "Net Plantation Area",
    //     value: "net_plantation_area",
    //     sortable: false,
    //     width: 140,
    //     align: "end"
    //   },
    //   {
    //     text: "Date Of Plantation",
    //     value: "date_of_plantation",
    //     sortable: false,
    //     width: 140,
    //     align: "end"
    //   },
    //   {
    //     text: "Survey Number",
    //     value: "survey_no",
    //     sortable: false,
    //     width: 140,
    //     align: "end"
    //   },
    //   { text: "Status", value: "status", sortable: false, width: 140 },
    //   {
    //     text: "Status Flag",
    //     value: "states_flag",
    //     sortable: false,
    //     width: 140
    //   },
    //   {
    //     text: "Irrigation Type",
    //     value: "irrigation_type",
    //     sortable: false,
    //     width: 140
    //   },
    //   {
    //     text: "Source Of Irrigation",
    //     value: "source_of_irrigation",
    //     sortable: false,
    //     width: 140
    //   },
    //   {
    //     text: "Electricity",
    //     value: "electricity",
    //     sortable: false,
    //     width: 140
    //   },
    //   {
    //     text: "Number Of Borewells",
    //     value: "no_of_bore_wells",
    //     sortable: false,
    //     width: 140,
    //     align: "end"
    //   }
    // ],
    //status: ["Yes", "No"],
    assets: [],
    assetTypes: [],
    assetGroup: [],
    assetsubGroup: [],
    assetsubGroup2: [],
    suppliers: [],
    assetsConditions: [],
    issueStatus: ["Fixed", "Current", "Extended"],
    // banks:['State Bank of India','Bank of Baroda','Bank of India'],
    editedIndex: -1,
    editedItem: {
      asset_type: "",
      asset_group: "",
      asset_sub_group: "",
      asset_sub_group2: "",
      asset_name: "",
      chasis_number: "",
      model_number: "",
      company: "",
      serial_number: "",
      registration_status: "",
      registration_number: "",
      engine_number: "",
      insurance_status: "",
      emi_status: "",
      purchasing_date: "",
      warranty_upto: " ",
      warranty_years: "",
      life_of_asset_years: "",
      fuel_type: "",
      fuel_tank_capacity: "",
      purchase_value: "",
      book_value: "",
      book_value_date: "",
      description: "",
      invoice_no: "",
      invoice_date: "",
      supplier_name: "",
      invoice_copy_upload_status: "",
      warranty_card_upload_status: "",
      manual_upload_status: "",
      parts_catalogue_upload_status: "",
      supplier_address: "",
      service_center_address: "",
      service_contact_number1: "",
      service_contact_number2: "",
      service_frequency: "",
      asset_assign_to: "",
      asset_condition: "",
      vendor_details: "",
      asset_ownership: "",
      leased_start_date: "",
      leased_end_date: "",
      store_issues_fuel: "",
      store_issues_spares: "",
      store_garage_maintenance: "",
      store_issues_fuel_rate_status: "",
      store_issues_spares_rate_status: "",
      store_garage_maintenance_rate_status: ""
    },
    defaultItem: {
      asset_type: "",
      asset_group: "",
      asset_sub_group: "",
      asset_sub_group2: "",
      asset_name: "",
      chasis_number: "",
      model_number: "",
      company: "",
      serial_number: "",
      registration_status: "",
      registration_number: "",
      engine_number: "",
      insurance_status: "",
      emi_status: "",
      purchasing_date: "",
      warranty_upto: " ",
      warranty_years: "",
      life_of_asset_years: "",
      fuel_type: "",
      fuel_tank_capacity: "",
      purchase_value: "",
      book_value: "",
      book_value_date: "",
      description: "",
      invoice_no: "",
      invoice_date: "",
      supplier_name: "",
      invoice_copy_upload_status: "",
      warranty_card_upload_status: "",
      manual_upload_status: "",
      parts_catalogue_upload_status: "",
      supplier_address: "",
      service_center_address: "",
      service_contact_number1: "",
      service_contact_number2: "",
      service_frequency: "",
      asset_assign_to: "",
      asset_condition: "",
      vendor_details: "",
      asset_ownership: "",
      leased_start_date: "",
      leased_end_date: "",
      store_issues_fuel: "",
      store_issues_spares: "",
      store_garage_maintenance: "",
      store_issues_fuel_rate_status: "",
      store_issues_spares_rate_status: "",
      store_garage_maintenance_rate_status: ""
    }
  }),

  computed: {
    // formTitle() {
    //   return this.editedIndex === -1 ? "New Item" : "Edit Item";
    // }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    setTimeout(() => {
      this.assets = [];
      this.initialize();
    }, 1000);
  },

  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.assets.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.assets.indexOf(item);

      confirm("Are you sure you want to delete this item?") &&
        this.assets.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    next() {
      if (this.$refs.form.validate()) {
        this.e1 = 2;
      }
      if (this.$refs.form2.validate()) {
        this.e1 = 3;
      }
      if (this.$refs.form3.validate()) {
        this.e1 = 4;
      }
    },

    save() {
      if (this.$refs.form4.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.assets[this.editedIndex], this.editedItem);
          console.log(this.editedItem);
        }
        this.close();
      }
    },
    closeDialog() {
      this.dialog = false;
    },
    reset1() {
      this.$refs.form.reset();
    },

    reset2() {
      this.$refs.form2.reset();
    },

    reset3() {
      this.$refs.form3.reset();
    },
    reset4() {
      this.$refs.form4.reset();
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
    selectRegistrationStatus() {
      if (this.registration_status == true) {
        this.editedItem.registration_number = 123456;
      } else {
        this.editedItem.registration_number = "";
      }
    },
    selectInsuranceStatus() {},
    selectEMIStatus() {}
  }
};
</script>
<style scoped>
#mainCard {
  padding-top: 8px;
}
</style>
