<template>
  <h1>{{ store.currentChunk }}</h1>
  <h4>progress: {{ store.progress }}%</h4>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()

onMounted(() => {
  //store.loadText('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20')
  store.startWordRotation()
})
</script>
