<template>
  <div :class="colorMode" class="bg-bg-primary-light text-text-primary relative font-sans">
    <RouterView></RouterView>
    <ModalsContainer></ModalsContainer>
    <PToast></PToast>
    <PConfirmDialog></PConfirmDialog>
  </div>
</template>

<script setup>
import { metaDefaults } from '@/constants/global.constants'
import { useTheme } from './composables/useTheme'
import { useMainStore } from './data/main.store'
import { isRTL } from './plugins/0/i18n.plugin'
const { locale } = useI18n({ useScope: 'global' })
const lang = useStorage('locale')
watch(
  locale,
  (v) => {
    lang.value = v
    document.documentElement.setAttribute('lang', v)
  },
  { immediate: true }
)
useTheme()
const $main = useMainStore()
$main.init()
useHead({
  title: metaDefaults.title,
  titleTemplate: metaDefaults.titleTemplate,
  meta: [
    {
      name: 'description',
      content: metaDefaults.description,
    },
    {
      name: 'author',
      content: metaDefaults.author,
    },
    {
      name: 'keywords',
      content: metaDefaults.keywords,
    },
  ],
  htmlAttrs: computed(() => ({
    dir: isRTL() ? 'rtl' : 'ltr',
  })),
})
</script>

<style lang="scss">
@import '@unocss/reset/tailwind.css';
@import '@/assets/css/base.scss';
@import '@/assets/css/theme.scss';
</style>
