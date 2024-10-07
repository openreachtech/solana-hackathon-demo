<!-- pages/index.vue -->
<script>
import { ref, reactive, onMounted } from 'vue'
import GitHubCodespacesEmbed from '~/components/GitHubCodespacesEmbed.vue'
import PaymentComponent from '~/components/PaymentComponent.vue'
import envGetters from '~/utils/envGetters.js'

export default {
  name: 'IndexPage',
  components: {
    GitHubCodespacesEmbed,
    PaymentComponent,
  },
  setup () {
    const activeMainTab = ref('ai-steps')
    const activeAIStep = ref('step1')

    const githubUsername = ref('')
    const githubRepository = ref('')
    const githubCodespaceName = ref('')

    const aiSteps = reactive([
      { id: 'step1', title: 'DB Design', icon: 'database', url: envGetters.AI_STEP_1_URL },
      { id: 'step2', title: 'API Design', icon: 'sitemap', url: envGetters.AI_STEP_2_URL },
      { id: 'step3', title: 'Model', icon: 'cubes', url: envGetters.AI_STEP_3_URL },
      { id: 'step4', title: 'Migration', icon: 'exchange-alt', url: envGetters.AI_STEP_4_URL },
      { id: 'step5', title: 'Seeder', icon: 'seedling', url: envGetters.AI_STEP_5_URL },
      { id: 'step6', title: 'API Implementation', icon: 'code', url: envGetters.AI_STEP_6_URL },
      { id: 'step7', title: 'Unit Test', icon: 'vial', url: envGetters.AI_STEP_7_URL },
    ])

    /**
     * @param tabId
     */
    function setActiveMainTab (tabId) {
      activeMainTab.value = tabId
    }

    /**
     * @param stepId
     */
    function setActiveAIStep (stepId) {
      activeAIStep.value = stepId
    }

    /**
     * @param tab
     */
    function getTabIcon (tab) {
      switch (tab) {
        case 'ai-steps': return 'fa-robot'
        case 'editor': return 'fa-code'
        case 'payment': return 'fa-credit-card'
        default: return 'fa-question'
      }
    }

    /**
     * @param tab
     */
    function getTabLabel (tab) {
      switch (tab) {
        case 'ai-steps': return 'AI Steps'
        case 'editor': return 'Editor'
        case 'payment': return 'Payment'
        default: return 'Unknown'
      }
    }

    return {
      activeMainTab,
      activeAIStep,
      aiSteps,
      githubUsername,
      githubRepository,
      githubCodespaceName,
      setActiveMainTab,
      setActiveAIStep,
      getTabIcon,
      getTabLabel,
    }
  },
}
</script>

<template>
  <div class="unit-container">
    <div class="main-tabs">
      <button v-for="tab in ['ai-steps', 'editor', 'payment']"
        :key="tab"
        class="main-tab-button"
        :class="{ active: activeMainTab === tab }"
        @click="setActiveMainTab(tab)"
      >
        <i :class="['fas', getTabIcon(tab)]"></i>
        {{ getTabLabel(tab) }}
      </button>
    </div>

    <div v-if="activeMainTab === 'ai-steps'"
      class="ai-steps-container"
    >
      <div class="ai-steps-tabs">
        <button v-for="step in aiSteps"
          :key="step.id"
          class="ai-step-button"
          :class="{ active: activeAIStep === step.id }"
          @click="setActiveAIStep(step.id)"
        >
          <i :class="['fas', `fa-${step.icon}`]"></i>
          {{ step.title }}
        </button>
      </div>
      <div v-for="step in aiSteps"
        :key="step.id"
        class="ai-step"
        :class="{ active: activeAIStep === step.id }"
      >
        <div class="chat-container">
          <iframe :src="step.url"
            class="chat-frame"
            frameborder="0"
            allow="microphone"
          ></iframe>
        </div>
      </div>
    </div>

    <div v-else-if="activeMainTab === 'editor'"
      class="editor-container"
    >
      <GitHubCodespacesEmbed :username="githubUsername"
        :repository="githubRepository"
        :codespace-name="githubCodespaceName"
      />
    </div>

    <div v-else-if="activeMainTab === 'payment'"
      class="payment-container"
    >
      <PaymentComponent />
    </div>
  </div>
</template>

<style scoped>
.unit-container {
  max-width: var(--size-max-width);
  margin-inline: auto;
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-2xl);
  background-color: var(--color-background);
  min-height: 100vh;
}

.main-tabs {
  display: flex;
  margin-bottom: var(--spacing-xl);
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.main-tab-button {
  background-color: transparent;
  border: none;
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: var(--transition-base);
  flex-grow: 1;
  justify-content: center;
  font-weight: var(--font-weight-medium);
}

.main-tab-button:hover {
  background-color: var(--color-background);
  color: var(--color-text-primary);
}

.main-tab-button.active {
  background-color: var(--color-primary);
  color: var(--color-surface);
  font-weight: var(--font-weight-bold);
}

.ai-steps-tabs {
  display: flex;
  flex-wrap: wrap;
  border-bottom: var(--border-width-thin) solid var(--color-border);
  margin-bottom: var(--spacing-lg);
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.ai-step-button {
  background-color: transparent;
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  transition: var(--transition-base);
  flex-grow: 1;
  justify-content: center;
  font-weight: var(--font-weight-medium);
}

.ai-step-button:hover {
  background-color: var(--color-background);
  color: var(--color-text-primary);
}

.ai-step-button.active {
  background-color: var(--color-secondary);
  color: var(--color-surface);
  font-weight: var(--font-weight-bold);
}

.ai-step {
  display: none;
}

.ai-step.active {
  display: block;
}

.chat-container, .editor-container, .payment-container {
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: var(--transition-base);
  height: 600px;
}

.chat-frame {
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 768px) {
  .main-tabs {
    flex-direction: column;
  }

  .ai-steps-tabs {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .main-tab-button,
  .ai-step-button {
    width: 100%;
    justify-content: flex-start;
  }

  .ai-step-button {
    width: auto;
    flex-grow: 1;
  }
}
</style>
