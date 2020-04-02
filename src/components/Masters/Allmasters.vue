<template>
  <div>
    <!-- <v-app id="inspire"> -->
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
    <!-- search bar -->
    <v-row>
    </v-row>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" open-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="officeOrganisationMaster"
            >
              <v-card-title>Office Organization Master</v-card-title>
              <v-card-text>To set up userwise hierarchy</v-card-text>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="projectMaster"
            >
              <v-card-title>Project Master</v-card-title>
              <v-card-text>To set up New projects and to manage.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="userMaster"
            >
              <v-card-title>User Master</v-card-title>
              <v-card-text>To create and handle users.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="employeeMaster"
            >
              <v-card-title>Employee Master</v-card-title>
              <v-card-text>To create and manage employees.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="designationMaster"
            >
              <v-card-title>Designation Master</v-card-title>
              <v-card-text>To create and handle designations.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="officeMaster"
            >
              <v-card-title>Office Master</v-card-title>
              <v-card-text>To create and handle Office.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="siteMaster"
            >
              <v-card-title>Site Master</v-card-title>
              <v-card-text>To create and handle sites.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="storeMaster"
            >
              <v-card-title>Store Master</v-card-title>
              <v-card-text>To create and handle stores.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="plantMaster"
            >
              <v-card-title>Plant Master</v-card-title>
              <v-card-text>To create and handle plants.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="assetsMaster"
            >
              <v-card-title>Assets Master</v-card-title>
              <v-card-text>To create and handle assests.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="materialMaster"
            >
              <v-card-title>Material Master</v-card-title>
              <v-card-text>To create and handle materials.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="groupMaster"
            >
              <v-card-title>Group Master</v-card-title>
              <v-card-text>To create and handle Groups -(Top level groups).</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
         <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="subGroupMaster"
            >
              <v-card-title>Sub Group Master</v-card-title>
              <v-card-text>To create and handle Groups -(Top level groups).</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
         <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="subGroup2Master"
            >
              <v-card-title>Sub Group 1 Master</v-card-title>
              <v-card-text>To create and handle Groups -(Top level groups).</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="400"
              @click="vendorMaster"
            >
              <v-card-title>Vendor Master</v-card-title>
              <v-card-text>To create and handle Vendors.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="400"
              @click="mixDesignMaster"
            >
              <v-card-title>Mix Design Master</v-card-title>
              <v-card-text>To create and handle Mix designs.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="400"
              @click="mixDesignMaterialMaster"
            >
              <v-card-title>Mix Design Materials Master</v-card-title>
              <v-card-text>To create and handle mix design materials.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="400"
              @click="subContractorMaster"
            >
              <v-card-title>Sub Contractor Master</v-card-title>
              <v-card-text>To create and handle sub contractors.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="400"
              @click="subContractorAssetsMaster"
            >
              <v-card-title>Sub Contractor Assests Master</v-card-title>
              <v-card-text>To create and handle sub contractors assests.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="400"
              @click="leaseConditionPriceMaster"
            >
              <v-card-title>Lease Condition Price Master</v-card-title>
              <v-card-text>To create and handle leases of sub contractors.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="400"
              @click="depreciationStandardsMaster"
            >
              <v-card-title>Depreciation Standards Master</v-card-title>
              <v-card-text>To create and handle depreciation.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="400"
              @click="taxSettingsMaster"
            >
              <v-card-title>Tax Settings Master</v-card-title>
              <v-card-text>To create a new and edit the existing tax values.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="400"
              @click="toDos"
            >
              <v-card-title>To Do's</v-card-title>
              <v-card-text>To create a new and edit the existing tax values.</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card-text>
    <!-- </v-app> -->
  </div>
</template>
<script>
export default {
  data: () => ({
    /*breadcrumb*/
    items: [
      {
        text: "Masters",
        disabled: false,
        href: "masters"
      },{}
    ],
    /*breadcrumb*/
    show: false,
    fab: false
  }),
  methods: {
    officeOrganisationMaster() {
     
      this.$router.push("/office_organisatio");
    },
    projectMaster() {
      // this.$router.push("/district");
    },
    userMaster() {
      // this.$router.push("/mandal");
    },
    employeeMaster() {
      this.$router.push("/employeemaster");
    },
    designationMaster() {
      this.$router.push("/designationmaster");
    },
    officeMaster(){
      this.$router.push("/officeMaster");
    },
    siteMaster() {
      // this.$router.push("/village");
    },
    storeMaster() {
      // this.$router.push("/village");
    },
    plantMaster() {
      // this.$router.push("/village");
    },
    assetsMaster() {
     this.$router.push("/assets_master");
    },
    materialMaster() {
       this.$router.push("/material_master");
    },
    groupMaster() {
      this.$router.push("/group_master");
    },
    subGroupMaster(){
      this.$router.push("/subGroupMaster");
    },
    subGroup2Master(){
      this.$router.push("/subGroup1Master");
    },
    vendorMaster() {
     this.$router.push("/vendormaster");
    },
    toDos() {
     this.$router.push("/todo");
    },
    mixDesignMaster() {
      // this.$router.push("/village");
    },
    mixDesignMaterialMaster() {
     this.$router.push("/mixDesignMaterialMaster");
    },
    subContractorMaster() {
      // this.$router.push("/village");
    },
    subContractorAssetsMaster() {
      // this.$router.push("/village");
    },
    leaseConditionPriceMaster(){
      // this.$router.push("/village");
    },
    depreciationStandardsMaster() {
      
    },
    taxSettingsMaster() {
      // this.$router.push("/village");
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
<style>
#card {
  border-left-color: dodgerblue;
  border-left-width: 7px;
}
</style>