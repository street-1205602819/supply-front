import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import { useRoute, useRouter } from 'vue-router'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(store);

router.push('hotspot/info_list')

app.mount('#app')
