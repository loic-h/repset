<template function>
  <header class="header">
    <div class="button">
      <slot name="left" />
    </div>
    <h2 class="headline">
      <slot name="headline" />
    </h2>
    <div class="button">
      <slot name="right" />
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 2rem;
  box-sizing: border-box;
  margin-bottom: 2rem;;
}

.button {
  width: 1.5rem;
  flex-shrink: 0;
}

.headline {
  flex-grow: 1;
  text-align: center;
  font-size: 1.5rem;
}

.headline > svg {
  display: inline-block;
}
</style>
