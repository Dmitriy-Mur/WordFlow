<template>
  <h1>WordFlow</h1>
  <h4>RSVP reader for focus & speed</h4>
  <div id="app">
    <text-input />
    <word-flow />
    <text-navigation />
    <speed-controller />
    <chunk-controller />
  </div>
</template>

<script setup lang="ts">
import FileUpload from './components/FileUpload.vue'
import TextInput from './components/TextInput.vue'
import WordFlow from './components/WordFlow.vue'
import TextNavigation from './components/NavigationController.vue'
import SpeedController from './components/SpeedController.vue'
import ChunkController from './components/ChunkController.vue'
</script>

<style scoped lang="scss">
@use './styles/main.scss';
</style>
