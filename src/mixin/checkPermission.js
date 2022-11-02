import store from '@/store'

// 做一个混入对象
export default {
  // 混入对象是组件的选项对象
  methods: {
    // 检查权限 要么有要么没有 key就是要检查的点
    checkPermission(key) {
      const { userInfo } = store.state.user
      if (userInfo.roles && userInfo.roles.points) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false // 如果没有进入 说明没权限
    }
  }
}
