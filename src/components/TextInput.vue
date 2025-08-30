<template>
  <textarea
    v-model="inputText"
    placeholder="Input or paste your text"
    rows="5"
    cols="50"
    @input="handleInput"
  ></textarea>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTextContentStore } from '@/stores/textContent'
import { usePlaybackControlStore } from '@/stores/playbackControl'
import { useReadingStateStore } from '@/stores/readingState'

const inputText = ref('')
const content = useTextContentStore()
const playback = usePlaybackControlStore()
const readingState = useReadingStateStore()

const handleInput = () => {
  const result = content.loadText(inputText.value)
  if (result?.shouldReset) {
    readingState.resetForNewText()
  }
  playback.restartPlayback()
}
</script>
