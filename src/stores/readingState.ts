import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useTextContentStore } from './textContent'

const DEFAULT_CHUNK_SIZE = 3
const MIN_CHUNK_SIZE = 1
const MAX_CHUNK_SIZE = 20
const DEFAULT_WORDS_PER_MINUTE = 300

export const useReadingStateStore = defineStore('readingState', () => {
  const isPaused = ref(false)
  const wordsPerMinute = ref(DEFAULT_WORDS_PER_MINUTE)
  const currentWordIndex = ref(0)
  const currentChunkSize = ref(DEFAULT_CHUNK_SIZE)
  const nextChunkSize = ref(DEFAULT_CHUNK_SIZE)
  const intervalId = ref<number | undefined>(undefined)

  const progress = computed(() => {
    const textContent = useTextContentStore()
    const totalWords = textContent.words.length

    if (totalWords <= 0) return 0

    const calculatedProgress = (currentWordIndex.value / totalWords) * 100
    return Math.max(0, Math.min(Math.round(calculatedProgress), 100))
  })

  const resetForNewText = () => {
    currentWordIndex.value = 0
    currentChunkSize.value = nextChunkSize.value
  }

  const setNextChunkSize = (size: number) => {
    const numericSize = Number(size)

    if (isNaN(numericSize)) {
      nextChunkSize.value = DEFAULT_CHUNK_SIZE
      return
    }

    const validatedSize = Math.max(
      MIN_CHUNK_SIZE,
      Math.min(Math.round(numericSize), MAX_CHUNK_SIZE),
    )
    nextChunkSize.value = validatedSize
  }

  return {
    // state
    isPaused,
    wordsPerMinute,
    currentWordIndex,
    currentChunkSize,
    nextChunkSize,
    intervalId,
    // computed
    progress,
    // actions
    setNextChunkSize,
    resetForNewText,
  }
})
