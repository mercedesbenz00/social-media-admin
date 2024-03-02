<template>
  <div class="wrapper">
    <AppSettings />
    <MainSidebar />
    <div class="main w-full py-5 pl-5">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.main {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
