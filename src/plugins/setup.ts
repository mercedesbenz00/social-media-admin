import type { App } from 'vue'

export const setupPlugins = (app: App) => {
  const plugins = import.meta.globEager('./**/*.plugin.ts')

  for (const [, plugin] of Object.entries(plugins)) {
    plugin.install?.(app)
  }
}
