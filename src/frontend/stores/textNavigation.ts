import { defineStore } from 'pinia'
import { useReadingStateStore } from './readingState'
import { useTextContentStore } from './textContent'

export const useTextNavigationStore = defineStore('textNavigation', () => {
  const goToPreviousChunk = () => {
    const readingState = useReadingStateStore()
    const chunkStart = Math.max(0, readingState.currentWordIndex - readingState.currentChunkSize)
    readingState.currentWordIndex = chunkStart
  }

  const goToNextChunk = () => {
    const readingState = useReadingStateStore()
    const textContent = useTextContentStore()

    readingState.currentWordIndex = Math.min(
      Math.max(0, textContent.words.length - 1),
      readingState.currentWordIndex + readingState.currentChunkSize,
    )
    readingState.currentChunkSize = readingState.nextChunkSize
  }

  return {
    goToPreviousChunk,
    goToNextChunk,
    jumpToPosition: (position: number) => {
      const readingState = useReadingStateStore()
      const textContent = useTextContentStore()
      readingState.currentWordIndex = Math.max(
        0,
        Math.min(position, Math.max(0, textContent.words.length - 1)),
      )
    },
  }
})
