import { defineStore } from 'pinia'
import { useReadingStateStore } from './readingState'
import { useTextNavigationStore } from './textNavigation'

export const usePlaybackControlStore = defineStore('playbackControl', () => {
  const convertWpmToTimeoutMs = (wpm: number, chunkSize: number) => {
    return (60 / Math.max(1, wpm)) * Math.max(1, chunkSize) * 1000
  }

  const startReading = () => {
    const readingState = useReadingStateStore()
    const navigation = useTextNavigationStore()

    stopReading()
    readingState.isPaused = false

    const delay = convertWpmToTimeoutMs(readingState.wordsPerMinute, readingState.currentChunkSize)

    readingState.intervalId = window.setInterval(() => {
      navigation.goToNextChunk()
    }, delay)
  }

  const stopReading = () => {
    const readingState = useReadingStateStore()
    if (readingState.intervalId != null) {
      window.clearInterval(readingState.intervalId)
      readingState.intervalId = undefined
    }
  }

  const togglePause = () => {
    const readingState = useReadingStateStore()
    if (readingState.isPaused) {
      startReading()
    } else {
      readingState.isPaused = true
      stopReading()
    }
  }

  const restartPlayback = () => {
    const readingState = useReadingStateStore()
    if (!readingState.isPaused) {
      startReading()
    }
  }

  return {
    startReading,
    stopReading,
    togglePause,
    restartPlayback,
  }
})
