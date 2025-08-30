<template>
  <h1>{{ currentChunk }}</h1>
  <h4>progress: {{ progress }}%</h4>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useTextContentStore } from '@/stores/textContent'
import { useReadingStateStore } from '@/stores/readingState'
import { usePlaybackControlStore } from '@/stores/playbackControl'

const textContent = useTextContentStore()
const readingState = useReadingStateStore()
const playback = usePlaybackControlStore()

const currentChunk = computed(() =>
  textContent.getCurrentChunk(readingState.currentWordIndex, readingState.currentChunkSize),
)
const progress = computed(() => readingState.progress)

onMounted(() => {
  playback.startReading()
})
</script>
