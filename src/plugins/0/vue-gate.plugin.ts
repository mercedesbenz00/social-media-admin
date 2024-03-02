import type { App } from "vue";
import VueGates from 'vue-gates'

export const install = (app: App) => {
  app.use(VueGates as any)
}

export default install