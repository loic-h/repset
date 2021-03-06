import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Stopwatch from "@/views/Stopwatch";
import Home from "@/views/Home";
import Detail from "@/views/workout/Detail";
import Run from "@/views/workout/Run";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/stopwatch",
      component: Stopwatch
    },
    {
      path: "/workouts/:id",
      component: Detail
    },
    {
      path: "/workouts/:id/run",
      component: Run
    },
    {
      path: "/create",
      beforeEnter: (to, from, next) => {
        store.dispatch("workouts/create", { label: "New Workout" })
          .then(id => next(`/workouts/${id}`));
      }
    }
  ],
  linkActiveClass: "is-active",
  linkExactActiveClass: "is-active"
});
