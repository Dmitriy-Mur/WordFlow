<template>
  <button
    class="ui-button ui-button--icon"
    @click="toggleTheme()"
    :aria-label="display.isDarkMode ? 'Switch to light' : 'Switch to dark'"
  >
    <img
      class="ui-icon"
      :src="display.isDarkMode ? '/sun.svg' : '/moon.svg'"
      :alt="display.isDarkMode ? 'Light theme' : 'Dark theme'"
    />
  </button>
</template>

<script setup>
import { useDisplaySettingsStore } from '@/frontend/stores/displaySettings'

const display = useDisplaySettingsStore()
const toggleTheme = () => display.toggleTheme()
</script>
