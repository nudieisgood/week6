import './assets/main.css'
import LoadingVue from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
// import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import Vue3Toastify, { toast } from 'vue3-toastify'

import App from './App.vue'
import router from './router'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})

// 設定預設語系
setLocale('zh_TW')

const app = createApp(App)
app.use(Vue3Toastify, {
  autoClose: 1000, // 自動關閉時間
  position: toast.POSITION.TOP_CENTER // 提示窗位置
})
app.use(createPinia())
app.use(router)
app.component('LoadingVue', LoadingVue)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
