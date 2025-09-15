<template>
  <div class="controls">
    <button class="ui-button ui-button--icon" @click="navigate.back()" aria-label="Previous">
      <img class="ui-icon" src="/previous word.svg" alt="Previous" />
    </button>
    <button
      class="ui-button ui-button--icon"
      @click="togglePause()"
      :aria-label="isPaused ? 'Play' : 'Pause'"
    >
      <img
        class="ui-icon"
        :src="isPaused ? '/play.svg' : '/pause.svg'"
        :alt="isPaused ? 'Play' : 'Pause'"
      />
    </button>
    <button class="ui-button ui-button--icon" @click="navigate.forward()" aria-label="Next">
      <img class="ui-icon" src="/next word.svg" alt="Next" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTextNavigationStore } from '../stores/textNavigation'
import { usePlaybackControlStore } from '../stores/playbackControl'
import { useReadingStateStore } from '../stores/readingState'

const navigateStore = useTextNavigationStore()
const playback = usePlaybackControlStore()
const readingState = useReadingStateStore()

const isPaused = computed(() => readingState.isPaused)
const togglePause = () => playback.togglePause()

const navigate = {
  back: () => navigateStore.goToPreviousChunk(),
  forward: () => navigateStore.goToNextChunk(),
}
</script>

<style scoped lang="scss" src="../styles/components/navigation-controller.scss"></style>
