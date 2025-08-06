<template>
  <h1>{{ store.currentWord }}</h1>
  <h4>progress: {{ store.progress }}%</h4>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()

onMounted(() => {
  store.loadText('This is text for example')
  store.startWordRotation()
})
</script>
