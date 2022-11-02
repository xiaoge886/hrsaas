<template>
  <!-- 雷达图 -->
  <div ref="myDiv" class="radar-echart">
    <!-- 图表必须给高和宽度 -->
    123
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { TitleComponent, LegendComponent, TooltipComponent, GridComponent } from 'echarts/components'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer, TooltipComponent, GridComponent])

export default {
  created() {

  },
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv) // 得到图表实例
    myChart.setOption({
      title: {
        // text: '基础雷达图'
      },
      tooltip: {},
      // legend: {
      //   data: ['预算 vs 开销（Budget vs spending）']
      // },
      grid: {
        position: 'center'
      },
      radar: {
        axisName: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]

        },
        // shape: 'circle',
        // 每个区域的最高值
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [
        {
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          data: [
            {
              value: [10, 1, 100, 5, 100, 0],
              name: '张三'
            },
            {
              value: [50, 50, 50, 50, 50, 100],
              name: '李四'
            }
          ]
        }
      ]
    })
  }
}
</script>

<style>
.radar-echart{
  width: 600px;
  height: 400px;
}
</style>
