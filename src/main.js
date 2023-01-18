import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'
import 'assets/iconfont/iconfont.css'    // 引入阿里云字体图标css
import { createPinia } from 'utils/pinia'

const vue = createApp(App)
// 使用路由
vue.use(router)
// 使用pinia
vue.use(createPinia())
vue.mount('#app')