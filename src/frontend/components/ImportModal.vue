<template>
  <div v-if="modelValue" class="modal" @click.self="close">
    <div class="modal__dialog">
      <button class="modal__close ui-button ui-button--icon" @click="close" aria-label="Close">
        <img class="ui-icon" src="/close.svg" alt="Close" />
      </button>
      <div class="modal__body">
        <file-uploader />
        <text-input />
      </div>
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

<style scoped lang="scss" src="../styles/components/import-modal.scss"></style>
