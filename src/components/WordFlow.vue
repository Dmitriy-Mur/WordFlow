<template>
  <h1>Component WordFlow</h1>
  <h3>words value: {{ words }}</h3>
  <h3>currentIndex: {{ store.playback.currentIndex }}</h3>
  <h3>currentWord: {{ currentWord }}</h3>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()
const words = ref<string[]>(['A', 'set', 'of', 'words', 'for', 'an', 'example'])
const currentWord = ref(words[store.playback.currentIndex])
const speed = ref(1000)

const getNextWord = () => {
  store.playback.currentIndex = (store.playback.currentIndex + 1) % words.value.length
  currentWord.value = words.value[store.playback.currentIndex]
}
let intervalId: number | null = null

const startWordRotation = () => {
  intervalId = setInterval(getNextWord, speed.value)
}

const pauseWordRotation = () => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
  clearInterval(intervalId)
}

onMounted(() => {
  startWordRotation()
})

watch(
  () => store.playback.isPaused,
  (paused) => {
    console.log('Pause state changed:', paused)
    if (paused) pauseWordRotation()
    else startWordRotation()
  },
)
</script>
