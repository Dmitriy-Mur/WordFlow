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

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: grid;
  place-items: center;
  padding: 16px;
}
.modal__dialog {
  position: relative;
  width: min(100%, 680px);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
}
.modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
}
.modal__body {
  padding: 24px 16px;
  display: grid;
  gap: 16px;
}
</style>
