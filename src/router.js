import Vue from "vue";
import Router from "vue-router";
import Stopwatch from "@/views/Stopwatch";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/"
    },
    {
      path: "/stopwatch",
      name: "stopwatch",
      component: Stopwatch
    }
  ]
});
