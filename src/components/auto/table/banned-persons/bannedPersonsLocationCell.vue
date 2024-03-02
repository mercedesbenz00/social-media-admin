<template>
  <div v-if="location">{{ location }}</div>
  <div v-else>{{ $t('data_not_provided') }}</div>
</template>
<script setup lang="ts">
import { useLocation } from '@/composables/useLocation'
import type { PropType } from 'vue'
const props = defineProps({
  data: {
    type: Object as PropType<any>,
    required: true
  }
})
const location = ref()
onMounted(async () => {
  location.value = await useLocation(props.data.bannedPerson.cityId)
})
</script>
