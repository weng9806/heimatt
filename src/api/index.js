import instance from '@/utils/request.js'

export function getChannelData (params) {
  return instance({
    url: '/app/v1_0/user/channels',
    method: 'get',
    params
  })
}
