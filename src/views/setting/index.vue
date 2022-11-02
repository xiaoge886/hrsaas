<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 放置内容 -->
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 左侧信息 -->
            <el-row style=" height: 60px">
              <el-button icon="el-icon-plus" type="primary" size="small" @click="showDialog = true">新增角色</el-button>
            </el-row>
            <el-table border="" :data="list">
              <el-table-column type="index" align="center" label="序号" width="120px">
                <!--  -->
              </el-table-column>
              <el-table-column prop="name" align="center" label="名称" width="240px">
                <!--  -->
              </el-table-column>
              <el-table-column prop="description" align="center" label="描述" />
              <el-table-column align="center" label="操作">
                <!-- 作用域插槽 -->
                <template slot-scope="{ row }">
                  <el-button type="success" @click="assignPrm(row.id)">分配权限</el-button>
                  <el-button type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>

              </el-table-column>
            </el-table>
            <!-- 放置分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination :current-page="page.page" layout="prev, pager, next" :total="page.total" :page-size="page.pagesize" @current-change="changePage" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              :closable="false"
              :show-icon="true"
            />
            <!-- 右侧信息 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input v-model="FormData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="FormData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="FormData.companyPhone" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="FormData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="FormData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>

            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 放置一个弹层组件 -->
    <!-- close事件在点击确定时候会触发,所以确认后能调动关闭事件 -->
    <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
      <!--  -->
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" style="width:80%" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" style="width:80%" />
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 放置一个弹层 -->
    <el-dialog title="分配权限" :visible="showPrmDialog" @close="btnPermCancel">
      <!-- 权限是一棵树 -->
      <!-- 将数据绑定到树形上 -->
      <!--check-strictly为true 父子不互相关联  -->
      <el-tree
        ref="premTree"
        show-checkbox
        :data="permData"
        :props="defaultProps"
        :default-expand-all="true"
        :check-strictly="true"
        :default-checked-keys="selectCheck"
        node-key="id"
      />
      <!-- 确定 取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnPermCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnPermOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole, assignPrm } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { tranListToTreeData } from '@/utils/index'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: [], // 承接数据
      page: {
        // 放置页码相关信息
        page: 1,
        pagesize: 10,
        total: 0 // 记录总数
      },
      FormData: {}, // 公司信息
      showDialog: false, // 控制弹层显示
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      loading: false, // 用来控制进度弹层的显示和隐藏
      showPrmDialog: false, // 控制分配权限的显示隐藏
      permData: [], // 接收权限数据
      defaultProps: {
        label: 'name'
      },
      userId: null, // 记录当前分配权限的id
      selectCheck: [] // 用来记录当前的权限点
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    showTitle() {
      return this.roleForm.id ? '编辑角色' : '新增角色'
    }
  },
  created() {
    this.getRoleList() // 获取角色列表
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    async getCompanyInfo() {
      this.FormData = await getCompanyInfo(this.companyId) // 赋值给formData
    },
    changePage(newPage) {
      // newpage是当前点击的页码
      this.page.page = newPage
      this.getRoleList()
    },
    async deleteRole(id) {
      // 提示
      try {
        await this.$confirm('确认删除角色吗')
        // 调用删除接口
        await deleteRole(id)
        // 重新加载数据
        this.getRoleList()
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    btnCancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.showDialog = false
      this.$refs.roleForm.resetFields()
    },
    async btnOk() {
      this.loading = true
      try {
        await this.$refs.roleForm.validate()
        // 只有校验通过才会执行await的下方内容
        if (this.roleForm.id) {
          // 编辑业务
          await updateRole(this.roleForm)
        } else {
          // 新增业务
          await addRole(this.roleForm)
        }
        // 重新拉取数据
        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    // 弹层层
    // 获取权限点数据 在点击时
    async assignPrm(id) {
      this.permData = tranListToTreeData(await getPermissionList(), '0')// 转化list 到树形
      // 有id先记录下来
      this.userId = id
      const { permIds } = await getRoleDetail(id) // permIds角色拥有的权限点数据
      this.selectCheck = permIds
      this.showPrmDialog = true
    },
    async btnPermOk() {
      // 调佣el-tree的方法
      await assignPrm({ permIds: this.$refs.premTree.getCheckedKeys(), id: this.userId })
      this.$message.success('分配权限成功')
      this.showPrmDialog = false
    },
    btnPermCancel() {
      this.selectCheck = [] // 重置数据
      this.showPrmDialog = false
    }
  }
}
</script>

<style>

</style>
