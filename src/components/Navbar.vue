<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      class="grey lighten-4"
      :expand-on-hover="hover"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">{{
              userDetails
            }}</v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-divider class="mx-4"></v-divider>
        <template v-for="item in items" router :to="item.link">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              router
              :to="child.link"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item v-else :key="item.text" router :to="item.link">
            <v-list-item-action>
              <v-icon :color="item.color" >{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-divider></v-divider> -->
          <!-- <v-divider class="mx-4"></v-divider> -->
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <router-link tag="span" to="/main">
            <span class="title ml-3 mr-5" v-on="{ ...tooltip }">Ruky</span>
          </router-link>
        </template>
        <span>Home</span>
      </v-tooltip>

      <div class="flex-grow-1"></div>

      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon rounded dark v-on="{ ...tooltip }">
            <v-icon>notifications</v-icon>
          </v-btn>
        </template>
        <span>Notification</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon rounded dark v-on="{ ...tooltip }">
            <v-icon>help</v-icon>
          </v-btn>
        </template>
        <span>help</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <!-- <router-link  tag="span"> -->
          <v-btn icon rounded dark v-on="{ ...tooltip }" @click="logoutUser">
            <v-icon>exit_to_app</v-icon>
          </v-btn>
          <!-- </router-link> -->
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-app-bar>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import router from "../router/index";
export default {
  name: "Navbar",
  props: {
    source: String
  },
  // components: { Users },
  data: () => ({
    hover: false,
    dialog: false,
    drawer: null,
    items: [
      {
        icon: "home",
        text: "Home",
        "icon-alt": "home",
        link: "/",
        color: "blue darken-2"
        // children: []
      },
      {
        icon: "person",
        "icon-alt": "view_module",
        text: "Principal",
        link: "/principal"
      },
      {
        icon: "group",
        text: "Teachers",
        "icon-alt": "store",
        link: "/teachers"
      },
      {
        icon: "mail",
        text: " About Us",
        "icon-alt": "cloud_circle",
        model: false,
        link: "/aboutus"
      },
      {
        icon: "shop",
        text: "Contact Us",
        "icon-alt": "description",
        link: "/contactus"
      },
      {
        icon: "group",
        text: "Careers",
        "icon-alt": "group",
        model: false,
        link: "/careers"
      }
    ]
  }),
  computed: {
    ...mapGetters(["userDetails"])
  },
  methods: {
    ...mapActions(["logout"]),

    logoutUser() {
      localStorage.removeItem("userLoginInfo");
      router.push("/");
    }
  }
};
</script>
