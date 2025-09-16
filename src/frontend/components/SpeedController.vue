<template>
  <div class="speed">
    <h4 class="speed__label">Words per minute</h4>
    <div class="speed__controls">
      <button class="ui-button ui-button--icon" @click="increase()" aria-label="Increase speed">
        <img class="ui-icon" src="/plus.svg" alt="Increase" />
      </button>
      <span class="speed__input">{{ wpm }}</span>
      <button class="ui-button ui-button--icon" @click="decrease()" aria-label="Decrease speed">
        <img class="ui-icon" src="/minus.svg" alt="Decrease" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useReadingStateStore } from '../stores/readingState'
import { useSpeedControlStore } from '../stores/speedControl'

const readingState = useReadingStateStore()
const speed = useSpeedControlStore()
const wpm = computed(() => (readingState as any).wordsPerMinute)

const increase = () => speed.increaseReadingSpeed()
const decrease = () => speed.decreaseReadingSpeed()
</script>

<style scoped lang="scss" src="../styles/components/speed-controller.scss"></style>
