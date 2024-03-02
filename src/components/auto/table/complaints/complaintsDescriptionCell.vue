<template>
  <div v-if="data.reason !== ''">{{ data.reason }}</div>
  <div v-else>-</div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import { get } from 'lodash'
defineProps({
  data: {
    type: Object as PropType<any>,
    required: true
  }
})
</script>