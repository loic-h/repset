import Vue from "vue";
import Router from "vue-router";
import Stopwatch from "@/views/Stopwatch";
import Create from "@/views/Create";

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
    },
    {
      path: "/create",
      name: "create",
      component: Create
    }
  ],
  linkActiveClass: "is-active",
  linkExactActiveClass: "is-active"
});
