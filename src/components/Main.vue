<template>
  <v-app>
    <Navbar />
    <v-container fluid class="grey lighten-5">
      <router-view />
      <div v-show="getRouteName == 'Main'">
        <HomePage />
      </div>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";
import HomePage from "../components/home/homepage";
export default {
  components: {
    Navbar,
    HomePage
  },
  props: {
    source: String
  },
  computed: {
    getRouteName() {
      return this.$route.name;
    }
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false
  })
};
</script>