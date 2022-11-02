// 导出属于 审批的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/approvals', // 路由地址
  // 给模块的一级路由加一个name属性 这个属性我们后面在做权限时用到
  component: Layout,
  children: [{
    // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
    path: '', // 这里当二级路由的path什么都不写的时候 表示/approvals不但有布局 layout =>  审批主页
    component: () => import('@/views/approvals'),
    // 路由元信息  其实就是存储数据的对象 可以放任何内容
    name: 'approvals',
    meta: {
      title: ' 审批', // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      icon: 'tree-table'
    }
  },
  {
    path: 'salaryApproval/:id',
    component: () => import('@/views/approvals/salary'),
    name: 'salaryApproval',
    hidden: true,
    meta: {
      title: '工资审核',
      icon: 'approval', noCache: true }
  },
  {
    path: 'enterApproval/:id',
    component: () => import('@/views/approvals/enter'),
    name: 'enterApproval',
    hidden: true,
    meta: {
      title: '入职审核',
      icon: 'approval', noCache: true }
  },
  {
    path: 'leaveApproval/:id',
    component: () => import('@/views/approvals/leave'),
    name: 'leaveApproval',
    hidden: true,
    meta: {
      title: '申请请假',
      icon: 'approval', noCache: true }
  },
  {
    path: 'quitApproval/:id',
    component: () => import('@/views/approvals/quit'),
    name: 'quitApproval',
    hidden: true,
    meta: {
      title: '申请离职',
      icon: 'approval', noCache: true }
  },
  {
    path: 'overtimeApproval/:id',
    component: () => import('@/views/approvals/overtime'),
    name: 'overtimeApproval',
    hidden: true,
    meta: {
      title: '加班申请',
      icon: 'approval', noCache: true }
  },
  {
    path: 'securitySetting',
    component: () => import('@/views/approvals/security'),
    name: 'securitySetting',
    hidden: true,
    meta: {
      title: '设置',
      icon: 'approval', noCache: true }
  }
  ]
}
