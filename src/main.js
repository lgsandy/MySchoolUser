import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import VuetifyDraggableTreeview from "vuetify-draggable-treeview";
import SequentialEntrance from "vue-sequential-entrance";
import "vue-sequential-entrance/vue-sequential-entrance.css";

//for animation
Vue.use(SequentialEntrance);

Vue.use(VuetifyDraggableTreeview);
import axious from "axios";

Vue.prototype.$http = axious;

const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["auth-token"] = token;
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
