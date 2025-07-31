<template>
  <div>
    <button @click="store.toggleBack()">Back</button>
    <button @click="store.togglePause()">Pause</button>
    <button>Forward</button>
  </div>
</template>

<script setup lang="ts">
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()
</script>
