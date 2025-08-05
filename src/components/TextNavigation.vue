<template>
  <div>
    <button @click="navigate.back()">⏮</button>
    <button @click="store.togglePause()">
      {{ store.playback.isPaused ? '▶' : '⏸' }}
    </button>
    <button @click="navigate.forward()">⏭</button>
  </div>
</template>

<script setup lang="ts">
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()
const { navigate } = store
</script>
