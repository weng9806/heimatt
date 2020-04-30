import instance from '@/utils/request.js'

export function getChannelData (params) {
  return instance({
    url: '/app/v1_0/user/channels',
    method: 'get',
    params
  })
}

export function getAllChannelData (params) {
  return instance({
    url: '/app/v1_0/channels',
    method: 'get',
    params
  })
}

export function resetChannelList (channels) {
  return instance({
    url: '/app/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}

export function getArticleList (id) {
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

export function delArticleList (id) {
  return instance({
    url: '/app/v1_0/article/dislikes',
    method: 'post',
    data: {
      target: id
    }
  })
}

// 举报文章
export function useReportArt ({ artId, id }) {
  return instance({
    url: '/app/v1_0/article/reports',
    method: 'post',
    data: {
      target: artId,
      type: id
    }
  })
}
// 拉黑作者
export function blockAuthor (id) {
  return instance({
    url: '/app/v1_0/user/blacklists',
    method: 'post',
    data: {
      target: id
    }
  })
}
