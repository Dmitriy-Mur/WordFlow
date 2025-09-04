<template>
  <div v-if="modelValue" class="backdrop" @click.self="close">
    <div class="modal">
      <button class="close" @click="close">×</button>
      <file-uploader />
      <text-input />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import FileUploader from './FileUploader.vue'
import TextInput from './TextInput.vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()
const close = () => emit('update:modelValue', false)
</script>
