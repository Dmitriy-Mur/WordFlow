<template>
  <h1>Component WordFlow</h1>
  <h3>words value: {{ store.content.words }}</h3>
  <h3>currentIndex: {{ store.playback.currentWordIndex }}</h3>
  <h3>currentWord: {{ store.currentWord }}</h3>
  <h3>progress: {{ store.progress }}%</h3>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()

onMounted(() => {
  store.loadText('New examle of text for testing this application')
  console.log('WordFlow: words = ', store.content.words)
  store.startWordRotation()
})
</script>
