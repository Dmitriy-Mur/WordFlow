<template>
  <div class="uploader">
    <input
      type="file"
      accept=".pdf,.md,.markdown,text/markdown,application/pdf,text/plain"
      @change="onFileChange"
    />
    <button :disabled="!selectedFile || loading" @click="upload">
      {{ loading ? 'Uploading...' : 'Upload' }}
    </button>
    <span v-if="error" class="error">{{ error }}</span>
  </div>
  <div v-if="serverMessage" class="hint">{{ serverMessage }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTextContentStore } from '../stores/textContent'
import { usePlaybackControlStore } from '../stores/playbackControl'
import { useReadingStateStore } from '../stores/readingState'

const selectedFile = ref<File | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const serverMessage = ref<string | null>(null)

const content = useTextContentStore()
const playback = usePlaybackControlStore()
const readingState = useReadingStateStore()

const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  selectedFile.value = input.files && input.files[0] ? input.files[0] : null
  error.value = null
  serverMessage.value = null
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
      // ignore parse errors; we'll handle below
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
      return
    }

    if (data && data.success && typeof data.filename === 'string') {
      // Fastify flow: fetch the content right after upload
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

<style scoped>
.uploader {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.error {
  color: #c33;
}
.hint {
  font-size: 0.9em;
  opacity: 0.8;
}
</style>
