<template>
  <div class="w-screen fixed h-12 top-0 z-50 flex justify-end items-center px-4 primary-shadow bg-bg-primary">
    <div class="flex justify-between items-center w-full">
      <img class="logo-dark" height="32" width="80" src="@/assets/logo-light.svg" />
      <img class="logo-light" width="80" src="@/assets/logo-dark.svg" />
      <SettingsMenu></SettingsMenu>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAssets } from '@/composables/useAssets'
import { useTheme } from '@/composables/useTheme'
import { useAuthStore } from '@/data/auth/auth.store'
const $auth = useAuthStore()
const menuIsOpen = ref(false)
const theme = useTheme()
const mode = computed(() => theme.mode)
const imageId = Math.floor(Math.random() * 16)
const asset = useAssets

const op = ref()
const toggle = (event) => {
  menuIsOpen.value = !menuIsOpen.value
  op.value.toggle(event)
}

const logout = () => {
  $auth.logout()
}
</script>
<style scoped lang="scss">
.dark-mode {
  & .logo-dark {
    display: none;
  }
}

.light-mode {
  & .logo-light {
    display: none;
  }
}
</style>