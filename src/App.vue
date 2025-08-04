<template>
  <h1>WordFlow</h1>
  <h4>RSVP reader for focus & speed</h4>
  <text-input />
  <word-flow />
  <!--
  <read-speed-controller />
  <speed-controller />
  -->
</template>

<script setup lang="ts">
import WordFlow from './components/WordFlow.vue'
import ReadSpeedController from './components/TextNavigation.vue'
import SpeedController from './components/SpeedController.vue'
import TextInput from './components/TextInput.vue'
</script>

<style scoiped lang="scss">
@use './styles/main.scss';
</style>
