<template>
  <div
    :class="loading ? 'animate-pulse' : ''"
    class="rounded-full h-12 w-12 flex flex-none items-center justify-center overflow-hidden bg-bg-primary border-white border-2"
  >
    <img
      class="rounded-full cursor-pointer w-full h-full"
      :src="avatar || assetImage('no-avatar.svg')"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useAssets } from '@/composables/useAssets'
import { usePersonsStore } from '@/data/persons/persons.store'

const $persons = usePersonsStore()

const props = defineProps({
  avatar: {
    type: Object as PropType<any | undefined>,
    default: undefined,
  },
  personId: {
    type: Number,
    default: undefined
  }
})
const src = computed(() => props.avatar?.path)
const loading = props.avatar ? ref(false) : ref(true)
const person = ref()
const fetchPerson = async (personId: number) => {
  loading.value = true
  const response = await $persons.getPersonById(personId)
  person.value = response
  loading.value = false
}
const avatar = computed(() => {
  if (person.value) return person.value.avatar?.path
  else props.avatar
})
onMounted(() => {
  if (props.personId) fetchPerson(props.personId)
})
const assetImage = useAssets
</script>
