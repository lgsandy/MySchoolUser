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
      <!-- <v-container fluid> -->

      <!-- <v-col class="`d-flex justify-${j} mb-6`" cols="12" sm="6">
        <v-combobox
          v-model="model"
          hide-selected
          label="Search"
          prepend-icon="mdi-database-search"
          solo
        >
          <v-spacer></v-spacer>
          <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
            Clear
            <v-icon right>mdi-close-circle</v-icon>
          </v-btn>
        </v-combobox>
      </v-col>-->
      <!-- </v-container> -->
      <!-- search bar -->
    </v-row>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="4">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card
              id="card"
              :elevation="hover ? 15 : 2"
              outlined
              class="mx-auto"
              height="120"
              max-width="600"
              @click="bgmscontroller"
            >
              <v-card-title>Add Documents</v-card-title>
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
              @click="StoreMaster"
            >
              <v-card-title>Search Documents</v-card-title>
              <v-card-text>To create and handle stores.</v-card-text>
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
        text: "Document Management",
        disabled: false,
        href: "dms"
      },
      {
        text: "Documents Management",
        disabled: false,
        href: "documentmanagement"
      }
    ],
    /*breadcrumb*/
    show: false,
    fab: false
  }),
  methods: {
    // bgmscontroller() {
    //   this.$router.push("/bgms");
    // },

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