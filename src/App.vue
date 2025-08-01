<template>
  <h1>WordFlow</h1>
  <p>RSVP reader for focus & speed</p>
  <word-flow />
  <read-speed-controller />
  <speed-controller />
</template>

<script setup lang="ts">
import WordFlow from './components/WordFlow.vue'
import ReadSpeedController from './components/TextNavigation.vue'
import SpeedController from './components/SpeedController.vue'
</script>

<style scoped></style>
