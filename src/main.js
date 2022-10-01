import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'
import 'assets/iconfont/iconfont.css'    // 引入阿里云字体图标css

const vue = createApp(App)
// 使用路由
vue.use(router)
vue.mount('#app')