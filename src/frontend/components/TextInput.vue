<template>
  <div class="paste">
    <button class="ui-button" @click="loadFromClipboard">Paste from clipboard</button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useTextContentStore } from '../stores/textContent'
import { usePlaybackControlStore } from '../stores/playbackControl'
import { useReadingStateStore } from '../stores/readingState'

const content = useTextContentStore()
const playback = usePlaybackControlStore()
const readingState = useReadingStateStore()
const closeImportModal = inject<() => void>('closeImportModal')

const loadFromClipboard = async () => {
  try {
    if (!navigator.clipboard || !navigator.clipboard.readText) {
      alert('Clipboard API not supported')
      return
    }
    const text = await navigator.clipboard.readText()
    if (!text) {
      alert('Clipboard is empty')
      return
    }
    const result = content.loadText(text)
    if (result?.shouldReset) {
      ;(readingState as any).resetForNewText()
    }

    closeImportModal?.()
  } catch (e) {
    alert('Error')
    console.error(e)
  }
}
</script>

<style scoped lang="scss">
.paste {
  display: flex;
}
</style>
