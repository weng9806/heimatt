// 保存
export function setLoacl (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
// 获取
export function getLoacl (key) {
  return JSON.parse(window.localStorage.getItem(key))
}
// 删除
export function removeLocal (key) {
  window.localStorage.removeItem(key)
}
