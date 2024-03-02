<template>
  <div class="flex items-center justify-end space-x-2">
    <PButton @click="edit(itemId)" class="bg-bg-secondary w-[82px] h-8" :label="$t('categories.table.edit')" icon="i-figma:edit"></PButton>
    <PButton @click="remove(itemId)" class="bg-primary/80 w-[132px] h-8" :label="$t('categories.table.remove')" icon="i-figma:trash-2"></PButton>
  </div>
</template>
<script setup lang="ts">
import type { ICategory } from "@/data/categories/categories.interface"
import { useCategoriesStore } from "@/data/categories/categories.store"
import { useMainStore } from "@/data/main.store"
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
const $categories = useCategoriesStore()
const { t } = useI18n()
const remove = (categoryId: number) => {
  $main.confirm({
    message: t('categories.modal.confirm_message'),
    header: t('categories.modal.confirm_header'),
    acceptLabel: t('yes'),
    rejectLabel: t('no'),
      accept: async () => {
        await $categories.removeCategory(categoryId)
        emit('refresh')
      },
      reject: () => {}
  })
}

const edit = (itemId: number) => {
  const { $vfm } = useGlobals()
  const { content }: { content: ICategory[] } = $categories.categories
  const category = content.find((_) => _.id === itemId)
  $vfm.show({
    component: 'CategoriesModal',
    bind: {
      drag: false,
      size: 'auto',
      adaptive: false,
      noActions: true,
      editMode: true,
      data: category ?? undefined
    },
    on: {
      cancel: () => {
        $vfm.hideAll()
      },
      edit: async (category: any) => {
        await $categories.editCategory(category)
        $vfm.hideAll()
        emit('refresh')
      },
      remove: async (categoryId: number) => {
        $vfm.hideAll()
        $main.confirm({
          message: t('categories.modal.confirm_message'),
          header: t('categories.modal.confirm_header'),
          acceptLabel: t('yes'),
          rejectLabel: t('no'),
          accept: async () => {
          await $categories.removeCategory(categoryId)
            emit('refresh')
          },
          reject: () => {}
        })
      }
    }
  })
}
</script>
