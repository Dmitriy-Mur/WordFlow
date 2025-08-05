<template>
  <textarea
    v-model="inputText"
    placeholder="Input or paste your text"
    rows="10"
    cols="50"
    @input="handleInput"
  ></textarea>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()
const inputText = ref('')
const { loadText } = store
const handleInput = () => {
  loadText(inputText.value)
}
</script>
