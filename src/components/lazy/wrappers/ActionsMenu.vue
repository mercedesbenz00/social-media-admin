<template>
  <PButton
    icon="i-figma:more-horizontal"
    @click.stop="toggle"
    aria:haspopup="true"
    aria-controls="dropdown_panel"
    class="btn-flat-primary text-2xl text-primary"
  >
  </PButton>
  <PopupMenu :items="actions" :itemId="itemId" ref="dropdown" id="dropdown_panel" />
</template>

<script setup lang="ts">
import type { IPopupMenuItem } from '@/data/main.interface'
import type { PropType } from 'vue'
const props = defineProps({
  actions: {
    type: Array as PropType<IPopupMenuItem[]>,
    required: true
  },
  itemId: {
    type: Number,
    required: true
  }
})

const dropdown = ref()
const toggle = (event) => {
  dropdown.value.toggle(event)
}
</script>
