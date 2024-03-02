<template>
  <div class="flex items-center space-x-2">
    <PButton @click="unban(itemId)" class="btn-primary h-8" :label="$t('banned_persons.table.unban')" icon="i-figma:trash-2"></PButton>
  </div>
</template>
<script setup lang="ts">
import { useMainStore } from "@/data/main.store"
import { usePersonsStore } from "@/data/persons/persons.store"
import type { PropType } from "vue"

const props = defineProps({
  data: {
    type: Object as PropType<any>,
    required: true
  },
  itemId: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['refresh'])
const $main = useMainStore()
const $persons = usePersonsStore()
const { t } = useI18n()
const unban = (banId: number) => {
  $main.confirm({
    message: t('banned_persons.modal.confirm_message'),
    header: t('banned_persons.modal.confirm_header'),
    acceptLabel: t('yes'),
    rejectLabel: t('no'),
      accept: async () => {
        await $persons.unbanPerson(banId)
        emit('refresh')
      },
      reject: () => {}
  })
}
</script>
