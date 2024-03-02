<template>
  <div class="flex flex-col items-center justify-center space-y-4">
    <div v-if="icon" class="w-10 h-10" :class="icon"></div>
    <div v-if="title" class="font-bold text-2xl">{{ title }}</div>
    <div v-if="subtitle" class="text-sm">{{ subtitle }}</div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: undefined
  },
  subtitle: {
    type: String,
    required: false,
    default: undefined
  },
  icon: {
    type: String,
    required: false,
    default: undefined
  }
})
</script>
