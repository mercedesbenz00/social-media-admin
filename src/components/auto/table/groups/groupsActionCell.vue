<template>
  <div class="flex items-center justify-end space-x-2">
    <PButton @click="edit(itemId)" class="bg-bg-secondary w-[82px] h-8" :label="$t('groups.table.edit')" icon="i-figma:edit"></PButton>
    <PButton @click="remove(itemId)" class="bg-primary/80 w-[132px] h-8" :label="$t('groups.table.remove')" icon="i-figma:trash-2"></PButton>
  </div>
</template>
<script setup lang="ts">
import type { IGroup } from "@/data/groups/groups.interface"
import { useGroupsStore } from "@/data/groups/groups.store"
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
const $groups = useGroupsStore()
const { t } = useI18n()
const remove = (groupdId: number) => {
  $main.confirm({
    message: t('groups.modal.confirm_message'),
    header: t('groups.modal.confirm_header'),
    acceptLabel: t('yes'),
    rejectLabel: t('no'),
      accept: async () => {
        await $groups.removeGroup(groupdId)
        emit('refresh')
      },
      reject: () => {}
  })
}

const edit = (itemId: number) => {
  const { $vfm } = useGlobals()
  const { content }: { content: IGroup[] } = $groups.groups
  const group = content.find((_) => _.id === itemId)
  $vfm.show({
    component: 'GroupsModal',
    bind: {
      drag: false,
      size: 'auto',
      adaptive: false,
      noActions: true,
      editMode: true,
      data: group ?? undefined
    },
    on: {
      cancel: () => {
        $vfm.hideAll()
      },
      edit: async (group: any) => {
        await $groups.editGroup(group)
        $vfm.hideAll()
        emit('refresh')
      },
      remove: async (groupdId: number) => {
        $vfm.hideAll()
        $main.confirm({
          message: t('groups.modal.confirm_message'),
          header: t('groups.modal.confirm_header'),
          acceptLabel: t('yes'),
          rejectLabel: t('no'),
          accept: async () => {
          await $groups.removeGroup(groupdId)
            emit('refresh')
          },
          reject: () => {}
        })
      }
    }
  })
}
</script>
