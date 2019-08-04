import Vue from "vue";
import Router from "vue-router";
import Stopwatch from "@/views/Stopwatch";
import Workout from "@/views/Workout";
import repsStore from "@/stores/reps";

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
      path: "/workout/:id",
      component: Workout
    },
    {
      path: "/workout/:id/edit",
      component: Workout,
      props: {
        edit: true
      }
    },
    {
      path: "/create",
      beforeEnter: (to, from, next) => {
        const id  = repsStore.create();
        next(`/workout/${id}/edit`);
      }
    }
  ],
  linkActiveClass: "is-active",
  linkExactActiveClass: "is-active"
});
