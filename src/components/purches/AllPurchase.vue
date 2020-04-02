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
              @click="indentMasterHandler"
            >
              <v-card-title>Indent Materials</v-card-title>
              <v-card-text>For indent Materials Details</v-card-text>
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
    indentMasterHandler() {
     
      this.$router.push("/indent_material");
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