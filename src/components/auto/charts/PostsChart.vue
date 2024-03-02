<template>
  <div>
    <div class="flex flex-col space-y-2 mb-4">
        <div class="font-bold text-xl">{{ $t('chart.posts.title') }}</div>
        <div class="flex items-center justify-between">
          <div>{{ $t('chart.posts.all_posts') }}</div>
          <div class="text-primary font-bold">{{ allPostsCount }}</div>
        </div>
         <div class="flex items-center justify-between">
          <div>{{ $t('chart.posts.new_posts') }}</div>
          <div class="text-primary font-bold">{{ newPostsCount }}</div>
        </div>
      </div>
    <Chart v-if="data && labels" :data="data" :labels="labels" :label="$t('chart.posts.title')"/>
  </div>
</template>
<script setup lang="ts">
import { useChartsStore } from '@/data/charts/charts.store'

const data = ref()
const labels = ref()
const allPostsCount = ref(0)
const newPostsCount = ref(0)
const $charts = useChartsStore()
const fetch = async () => {
  const response = await $charts.getPostsChart()
  if (response) {
    const dataArr = [] as number[]
    const labelsArr = [] as string[]
    allPostsCount.value = response.allPostsCount
    newPostsCount.value = response.newPostsCount
    response.createdPosts.forEach((item) => {
      const { date, createdPostsCount } = item
      dataArr.push(createdPostsCount)
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