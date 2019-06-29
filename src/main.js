import Vue from "vue";
import VueMaterialIcon from "vue-material-icon";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.component(VueMaterialIcon.name, VueMaterialIcon);

new Vue({
  router,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");

if (router.currentRoute.path === "/") {
  router.replace("/stopwatch");
}
