<template>
  <div class="p-input-icon-left w-[260px]">
    <i class="pi pi-search" />
    <p-input-text class="text-xs h-8 w-full" @input="search" v-model="searchText" :placeholder="searchPlaceholder" />
  </div>
</template>
<script lang="ts" setup>
import { debounce } from 'lodash'
const props = defineProps({
  searchPlaceholder: {
    type: String,
    default: undefined
  }
})
const emit = defineEmits(['search'])
const searchText = ref('')

const search = debounce(() => {
  emit('search', searchText.value)
}, 500)
</script>
