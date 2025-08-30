import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDisplaySettingsStore = defineStore('displaySettings', () => {
  const fontSize = ref(24)
  const fontFamily = ref('Inter')
  const isDarkMode = ref(false)

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
  }

  return {
    fontSize,
    fontFamily,
    isDarkMode,
    toggleTheme,
  }
})
