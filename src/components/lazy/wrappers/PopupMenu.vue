<template>
  <PTieredMenu :model="items" :popup="true" class="popup-menu" ref="pTiredMenu">
    <template #item="{ item }">
      <a class="item" :class="item.class" @click="item.action(itemId)">{{ $t(item.title) }}</a>
    </template>
  </PTieredMenu>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { IPopupMenuItem } from '@/data/main.interface'
const props = defineProps({
  items: {
    type: Array as PropType<IPopupMenuItem[]>,
    required: true
  },
  itemId: {
    type: Number,
    required: true
  }
})

const pTiredMenu = ref()

const toggle = (e) => {
  pTiredMenu.value.toggle(e)
}

defineExpose({
  toggle,
})
</script>

<style lang="scss">
.popup-menu {
  --at-apply: 'p-0 rounded-lg overflow-hidden mt-2 w-auto';
  .p-menuitem {
    .item {
      --at-apply: 'inline-block px-4 py-2 text-left text-text-primary bg-bg-primary-light w-full cursor-pointer hover:bg-primary hover:text-white';
    }
  }
}
</style>
