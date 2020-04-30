
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

export function getSearchRes ({ page, perpage, key }) {
  return instance({
    url: '/app/v1_0/search',
    method: 'GET',
    params: {
      page: page,
      per_page: perpage,
      q: key
    }
  })
}
