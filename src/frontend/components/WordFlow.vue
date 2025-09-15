<template>
  <section class="reader">
    <div class="reader__viewport">
      <div class="reader__chunk">{{ currentChunk }}</div>
    </div>
    <div class="reader__meta">
      <span class="reader__progress">{{ progress }}%</span>
      <span class="reader__remain">{{ wordRemained }} / {{ textContent.words.length }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useTextContentStore } from '../stores/textContent'
import { useReadingStateStore } from '../stores/readingState'
import { usePlaybackControlStore } from '../stores/playbackControl'

const textContent = useTextContentStore()
const readingState = useReadingStateStore()
const playback = usePlaybackControlStore()

const currentChunk = computed(() =>
  textContent.getCurrentChunk(readingState.currentWordIndex, readingState.currentChunkSize),
)
const progress = computed(() => readingState.progress)
const wordRemained = computed(() => readingState.wordRemained)
</script>

<style scoped lang="scss" src="../styles/components/word-flow.scss"></style>
