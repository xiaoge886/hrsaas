import request from '@/utils/request'
/*
登录接口封装
 */
export function login(data) {
  // 返回一个promise对象
  return request({
    url: 'sys/login',
    method: 'post',
    data
  })
}
/* 获取用户资料接口 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/*  根据用户id获取用户头像  现在写它 完全是为了显示头像 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {

}
