<template>
  <page-wrapper>
    <BackButton :title="$t('reported_users.back')" to="/reported-users"/>
    <TableWrapper
      :title="$t('reported_users.complaints.title')"
      :subtitle="get(person, 'displayName')"
      :search-placeholder="$t('reported_users.search_placeholder')"
      :btn-label="$t('reported_users.complaints.ban')"
      @btn-click="openModal"
      :columns="columns"
      state="complaints"
    />
  </page-wrapper>
</template>
<script lang="ts" setup>
import { get } from 'lodash'
import type { IColumn } from "@/data/column/column.interface"
import { usePersonsStore } from "@/data/persons/persons.store"
import { usePostsStore } from '@/data/posts/posts.store'

const $persons = usePersonsStore()
const $posts = usePostsStore()
const person = computed(() => $persons.person)
const route = useRoute()
const router = useRouter()
const columns = [
  {
    header: 'reported_users.complaints.table.name',
  },
  {
    header: 'reported_users.complaints.table.reasons'
  },
  {
    header: 'reported_users.complaints.table.description'
  },
  {
    header: 'reported_users.complaints.table.date'
  }
] as IColumn[]
const fetchData = async () => {
  await Promise.all([$persons.getPersonById(Number(route.params.id)), $posts.getReasons()])
}
onMounted(fetchData)

const openModal = () => {
  const { $vfm } = useGlobals()
  $vfm.show({
    component: 'BannedPersonsModal',
    bind: {
      drag: false,
      size: 'auto',
      adaptive: false,
      noActions: true,
      person: { displayName: get(person.value, 'displayName'), id: Number(route.params.id) }
    },
    on: {
      cancel: () => {
        $vfm.hideAll()
      },
      create: async (data: any) => {
        const response = await $persons.banPerson(data)
        if (response) {
          $vfm.hideAll()
          router.push('/banned-users')
        }
      }
    },
  })
}
</script>