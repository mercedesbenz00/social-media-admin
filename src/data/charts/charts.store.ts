import { defineStore } from "pinia";
import { eCharts } from "./charts.endpoint";

export const useChartsStore = defineStore({
  id: 'charts',
  state: () => {
    return {}
  },
  actions: {
    async getGroupsChart() {
      const { data } = await useApi({...eCharts.groupsStats})
      return data
    },
    async getCategoriesChart() {
      const { data } = await useApi({ ...eCharts.categoriesStats })
      return data
    },
    async getPersonsChart() {
      const { data } = await useApi({ ...eCharts.personsStats })
      return data
    },
    async getPostsChart() {
      const { data } = await useApi({ ...eCharts.postStats })
      return data
    }
  }
})