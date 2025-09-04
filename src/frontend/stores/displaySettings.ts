import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDisplaySettingsStore = defineStore('displaySettings', () => {
  const fontSize = ref(24)
  const fontFamily = ref('Inter')
  const isDarkMode = ref(false)
  const isHide = ref(false)

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
  }

  const toggleHide = () => {
    isHide.value = !isHide.value
  }

  return {
    fontSize,
    fontFamily,
    isDarkMode,
    toggleTheme,
    isHide,
    toggleHide,
  }
})
