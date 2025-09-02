<template>
  <h1>WordFlow</h1>
  <h4>RSVP reader for focus & speed</h4>
  <theme-toggle />
  <div id="app">
    <text-input />
    <word-flow />
    <text-navigation />
    <speed-controller />
    <chunk-controller />
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from './components/ThemeToggle.vue'
import TextInput from './components/TextInput.vue'
import WordFlow from './components/WordFlow.vue'
import TextNavigation from './components/NavigationController.vue'
import SpeedController from './components/SpeedController.vue'
import ChunkController from './components/ChunkController.vue'

/*
  <div id="app">
    <text-input />
    <word-flow />
    <text-navigation />
    <speed-controller />
    <chunk-controller />
  </div>
*/
</script>

<style scoped lang="scss">
@use './styles/global.scss';
</style>
