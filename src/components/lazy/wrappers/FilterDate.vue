<template>
  <div class="space-y-4">
    <div class="text-xs">
      <div>Last report date</div>
      <div class="text-text-primary-light">Default: 30 days</div>
    </div>
      <div class="flex items-center relative">
        <div class="i-figma:calendar w-4 h-4 left-4 absolute m-auto inset-y-0 bg-primary"></div>
        <PCalendar v-model="from" dateFormat="dd/mm/yy" class="h-8"/>
      </div>
      <div class="flex items-center relative">
        <div class="i-figma:calendar w-4 h-4 left-4 absolute m-auto inset-y-0 bg-primary"></div>
        <PCalendar v-model="to" dateFormat="dd/mm/yy" class="h-8"/>
      </div>
  </div>
</template>
<script setup lang="ts">
const from = ref('From')
const to = ref('To')
const emits = defineEmits(['on-change'])
watch([from, to], () => {
  emits('on-change', [
    from.value != 'From' ? from.value : '',
    to.value !== 'To' ? to.value : Date.now()
  ])
})
</script>
<style scoped lang="scss">
:deep(.p-calendar){
  & input {
    --at-apply: 'ps-10 h-8 text-xs'
  }
}
</style>