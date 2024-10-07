<!-- GitHubCodespacesEmbed.vue -->
<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'GitHubCodespacesEmbed',
  props: {
    username: {
      type: String,
      required: true,
    },
    repository: {
      type: String,
      required: true,
    },
    codespaceName: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    const isAuthenticated = ref(false)
    const codespaceUrl = ref('')
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.VUE_APP_GITHUB_CLIENT_ID}&scope=codespace`

    onMounted(() => {
      checkAuthentication()
    })

    /**
     *
     */
    function checkAuthentication () {
      // In a real application, you would check if the user is authenticated with GitHub
      // For this example, we'll simulate authentication
      isAuthenticated.value = localStorage.getItem('github_token') !== null

      if (isAuthenticated.value) {
        codespaceUrl.value = `https://github.com/codespaces/${props.username}/${props.repository}/${props.codespaceName}`
      }
    }

    return {
      isAuthenticated,
      codespaceUrl,
      githubAuthUrl,
    }
  },
}
</script>

<template>
  <div class="codespace-container">
    <div v-if="!isAuthenticated"
      class="auth-message"
    >
      <p>Please log in to GitHub to access your Codespace.</p>
      <a :href="githubAuthUrl"
        class="auth-button"
      >
        <i class="fab fa-github"></i> Log in to GitHub
      </a>
    </div>
    <iframe v-else
      :src="codespaceUrl"
      class="codespace-frame"
      allow="clipboard-read; clipboard-write"
    ></iframe>
  </div>
</template>

<style scoped>
.codespace-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  background-color: var(--color-background);
}

.codespace-frame {
  width: 100%;
  height: 100%;
  border: none;
}

.auth-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--color-text-primary);
  font-family: var(--font-family-base);
}

.auth-button {
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-primary);
  color: var(--color-surface);
  text-decoration: none;
  border-radius: var(--border-radius-md);
  transition: var(--transition-base);
}

.auth-button:hover {
  background-color: var(--color-secondary);
}
</style>
