import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useReadingStore = defineStore('reading', () => {
  const playback = {
    isPaused: ref(false),
    WordPerSecond: ref(100),
    currentWordIndex: ref(0),
    currentChunkSize: ref(3), // Текущий размер чанка
    nextChunkSize: ref(3), // Размер для следующих чанков
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

  // Текущий чанк формируется с currentChunkSize
  const currentChunk = computed(() => {
    const start = playback.currentWordIndex.value
    const end = Math.min(start + playback.currentChunkSize.value, content.words.value.length)
    return content.words.value.slice(start, end).join(' ')
  })

  // Следующий чанк будет формироваться с nextChunkSize
  const nextChunk = computed(() => {
    const nextStart = playback.currentWordIndex.value + playback.currentChunkSize.value
    const nextEnd = Math.min(nextStart + playback.nextChunkSize.value, content.words.value.length)
    return content.words.value.slice(nextStart, nextEnd).join(' ')
  })

  const progress = computed(() =>
    Math.round((playback.currentWordIndex.value / content.words.value.length) * 100),
  )

  const convertWPSToTimeout = (wps: number) => {
    return (60 / wps) * playback.currentChunkSize.value * 1000
  }

  const startWordRotation = () => {
    stopWordRotation()
    playback.intervalId.value = window.setInterval(() => {
      moveToNextChunk()
    }, convertWPSToTimeout(playback.WordPerSecond.value))
  }

  const stopWordRotation = () => {
    if (playback.intervalId.value) {
      window.clearInterval(playback.intervalId.value)
      playback.intervalId.value = null
    }
  }

  const moveToNextChunk = () => {
    // При переходе применяем nextChunkSize как новый currentChunkSize
    playback.currentWordIndex.value += playback.currentChunkSize.value
    playback.currentChunkSize.value = playback.nextChunkSize.value

    // Проверяем выход за границы текста
    if (playback.currentWordIndex.value >= content.words.value.length) {
      playback.currentWordIndex.value = 0
    }
  }

  return {
    playback,
    display,
    content,

    currentChunk,
    nextChunk,
    progress,

    startWordRotation,
    stopWordRotation,

    loadText: (text: string) => {
      content.sourceText.value = text
      content.words.value = content.sourceText.value.split(/\s+/)
      playback.currentWordIndex.value = 0
      playback.currentChunkSize.value = playback.nextChunkSize.value
    },

    // Устанавливаем размер только для следующих чанков
    updateChunkSize: (newChunkSize: number) => {
      playback.nextChunkSize.value = newChunkSize

      // Если воспроизведение активно, интервал перезапускать не нужно,
      // так как текущий чанк не меняется
    },

    togglePause: () => {
      playback.isPaused.value = !playback.isPaused.value
      playback.isPaused.value ? stopWordRotation() : startWordRotation()
    },

    navigate: {
      back: () => {
        // Возвращаемся к началу текущего чанка
        const chunkStart = Math.max(
          0,
          playback.currentWordIndex.value - playback.currentChunkSize.value,
        )
        playback.currentWordIndex.value = chunkStart
      },
      forward: () => {
        // Переходим к следующему чанку (с текущим размером)
        playback.currentWordIndex.value = Math.min(
          content.words.value.length - 1,
          playback.currentWordIndex.value + playback.currentChunkSize.value,
        )
        // При навигации вручную тоже применяем новый размер
        playback.currentChunkSize.value = playback.nextChunkSize.value
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
