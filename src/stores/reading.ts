import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useReadingStore = defineStore('reading', () => {
  const playback = {
    isPaused: ref(false),
    WordPerSecond: ref(100),
    currentChunkIndex: ref(0),
    chunkSize: ref(3),
    intervalId: ref<number | null>(null),
  }

  const display = {
    fontSize: ref(24),
    fontFamily: ref('Inter'),
    theme: ref('light'),
  }

  const content = {
    chunks: ref([] as string[]),
    sourceText: ref(''),
  }
  const currentChunk = computed(() => content.chunks.value[playback.currentChunkIndex.value])
  const progress = computed(() =>
    Math.round((playback.currentChunkIndex.value / content.chunks.value.length) * 100),
  )

  const startWordRotation = () => {
    stopWordRotation()
    playback.intervalId.value = window.setInterval(() => {
      setCurrentChunk()
    }, convertWPSToTimeout(playback.WordPerSecond.value))
  }

  const stopWordRotation = () => {
    if (playback.intervalId.value) {
      window.clearInterval(playback.intervalId.value)
      playback.intervalId.value = null
    }
  }

  const setCurrentChunk = () => {
    playback.currentChunkIndex.value =
      (playback.currentChunkIndex.value + 1) % content.chunks.value.length
  }

  const convertWPSToTimeout = (wps: number) => {
    return (60 / wps) * playback.chunkSize.value * 1000
  }

  const splitToChunks = (words: string[], chunkSize: number) => {
    const result: string[] = []
    for (let i = 0; i < words.length; i += chunkSize) {
      const group = words.slice(i, i + chunkSize).join(' ')
      result.push(group)
    }
    return result
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
      content.chunks.value = content.sourceText.value.split(/\s+/)
      content.chunks.value = splitToChunks(content.chunks.value, playback.chunkSize.value)
      playback.currentChunkIndex.value = 0
      console.log(content.chunks.value)
    },

    togglePause: () => {
      playback.isPaused.value = !playback.isPaused.value
      playback.isPaused.value ? stopWordRotation() : startWordRotation()
    },

    navigate: {
      back: () => {
        if (playback.currentChunkIndex.value > 0) {
          playback.currentChunkIndex.value--
        }
      },
      forward: () => {
        if (playback.currentChunkIndex.value < content.chunks.value.length - 1) {
          playback.currentChunkIndex.value++
        }
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
      udpate: () => {
        stopWordRotation()
        startWordRotation()
      },
    },
  }
})
