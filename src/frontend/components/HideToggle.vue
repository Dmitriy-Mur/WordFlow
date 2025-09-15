<template>
  <button
    class="ui-button ui-button--icon"
    @click="toggleHide()"
    :aria-label="display.isHide ? 'Show controls' : 'Hide controls'"
  >
    <img
      class="ui-icon"
      :src="display.isHide ? '/open eye.svg' : '/closed eye.svg'"
      :alt="display.isHide ? 'Show' : 'Hide'"
    />
  </button>
</template>

<script setup>
import { useDisplaySettingsStore } from '../stores/displaySettings'

const display = useDisplaySettingsStore()
const toggleHide = () => display.toggleHide()
</script>
