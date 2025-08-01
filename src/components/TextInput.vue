<template>
  <textarea
    v-model="inputText"
    placeholder="Input or paste Your text"
    rows="10"
    cols="50"
    @input="store.loadText(inputText)"
  ></textarea>
</template>

<script setup lang="ts">
import { useReadingStore } from '@/stores/reading'

const store = useReadingStore()
</script>
