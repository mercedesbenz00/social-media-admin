<template>
  <VueFinalModal
    v-bind="$attrs"
    ref="modal"
    :drag="drag"
    :resize="true"
    :max-width="Infinity"
    :max-height="Infinity"
    :esc-to-close="escToClose"
    classes="modal-container"
    :content-class="'modal-content-' + size"
  >
    <div class="modal-wrapper">
      <button class="modal-close" @click="close">
        <span :class="closeIcon"></span>
      </button>
      <div v-if="!noTitle">
        <slot name="title">
          <div class="flex flex-col flex-none items-start modal-title-wrapper" :class="{ 'mb-2': title || subtitle }">
            <h2 v-if="title" class="modal-title" v-html="title"></h2>
            <h4 v-if="subtitle" class="modal-subtitle">{{ subtitle }}</h4>
          </div>
        </slot>
      </div>
      <div class="flex flex-1 overflow-y-auto">
        <div class="px-4 w-full min-w-[560px]">
          <slot>
            <div>MODAL CONTENT</div>
          </slot>
        </div>
      </div>

      <div v-if="!noActions" class="modal-actions">
        <slot name="actions" :close="close"> </slot>
      </div>
    </div>
  </VueFinalModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    noTitle: {
      type: Boolean,
      default: false,
    },
    noActions: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Modal Title',
    },
    subtitle: {
      type: String,
      default: undefined,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    closeIcon: {
      type: String,
      default: 'i-heroicons-solid:x',
    },
    size: {
      type: String,
      default: 'large',
      validator(value: string) {
        return ['small', 'large'].includes(value)
      },
    },
    escToClose: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {}
  },
  methods: {
    close() {
      const m = this.$refs.modal as any
      if (m) {
        m.$emit('update:modelValue', false)
      }
      this.$emit('close')
    },
  },
})
</script>

<style scoped lang="scss">
:deep(.modal-container) {
  --at-apply: flex justify-center items-center z-0;
}
:deep(.vfm__content) {
  --at-apply: bg-bg-primary-light rounded-md;
}
:deep(.modal-content-large) {
  --at-apply: md:w-2/3 min-h-[350px] md:max-h-[75%] max-h-[90%] w-11/12 max-w-[90vw] flex flex-col flex-none border bg-white rounded-md border-white shadow-md;
}
:deep(.modal-content-small) {
  min-height: 250px;
  max-height: 50%;
  min-width: 250px;
  max-width: 50%;
  --at-apply: flex flex-col flex-none  w-1/2 border bg-white rounded-md border-white shadow-md relative;
}

:deep(.modal-wrapper) {
  --at-apply: w-full h-full relative;

  .modal-close {
    --at-apply: transform duration-150 hover:scale-105 z-99  rounded-full bg-error text-white flex-center-none absolute -top-3 -right-3 rtl:-left-3 h-8 w-8;
  }
  .modal-title {
    --at-apply: text-2xl font-bold text-center text-primary px-4 h-10 pt-2;
  }
  .modal-subtitle {
    --at-apply: text-base font-normal text-text-primary-light  px-4;
  }

  .modal-actions {
    --at-apply: h-12 flex flex-none items-center justify-evenly;
  }
}

.modal-main {
  --at-apply: flex-1 flex-col flex py-4 px-4 text-lg items-center justify-center overflow-y-auto;
}
</style>
