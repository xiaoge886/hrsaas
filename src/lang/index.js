import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie' // 引入cookie包
import elementEN from 'element-ui/lib/locale/lang/en'
import elementZH from 'element-ui/lib/locale/lang/zh-CN'
import customZH from './zh' // 引入自定义中文包
import customEN from './en' // 引入自定义英文包
Vue.use(VueI18n) // 完成全局注册
export default new VueI18n({
  // i18n的选项
  locale: Cookie.get('language') || 'zh', // 指的当前的多语言的类型 随意定义字符串
  messages: {
    en: {
      // 语言包 elementUl 语言包 + 自定义语言包
      ...elementEN,
      ...customEN
    },
    zh: {
      ...elementZH,
      ...customZH
    }
  } // 指的是当前的语言包
})
