import instance from '@/utils/request.js'

function apigetDetail (artid) {
  return instance({
    url: '/app/v1_0/articles/' + artid,
    method: 'get'
  })
}
export { apigetDetail }
