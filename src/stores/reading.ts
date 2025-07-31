import { defineStore } from 'pinia'

export const useReadingStore = defineStore('reading', {
  state: () => ({
    playback: {
      isPaused: false,
      speed: 1000,
      currentWordIndex: 0,
      intervalId: null as number | null,
    },
    display: {
      fontSize: 24,
      fontFamily: 'Inter',
      theme: 'light',
    },
    content: {
      words: [] as string[],
      sourceText: '',
    },
  }),

  getters: {
    currentWord: (state) => state.content.words[state.playback.currentWordIndex],
    progress: (state) => (state.playback.currentWordIndex / state.content.words.length) * 100,
  },

  actions: {
    loadText(text: string) {
      this.content.sourceText = text
      this.content.words = this.content.sourceText.split(/\s+/)
      this.playback.currentWordIndex = 0
      console.log('Store: words = ', this.content.words)
    },
    togglePause() {
      this.playback.isPaused = !this.playback.isPaused
      console.log('Pause state:', this.playback.isPaused)
      if (this.playback.isPaused) {
        this.stopWordRotation()
      } else {
        this.startWordRotation()
      }
    },
    startWordRotation() {
      this.stopWordRotation()
      this.playback.intervalId = window.setInterval(() => {
        this.setCurrentWord()
      }, this.playback.speed)
    },
    stopWordRotation() {
      if (this.playback.intervalId) {
        window.clearInterval(this.playback.intervalId)
        this.playback.intervalId = null
      }
    },
    setCurrentWord() {
      if (this.content.currentWordIndex === 0) {
        return
      }
      this.playback.currentWordIndex =
        (this.playback.currentWordIndex + 1) % this.content.words.length
    },
    toggleBack() {
      if (this.playback.currentIndex > 0) {
        this.playback.currentIndex--
      }
    },
  },
})
