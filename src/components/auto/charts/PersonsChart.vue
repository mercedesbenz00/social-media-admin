<template>
  <div>
    <div class="flex flex-col space-y-2 mb-4">
        <div class="font-bold text-xl">{{ $t('chart.persons.title') }}</div>
        <div class="flex items-center justify-between">
          <div>{{ $t('chart.persons.all_persons') }}</div>
          <div class="text-primary font-bold">{{ allUsersCount }}</div>
        </div>
         <div class="flex items-center justify-between">
          <div>{{ $t('chart.persons.new_persons') }}</div>
          <div class="text-primary font-bold">{{ newUsersCount }}</div>
        </div>
      </div>
    <Chart v-if="data && labels" :data="data" :labels="labels" :label="$t('chart.persons.title')"/>
  </div>
</template>
<script setup lang="ts">
import { useChartsStore } from '@/data/charts/charts.store'

const data = ref()
const labels = ref()
const allUsersCount = ref(0)
const newUsersCount = ref(0)
const $charts = useChartsStore()
const fetch = async () => {
  const response = await $charts.getPersonsChart()
  if (response) {
    const dataArr = [] as number[]
    const labelsArr = [] as string[]
    allUsersCount.value = response.allUsersCount
    newUsersCount.value = response.newUsersCount
    response.activatedUsers.forEach((item) => {
      const { date, activatedUsersCount } = item
      dataArr.push(activatedUsersCount)
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