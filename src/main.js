import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'

const vue = createApp(App)
// 使用路由
vue.use(router)
vue.mount('#app')