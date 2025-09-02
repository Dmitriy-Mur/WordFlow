<template>
  <div>
    <button @click="navigate.back()">⏮</button>
    <button @click="togglePause()">
      {{ isPaused ? '▶' : '⏸' }}
    </button>
    <button @click="navigate.forward()">⏭</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTextNavigationStore } from '@/frontend/stores/textNavigation'
import { usePlaybackControlStore } from '@/frontend/stores/playbackControl'
import { useReadingStateStore } from '@/frontend/stores/readingState'

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
