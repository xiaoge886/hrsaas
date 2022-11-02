<template>
  <UploadExcel :on-success="success" />
</template>

<script>
import { importEmployees } from '@/api/employees'
export default {
  methods: {
    async success({ header, results }) {
      // header中的数据是中文 results中的数据也是中文
      // 新增员工属性是一致的
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // results.forEach(item => {
      //   const useInfo = {}
      //   Object.keys(item).forEach(key => {
      //     // 现在key是中文
      //     useInfo[userRelations[key]] = item[key] // 将原来中文对应的值赋值给原来英文对应的值
      //   })
      // })
      const newArr = results.map(item => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          // key是当前的中文名 找到对应的英文名
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/')) // 只有这样, 才能入库
            return
          }
          userInfo[userRelations[key]] = item[key]
        })
        return userInfo
      })
      // console.log(newArr)
      await importEmployees(newArr) // 接收一个数组
      this.$message.success('导入Excel成功')
      this.$router.back()
    },
    // 转化excel的日期格式
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
