<template>
  <PageWrapper>
    <TableWrapper
      :columns="columns"
      :title="$t('categories.title')"
      :btnLabel="$t('categories.add_new')"
      :search-placeholder="$t('categories.search_placeholder')"
      :empty-title="$t('categories.empty_title')"
      :empty-subtitle="$t('categories.empty_subtitle')"
      state="categories"
      @btn-click="openModal"
    >
    </TableWrapper>
  </PageWrapper>
</template>
<script lang="ts" setup>
import type { ICategory } from '@/data/categories/categories.interface'
import { useCategoriesStore } from '@/data/categories/categories.store'
import type { IColumn } from '@/data/column/column.interface'
const $categories = useCategoriesStore()
const columns = [
  {
    header: 'categories.table.name',
  },
  {
    header: 'categories.table.createdAt',
  },
  {
    header: 'categories.table.groupCount',
  },
  {
    header: 'categories.table.action',
    class: 'w-[10%]'
  }
] as IColumn[]
const openModal = () => {
  const { $vfm } = useGlobals()
  $vfm.show({
    component: 'CategoriesModal',
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
      create: async (data: ICategory) => {
        const response = await $categories.createCategory(data)
        if (response) $vfm.hideAll()
      }
    },
  })
}
</script>