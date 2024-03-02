import { defineStore } from "pinia"
import { useMainStore } from "../main.store"
import { eGroups } from './groups.endpoint'
import { i18n } from '@/plugins/0/i18n.plugin'

export const useGroupsStore = defineStore({
  id: 'groups',
  state: () => {
    return {
      groups: {} as any
    }
  },
  actions: {
    async getGroups (params = {}) {
      const { data } = await useApi({ ...eGroups.groups, params })
      this.groups = data
      return data
    },
    async removeGroup (groupId: number) {
      try {
        const url = eGroups.removeGroup.url.replace('{groupId}', groupId.toString())
        const { data } = await useApi({
          ...eGroups.removeGroup,
          url
        })
        useMainStore().toast({
          type: 'success',
          message: i18n('toast.group_removed')
        })
      } catch (error) {
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error.response.data.message })
      }
    },
    async editGroup (group: any) {
      try {
        const url = eGroups.updateGroup.url.replace('{groupId}', group.id)
        const { data } = await useApi({
          ...eGroups.updateGroup,
          url,
          body: group
        })
        useMainStore().toast({
          type: 'success',
          message: i18n('toast.group_updated')
        })
      } catch (error) {
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error.response.data.message })
      }
    },
    async createGroup (groupData) {
      try {
        const body = groupData
        const { data } = await useApi({ ...eGroups.createGroup, body})
        this.getGroups()
        useMainStore().toast({
          type: 'success',
          message: i18n('toast.group_created')
        })
        return data
      } catch (error) {
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error.response.data.message })
      }
    }
  }
})