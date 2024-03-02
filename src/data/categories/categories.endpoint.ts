import type { IEndpoints } from '../main.interface'
export const eCategories: IEndpoints = {
  categories: {
    url: '/group-service/api/v1/categories/search',
    method: 'get'
  },
  parentCategories: {
    url: '/group-service/api/v1/categories',
    method: 'get'
  },
  removeCategory: {
    url: '/group-service/api/v1/categories/{categoryId}',
    method: 'delete'
  },
  addCategory: {
    url: '/group-service/api/v1/categories',
    method: 'post',
  },
  updateCategory: {
    url: '/group-service/api/v1/categories/{categoryId}',
    method: 'put'
  },
}
