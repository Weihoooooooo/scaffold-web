import request from '@/utils/request'

export function getVillage() {
  return request({
    url: '/villages',
    method: 'get'
  })
}

export function updateVillage(data) {
  return request({
    url: '/villages',
    method: 'put',
    data
  })
}
