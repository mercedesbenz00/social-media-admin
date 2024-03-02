import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

import type { App } from 'vue'
import { ACCESS_TOKEN } from '@/constants/global.constants'
import { useCookies } from '@vueuse/integrations/useCookies'
import _ from 'lodash'
import { isRTL } from './i18n.plugin'
import { useAuthStore } from '@/data/auth/auth.store'

export const install = (app: App) => {
  // default page setups for layouts
  const routesWithLayouts = generatedRoutes.map((route) => {
    if (route.path.startsWith('/auth')) {
      route.meta = { ...route.meta, layout: route.meta?.layout ?? 'auth' }
    } else if (route.path.startsWith('/setup')) {
      route.meta = {
        ...route.meta,
        layout: route.meta?.layout ?? 'setup',
      }
    } else if (route.path.startsWith('/examples'))
      route.meta = { ...route.meta, layout: route.meta?.layout ?? 'example' }
    return route
  })

  const routes = setupLayouts(routesWithLayouts)
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  router.beforeResolve(async (to: any, from: any, next) => {
    const token = useCookies().get(ACCESS_TOKEN)
    const user = computed(() => useAuthStore().user)
    // custom transition embedding
    if (_.has(to, 'meta.order') && _.has(from, 'meta.order')) {
      if (_.get(to, 'meta.order') > _.get(from, 'meta.order')) {
        to.meta.transition = isRTL() ? 'slide-right' : 'slide-left'
      } else {
        to.meta.transition = isRTL() ? 'slide-left' : 'slide-right'
      }
    }
    if (to.fullPath.startsWith('/auth/')) {
      if (token && user.value?.admin) return next({ path: '/' })
    } else if (!token && !user.value?.admin) {
      return next({ path: '/auth/login', query: { redirect: to.fullPath } })
    }

    next()
  })

  app.use(router)
}

export default install
