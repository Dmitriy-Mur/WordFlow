<template>
  <div>
    <button @click="store.toggleBack()">⏪</button>
    <button @click="store.togglePause()">
      {{ store.playback.isPaused ? '▶️' : '⏸️' }}
    </button>
    <button @click="store.toggleForward()">⏩</button>
  </div>
</template>

<script setup lang="ts">
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()
</script>
