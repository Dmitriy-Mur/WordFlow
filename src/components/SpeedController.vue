<template>
  <div>
    <h4>Word per second</h4>
    <button @click="adjustSpeed.increase()">+</button>
    <input
      type="number"
      v-model.number="store.playback.WordPerSecond"
      @change="adjustSpeed.udpate()"
      min="10"
      max="500"
      step="1"
    />
    <button @click="adjustSpeed.decrease()">-</button>
  </div>
</template>

<script setup lang="ts">
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()
const { adjustSpeed } = store
</script>
