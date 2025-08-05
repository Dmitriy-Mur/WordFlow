<template>
  <div>
    <h4>Current speed: {{ store.playback.speed }}</h4>
    <button @click="adjustSpeed.increase()">+</button>
    <input
      type="number"
      v-model.number="store.playback.speed"
      @change="adjustSpeed.updateSpeed()"
      min="50"
      max="1000"
      step="50"
    />
    <button @click="adjustSpeed.decrease()">-</button>
  </div>
</template>

<script setup lang="ts">
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()
const { adjustSpeed } = store
</script>
