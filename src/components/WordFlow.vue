<template>
  <h1>Component WordFlow</h1>
  <h4>words value: {{ store.content.words }}</h4>
  <h4>currentIndex: {{ store.playback.currentWordIndex }}</h4>
  <h1>{{ currentWord }}</h1>
  <h4>progress: {{ progress }}%</h4>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useReadingStore } from '@/stores/reading'
import { storeToRefs } from 'pinia'

const store = useReadingStore()
const { currentWord, progress, playback, content } = storeToRefs(store)
const loadText = store

onMounted(() => {
  store.loadText('New examle of text for testing this application')
  console.log('WordFlow: words = ', content.value.words)
  store.startWordRotation()
})
</script>
