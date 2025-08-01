<template>
  <div>
    <h3>Current speed: {{ store.playback.speed }}</h3>
    <button @click="store.plusSpeed()">+</button>
    <button @click="store.minusSpeed()">-</button>
  </div>
</template>

<script setup lang="ts">
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()
</script>
