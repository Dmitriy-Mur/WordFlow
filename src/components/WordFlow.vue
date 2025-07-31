<template>
  <h1>Component WordFlow</h1>
  <h3>words value: {{ words }}</h3>
  <h3>currentWord: {{ currentWord }}</h3>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()
const words = ref<string[]>(['A', 'set', 'of', 'words', 'for', 'an', 'example'])
const currentIndex = ref(0)
const currentWord = ref(words[currentIndex.value])
const speed = ref(1000)

const getNextWord = () => {
  currentIndex.value = (currentIndex.value + 1) % words.value.length
  currentWord.value = words.value[currentIndex.value]
}

let intervalId: number

const startWordRotation = () => {
  intervalId = setInterval(getNextWord, speed.value)
}

const pauseWordRotation = () => {
  clearInterval(intervalId)
}

onMounted(() => {
  startWordRotation()
})
</script>
