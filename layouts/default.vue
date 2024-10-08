<!-- layouts/default.vue -->
<script>
import AppHeader from '~/components/AppHeader.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
  },
}
</script>

<template>
  <div class="unit-body">
    <AppHeader class="header" />
    <main class="main">
      <slot />
    </main>
    <footer class="footer">
      @Crypto Learning Club
    </footer>
  </div>
</template>

<style>

/* Layout */
.unit-body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.main {
  flex: 1;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  background-color: var(--color-background);
}

.footer {
  height: var(--size-footer-height);
  display: grid;
  place-items: center;
  background-color: var(--color-secondary);
  color: var(--color-white);
}
</style>
