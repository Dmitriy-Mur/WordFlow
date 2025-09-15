<template>
  <section class="reader">
    <div class="reader__viewport">
      <div class="reader__chunk">{{ currentChunk }}</div>
    </div>
    <div class="reader__meta">
      <span class="reader__progress">{{ progress }}%</span>
      <span class="reader__remain">{{ wordRemained }} / {{ textContent.words.length }}</span>
      <span class="reader__time">{{ timeToRead }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTextContentStore } from '../stores/textContent'
import { useReadingStateStore } from '../stores/readingState'

const textContent = useTextContentStore()
const rs: any = useReadingStateStore()

const currentChunk = computed(() =>
  textContent.getCurrentChunk(rs.currentWordIndex, rs.currentChunkSize),
)
const progress = computed(() => rs.progress)
const wordRemained = computed(() => rs.wordRemained)
const timeToRead = computed(() =>
  textContent.getTimeToRead(rs.wordsPerMinute, rs.currentWordIndex, rs.currentChunkSize),
)
</script>

<style scoped lang="scss" src="../styles/components/word-flow.scss"></style>
