<template>
  <div>
    <PButton class="uppercase" :icon="`${theme.next.icon} text-xl`" @click="theme.change()"></PButton>
  </div>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'

const theme = useTheme()
</script>

<style scoped></style>
