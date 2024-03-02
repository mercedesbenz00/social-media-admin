import type { IEndpoints } from "../main.interface";

export const eCharts: IEndpoints = {
  groupsStats: {
    url: '/group-service/api/v1/stats',
    method: 'get'
  },
  personsStats: {
    url: '/person-service/api/v1/stats',
    method: 'get'
  },
  categoriesStats: {
    url: '/group-service/api/v1/stats/category',
    method: 'get'
  },
  postStats: {
    url: '/post-service/api/v1/stats',
    method: 'get'
  }
}