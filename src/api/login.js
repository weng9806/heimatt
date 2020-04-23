import instance from '@/utils/request.js'

function userlogin (data) {
  return instance({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}
export { userlogin }
