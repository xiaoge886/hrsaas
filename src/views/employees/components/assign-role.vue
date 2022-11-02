<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- 多选框 -->
    <!-- 需要v-model的双向绑定 -->
    <el-checkbox-group v-model="roleIds">
      <!-- 要循环的选项 -->
      <!-- 要显示角色名称 存储角色id -->
      <el-checkbox v-for="item in list " :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <!-- 定义footer的插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOk">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRole } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      // 用户的id,当前要处理的那个用户
      type: String,
      default: null
      // required: true // 要求必须传该id
    }
  },
  data() {
    return {
      list: [], // 角色列表
      roleIds: [] // 负责存储用户所拥有的角色id
    }
  },
  created() {
    // 获取所有的角色
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 }) // 默认只取10条数据
      // row是要循环的记录
      this.list = rows
    },
    // 这个方法是什么时候调用 props传值是异步的
    // 这个方法是个父组件调用的
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds // 赋值本用户的角色
    },
    async btnOk() {
      await assignRole({ id: this.userId, roleIds: this.roleIds })
      // 关闭弹层
      this.$emit('update:showRoleDialog', false)
    },
    btnCancel() {
      this.roleIdes = [] // 清空原来的数组
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style>

</style>
