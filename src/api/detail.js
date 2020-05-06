import instance from '@/utils/request.js'

export function apigetDetail (artid) {
  return instance({
    url: '/app/v1_0/articles/' + artid,
    method: 'get'
  })
}

export function apifollow (autid) {
  return instance({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: autid
    }
  })
}

export function apiunfollow (autid) {
  return instance({
    url: '/app/v1_0/user/followings/' + autid,
    method: 'DELETE'
  })
}

export function apizan (artid) {
  return instance({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artid
    }
  })
}

export function apiunzan (artid) {
  return instance({
    url: '/app/v1_0/article/likings/' + artid,
    method: 'DELETE'
  })
}

export function apiGetComment ({ artid, offset, limit }) {
  return instance({
    url: '/app/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: artid,
      offset: offset,
      limit: limit
    }
  })
}

export function apiGetCommentReply ({ comid, offset, limit }) {
  return instance({
    url: '/app/v1_0/comments',
    method: 'GET',
    params: {
      type: 'c',
      source: comid,
      offset: offset,
      limit: limit
    }
  })
}
