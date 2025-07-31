import { defineStore } from 'pinia'

export const useReadingStore = defineStore('reading', {
  state: () => ({
    playback: {
      isPaused: false,
      speed: 1000,
      currentIndex: 0,
    },
    display: {
      fontSize: 24,
      fontFamily: 'Inter',
      theme: 'light',
    },
    content: {
      words: [] as string[],
    },
  }),

  actions: {
    togglePause() {
      this.playback.isPaused = !this.playback.isPaused
      console.log('Pause state:', this.playback.isPaused)
    },
  },
})
