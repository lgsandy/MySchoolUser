<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md4 lg3 v-for="menu in menues" :key="menu.icon">
      <v-hover v-slot:default="{ hover }" open-delay="100">
        <sequential-entrance fromLeft>
          <v-card
            class="text-center ma-3"
            :elevation="hover ? 16 : 2"
            route
            :to="menu.link"
            color="grey lighten-3"
          >
            <v-responsive class="pt-4">
              <v-avatar size="100">
                <!-- <img :src="person.avatar" alt /> -->
                <v-icon size="100" color="#7B1FA2">{{menu.icon}}</v-icon>
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{menu.text}}</div>
              <!-- <div class="grey--text">{{person.role}}</div> -->
            </v-card-text>
          </v-card>
        </sequential-entrance>
      </v-hover>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "Navbar",
  props: {
    source: String
  },
  // components: { Users },
  data: () => ({
    menues: [
      {
        icon: "person",
        text: "Principal",
        link: "principal",
        color: "blue darken-2"
      },
      {
        icon: "people_alt",
        text: "Teacher",
        link: "teachers",
        color: "blue darken-2"
      },
      {
        icon: "insert_comment",
        text: "About Us",
        link: "aboutus",
        color: "blue darken-2"
      },
      {
        icon: "contact_phone ",
        text: "Contact Us",
        link: "contactus",
        color: "blue darken-2"
      },
      {
        icon: "work",
        text: "Careers",
        link: "careers",
        color: "blue darken-2"
      }
    ]
  }),
  computed: {},
  methods: {}
};
</script>
<style scoped>
@-webkit-keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.pulse {
  -webkit-animation-name: pulse;
  animation-name: pulse;
}
</style>
