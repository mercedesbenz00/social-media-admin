<template>
  <div class="text-success text-sm px-4" v-if="data.isVerifiedAccount">{{ $t('verify_users.verified') }}</div>
  <PButton @click="verify(itemId)" class="btn-flat-info text-sm" v-else :label="$t('verify_users.verify')"></PButton>
</template>
<script setup lang="ts">
import type { IPerson } from "@/data/main.interface"
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
const $persons = usePersonsStore()
const $main = useMainStore()
const { t } = useI18n()
const emit = defineEmits(['refresh'])
const verify = (itemId: Number) => {
  const { content }: { content: IPerson[] } = $persons.persons
  const person = content.find((_) => _.id === itemId)
  if (person) {
    $main.confirm({
      message: t('verify_users.confirm_message'),
      header: t('verify_users.confirm_header'),
      acceptLabel: t('yes'),
      rejectLabel: t('no'),
      accept: async () => {
        person.isVerifiedAccount = true
        await $persons.editPerson(person)
        emit('refresh')
      },
      reject: () => {}
    })
  }
}
</script>
