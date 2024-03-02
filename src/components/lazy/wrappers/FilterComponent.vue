<template>
  <PButton label="Filter" icon="i-figma:filter" class="btn-flat-primary" @click="toggle"/>
  <POverlayPanel ref="op">
    <div class="p-6 w-[192px]">
      <FilterStatus @on-change="filter.personStatus = $event"/>
      <PDivider />
      <FilterDate @on-change="handleDate"/>
    </div>
  </POverlayPanel>
</template>
<script setup lang="ts">
import moment from 'moment/min/moment-with-locales'
const emits = defineEmits(['on-filter'])
const op = ref()
const toggle = (event: any) => {
  op.value?.toggle(event)
}
const handleDate = ($event) => {
  filter.fromDate = $event[0]
  filter.toDate = $event[1]
}
const filter = reactive({
  personStatus: 'ANY',
  fromDate: '',
  toDate: ''
})
watch(filter, () => {
  emits('on-filter', filter)
})
</script>
