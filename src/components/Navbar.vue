<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      class="grey lighten-4"
      :mini-variant.sync="mini"
      :expand-on-hover="hover"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-avatar>
            <v-icon large>account_circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">{{userName.name}}</v-list-item-title>
            <v-list-item-subtitle>{{userName.mobileNo}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-tooltip right>
            <template v-slot:activator="{ on:tooltip }">
              <v-btn icon @click.stop="mini = !mini" v-on="{ ...tooltip}">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </template>
            <span>Collapse</span>
          </v-tooltip>
        </v-list-item>

        <v-divider class="mx-4"></v-divider>
        <sequential-entrance fromTop delay="60">
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
              sub-group
              no-action
            >
              <template v-slot:activator>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>

              <v-list-item v-for="(child, i) in item.children" :key="i" router :to="child.id">
                <v-list-item-action>
                  <v-icon>class</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ child.id }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <v-list-item v-else :key="item.text" router :to="item.link">
              <v-list-item-action>
                <v-icon :color="item.color">{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="item.link"></v-divider>
          </template>
        </sequential-entrance>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <router-link tag="span" to="/home">
            <span class="title ml-3 mr-5" v-on="{ ...tooltip }">{{userName.school}}</span>
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
          <v-btn icon rounded dark v-on="{ ...tooltip }" @click="logoutUser">
            <v-icon>exit_to_app</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-app-bar>
  </nav>
</template>
<script>
import router from "../router/index";
import { db } from "../components/fireBase/firebaseauth";
export default {
  name: "Navbar",
  props: {
    source: String
  },
  // components: { Users },
  data: () => ({
    userName: "",
    hover: false,
    dialog: false,
    drawer: null,
    mini: false,
    items: [
      {
        icon: "home",
        text: "Home",
        "icon-alt": "home",
        link: "/home",
        color: "blue darken-2"
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
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Classes",
        model: false,
        children: []
      }
    ]
  }),
  computed: {},
  created() {
    this.userName = JSON.parse(localStorage.userLoginInfo);
    this.loadClassesFromDb();
  },
  methods: {
    logoutUser() {
      localStorage.removeItem("userLoginInfo");
      router.push("/");
    },
    loadClassesFromDb() {
      let value = JSON.parse(localStorage.userLoginInfo);
      console.log(value);
      let ref = db
        .collection("allschool")
        .doc(value.country)
        .collection(value.state)
        .doc(value.district)
        .collection(value.school)
        .doc("allClass")
        .collection("Classes");
      ref.onSnapshot(res => {
        if (res && res.docs && res.docs.length) {
          this.items[6].children = res.docs;
        }
      });
    }
  }
};
</script>
