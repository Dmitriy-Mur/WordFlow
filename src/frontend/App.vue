<template>
  <div class="app" :class="{ 'app--hidden': display.isHide }">
    <header class="app__header">
      <div class="app__brand">
        <h1 class="app__title">WordFlow</h1>
        <p class="app__subtitle">RSVP reader for focus & speed</p>
      </div>
      <div class="app__toolbar">
        <hide-toggle />
        <theme-toggle />
        <button
          class="ui-button ui-button--icon"
          @click="showImportModal = true"
          aria-label="Import text"
        >
          <img class="ui-icon" src="/plus.svg" alt="Open import" />
        </button>
      </div>
    </header>

    <main class="app__content">
      <word-flow />
      <nav class="app__controls">
        <text-navigation />
        <div class="app__sliders">
          <speed-controller />
          <chunk-controller />
        </div>
      </nav>
    </main>

    <import-modal v-model="showImportModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted, provide } from 'vue'
import { useDisplaySettingsStore } from './stores/displaySettings'
import ThemeToggle from './components/ThemeToggle.vue'
import WordFlow from './components/WordFlow.vue'
import TextNavigation from './components/NavigationController.vue'
import SpeedController from './components/SpeedController.vue'
import ChunkController from './components/ChunkController.vue'
import HideToggle from './components/HideToggle.vue'
import ImportModal from './components/ImportModal.vue'

const showImportModal = ref(false)
const display = useDisplaySettingsStore()

provide('closeImportModal', () => {
  showImportModal.value = false
})

onMounted(() => {
  document.documentElement.setAttribute('data-theme', display.isDarkMode ? 'dark' : 'light')
})

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', display.isDarkMode ? 'dark' : 'light')
})
</script>

<style scoped lang="scss" src="./styles/components/app.scss"></style>
