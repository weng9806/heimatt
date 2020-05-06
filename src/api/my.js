import instance from '@/utils/request.js'

export function apiGetUserInfo () {
  return instance({
    url: '/app/v1_0/user'
  })
}

export function apiGetUserProfile () {
  return instance({
    url: '/app/v1_0/user/profile'
  })
}

export function apSetUserProfile ({ name, gender, birthday, intro }) {
  return instance({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name: name,
      gender: gender,
      birthday: birthday,
      intro: intro
    }
  })
}

export function apiUpFileLoad (photo) {
  var fd = new FormData()
  fd.append('photo', photo)
  return instance({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data: fd
  })
}
