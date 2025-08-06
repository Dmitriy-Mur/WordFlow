<template>
  <h1>Component WordFlow</h1>
  <h4>words value: {{ store.content.words }}</h4>
  <h4>currentIndex: {{ store.playback.currentWordIndex }}</h4>
  <h1>{{ store.currentWord }}</h1>
  <h4>progress: {{ store.progress }}%</h4>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()

onMounted(() => {
  store.loadText('New example of text for testing this application')
  console.log('WordFlow: words = ', store.content.words.values)
  store.startWordRotation()
})
</script>
