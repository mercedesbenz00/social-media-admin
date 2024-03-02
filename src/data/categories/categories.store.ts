import { defineStore } from "pinia"
import { useMainStore } from "../main.store"
import { eCategories } from './categories.endpoint'
import { i18n } from '@/plugins/0/i18n.plugin'

export const useCategoriesStore = defineStore({
  id: 'categories',
  state: () => {
    return {
      categories: {} as any
    }
  },
  actions: {
    async getCategories (params = {}) {
      const { data } = await useApi({ ...eCategories.categories, params })
      this.categories = data
      return data
    },
    async getParentCategories(params = {}) {
      const { data } = await useApi({ ...eCategories.parentCategories, params })
      return data
    },
    async removeCategory (categoryId: number) {
     try {
      const url = eCategories.updateCategory.url.replace('{categoryId}', categoryId.toString())
      const { data } = await useApi({
        ...eCategories.removeCategory,
        url
      })
      useMainStore().toast({
        type: 'success',
        message: i18n('toast.category_removed')
      })
     } catch (error) {
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error.response.data.message })
     }
    },
    async editCategory (category: any) {
      try {
        const url = eCategories.updateCategory.url.replace('{categoryId}', category.id)
        const { data } = await useApi({
          ...eCategories.updateCategory,
          url,
          body: category
        })
        useMainStore().toast({
          type: 'success',
          message: i18n('toast.category_updated')
        })
      } catch (error) {
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error.response.data.message })
      }
    },
    async createCategory (categoryData) {
      try {
        const body = categoryData
        const { data } = await useApi({ ...eCategories.addCategory, body})
        this.getCategories()
        useMainStore().toast({
          type: 'success',
          message: i18n('toast.category_created')
        })
        return data
      } catch (error) {
        useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error.response.data.message })
      }
    }
  }
})