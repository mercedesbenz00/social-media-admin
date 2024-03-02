import type { IEndpoints } from '../main.interface'
export const eGroups: IEndpoints = {
  groups: {
    url: '/group-service/api/v1/groups',
    method: 'get',
  },
  createGroup: {
    url: '/group-service/api/v1/groups',
    method: 'post',
  },
  updateGroup: {
    url: '/group-service/api/v1/groups/{groupId}',
    method: 'put'
  },
  removeGroup: {
    url: '/group-service/api/v1/groups/{groupId}',
    method: 'delete'
  }
}
