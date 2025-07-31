<template>
  <div>
    <button>Back</button>
    <button @click="pauseWordRotation">Pause</button>
    <button>Forward</button>
  </div>
</template>

<script setup lang="ts">
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()

const onPauseClickeck = () => {
  store.togglePause()
}
</script>
