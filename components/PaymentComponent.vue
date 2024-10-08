<!-- PaymentComponent.vue -->
<script>
import { ref, computed } from 'vue'
import { usePhantomWallet } from '~/composables/usePhantomWallet'

export default {
  name: 'PaymentComponent',
  setup () {
    const filesGenerated = ref(12)
    const tokensUsed = ref(15000)
    const totalPayment = ref('12.75')

    const {
      publicKey,
      isConnected,
      connect,
    } = usePhantomWallet()

    const truncatedPublicKey = computed(() => {
      if (publicKey.value) {
        return `${publicKey.value.slice(0, 4)}...${publicKey.value.slice(-4)}`
      }

      return ''
    })

    /**
     * Connects the wallet using the usePhantomWallet composable
     *
     * @returns {Promise<void>}
     */
    async function connectWallet () {
      await connect()
    }

    /**
     * Processes the payment after ensuring wallet connection
     *
     * @returns {Promise<void>}
     */
    async function payNow () {
      if (!isConnected.value) {
        await connect()
      }

      if (isConnected.value) {
        // Here you would typically interact with a smart contract or backend API
        // to process the payment. For this example, we'll just log a message.
        // eslint-disable-next-line no-alert
        alert(`Payment of ${totalPayment.value} USDC processed successfully!`)
      }
    }

    return {
      filesGenerated,
      tokensUsed,
      totalPayment,
      isConnected,
      truncatedPublicKey,
      connectWallet,
      payNow,
    }
  },
}
</script>

<template>
  <div class="payment-container">
    <h2 class="payment-title">
      Payment Summary
    </h2>
    <div class="payment-grid">
      <div class="payment-item">
        <i class="fas fa-file-alt payment-icon"></i>
        <div class="payment-details">
          <h3 class="payment-label">
            Files Generated
          </h3>
          <p class="payment-value">
            {{ filesGenerated }}
          </p>
        </div>
      </div>
      <div class="payment-item">
        <i class="fas fa-microchip payment-icon"></i>
        <div class="payment-details">
          <h3 class="payment-label">
            AI Tokens Used
          </h3>
          <p class="payment-value">
            {{ tokensUsed }}
          </p>
        </div>
      </div>
      <div class="payment-item payment-total">
        <i class="fas fa-coins payment-icon"></i>
        <div class="payment-details">
          <h3 class="payment-label">
            Total Payment (USDC)
          </h3>
          <p class="payment-value">
            {{ totalPayment }}
          </p>
        </div>
      </div>
    </div>
    <button v-if="!isConnected"
      class="payment-button"
      @click="connectWallet"
    >
      <i class="fas fa-wallet payment-button-icon"></i>
      Connect Wallet
    </button>
    <button v-else
      class="payment-button"
      @click="payNow"
    >
      <i class="fas fa-paper-plane payment-button-icon"></i>
      Pay Now
    </button>
    <p v-if="isConnected"
      class="wallet-info"
    >
      Connected: {{ truncatedPublicKey }}
    </p>
  </div>
</template>

<style scoped>
.payment-container {
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  color: var(--color-text-primary);
  font-family: var(--font-family-base);
}

.payment-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-lg);
  color: var(--color-secondary);
}

.payment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.payment-item {
  background-color: var(--color-background);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  transition: var(--transition-base);
}

.payment-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.payment-icon {
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
  margin-right: var(--spacing-md);
}

.payment-details {
  flex-grow: 1;
}

.payment-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
}

.payment-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.payment-total {
  grid-column: 1 / -1;
  background-color: var(--color-primary);
}

.payment-total .payment-icon,
.payment-total .payment-label,
.payment-total .payment-value {
  color: var(--color-text-primary);
}

.payment-button {
  background-color: var(--color-secondary);
  color: var(--color-background);
  border: none;
  border-radius: var(--border-radius-full);
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.payment-button:hover {
  background-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.payment-button-icon {
  margin-right: var(--spacing-sm);
}

@media (max-width: 768px) {
  .payment-grid {
    grid-template-columns: 1fr;
  }
}

.wallet-info {
  margin-top: var(--spacing-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
}
</style>
