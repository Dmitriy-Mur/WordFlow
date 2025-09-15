import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTextContentStore = defineStore('textContent', () => {
  const words = ref<string[]>([])
  const sourceText = ref('')

  const getTimeToRead = (
    wordsPerMinute: number,
    currentWordIndex: number,
    currentChunkSize: number,
  ) => {
    const totalWords = words.value.length
    const safeWpm = Math.max(1, wordsPerMinute)
    const wordsRead = Math.max(0, Math.min(currentWordIndex, totalWords))
    const remainingWords = Math.max(0, totalWords - wordsRead)

    void currentChunkSize

    const minutesTotal = totalWords / safeWpm
    const minutesSpent = wordsRead / safeWpm

    const formatMinutes = (mins: number) => {
      if (!isFinite(mins) || mins <= 0) return '0m'
      const totalSeconds = Math.ceil(mins * 60)
      let hours = Math.floor(totalSeconds / 3600)
      let minutes = Math.ceil((totalSeconds % 3600) / 60)
      if (minutes === 60) {
        hours += 1
        minutes = 0
      }
      if (hours > 0) {
        return `${hours}h ${minutes}m`
      }
      return `${Math.max(1, minutes)}m`
    }

    const spentFormatted = formatMinutes(minutesSpent)
    const totalFormatted = formatMinutes(minutesTotal)
    return `${spentFormatted} / ${totalFormatted}`
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
    getTimeToRead,
    getCurrentChunk,
    loadText,
  }
})
