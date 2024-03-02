<template>
  <div>{{ data.email }}</div>
</template>
<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  data: {
    type: Object as PropType<any>,
    required: true
  }
})
</script>
