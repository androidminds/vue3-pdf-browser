import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import bus from './bus'
import i18n from './locales/index'

let app = createApp(App)
app.use(i18n)


app.mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))