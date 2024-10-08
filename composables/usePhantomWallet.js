import { ref, onMounted } from 'vue'

/**
 * Custom composable for managing Phantom wallet connection
 *
 * @returns {object} An object containing wallet connection methods and state
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
   * Connects to the Phantom wallet
   *
   * @returns {Promise<void>}
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
      throw new Error('Failed to connect to Phantom wallet')
    }
  }

  /**
   * Disconnects from the Phantom wallet
   *
   * @returns {Promise<void>}
   */
  async function disconnect () {
    if (wallet.value) {
      await wallet.value.disconnect()
      publicKey.value = null
      isConnected.value = false
    }
  }

  return {
    publicKey,
    isConnected,
    connect,
    disconnect,
  }
}
