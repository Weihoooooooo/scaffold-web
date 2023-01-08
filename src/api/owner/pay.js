import request from '@/utils/request'

export function del(ids) {
  return request({
    url: '/householdPays',
    method: 'delete',
    data: ids
  })
}
