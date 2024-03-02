<template>
  <page-wrapper>
    <TableWrapper
      :title="$t('reported_users.title')"
      :search-placeholder="$t('reported_users.search_placeholder')"
      :columns="columns"
      :empty-title="$t('reported_users.empty_title')"
      :empty-subtitle="$t('reported_users.empty_subtitle')"
      state="reportedUsers"
      :show-filter="true"
      :selection="true"
      @selected="handleSelected"
    />
  </page-wrapper>
</template>
<script setup lang="ts">
import type { IColumn } from '@/data/column/column.interface'
const router = useRouter()
const handleSelected = ($event: any) => {
  router.push('/reported-users/' + $event.id)
}
const columns = [
  {
    header: 'reported_users.table.name',
  },
  {
    header: 'reported_users.table.date'
  },
  {
    header: 'reported_users.table.posts_count'
  },
  {
    header: 'reported_users.table.reported_items'
  },
  {
    header: 'reported_users.table.status'
  },
  {
    header: 'reported_users.table.last_report'
  }
] as IColumn[]
</script>
