import Vue from "vue";
import Router from "vue-router";
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
      path: "/list",
      component: List
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
        // const id  = this.$store.reps.create();
        next(`/workout/${id}/edit`);
      }
    }
  ],
  linkActiveClass: "is-active",
  linkExactActiveClass: "is-active"
});
