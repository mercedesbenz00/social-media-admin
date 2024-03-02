<template>
  <div class="flex items-center">
    <Avatar :avatar="data.bannedPerson.avatar" class="w-9 h-9 me-2" shape="circle"></Avatar>
    <div class="text-sm font-bold">{{ data.bannedPerson.displayName }}</div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
const props = defineProps({
  data: {
    type: Object as PropType<any>,
    required: true
  }
})
</script>
