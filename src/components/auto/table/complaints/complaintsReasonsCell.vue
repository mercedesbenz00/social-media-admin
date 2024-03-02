<template>
  <div v-if="reason">{{ get(reason.localizations, locale, '-') }}</div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import { get } from 'lodash'
import { usePostsStore } from '@/data/posts/posts.store'
const $posts = usePostsStore()
const { locale } = useI18n()
const props = defineProps({
  data: {
    type: Object as PropType<any>,
    required: true
  }
})
const reason = computed(() => $posts.reasons?.content?.find((r) => r.id == props.data.reasonId))
</script>