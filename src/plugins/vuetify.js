import "@fortawesome/fontawesome-free/css/all.css";
import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md" || "fa"
  },
  theme: {
    themes: {
      light: {
        primary: "#7B1FA2",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF0000",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  }
});
