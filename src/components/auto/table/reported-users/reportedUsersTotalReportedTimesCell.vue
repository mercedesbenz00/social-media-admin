<template>
  <div>{{ data.complaintCount }}</div>
</template>
<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  data: {
    type: Object as PropType<any>,
    required: true
  }
})
</script>
