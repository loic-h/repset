<template>
  <div class="modal">
    <div class="modal_body">
      <slot />
    </div>
    <slot name="remote" />
  </div>
</template>

<style>
.modal {
  position: fixed;
  background: var(--bg-modal);
  border-radius: 1rem;
  top: var(--space);
  right: var(--space);
  left: var(--space);
  bottom: var(--space);
  padding: var(--space);
}

.modal_body {
  color: var(--black);
  display: flex;
  flex-direction: column;
  height: calc(100% - 4rem);
  width: 100%;
  justify-content: center;
  align-items: center;
}

.modal_body .link.is-active {
  color: inherit;
}
</style>
