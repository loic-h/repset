<template>
  <input
    type="text"
    maxlength="3"
    :value="value"
    :style="{ width: `${width}em` }"
    @input="onChange"
    @focus="onFocus"
    @blur="onBlur" />
</template>

<script>
export default {
  model: {
    props: "value",
    event: "input"
  },
  props: {
    value: { type: [String, Number], default: "0" },
    edit: { type: Boolean, default: false }
  },
  data() {
    return {
      width: 1
    };
  },
  methods: {
    onChange(e) {
      this.$emit("input", e.target.value)
    },
    onFocus(e) {
      e.target.select();
    },
    onBlur() {
      this.$emit("blur")
    }
  },
  watch: {
    value:{
      handler(value) {
        this.width = (value + "").length * 0.5;
      },
      immediate: true
    }
  }
};
</script>
