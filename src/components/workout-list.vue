<template>
  <ul class="workout-list" v-if="items.length > 0">
    <li
      v-for="item in items"
      :key="item.path"
      class="workout">
      <router-link
        class="link"
        active-class="is-active"
        :to="item.path">
        <h3 v-html="item.label" />
        <ul class="repetition-list">
          <li class="repetition"
            v-for="(rep, index) in item.repetitions.splice(0, 5)"
            :key="index">
            <div class="duration">
              <counter :time="rep.duration" />
            </div>
            <div class="label">
              {{ rep.label }}
            </div>
          </li>
        </ul>
      </router-link>
    </li>
  </ul>
</template>

<script>
import Counter from "@/components/counter";

export default {
  components: {
    Counter
  },
  props: {
    items: { type: Array }
  }
};
</script>

<style scoped>
.workout-list {
  display: flex;
  flex-direction: column;
}

.workout {
  border-radius: var(--span-border-radius);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  overflow: hidden;
}

a {
  text-decoration: none;
}

h3 {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.workout:not(:last-child) {
  margin-bottom: 1rem;
}

.repetition-list {
  display: flex;
}

.repetition {
  color: rgba(var(--black), 0.75);
  margin-right: 2rem;
}

.duration {
  margin-bottom: 0.25rem;
}
</style>
