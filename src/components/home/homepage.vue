<template>
  <v-row no-gutters>
    <v-col v-for="menu in menues" :key="menu.icon" cols="12" sm="3" class="pa-4">
      <sequential-entrance fromLeft>
        <v-hover v-slot:default="{ hover }" open-delay="100">
          <v-card class="mx-auto" max-width="270" :elevation="hover ? 16 : 2" route :to="menu.link">
            <v-card-title>
              <v-icon size="180" color="#7B1FA2">{{menu.icon}}</v-icon>
            </v-card-title>
            <v-card-text class="text--primary">{{menu.text}}</v-card-text>
          </v-card>
        </v-hover>
      </sequential-entrance>
    </v-col>
  </v-row>
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
