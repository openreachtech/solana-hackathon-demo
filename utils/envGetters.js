import { StorageClerk } from '@openreachtech/furo'
import { STORAGE_KEY } from '~/app/constants.js'

const getEnvValue = key => {
  const storage = StorageClerk.createAsSession()
  const json = storage.get(STORAGE_KEY.FURO_ENV)
  if (!json) {
    return null
  }

  try {
    const furoEnv = JSON.parse(json)

    return furoEnv[key] ?? null // 値が undefined の場合も null を返す
  } catch (error) {
    return null
  }
}

export default {
  get AI_STEP_1_URL () {
    return getEnvValue('AI_STEP_1_URL')
  },
  get AI_STEP_2_URL () {
    return getEnvValue('AI_STEP_2_URL')
  },
  get AI_STEP_3_URL () {
    return getEnvValue('AI_STEP_3_URL')
  },
  get AI_STEP_4_URL () {
    return getEnvValue('AI_STEP_4_URL')
  },
  get AI_STEP_5_URL () {
    return getEnvValue('AI_STEP_5_URL')
  },
  get AI_STEP_6_URL () {
    return getEnvValue('AI_STEP_6_URL')
  },
  get AI_STEP_7_URL () {
    return getEnvValue('AI_STEP_7_URL')
  },
}
