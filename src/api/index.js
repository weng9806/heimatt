import instance from '@/utils/request.js'

export function getChannelData (params) {
  return instance({
    url: '/app/v1_0/user/channels',
    method: 'get',
    params
  })
}

export function getarticleList (id) {
  return instance({
    url: '/app/v1_1/articles',
    method: 'get',
    params: {
      channel_id: id,
      timestamp: Date.now(),
      with_top: 0
    }
  })
}
