// 负责全局自定义组件注册
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
import Screenfull from './ScreenFull'
import ThemePicker from './ThemePicker'
import LangSelect from './Lang'
import TagsView from './TagsView'
export default {
  install(Vue) {
    // 组件注册
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload) // 注册图片上传组件
    Vue.use(Print)
    Vue.component('Screenfull', Screenfull)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('LangSelect', LangSelect)
    Vue.component('TagsView', TagsView)
  }
}
