<template>
  <v-app>
    <Navbar />
    <!-- <v-content> -->
     <router-view />
     
    <!-- </v-content> -->
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false
  })
};
</script>