<template>
  <button @click="toggleTheme()">
    {{ display.isDarkMode ? '☀️' : '🌙' }}
  </button>
</template>

<script setup>
import { useDisplaySettingsStore } from '@/frontend/stores/displaySettings'

const display = useDisplaySettingsStore()
const toggleTheme = () => display.toggleTheme()
</script>
