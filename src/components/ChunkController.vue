<template>
  <div>
    <h4>Chunk size</h4>
    <input
      type="number"
      v-model.number="readingState.nextChunkSize"
      @change="updateChunkSize(readingState.nextChunkSize)"
      min="1"
      max="20"
      step="1"
    />
  </div>
</template>

<script setup lang="ts">
import { useReadingStateStore } from '@/stores/readingState'

const readingState = useReadingStateStore()
const updateChunkSize = (size: number) => readingState.setNextChunkSize(size)
</script>
