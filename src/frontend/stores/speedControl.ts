import { defineStore } from 'pinia'
import { useReadingStateStore } from './readingState'
import { usePlaybackControlStore } from './playbackControl'

export const useSpeedControlStore = defineStore('speedControl', () => {
  const increaseReadingSpeed = () => {
    const readingState = useReadingStateStore()
    readingState.wordsPerMinute += 10
    updatePlayback()
  }

  const decreaseReadingSpeed = () => {
    const readingState = useReadingStateStore()
    if (readingState.wordsPerMinute > 50) {
      readingState.wordsPerMinute -= 10
      updatePlayback()
    }
  }

  const updatePlayback = () => {
    const readingState = useReadingStateStore()
    const playback = usePlaybackControlStore()
    if (!readingState.isPaused) {
      playback.restartPlayback()
    }
  }

  return {
    increaseReadingSpeed,
    decreaseReadingSpeed,
    setSpeed: (speed: number) => {
      const readingState = useReadingStateStore()
      readingState.wordsPerMinute = Math.max(50, Math.min(speed, 1000))
      updatePlayback()
    },
  }
})
