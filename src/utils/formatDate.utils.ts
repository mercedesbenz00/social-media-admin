import moment from 'moment/min/moment-with-locales'

export function formatDate (date: any) {
  return moment(date).format('DD/MM/YYYY')
}