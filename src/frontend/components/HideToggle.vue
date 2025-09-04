<template>
  <button @click="toggleHide()">
    {{ display.isHide ? '◠' : '⚆' }}
  </button>
</template>

<script setup>
import { useDisplaySettingsStore } from '@/frontend/stores/displaySettings'

const display = useDisplaySettingsStore()
const toggleHide = () => display.toggleHide()
</script>
