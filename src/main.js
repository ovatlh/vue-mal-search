import Vue from "vue";
import AppMALSearch from "@/AppMALSearch.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";

import SVGInject from "@iconfu/svg-inject";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(AppMALSearch),
}).$mount("#app");

Vue.use(VueAxios, axios);
Vue.use(SVGInject);
