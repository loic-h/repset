import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Stopwatch from "@/views/Stopwatch";
import List from "@/views/List";
import Workout from "@/views/Workout";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/"
    },
    {
      path: "/stopwatch",
      component: Stopwatch
    },
    {
      path: "/workouts",
      component: List
    },
    {
      path: "/workouts/:id",
      component: Workout
    },
    {
      path: "/workouts/:id/edit",
      component: Workout,
      props: {
        edit: true
      }
    },
    {
      path: "/create",
      beforeEnter: (to, from, next) => {
        store.dispatch("workouts/create", { label: "New Workout" })
          .then(id => next(`/workouts/${id}/edit`));
      }
    }
  ],
  linkActiveClass: "is-active",
  linkExactActiveClass: "is-active"
});
