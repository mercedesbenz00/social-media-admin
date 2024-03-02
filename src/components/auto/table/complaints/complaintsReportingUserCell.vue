<template>
  <div class="flex items-center">
    <Avatar :avatar="data.avatar" class="me-2"/>
    <div>{{ get(data.owner, 'displayName') }}</div>
  </div>
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
