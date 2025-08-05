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
import { storeToRefs } from 'pinia'

const store = useReadingStore()
</script>
