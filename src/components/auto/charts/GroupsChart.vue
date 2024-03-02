<template>
  <div>
    <div class="flex flex-col space-y-2 mb-4">
        <div class="font-bold text-xl">{{ $t('chart.groups.title') }}</div>
        <div class="flex items-center justify-between">
          <div>{{ $t('chart.groups.all_groups') }}</div>
          <div class="text-primary font-bold">{{ allGroupsCount }}</div>
        </div>
         <div class="flex items-center justify-between">
          <div>{{ $t('chart.groups.new_groups') }}</div>
          <div class="text-primary font-bold">{{ newGroupsCount }}</div>
        </div>
      </div>
    <Chart v-if="data && labels" :data="data" :labels="labels" :label="$t('chart.groups.title')"/>
  </div>
</template>
<script setup lang="ts">
import { useChartsStore } from '@/data/charts/charts.store'

const data = ref()
const labels = ref()
const allGroupsCount = ref(0)
const newGroupsCount = ref(0)
const $charts = useChartsStore()
const fetch = async () => {
  const response = await $charts.getGroupsChart()
  if (response) {
    const dataArr = [] as number[]
    const labelsArr = [] as string[]
    allGroupsCount.value = response.allGroupsCount
    newGroupsCount.value = response.newGroupsCount
    response.createdGroups.forEach((item) => {
      const { date, createdGroupsCount } = item
      dataArr.push(createdGroupsCount)
      labelsArr.push(date)
    })
    data.value = dataArr
    labels.value = labelsArr
  }
}

onMounted(() => {
  fetch()
})
</script>