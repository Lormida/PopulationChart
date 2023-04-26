import { createApp } from 'vue'
import { store } from './modules/ChartPopulation/store/vuex/index'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
