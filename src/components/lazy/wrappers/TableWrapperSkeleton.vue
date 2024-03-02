<template>
  <div>
   <PDataTable :value="columns" responsiveLayout="scroll" class="px-6 pb-6 pt-2 primary-shadow rounded-2xl">
    <PColumn v-for="(i, index) in columns" :key="index" :header="$t(i.header)">
      <template #body>
        <PSkeleton></PSkeleton>
      </template>
    </PColumn>
  </PDataTable>
      </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import type { IColumn } from '@/data/column/column.interface'

const props = defineProps({
  columns: {
    type: Array as PropType<IColumn[]>,
    required: false,
    default: undefined,
  }
})
</script>

