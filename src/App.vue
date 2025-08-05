<template>
  <h1>WordFlow</h1>
  <h4>RSVP reader for focus & speed</h4>
  <text-input />
  <word-flow />
  <text-navigation />
  <speed-controller />
</template>

<script setup lang="ts">
import TextInput from './components/TextInput.vue'
import WordFlow from './components/WordFlow.vue'
import TextNavigation from './components/TextNavigation.vue'
import SpeedController from './components/SpeedController.vue'
</script>

<style scoped lang="scss">
@use './styles/main.scss';
</style>
