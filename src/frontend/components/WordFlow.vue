<template>
  <h1>{{ currentChunk }}</h1>
  <h4>progress: {{ progress }}%</h4>
  <h4>words remained: {{ wordRemained }} / {{ textContent.words.length }}</h4>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useTextContentStore } from '@/frontend/stores/textContent'
import { useReadingStateStore } from '@/frontend/stores/readingState'
import { usePlaybackControlStore } from '@/frontend/stores/playbackControl'

const textContent = useTextContentStore()
const readingState = useReadingStateStore()
const playback = usePlaybackControlStore()

const currentChunk = computed(() =>
  textContent.getCurrentChunk(readingState.currentWordIndex, readingState.currentChunkSize),
)
const progress = computed(() => readingState.progress)
const wordRemained = computed(() => readingState.wordRemained)

onMounted(() => {
  playback.startReading()
})
</script>
