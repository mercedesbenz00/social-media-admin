<template>
  <PageWrapper>
    <TableWrapper
      :title="$t('verify_users.title')"
      :search-placeholder="$t('verify_users.search_placeholder')"
      :columns="columns"
      :empty-title="$t('verify_users.empty_title')"
      :empty-subtitle="$t('verify_users.empty_subtitle')"
      state="persons"
    >
    </TableWrapper>
  </PageWrapper>
</template>
<script lang="ts" setup>
import type { IColumn } from '@/data/column/column.interface'
const columns = [
  {
    header: 'verify_users.table.name',
  },
  {
    header: 'categories.table.action'
  }
] as IColumn[]
</script>