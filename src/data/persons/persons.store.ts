import { defineStore } from "pinia"
import { ePersons } from './persons.endpoint'
import type { IPerson } from "./persons.interface"
import { useAuthStore } from "../auth/auth.store"
import { useMainStore } from "../main.store"
import { i18n } from '@/plugins/0/i18n.plugin'

export const usePersonsStore = defineStore({
  id: 'persons',
  state: () => {
    return {
      persons: {} as any,
      person: {} as any,
      bannedPersons: {} as any,
      reportedUsers: {} as any,
      complaints: {} as any
    }
  },
  actions: {
    async getPersons (params = {}) {
      const { data } = await useApi({ ...ePersons.persons, params })
      this.persons = data
      return data
    },
    async getPersonById (personId: number) {
      try {
        const url = ePersons.getPersonById.url.replace('{personId}', personId.toString())
        const { data } = await useApi({...ePersons.getPersonById, url})
        this.person = data
        return data
      } catch (error) {
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error.response.data.message })
      }
    },
    async getBannedPersons (params = {}) {
      const { data } = await useApi({ ...ePersons.getBannedPersons, params })
      this.bannedPersons = data
      return data
    },
    async getReportedUsers(params = {}) {
      const { data } = await useApi({ ...ePersons.getReportedUsers, params })
      this.reportedUsers = data
      return data
    },
    async editPerson (person: IPerson) {
      try {
        const url = ePersons.updatePerson.url.replace('{personId}', person.id.toString())
        const { data } = await useApi({
          ...ePersons.updatePerson,
          url,
          body: person
        })
        useMainStore().toast({
          type: 'success',
          message: i18n('toast.person_updated')
        })
        return data
      } catch (error) {
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error.response.data.message })
      }
    },
    async banPerson(body: any) {
      try {
        const { data } = await useApi({...ePersons.banPerson, body})
        useMainStore().toast({ type: 'success', message: i18n('toast.success'), detail: i18n('banned_persons.banned_successfully') })
        this.getBannedPersons()
        return data
      } catch (error) {
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error.response.data.message })
      }
    },
    async unbanPerson(banId: number) {
      try {
        const url = ePersons.unbanPerson.url.replace('{banId}', banId.toString())
        const { data } = await useApi({ url, method: 'delete'})
        useMainStore().toast({
          type: 'success',
          message: i18n('toast.person_unbaned')
        })
      } catch (error) {
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error.response.data.message })
      }
    },
    async updateProfile(body: Partial<IPerson> & { id: string | number }) {
      try {
        const url = ePersons.updateProfile.url.replace('{personId}', body.id.toString())
        const { data }: { data: IPerson } = await useApi({
          url,
          body,
        })

        useMainStore().toast({ type: 'success', message: i18n('toast.success') })
        this.refreshUserAfterUpdate(body.id)
        return data
      } catch (error) {
        console.error(error)
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error?.response?.data?.message })
      }
    },
    refreshUserAfterUpdate(id?: number | string, force = false) {
      if (useAuthStore().user?.id.toString() === id?.toString() || force) {
        useAuthStore().refresh()
      }
    },
    async changePassword(body: { oldPassword: string; password: string; confirmPassword: string }) {
      try {
        const { data } = await useApi({...ePersons.changePassword, body})
        useAuthStore().logout()
        return data
      } catch (error) {
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error?.response?.data?.message })
        throw error
      }
    },
    async getComplaints(params = {}) {
      try {
        const { data } = await useApi({ ...ePersons.getComplaints, params })
        this.complaints = data
        return data
      } catch (error) {
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error?.response?.data?.message })
        throw error
      }
    }
  }
})