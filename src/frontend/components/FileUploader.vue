<template>
  <div class="uploader">
    <input
      ref="fileInput"
      class="uploader__input visually-hidden"
      type="file"
      accept=".pdf,.md,.markdown,text/markdown,application/pdf,text/plain"
      @change="onFileChange"
    />
    <button class="ui-button" :disabled="loading" @click="pickFile">
      <img class="ui-icon" src="/file upload.svg" alt="Upload" />
      <span>{{ loading ? 'Uploading...' : 'Import file' }}</span>
    </button>
    <span v-if="error" class="uploader__error">{{ error }}</span>
    <div v-if="serverMessage" class="uploader__hint">{{ serverMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { useTextContentStore } from '../stores/textContent'
import { usePlaybackControlStore } from '../stores/playbackControl'
import { useReadingStateStore } from '../stores/readingState'

const selectedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const serverMessage = ref<string | null>(null)

const content = useTextContentStore()
const playback = usePlaybackControlStore()
const readingState = useReadingStateStore()
const closeImportModal = inject<() => void>('closeImportModal')

const pickFile = () => {
  if (loading.value) return
  fileInput.value?.click()
}

const onFileChange = async (e: Event) => {
  const input = e.target as HTMLInputElement
  selectedFile.value = input.files && input.files[0] ? input.files[0] : null
  error.value = null
  serverMessage.value = null
  if (selectedFile.value) {
    await upload()
    if (fileInput.value) fileInput.value.value = ''
    selectedFile.value = null
  }
}

const upload = async () => {
  if (!selectedFile.value || loading.value) return
  loading.value = true
  error.value = null
  serverMessage.value = null

  try {
    const form = new FormData()
    form.append('file', selectedFile.value)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form,
    })
    const contentType = res.headers.get('content-type') || ''
    let data: any = null
    let rawBody: string | null = null
    try {
      if (contentType.includes('application/json')) {
        data = await res.json()
      } else {
        rawBody = await res.text()
        if (rawBody && rawBody.trim().startsWith('{')) {
          data = JSON.parse(rawBody)
        }
      }
    } catch (_) {
      console.log('Error')
    }

    if (!res.ok) {
      const message = (data && data.error) || rawBody || `HTTP ${res.status}`
      error.value = message
      return
    }

    if (data && typeof data.text === 'string') {
      const result = content.loadText(data.text)
      if (result?.shouldReset) {
        readingState.resetForNewText()
      }
      playback.restartPlayback()
      serverMessage.value = 'Text loaded from uploaded file.'
      closeImportModal?.()
      return
    }

    if (data && data.success && typeof data.filename === 'string') {
      const fileRes = await fetch(`/api/file/${encodeURIComponent(data.filename)}`)
      const fileCt = fileRes.headers.get('content-type') || ''
      let fileData: any = null
      let fileRaw: string | null = null
      try {
        if (fileCt.includes('application/json')) {
          fileData = await fileRes.json()
        } else {
          fileRaw = await fileRes.text()
          if (fileRaw && fileRaw.trim().startsWith('{')) {
            fileData = JSON.parse(fileRaw)
          }
        }
      } catch (_) {}
      if (!fileRes.ok) {
        error.value = (fileData && fileData.error) || fileRaw || 'Failed to read uploaded file'
        return
      }
      if (fileData && typeof fileData.content === 'string') {
        const result = content.loadText(fileData.content)
        if (result?.shouldReset) {
          readingState.resetForNewText()
        }
        playback.restartPlayback()
        serverMessage.value = 'Text loaded from uploaded file.'
        closeImportModal?.()
        return
      }
    }

    error.value = 'Unexpected server response'
  } catch (e: any) {
    error.value = e?.message || 'Network error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.uploader {
  display: grid;
  gap: 10px;
}
.uploader__input {
  display: none;
}
.uploader__error {
  color: #ef4444;
}
.uploader__hint {
  color: var(--color-muted);
}
</style>
