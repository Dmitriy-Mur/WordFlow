<template>
  <div>
    <h4>Current speed: {{ store.playback.speed }}</h4>
    <button @click="store.plusSpeed()">+</button>
    <input
      type="number"
      v-model.number="store.playback.speed"
      @change="updateSpeed"
      min="50"
      max="1000"
      step="50"
    />
    <button @click="store.minusSpeed()">-</button>
  </div>
</template>

<script setup lang="ts">
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()
</script>
