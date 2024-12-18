import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import JwPagination from "jw-vue-pagination";

Vue.config.productionTip = false;
Vue.component("jw-pagination", JwPagination);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
