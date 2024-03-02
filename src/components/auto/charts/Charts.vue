<template>
  <div class="grid md:grid-cols-1 lg:grid-cols-2 gap-4 w-full mb-6">
    <div class="w-full h-full p-6 primary-shadow rounded-2xl">
      <GroupsChart />
      <div class="text-text-blue-light text-xl cursor-pointer mt-4" @click="router.push('/groups')">{{ $t('chart.groups.see_all') }}</div>
    </div>
    <div class="w-full h-full p-6 primary-shadow rounded-2xl">
      <CategoriesChart />
      <div class="text-text-blue-light text-xl cursor-pointer mt-4" @click="router.push('/categories')">{{ $t('chart.categories.see_all') }}</div>
    </div>
    <div class="w-full h-full p-6 primary-shadow rounded-2xl">
      <PersonsChart />
    </div>
    <div class="w-full h-full p-6 primary-shadow rounded-2xl">
      <PostsChart />
    </div>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter()
</script>
