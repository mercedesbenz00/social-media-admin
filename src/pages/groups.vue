<template>
  <PageWrapper>
    <TableWrapper
      :title="$t('groups.title')"
      :btnLabel="$t('groups.add_new')"
      :search-placeholder="$t('groups.search_placeholder')"
      :columns="columns"
      :empty-title="$t('groups.empty_title')"
      :empty-subtitle="$t('groups.empty_subtitle')"
      state="groups"
      @btn-click="openModal"
    >
    </TableWrapper>
  </PageWrapper>
</template>
<script lang="ts" setup>
import type { IColumn } from '@/data/column/column.interface'
import type { IGroup } from '@/data/groups/groups.interface'
import { useGroupsStore } from '@/data/groups/groups.store'

const $groups = useGroupsStore()
const columns = [
  {
    header: 'groups.table.name',
  },
  {
    header: 'groups.table.membersCount',
  },
  {
    header: 'groups.table.postsCount',
  },
  {
    header: 'groups.table.createdAt',
  },
  {
    header: 'groups.table.action',
    class: 'w-[10%]'
  }
] as IColumn[]
const openModal = () => {
  const { $vfm } = useGlobals()
  $vfm.show({
    component: 'GroupsModal',
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
      create: async (data: IGroup) => {
        const response = await $groups.createGroup(data)
        if (response) $vfm.hideAll()
      }
    },
  })
}
</script>