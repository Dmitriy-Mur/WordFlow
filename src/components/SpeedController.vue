<template>
  <div>
    <h4>Words per minute</h4>
    <button @click="increase()">+</button>
    <input type="number" v-model.number="wpm" @change="onSet()" min="50" max="1000" step="1" />
    <button @click="decrease()">-</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useReadingStateStore } from '@/stores/readingState'
import { useSpeedControlStore } from '@/stores/speedControl'

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
