import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

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

  const currentWord = computed(() => content.words.value[playback.currentWordIndex.value])
  const progress = computed(() =>
    Math.round((playback.currentWordIndex.value / content.words.value.length) * 100),
  )

  const startWordRotation = () => {
    stopWordRotation()
    playback.intervalId.value = window.setInterval(() => {
      setCurrentWord()
    }, playback.speed.value)
  }

  const stopWordRotation = () => {
    if (playback.intervalId.value) {
      window.clearInterval(playback.intervalId.value)
      playback.intervalId.value = null
    }
  }

  const setCurrentWord = () => {
    playback.currentWordIndex.value =
      (playback.currentWordIndex.value + 1) % content.words.value.length
  }
  return {
    playback,
    display,
    content,

    currentWord,
    progress,

    loadText: (text: string) => {
      content.sourceText.value = text
      content.words.value = content.sourceText.value.split(/\s+/)
      playback.currentWordIndex.value = 0
    },

    togglePause: () => {
      playback.isPaused.value = !playback.isPaused.value
      playback.isPaused.value ? stopWordRotation() : startWordRotation()
    },

    navigate: {
      back: () => {
        if (playback.currentWordIndex.value > 0) {
          playback.currentWordIndex.value--
        }
      },
      forward: () => {
        if (playback.currentWordIndex.value < content.words.value.length - 1) {
          playback.currentWordIndex.value++
        }
      },
    },

    adjustSpeed: {
      increase: () => {
        playback.speed.value += 100
        if (!playback.isPaused.value) {
          stopWordRotation()
          startWordRotation()
        }
      },
      decrease: () => {
        if (playback.speed.value > 100) {
          playback.speed.value -= 100
          if (!playback.isPaused.value) {
            stopWordRotation()
            startWordRotation()
          }
        }
      },
    },
  }
})
