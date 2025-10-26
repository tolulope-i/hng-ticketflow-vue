<script>
import { useToast } from '../composables/useToast'

export default {
  name: 'Toast',
  setup() {
    const { toasts, removeToast } = useToast()

    return {
      toasts,
      removeToast,
    }
  },
}
</script>


<template>
  <div class="toast-container" v-if="toasts.length > 0">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast', `toast-${toast.type}`]"
      role="alert"
      aria-live="polite"
    >
      <span>{{ toast.message }}</span>
      <button
        @click="removeToast(toast.id)"
        class="btn btn-sm"
        style="background: transparent; border: none; font-size: 1.25rem; padding: 0"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  </div>
</template>


