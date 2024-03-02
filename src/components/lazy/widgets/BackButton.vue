<template>
  <router-link
    class="text-text-primary hover:text-gray-600 font-bold text-xl cursor-pointer flex items-center mb-4"
    :to="to"
  >
    <div class="pi pi-arrow-left text-sm font-bold px-2"></div>
    <div>{{ title }}</div>
  </router-link>
</template>
<script setup lang="ts">
const router = useRouter()
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true
  }
})
</script>
