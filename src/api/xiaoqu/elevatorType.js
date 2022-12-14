import request from '@/utils/request'

export function getTypeList() {
  return request({
    url: '/elevator-types/select',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/elevator-types',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/elevator-types',
    method: 'put',
    data
  })
}

export function del(ids) {
  return request({
    url: '/elevator-types',
    method: 'delete',
    data: ids
  })
}
