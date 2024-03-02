<template>
   <PageWrapper>
    <TableWrapper
      :columns="columns"
      :title="$t('groups.title')"
      :search-placeholder="$t('groups.search_placeholder')"
      :empty-title="$t('groups.empty_title')"
      :empty-subtitle="$t('groups.empty_subtitle')"
      state="groups"
      :params="{ states: 'PENDING' }"
    >
    </TableWrapper>
  </PageWrapper>
</template>
<script lang="ts" setup>
const columns = []
</script>