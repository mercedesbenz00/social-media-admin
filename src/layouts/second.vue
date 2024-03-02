<template>
  <div>
    second layout
    {{ cookie }}
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return { cookie: useCookie().getAll() }
  },
})
</script>

<style scoped></style>
