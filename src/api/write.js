import instance from '@/utils/request.js'

export function apiSendComment ({ artid, content }) {
  return instance({
    url: '/app/v1_0/comments',
    method: 'post',
    data: {
      target: artid,
      content: content
    }
  })
}

export function apiAddCommentReply ({ comid, content, artid }) {
  return instance({
    url: '/app/v1_0/comments',
    method: 'post',
    data: {
      target: comid,
      content: content,
      art_id: artid
    }
  })
}
