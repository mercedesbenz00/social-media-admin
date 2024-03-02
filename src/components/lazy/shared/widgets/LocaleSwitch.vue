<template>
  <div>
    <PButton class="uppercase" :label="nextLocale" @click="changeLocale"></PButton>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const { locale } = useI18n({ useScope: 'global' })
    const nextLocale = computed(() => {
      return locale.value === 'ar' ? 'en' : 'ar'
    })

    return {
      locale,
      nextLocale,
    }
  },

  methods: {
    changeLocale() {
      this.locale = this.nextLocale
    },
  },
})
</script>

<style scoped></style>
