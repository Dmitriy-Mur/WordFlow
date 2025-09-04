import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTextContentStore = defineStore('textContent', () => {
  const words = ref<string[]>([])
  const sourceText = ref('')

  const getTimeToRead = () => {
    return 1 //TODO
  }

  const getCurrentChunk = (currentWordIndex: number, currentChunkSize: number) => {
    const start = currentWordIndex
    const end = Math.min(start + currentChunkSize, words.value.length)
    return words.value.slice(start, end).join(' ')
  }

  const loadText = (text: string) => {
    sourceText.value = text
    words.value = text.trim().length ? text.trim().split(/\s+/) : []
    return { shouldReset: true }
  }

  return {
    words,
    sourceText,
    getCurrentChunk,
    loadText,
  }
})
