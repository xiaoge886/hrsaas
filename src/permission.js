// 权限拦截在路由跳转 导航守卫
import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例 和组件中的this.$store是一回事
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 不需要导出 因为只需要让代码执行即可
// 前置守卫
// next是前置守卫必须必须执行的钩子 next必须执行 如果不执行 页面就死了
// next（）放过
// next（false）跳转终止
// next（地址）跳转到某个地址
const whiteList = ['/login', '/404'] // 定义白名单
router.beforeEach(async(to, from, next) => {
  nprogress.start() // 开启进度条
  if (store.getters.token) {
    // 有token情况下才能获取资料
    // 如果有token
    if (to.path === '/login') {
      // 如果要访问的是登录页
      next('/') // 跳到主页 // 有token用处理吗？不用
    } else {
      // 只有放过的时候才去获取用户资料
      // 没有id才获取
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        // 如果后续需要根据用户资料获取数据的话这里需要改成同步
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        // routes就是筛选得到的动态路由
        // 动态路由 添加到 路由表中 默认的路由表 只有静态路由 没有动态路由
        // addRoutes  必须 用 next(地址) 不能用next()
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        // 添加完动态路由之后
        next(to.path) // 相当于跳到对应的地址 相当于多做一次跳转
        // 进门了，但是进门之后我要去的地方的路还没有铺好，直接走，掉坑里，多做一次跳转，再从门外往里进一次，跳转之前 把路铺好，再次进来的时候，路就铺好了
      } else {
        next()
      }
    }
  } else {
    // 没有token情况下
    if (whiteList.indexOf(to.path) > -1) {
      // 如果找到了 表示在在名单里面
      next()
    } else {
      next('/login') // 跳到登录页
    }
  }
  nprogress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})
// 后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
