<template>
  <div>
    <div class="flex flex-col space-y-2 mb-4">
        <div class="font-bold text-xl">{{ $t('chart.categories.title') }}</div>
        <div class="flex items-center justify-between">
          <div>{{ $t('chart.categories.all_categories') }}</div>
          <div class="text-primary font-bold">{{ allCategoriesCount }}</div>
        </div>
         <div class="flex items-center justify-between">
          <div>{{ $t('chart.categories.new_categories') }}</div>
          <div class="text-primary font-bold">{{ newCategoriesCount }}</div>
        </div>
      </div>
    <Chart v-if="data && labels" :data="data" :labels="labels" :label="$t('chart.categories.title')"/>
  </div>
</template>
<script setup lang="ts">
import { useChartsStore } from '@/data/charts/charts.store'

const data = ref()
const labels = ref()
const allCategoriesCount = ref(0)
const newCategoriesCount = ref(0)
const $charts = useChartsStore()
const fetch = async () => {
  const response = await $charts.getCategoriesChart()
  if (response) {
    const dataArr = [] as number[]
    const labelsArr = [] as string[]
    allCategoriesCount.value = response.allCategoriesCount
    newCategoriesCount.value = response.newCategoriesCount
    response.createdCategories.forEach((item) => {
      const { date, createdCategoriesCount } = item
      dataArr.push(createdCategoriesCount)
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