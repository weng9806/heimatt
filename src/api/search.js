
import instance from '@/utils/request.js'

export function getThinkList (key) {
  return instance({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q: key
    }
  })
}
