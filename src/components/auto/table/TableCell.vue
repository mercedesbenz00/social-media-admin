<template>
  <component :is="`${state + columnName}Cell`" :data="resizedData" :item-id="resizedData.id" />
</template>
<script setup lang="ts">
import type { IColumn } from '@/data/column/column.interface'
import type { PropType } from 'vue'
import tableConsts from '@/constants/table.constants'
const props = defineProps({
  data: {
    type: Object as PropType<any>,
    required: true
  },
  column: {
    type: Object as PropType<IColumn>,
    required: true
  },
  state: {
    type: String,
    required: true
  }
})
const { t } = useI18n()
const resizedData = computed(() => props.data.data)
const columnName = computed(() => {
  const { table } = tableConsts[props.state]
  return table[props.column.header.split('.').slice(-1)].replace(/ /g,'')
})
</script>
