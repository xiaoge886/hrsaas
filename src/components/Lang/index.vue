<template>
  <el-dropdown @command="changeLanguage">
    <!-- 显示一个图标 -->
    <div>
      <svg-icon style="color:#fff;font-size:20px" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="'zh'=== $i18n.locale">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="'en'=== $i18n.locale">En</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  methods: {
    changeLanguage(type) {
      // 设置类型,先写入到cookie
      Cookie.set('language', type) // 写入cookie缓存
      // 改变当前多语言
      this.$i18n.locale = type // 设置给本地的i18n插件
      this.$message.success('切换多语言成功')
    }
  }
}
</script>

<style>

</style>
