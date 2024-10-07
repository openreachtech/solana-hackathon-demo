<!-- components/AppHeader.vue -->
<script>
import { usePhantomWallet } from '~/composables/usePhantomWallet'
import defineAppComponent from '~/app/vue/defineAppComponent'

export default defineAppComponent({
  name: 'AppHeader',
  setup () {
    const {
      publicKey,
      isConnected,
      connect,
      disconnect,
    } = usePhantomWallet()

    return {
      publicKey,
      isConnected,
      connect,
      disconnect,
    }
  },
})
</script>

<template>
  <header class="header">
    <div class="container">
      <NuxtLink to="/"
        class="logo"
      >
        <i class="fas fa-code"></i> AI Driven SaaS App
      </NuxtLink>
      <nav class="nav">
        <button v-if="!isConnected"
          class="connect-button"
          @click="connect"
        >
          <i class="fas fa-wallet"></i> Login
        </button>
        <div v-else
          class="wallet-info"
        >
          <span class="public-key">
            <i class="fas fa-user"></i>
            {{ publicKey.slice(0, 4) }}...{{ publicKey.slice(-4) }}
          </span>
          <button class="disconnect-button"
            @click="disconnect"
          >
            <i class="fas fa-sign-out-alt"></i> Log out
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--color-primary);
  padding-block: var(--spacing-md);
  color: var(--color-surface);
  box-shadow: var(--shadow-md);
}

.container {
  max-width: var(--size-max-width);
  margin-inline: auto;
  padding-inline: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-surface);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.connect-button,
.disconnect-button {
  background-color: var(--color-accent);
  color: var(--color-surface);
  border: none;
  padding-block: var(--spacing-sm);
  padding-inline: var(--spacing-md);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-weight: var(--font-weight-bold);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  transition: var(--transition-base);
}

.connect-button:hover,
.disconnect-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.wallet-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.public-key {
  font-family: var(--font-family-base);
  background-color: var(--color-secondary);
  padding-block: var(--spacing-xs);
  padding-inline: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
}

@media (max-width: 48rem) {
  .container {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .nav {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .wallet-info {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
