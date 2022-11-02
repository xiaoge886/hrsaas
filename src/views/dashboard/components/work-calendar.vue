<template>
  <!-- 工作日历 -->
  <div>
    <!-- 年和月 -->
    <el-row type="flex" justify="end">
      <!-- 年 用组件的给定一个日期 日期获取年 年取前五年加后五年 -->
      <el-select v-model="currentYear" size="small" style="width: 120px" @change="dataChange">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px;margin-left: 10px" @change="dataChange">
        <!-- 循环 -->
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <!-- date 是日期 data是对象 对象里有要显示的day -->
      <template v-slot:dateCell="{ date, data}">
        <div class="date-content">
          <span class="text">{{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>

export default {
  filters: {
    getDay(value) {
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      yearList: [], // 要遍历的年的数组
      currentYear: null,
      currentMonth: null,
      currentDate: null,
      currentDay: null
    }
  },
  created() {
    // 获取当前年份
    this.currentYear = this.startDate.getFullYear()
    // 当前月份
    this.currentMonth = this.startDate.getMonth() + 1
    this.currentDay = this.startDate.getDate()
    // 快速获取数组方法
    this.yearList = Array.from(Array(11), (v, i) => { return this.currentYear + i - 5 })
    this.dataChange()
  },
  methods: {
    dataChange() {
      // 生成新的日期
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-${this.currentDay}`)
    },
    // 判断当前是否是周末
    isWeek(value) {
      return value.getDay() === 6 || value.getDay() === 0
    }
  }
}
</script>

<style scoped>
::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
 ::v-deep .el-calendar-table td.is-selected{
  background-color: transparent;
 }
</style>
