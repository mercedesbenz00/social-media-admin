<template>
  <div>{{ status }}</div>
</template>
<script setup lang="ts">
import type { PropType } from "vue"
import moment from 'moment/min/moment-with-locales'

const props = defineProps({
  data: {
    type: Object as PropType<any>,
    required: true
  }
})
const { t } = useI18n()
const status = computed(() => {
  if (!props.data.isBanned) return t('reported_users.not_banned')
  const start_date = moment(Date.now())
  const end_date = moment(props.data.banExpiresAt)
  const days = end_date.diff(start_date, 'days') + 1
  return t('reported_users.banned_for', { days }) + ' ' + ( days > 1 ? t('reported_users.days') : t('reported_users.day'))
})
</script>
