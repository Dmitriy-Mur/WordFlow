<template>
  <div class="speed">
    <h4 class="speed__label">Words per minute</h4>
    <div class="speed__controls">
      <button class="ui-button ui-button--icon" @click="increase()" aria-label="Increase speed">
        <img class="ui-icon" src="/plus.svg" alt="Increase" />
      </button>
      <input
        class="speed__input"
        type="number"
        v-model.number="wpm"
        @change="onSet()"
        min="50"
        max="1000"
        step="1"
      />
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

const wpm = computed({
  get: () => readingState.wordsPerMinute,
  set: (val: number) => speed.setSpeed(val),
})

const increase = () => speed.increaseReadingSpeed()
const decrease = () => speed.decreaseReadingSpeed()
const onSet = () => speed.setSpeed(wpm.value)
</script>

<style scoped lang="scss" src="../styles/components/speed-controller.scss"></style>
