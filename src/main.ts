import { createApp } from 'vue'

import App from './App.vue'
import { createPinia } from 'pinia'

import 'uno.css'
import { setupPlugins } from './plugins/setup'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
setupPlugins(app)

app.mount('#app')

export const useApp = () => app
export const useGlobals = () => app?.config?.globalProperties
