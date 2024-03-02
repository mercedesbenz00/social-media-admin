<template>
  <div>{{ moment(data).format('DD/MM/YYYY') }}</div>
</template>
<script setup lang="ts">
import type { PropType } from "vue"
import moment from 'moment/min/moment-with-locales'
defineProps({
  data: {
    type: Object as PropType<any>,
    required: true
  }
})
</script>
