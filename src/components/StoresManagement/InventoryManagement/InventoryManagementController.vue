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
    <!-- <v-container fluid>
      <v-col class="d-flex" cols="12" sm="6">
        <v-combobox
          v-model="model"
          hide-selected
          label="Search"
          max-width="600"
          prepend-icon="mdi-database-search"
          solo
        >
          <v-spacer></v-spacer>
          <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
            Clear
            <v-icon right>mdi-close-circle</v-icon>
          </v-btn>
        </v-combobox>
      </v-col>
    </v-container> -->
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" open-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="100"
              max-width="600"
              @click="organisationMaster"
            >
              <v-card-title>Receipts</v-card-title>
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
              height="100"
              max-width="600"
              @click="districtMaster"
            >
              <v-card-title>Issues</v-card-title>
              <v-card-text>To handle inventories.</v-card-text>
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
        text: "Stores Management",
        disabled: false,
        href: "stores_management"
      },
      {
        text: "Inventory Management",
        disabled: false,
        href: "inventoryManagement"
      }
    ],
    /*breadcrumb*/
    show: false,
    fab: false
  }),
  methods: {
    purchaseManagement() {
      this.$router.push("/purchaseManagement");
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
  border-left-color: rgb(236, 132, 34);
  border-left-width: 7px;
}
</style>