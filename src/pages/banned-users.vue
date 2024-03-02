<template>
  <PageWrapper>
    <TableWrapper
      :columns="columns"
      :title="$t('banned_persons.title')"
      :search-placeholder="$t('banned_persons.search_placeholder')"
      :empty-title="$t('banned_persons.empty_title')"
      :empty-subtitle="$t('banned_persons.empty_subtitle')"
      :btnLabel="$t('banned_persons.add_new')"
      state="bannedPersons"
      @btn-click="openModal"
    >
    </TableWrapper>
  </PageWrapper>
</template>
<script lang="ts" setup>
import type { IColumn } from "@/data/column/column.interface";
import type { IPerson } from "@/data/main.interface";
import { usePersonsStore } from "@/data/persons/persons.store";
const $persons = usePersonsStore()
const columns = [
  {
    header: 'verify_users.table.name',
  },
  {
    header: 'verify_users.table.city',
  },
  {
    header: 'verify_users.table.email',
  },
  {
    header: 'categories.table.action',
    class: 'w-[20%]'
  }
]as IColumn[]
const openModal = () => {
  const { $vfm } = useGlobals()
  $vfm.show({
    component: 'BannedPersonsModal',
    bind: {
      drag: false,
      size: 'auto',
      adaptive: false,
      noActions: true,
    },
    on: {
      cancel: () => {
        $vfm.hideAll()
      },
      create: async (data: any) => {
        const response = await $persons.banPerson(data)
        if (response) $vfm.hideAll()
      }
    },
  })
}
</script>