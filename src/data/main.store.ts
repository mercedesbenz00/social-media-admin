import { defineStore } from 'pinia'
import type { IConfirm, IToast } from './main.interface'
import { useAuthStore } from './auth/auth.store'
import { useCitiesStore } from './cities/cities.store'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    isInitilized: false,
  }),
  actions: {
    async init() {
      const $auth = useAuthStore()
      const { isInitilized } = this.$state
      if (isInitilized) return
      this.isInitilized = true
      await $auth.init()
    },
    toast(payload: IToast) {
      const temp = {
        severity: payload.type ?? 'info',
        life: 3000,
        summary: payload.message,
        detail: payload.detail,
        closable: payload.closable,
        group: payload.group,
        styleClass: `toast-outer ${payload.class ?? ''}`,
        contentStyleClass: `toast-inner ${payload.contentClass ?? ''}`,
      }
      useGlobals().$toast.add({ ...temp })
    },
    confirm(payload: IConfirm) {
      const options = {
        message: payload.message ?? '',
        header: payload.header ?? '',
        icon: payload.icon ?? '',
        acceptLabel: payload.acceptLabel ?? '',
        rejectLabel: payload.rejectLabel ?? '',
        accept: () => {
          payload.accept()
        },
        reject: () => {
          payload.reject()
        },
      }
      useGlobals().$confirm.require(options)
    },
    clearAllToasts: () => {
      useGlobals().$toast.removeAllGroups()
    },
  },
})
