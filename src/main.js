import Vue from "vue";
import VueMaterialIcon from "vue-material-icon";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.component(VueMaterialIcon.name, VueMaterialIcon);

console.log(store.modules)

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

if (router.currentRoute.path === "/") {
  router.replace("/stopwatch");
}
