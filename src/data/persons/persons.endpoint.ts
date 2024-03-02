import type { IEndpoints } from '../main.interface'
export const ePersons: IEndpoints = {
  persons: {
    url: '/person-service/api/v1/persons',
    method: 'get',
  },
  updatePerson: {
    url: '/person-service/api/v1/persons/{personId}',
    method: 'put',
  },
  updateProfile: {
    url: '/person-service/api/v1/persons/{personId}',
    method: 'put'
  },
  changePassword: {
    url: '/person-service/api/v1/persons/change-password',
    method: 'post'
  },
  getBannedPersons: {
    url: '/person-service/api/v1/persons/bans',
    method: 'get',
  },
  getReportedUsers: {
    url: '/person-service/api/v1/persons/search/with-complaints',
    method: 'get'
  },
  banPerson: {
    url: '/person-service/api/v1/persons/bans',
    method: 'post',
  },
  unbanPerson: {
    url: '/person-service/api/v1/persons/bans/{banId}',
    method: 'delete',
  },
  getPersonById: {
    url: '/person-service/api/v1/persons/by-id/{personId}',
    method: 'get'
  },
  getComplaints: {
    url: '/person-service/api/v1/persons/complaints',
    method: 'get'
  }
}
