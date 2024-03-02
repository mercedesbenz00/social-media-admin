/* eslint-disable no-console */
import { defineStore } from 'pinia'
import { useMainStore } from '../main.store'
import { ACCESS_TOKEN, REFRESH_TOKEN, REMEMBER } from '@/constants/global.constants'
import { eAuth } from './auth.endpoint'
import type { IAuthUser, ITokenResponse } from './auth.interface'
import { useAssets } from '@/composables/useAssets'
import { i18n } from '@/plugins/0/i18n.plugin'
import jwt_decode from "jwt-decode";

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null as IAuthUser | null,
      fetching: false,
    }
  },
  actions: {
    async init() {
      const access = useCookie().get(ACCESS_TOKEN)
      const refresh = useCookie().get(REFRESH_TOKEN)
      if (access || refresh) await this.me()
    },
    getUserAvatar() {
      return this.user?.avatar?.path || useAssets('no-avatar.svg')
    },
    async token(payload: { credential: string; password: string }) {
      if (this.user) return
      const { credential, password } = payload
      const body = {
        email: credential,
        password,
      }
      try {
        const { data }: { data: ITokenResponse } = await useApi({
          ...eAuth.token,
          body,
        })
        const decoded:any = jwt_decode(data.token)
        if (decoded.roles.includes('ADMIN')) {
          this.setTokens(data, true)
          this.me()
          return data
        } else {
          const error = new Error()
          error.name = 'not_admin'
          throw error
        }
      } catch (error) {
        if (error.name === 'not_admin') {
          const type = 'error'
          const message = 'Wrong Credentials'
          const detail = 'It is not an admin account'
          useMainStore().toast({ type, message, detail })
          throw error
        } else {
          const type = error.response.status === 404 ? 'error' : 'warn'
          const message = error.response.status === 404 ? 'Wrong Credentials' : 'Warning'
          const detail = error.response.data.message
          useMainStore().toast({ type, message, detail })
          throw error
        }
      }
    },
    async me(forceRequest = false): Promise<IAuthUser | undefined> {
      if (this.user && !forceRequest) return this.user
      if (!useCookie().get(ACCESS_TOKEN)) return
      try {
        this.fetching = !forceRequest
        const { data } = await useApi({ ...eAuth.me })
        this.user = data
        return data
      } finally {
        this.fetching = false
      }
    },
    async refresh() {
      const { data } = await useApi({ ...eAuth.me })
      this.user = data
      return data
    },
    async refreshToken() {
      const token = useCookie().get(REFRESH_TOKEN)
      const remember = useCookie().get(REMEMBER)

      if (!token || !remember) {
        await this.logout()
        return
      }
      try {
        const { data }: { data: ITokenResponse } = await useApi({
          ...eAuth.refresh,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.setTokens(data)
        return data
      } catch (error) {
        useMainStore().toast({ type: 'error', message: 'Session Expired', detail: 'Please login to proceed' })
        await this.logout()

        throw error
      }
    },
    logout() {
      this.user = null
      this.setTokens()
      useGlobals().$router.push('/auth/login')
    },
    setTokens(tokens?: ITokenResponse, remember?: boolean) {
      const cookie = useCookie()

      const r = remember ?? cookie.get(REMEMBER) ?? false
      if (tokens) {
        cookie.set(ACCESS_TOKEN, tokens.token, { path: '/' })
        if (r) {
          cookie.set(REFRESH_TOKEN, tokens.refreshToken, { path: '/' })
          cookie.set(REMEMBER, true, { path: '/' })
        }
      } else {
        cookie.remove(ACCESS_TOKEN)
        cookie.remove(REFRESH_TOKEN)
        cookie.remove(REMEMBER)
      }
    },
    async confirmEmail(payload: { code: string; email: string }) {
      try {
        const response = await useApi({
          url: `${eAuth.confirmEmail.url}?code=${payload.code}&email=${payload.email}`,
          method: 'get',
        })
        return response
      } catch (error) {
        return error.response
      }
    },
  },
  getters: {
    isAuthenticated: () => !!useCookie().get(ACCESS_TOKEN),
    isAdmin: (state) => state.user?.admin ?? false,
  },
})
