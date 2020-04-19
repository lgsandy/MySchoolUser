<template>
  <v-app>
    <div v-if="getRouteName != 'Login'">
      <Navbar />
    </div>
    <v-content class="ma-4">
      <router-view />
    </v-content>
    <div v-if="getRouteName != 'Login'">
      <Footer />
    </div>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "App",

  components: {
    Navbar,
    Footer
  },
  computed: {
    getRouteName() {
      console.log(this.$route.name);
      return this.$route.name;
    }
  },

  data: () => ({
    //
  })
};
</script>
