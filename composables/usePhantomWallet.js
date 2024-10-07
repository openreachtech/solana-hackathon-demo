import { ref, onMounted } from 'vue'

/**
 *
 */
export function usePhantomWallet () {
  const wallet = ref(null)
  const publicKey = ref(null)
  const isConnected = ref(false)

  onMounted(() => {
    if ('solana' in window) {
      wallet.value = window.solana
    }
  })

  /**
   *
   */
  async function connect () {
    try {
      if (!wallet.value) {
        window.open('https://phantom.app/', '_blank')

        return
      }

      const response = await wallet.value.connect()
      publicKey.value = response.publicKey.toString()
      isConnected.value = true
    } catch (error) {
      console.error('Failed to connect to Phantom wallet:', error)
    }
  }

  /**
   *
   */
  async function disconnect () {
    if (wallet.value) {
      await wallet.value.disconnect()
      publicKey.value = null
      isConnected.value = false
    }
  }

  return {
    wallet,
    publicKey,
    isConnected,
    connect,
    disconnect,
  }
}
