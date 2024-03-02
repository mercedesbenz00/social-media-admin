<template>
  <div>{{ date }}</div>
</template>
<script setup lang="ts">
import { formatDate } from '@/utils/formatDate.utils'
import type { PropType } from 'vue'
const props = defineProps({
  data: {
    type: Object as PropType<any>,
    required: true
  }
})
const date = computed(() => formatDate(props.data.createdAt))
</script>
