import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useReadingStore = defineStore('reading', () => {
  const playback = {
    isPaused: ref(false),
    WordPerSecond: ref(100),
    currentWordIndex: ref(0),
    chunkSize: ref(3),
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

  const currentChunk = computed(() => {
    const start = playback.currentWordIndex.value
    const end = Math.min(start + playback.chunkSize.value, content.words.value.length)
    return content.words.value.slice(start, end).join(' ')
  })

  const progress = computed(() =>
    Math.round((playback.currentWordIndex.value / content.words.value.length) * 100),
  )

  const convertWPSToTimeout = (wps: number) => {
    return (60 / wps) * playback.chunkSize.value * 1000
  }

  const startWordRotation = () => {
    stopWordRotation()
    playback.intervalId.value = window.setInterval(() => {
      setNextChunk()
    }, convertWPSToTimeout(playback.WordPerSecond.value))
  }

  const stopWordRotation = () => {
    if (playback.intervalId.value) {
      window.clearInterval(playback.intervalId.value)
      playback.intervalId.value = null
    }
  }

  const setNextChunk = () => {
    playback.currentWordIndex.value =
      (playback.currentWordIndex.value + playback.chunkSize.value) % content.words.value.length
  }

  return {
    playback,
    display,
    content,

    currentChunk,
    progress,

    startWordRotation,
    stopWordRotation,

    loadText: (text: string) => {
      content.sourceText.value = text
      content.words.value = content.sourceText.value.split(/\s+/)
      playback.currentWordIndex.value = 0
    },

    updateChunkSize: (newChunkSize: number) => {
      if (newChunkSize === playback.chunkSize.value) return

      playback.chunkSize.value = newChunkSize

      if (playback.intervalId.value && !playback.isPaused.value) {
        stopWordRotation()
        startWordRotation()
      }
    },

    togglePause: () => {
      playback.isPaused.value = !playback.isPaused.value
      playback.isPaused.value ? stopWordRotation() : startWordRotation()
    },

    navigate: {
      back: () => {
        const newIndex = Math.max(0, playback.currentWordIndex.value - playback.chunkSize.value)
        playback.currentWordIndex.value = newIndex
      },
      forward: () => {
        const newIndex = Math.min(
          content.words.value.length - 1,
          playback.currentWordIndex.value + playback.chunkSize.value,
        )
        playback.currentWordIndex.value = newIndex
      },
    },

    adjustSpeed: {
      increase: () => {
        playback.WordPerSecond.value += 5
        if (!playback.isPaused.value) {
          stopWordRotation()
          startWordRotation()
        }
      },
      decrease: () => {
        if (playback.WordPerSecond.value > 5) {
          playback.WordPerSecond.value -= 5
          if (!playback.isPaused.value) {
            stopWordRotation()
            startWordRotation()
          }
        }
      },
      update: () => {
        stopWordRotation()
        startWordRotation()
      },
    },
  }
})
