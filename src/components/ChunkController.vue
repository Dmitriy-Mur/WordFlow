<template>
  <div>
    <h4>Chunk size</h4>
    <input
      type="number"
      v-model.number="store.playback.nextChunkSize"
      @change="updateChunkSize(store.playback.nextChunkSize)"
      min="1"
      max="20"
      step="1"
    />
  </div>
</template>

<script setup lang="ts">
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()
const { updateChunkSize } = store
</script>
