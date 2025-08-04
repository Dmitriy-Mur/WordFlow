import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReadingStore = defineStore('reading', () => {
  const playback = {
    isPaused: ref(false),
    speed: ref(100),
    currentWordIndex: ref(0),
    intervalId: ref<number | null>(null),
  }

  const display = {
    fontSize: ref(24),
    fontFamily: ref('Inter'),
    theme: ref('light'),
  }

  const content = {
    words: ref([] as string[]),
    sourceText: ref(''),
  }
})
