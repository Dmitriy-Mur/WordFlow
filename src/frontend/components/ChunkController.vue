<template>
  <div class="chunk">
    <h4 class="chunk__label">Chunk size</h4>
    <div class="chunk__controls">
      <button
        class="ui-button ui-button--icon"
        @click="increase()"
        aria-label="Increase chunk size"
      >
        <img class="ui-icon" src="/plus.svg" alt="Increase" />
      </button>
      <span class="chunk__input">{{ nextChunkSize }}</span>
      <button
        class="ui-button ui-button--icon"
        @click="decrease()"
        aria-label="Decrease chunk size"
      >
        <img class="ui-icon" src="/minus.svg" alt="Decrease" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useReadingStateStore } from '../stores/readingState'

const readingState = useReadingStateStore()
const nextChunkSize = computed(() => (readingState as any).nextChunkSize)
const increase = () => (readingState as any).setNextChunkSize(nextChunkSize.value + 1)
const decrease = () => (readingState as any).setNextChunkSize(nextChunkSize.value - 1)
</script>

<style scoped lang="scss" src="../styles/components/chunk-controller.scss"></style>
