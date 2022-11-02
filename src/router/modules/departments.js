// 导出属于组织架构的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/departments', // 路由地址
  // 给模块的一级路由加一个name属性 这个属性我们后面在做权限时用到
  component: Layout,
  children: [{
    // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
    path: '', // 这里当二级路由的path什么都不写的时候 表示/employees不但有布局 layout => 组织架构主页
    component: () => import('@/views/departments'),
    // 路由元信息  其实就是存储数据的对象 可以放任何内容
    name: 'departments',
    meta: {
      title: '组织架构', // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      icon: 'tree'
    }
  }]
}
